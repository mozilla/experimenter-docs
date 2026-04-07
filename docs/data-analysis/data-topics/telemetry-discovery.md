---
id: telemetry-discovery
title: Finding Telemetry in BigQuery
slug: /data-analysis/data-topics/telemetry-discovery
---

When you need to measure something in an experiment, the first challenge is finding the right BigQuery table and column for the telemetry you care about. This guide explains how Firefox telemetry flows into BigQuery and how to trace any metric from its source definition to a queryable column.

## How Telemetry Flows to BigQuery

Firefox telemetry goes through a multi-stage pipeline before it reaches BigQuery:

```
metrics.yaml  →  Glean SDK  →  Pings  →  Ingestion Pipeline  →  BigQuery Tables
```

1. **`metrics.yaml`** files in the application source define what gets recorded (metric name, type, which ping carries it)
2. **`pings.yaml`** files define the ping types that carry metrics to the server
3. The **Glean SDK** serializes metrics into JSON payloads and sends them as pings
4. The **ingestion pipeline** validates payloads and writes them into BigQuery
5. **bigquery-etl** generates user-facing views and derived tables (like `events_stream` and `clients_daily`)

## How Pings Become Tables

Each ping type defined in `pings.yaml` becomes its own BigQuery table. The app ID determines the dataset name, and the ping name determines the table name within that dataset.

For Firefox Desktop (`firefox-desktop`):

- **Stable tables:** `moz-fx-data-shared-prod.firefox_desktop_stable.<ping_name>_v1`
- **User-facing views:** `mozdata.firefox_desktop.<ping_name>`

Ping names undergo hyphen-to-underscore conversion: `newtab-content` becomes `newtab_content`.

### Built-in Glean Pings

Every Glean application automatically gets these pings:

| Ping | BigQuery Table | What It Carries | When Sent |
|------|----------------|-----------------|-----------|
| `baseline` | `<app>.baseline` | Library-managed metrics (duration, etc.) | App becomes active/inactive |
| `metrics` | `<app>.metrics` | All non-event metrics with default `send_in_pings` | Daily at 4AM |
| `events` | `<app>.events` / `events_stream` | All event-type metrics with default `send_in_pings` | App inactive or 500 events batched |
| `deletion-request` | `<app>.deletion_request` | Signals: delete user data | User opts out of telemetry |

### Custom Pings

Applications can define additional custom pings. For example, Firefox Desktop defines ~33 custom pings including:

| Custom Ping | BigQuery Table | Purpose |
|-------------|----------------|---------|
| `newtab` | `firefox_desktop.newtab` | Per-session New Tab instrumentation |
| `top-sites` | `firefox_desktop.top_sites` | Top Sites events (no client_id) |
| `urlbar-events` | `firefox_desktop.urlbar_events` | Address bar interaction events |

You can find all custom pings for an app in the [Glean Dictionary](https://dictionary.telemetry.mozilla.org/).

## How Metrics Become Columns

The `send_in_pings` field in a metric's `metrics.yaml` definition determines which table the metric lands in. The column name follows a formula:

```
metrics.<glean_type>.<category>_<metric_name>
```

Where:

- **`<glean_type>`** is the Glean type: `boolean`, `string`, `counter`, `quantity`, `labeled_counter`, `timing_distribution`, `string_list`, `uuid`, `url`, `text`, `object`
- **`<category>`** is the YAML category key (e.g., `newtab`, `pocket`, `topsites`)
- **`<metric_name>`** is the YAML metric key within the category
- Dots in category names become underscores: `newtab.search` becomes `newtab_search`

### Examples

Given this `metrics.yaml` definition:

```yaml
newtab:
  locale:
    type: string
    send_in_pings:
      - newtab
```

The resulting BigQuery column is `metrics.string.newtab_locale` in the `firefox_desktop.newtab` table.

Here are more examples showing how the mapping works:

| metrics.yaml Definition | send_in_pings | BigQuery Table | BigQuery Column |
|---|---|---|---|
| `newtab.locale` (string) | `newtab` | `firefox_desktop.newtab` | `metrics.string.newtab_locale` |
| `newtab.search_enabled` (boolean) | `newtab` | `firefox_desktop.newtab` | `metrics.boolean.newtab_search_enabled` |
| `pocket.enabled` (boolean) | `newtab` | `firefox_desktop.newtab` | `metrics.boolean.pocket_enabled` |
| `topsites.rows` (quantity) | `newtab` | `firefox_desktop.newtab` | `metrics.quantity.topsites_rows` |
| `newtab.activity_stream_ctor_success` (boolean) | *(default)* | `firefox_desktop.metrics` | `metrics.boolean.newtab_activity_stream_ctor_success` |

When `send_in_pings` is omitted, non-event metrics default to the built-in `metrics` ping and event metrics default to the built-in `events` ping.

## How `send_in_pings` Determines the Table

The routing rules are:

| `send_in_pings` value | Metric type | Where it lands |
|---|---|---|
| Custom ping name (e.g., `newtab`) | Any | That ping's table (e.g., `firefox_desktop.newtab`) |
| `events` | Event | `firefox_desktop.events` raw table, or query via `events_stream` |
| `metrics` | Non-event | `firefox_desktop.metrics` |
| Not specified (default) | Event | Built-in `events` ping → `events_stream` |
| Not specified (default) | Non-event | Built-in `metrics` ping → `firefox_desktop.metrics` |

## Events: Two Paths

Event-type metrics can end up in two different places depending on their `send_in_pings` value. This is a common source of confusion.

### Path 1: Events in custom pings

Events sent to a custom ping land in that ping table's `events` ARRAY column. You query them by unnesting:

```sql
SELECT
  e.category,
  e.name,
  (SELECT value FROM UNNEST(e.extra) WHERE key = 'is_sponsored') AS is_sponsored
FROM `mozdata.firefox_desktop.newtab`,
UNNEST(events) AS e
WHERE DATE(submission_timestamp) = '2025-01-15'
  AND e.category = 'pocket'
  AND e.name = 'click'
```

### Path 2: Events in `events_stream`

Events sent to the built-in `events` ping (or with no `send_in_pings` specified) land in the `events_stream` derived table, which pre-unnests the events into flat rows:

```sql
SELECT
  event_category,
  event_name,
  JSON_EXTRACT_SCALAR(event_extra, '$.experiment') AS experiment
FROM `mozdata.firefox_desktop.events_stream`
WHERE DATE(submission_timestamp) = '2025-01-15'
  AND event_category = 'nimbus_events'
  AND event_name = 'enrollment'
```

:::caution
`events_stream` only contains events from the built-in `events` ping. Events sent to custom pings (like `newtab`) are **not** in `events_stream` — they live in their respective ping tables.
:::

## Standard Columns in Every Ping Table

All Glean ping tables share a common set of columns:

| Column | Description |
|--------|-------------|
| `client_info.client_id` | UUID identifying the client |
| `client_info.app_display_version` | Firefox version string |
| `client_info.app_channel` | Release channel (release, beta, nightly, esr) |
| `client_info.os` | Operating system (Windows, Darwin, Linux) |
| `client_info.locale` | App locale |
| `ping_info.experiments` | Map of active experiment slug → branch assignment |
| `submission_timestamp` | When the ping was received (use for date partitioning) |
| `sample_id` | Hash of client_id, values 0–99 (use for cheaper dev queries) |
| `normalized_channel` | Standardized channel name |
| `normalized_country_code` | ISO country code |

:::tip
The `ping_info.experiments` field is how you filter telemetry to clients enrolled in a specific experiment. See [Querying Experiment Data](/data-analysis/data-topics/querying-experiment-data) for examples.
:::

## Five-Step Workflow

Given any metric or event you want to analyze, follow these steps:

### Step 1: Find the definition

Look up the metric in the [Glean Dictionary](https://dictionary.telemetry.mozilla.org/) or search the application's `metrics.yaml` files. Note the `type`, `send_in_pings`, and (for events) `extra_keys`.

### Step 2: Determine the table

Use `send_in_pings` to identify the BigQuery table:

- `send_in_pings: [newtab]` → `mozdata.firefox_desktop.newtab`
- `send_in_pings: [events]` → `mozdata.firefox_desktop.events_stream`
- No `send_in_pings` + event type → `mozdata.firefox_desktop.events_stream`
- No `send_in_pings` + non-event type → `mozdata.firefox_desktop.metrics`

### Step 3: Build the column path

For non-event metrics, use the formula: `metrics.<glean_type>.<category>_<metric_name>`

For events, you query by `event_category` and `event_name` (in `events_stream`) or by `e.category` and `e.name` after unnesting (in custom ping tables).

### Step 4: Validate with a sample query

Run a quick query to confirm the column exists and has data:

```sql
SELECT metrics.boolean.newtab_search_enabled, COUNT(*)
FROM `mozdata.firefox_desktop.newtab`
WHERE DATE(submission_timestamp) = CURRENT_DATE() - 1
GROUP BY 1
```

### Step 5: For real-time data, use live tables

Each ping also has a live table with streaming latency (seconds) but only 30-day retention. Replace the table name with the `_live` suffix:

- Stable: `mozdata.firefox_desktop.newtab`
- Live: `mozdata.firefox_desktop.newtab_live`

:::info
Live tables have flattened column names — `client_id` instead of `client_info.client_id`, `pocket_enabled` instead of `metrics.boolean.pocket_enabled`. Not all columns from the stable view are available in live views.
:::

## Derived Tables

Beyond raw ping tables, bigquery-etl generates derived tables that aggregate or reshape data for common analysis patterns:

| Table | Source | Purpose |
|-------|--------|---------|
| `events_stream` | Built-in `events` ping | Flat event rows with `event_category`, `event_name`, `event_extra` |
| `baseline_clients_daily` | `baseline` ping | One row per client per day |
| `metrics_clients_daily` | `metrics` ping | One row per client per day |
| `clients_first_seen` | Various | First-seen date for each client |
| `clients_last_seen_joined` | Various | Last-seen tracking |
| `active_users_aggregates` | Various | DAU/WAU/MAU aggregates |

Use derived tables when you need pre-aggregated data or when the raw ping tables would require complex joins.

## Useful Resources

- **[Glean Dictionary](https://dictionary.telemetry.mozilla.org/)** — Browse all metrics and pings for any Glean application
- **[probe-scraper](https://probeinfo.telemetry.mozilla.org/)** — API for metric/ping discovery across all apps
- **[metric-hub `definitions/`](https://github.com/mozilla/metric-hub/tree/main/definitions)** — Reusable metric SQL definitions used by Jetstream
- **[Mozilla Data Documentation](https://docs.telemetry.mozilla.org/)** — Comprehensive data platform documentation
- **[STMO (sql.telemetry.mozilla.org)](https://sql.telemetry.mozilla.org/)** — SQL query interface for BigQuery
