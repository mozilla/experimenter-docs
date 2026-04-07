---
id: querying-experiment-data
title: Querying Experiment Data in BigQuery
slug: /data-analysis/data-topics/querying-experiment-data
---

This guide provides SQL patterns for two common tasks: querying Jetstream's pre-computed results tables, and querying raw telemetry for clients enrolled in your experiment.

## Querying Jetstream Results

Jetstream writes statistical results and per-client enrollment data to BigQuery in the `mozanalysis` dataset within the `moz-fx-data-experiments` project.

### Table Naming

Experiment slug hyphens are converted to underscores. For an experiment with slug `my-experiment-slug`:

| Table Pattern | Example | Contents |
|---|---|---|
| `statistics_{slug}_{period}` | `statistics_my_experiment_slug_weekly` | Statistical comparisons (point estimates, CIs) |
| `statistics_{slug}_day_{N}` | `statistics_my_experiment_slug_day_7` | Per-day statistical snapshots |
| `{slug}_enrollments_{period}` | `my_experiment_slug_enrollments_weekly` | Per-client raw metric data (enrollment basis) |
| `{slug}_exposures_{period}` | `my_experiment_slug_exposures_weekly` | Per-client raw metric data (exposure basis) |
| `enrollments_{slug}` | `enrollments_my_experiment_slug` | Base enrollment table |

Available periods: `daily`, `weekly`, `overall_1`, `day_{N}`, `week_{N}`, `preenrollment_week_1`, `preenrollment_days28_1`

### Statistics Table Schema

The `statistics_*` tables contain the computed results that appear on the Experimenter results page:

| Column | Description |
|--------|-------------|
| `metric` | Metric name (e.g., `active_hours`, `days_of_use`, `retained`) |
| `statistic` | Statistical method (`binomial`, `mean`, `deciles`, etc.) |
| `branch` | Branch name |
| `comparison` | `NULL` (absolute), `difference`, or `relative_uplift` |
| `comparison_to_branch` | Which branch is the baseline for this comparison |
| `point` | Point estimate |
| `lower` | Lower bound of confidence interval |
| `upper` | Upper bound of confidence interval |
| `ci_width` | Confidence interval width (typically 0.95) |
| `segment` | Segment name (`all` for the full population) |
| `analysis_basis` | `enrollments` or `exposures` |
| `window_index` | Analysis window index (for daily/weekly periods) |

### Example: Pull Overall Results for a Metric

```sql
SELECT
  metric,
  branch,
  comparison,
  comparison_to_branch,
  point,
  lower,
  upper,
  segment
FROM `moz-fx-data-experiments.mozanalysis.statistics_my_experiment_slug_overall_1`
WHERE metric = 'active_hours'
  AND statistic = 'mean'
  AND segment = 'all'
ORDER BY branch, comparison
```

### Example: Check Weekly Retention Across Windows

```sql
SELECT
  window_index,
  branch,
  point,
  lower,
  upper
FROM `moz-fx-data-experiments.mozanalysis.statistics_my_experiment_slug_weekly`
WHERE metric = 'retained'
  AND statistic = 'binomial'
  AND comparison = 'relative_uplift'
  AND comparison_to_branch = 'control'
  AND segment = 'all'
ORDER BY window_index, branch
```

### Example: List All Result Tables for an Experiment

```sql
SELECT table_name
FROM `moz-fx-data-experiments.mozanalysis`.INFORMATION_SCHEMA.TABLES
WHERE table_name LIKE '%my_experiment_slug%'
ORDER BY table_name
```

## Querying Raw Telemetry for Experiment Users

For ad-hoc analysis beyond what Jetstream computes, you can query raw telemetry tables and filter to clients enrolled in your experiment.

### Filtering by Experiment Enrollment

All Glean ping tables include a `ping_info.experiments` field — a map of experiment slug to branch assignment. Use this to filter telemetry to enrolled clients:

```sql
SELECT *
FROM `mozdata.firefox_desktop.newtab`
WHERE DATE(submission_timestamp) = '2025-01-15'
  AND ping_info.experiments['my-experiment-slug'].branch IS NOT NULL
```

To filter to a specific branch:

```sql
WHERE ping_info.experiments['my-experiment-slug'].branch = 'treatment'
```

:::info
The `events_stream` derived table also has an `experiments` column with the same structure, accessible as `experiments['slug'].branch`.
:::

### Example: Scalar Metric for Enrolled Users

Query a boolean metric from the `metrics` ping table for clients in your experiment:

```sql
SELECT
  ping_info.experiments['my-experiment-slug'].branch AS branch,
  COUNTIF(metrics.boolean.newtab_search_enabled) AS search_enabled_count,
  COUNT(*) AS total_pings
FROM `mozdata.firefox_desktop.metrics`
WHERE DATE(submission_timestamp) BETWEEN '2025-01-15' AND '2025-01-22'
  AND ping_info.experiments['my-experiment-slug'].branch IS NOT NULL
GROUP BY 1
```

### Example: Event from a Custom Ping (UNNEST Pattern)

Events in custom pings live in that table's `events` array. Unnest to access them:

```sql
SELECT
  ping_info.experiments['my-experiment-slug'].branch AS branch,
  e.name AS event_name,
  (SELECT value FROM UNNEST(e.extra) WHERE key = 'is_sponsored') AS is_sponsored,
  COUNT(*) AS event_count
FROM `mozdata.firefox_desktop.newtab`,
UNNEST(events) AS e
WHERE DATE(submission_timestamp) BETWEEN '2025-01-15' AND '2025-01-22'
  AND ping_info.experiments['my-experiment-slug'].branch IS NOT NULL
  AND e.category = 'pocket'
  AND e.name = 'click'
GROUP BY 1, 2, 3
```

### Example: Event from `events_stream`

Events from the built-in `events` ping are pre-unnested in `events_stream`:

```sql
SELECT
  JSON_EXTRACT_SCALAR(event_extra, '$.experiment') AS experiment,
  JSON_EXTRACT_SCALAR(event_extra, '$.branch') AS branch,
  event_name,
  COUNT(*) AS event_count
FROM `mozdata.firefox_desktop.events_stream`
WHERE DATE(submission_timestamp) BETWEEN '2025-01-15' AND '2025-01-22'
  AND event_category = 'nimbus_events'
  AND event_name = 'exposure'
GROUP BY 1, 2, 3
```

:::caution
`events_stream` only contains events from the built-in `events` ping. If the event you're looking for is sent to a custom ping (like `newtab`), you need to query that ping's table using the UNNEST pattern above. Check the metric's `send_in_pings` field to know which table to query. See [Finding Telemetry in BigQuery](/data-analysis/data-topics/telemetry-discovery) for details.
:::

## Common Patterns

### Date Partitioning (Required)

All BigQuery telemetry tables are partitioned by `submission_timestamp`. Every query **must** include a date filter for cost control:

```sql
WHERE DATE(submission_timestamp) = '2025-01-15'
-- or for a range:
WHERE DATE(submission_timestamp) BETWEEN '2025-01-15' AND '2025-01-22'
```

### Extracting Values from Event Extras

Event extra data is stored as key-value pairs. The syntax differs between custom ping events and `events_stream`:

```sql
-- In custom ping tables (events are ARRAY<STRUCT<key, value>>):
(SELECT value FROM UNNEST(e.extra) WHERE key = 'my_key') AS my_value

-- In events_stream (event_extra is JSON):
JSON_EXTRACT_SCALAR(event_extra, '$.my_key') AS my_value
```

### Using `sample_id` for Cheaper Dev Queries

Every table has a `sample_id` column (0–99) derived from the client_id hash. Use it to run queries on a fraction of data while developing:

```sql
WHERE DATE(submission_timestamp) = '2025-01-15'
  AND sample_id = 0  -- ~1% of clients
```

### Filtering by Channel, Version, or OS

```sql
WHERE normalized_channel = 'release'
  AND client_info.app_display_version LIKE '134%'
  AND normalized_os = 'Windows'
```

### Live Tables for Same-Day Data

Each ping has a live table with streaming latency (seconds) but only 30-day retention. Useful for monitoring experiments in real time:

```sql
SELECT COUNT(*) AS events_last_hour
FROM `mozdata.firefox_desktop.newtab_live`,
UNNEST(events) AS e
WHERE submission_timestamp > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR)
  AND e.category = 'pocket'
  AND e.name = 'click'
```

:::info
Live tables have flattened column names — `client_id` instead of `client_info.client_id`. Not all columns from the stable view are available.
:::

## Tips and Pitfalls

- **Always include a date partition filter.** Queries without one scan the entire table history and can be very expensive.
- **`client_info.client_id` vs `client_id`**: In most stable tables, client_id is nested under `client_info`. In `events_stream` and live tables, it's a top-level column. Check the table schema if you get a column-not-found error.
- **`events_stream` only has `events` ping events.** This is the most common mistake — looking for custom-ping events in `events_stream` and getting zero results. Check `send_in_pings` in the metric definition.
- **Slug hyphens become underscores in table names.** `my-experiment` becomes `statistics_my_experiment_overall_1`.
- **Use `mozdata` views, not `_stable` tables.** The `mozdata.*` views add useful computed columns and normalize metadata. Only use `_stable` tables if you need raw data.
