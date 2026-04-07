---
id: configuration-walkthrough
title: Configuration Walkthrough
sidebar_position: 6
slug: /data-analysis/jetstream/configuration-walkthrough
---

This guide walks through real-world Jetstream configuration patterns, from minimal overrides to fully custom analysis setups. For the complete syntax reference, see [Configuration](./configuration). You can also browse [all existing configs](https://github.com/mozilla/metric-hub/tree/main/jetstream) in the metric-hub repository.

## Before You Start

Custom Jetstream configurations are TOML files in the [metric-hub](https://github.com/mozilla/metric-hub) repository under `jetstream/`. The filename must match your experiment slug: `my-experiment-slug.toml`.

To add or update a config, open a pull request against metric-hub. CI will validate your TOML syntax and check that referenced metrics and data sources exist. See [Testing](./testing) for how to validate and preview configs locally.

## Example 1: Minimal Config

The simplest config just overrides experiment dates or enrollment period. Jetstream applies all platform default metrics (guardrails) automatically.

```toml
[experiment]
enrollment_period = 14
end_date = "2025-07-01"
```

**When to use this:** Your experiment's enrollment period in Experimenter doesn't match what actually happened, or you need to override the end date for analysis purposes.

**What Jetstream does with defaults:** Even with just this config, Jetstream runs all [default guardrail metrics](./metrics#what-are-the-default-guardrail-metrics) for your experiment's platform (Desktop, Android, or iOS) across daily, weekly, and overall analysis windows.

## Example 2: Adding Pre-Defined Metrics

You can add metrics that already exist in [metric-hub's definitions](https://github.com/mozilla/metric-hub/tree/main/definitions) to your experiment without writing any SQL. Browse available metrics at the [metric-hub documentation site](https://mozilla.github.io/metric-hub/).

```toml
[experiment]
enrollment_period = 8

[metrics]
weekly = ["active_hours", "uri_count", "ad_clicks"]
overall = ["active_hours", "uri_count", "ad_clicks"]
```

This adds three pre-defined metrics to both weekly and overall analysis windows, in addition to the default guardrails. The metrics and their statistics are already defined in `definitions/firefox_desktop.toml` (or the relevant platform file).

**How to find available metrics:** Search the [definitions directory](https://github.com/mozilla/metric-hub/tree/main/definitions) for your platform's TOML file (e.g., `firefox_desktop.toml`, `fenix.toml`, `firefox_ios.toml`). Each `[metrics.<name>]` section defines a reusable metric.

## Example 3: Custom Metric with a New Data Source

When the metric you need doesn't exist in metric-hub, define it in your experiment config along with the data source it queries.

```toml
[experiment]
enrollment_period = 14
end_date = "2025-07-01"

[metrics]
weekly = ["chatbot_usage", "chatbot_frequency"]
overall = ["chatbot_usage", "chatbot_frequency"]

[metrics.chatbot_usage]
friendly_name = "Chatbot Usage"
description = "Percentage of clients who opened the chatbot panel"
select_expression = "COALESCE(LOGICAL_OR(event_name = 'sidebar_toggle'), FALSE)"
data_source = "chatbot"
analysis_bases = ["exposures"]

[metrics.chatbot_usage.statistics.binomial]

[metrics.chatbot_frequency]
friendly_name = "Chatbot Frequency"
description = "Average number of times clients opened the chatbot panel"
select_expression = "COALESCE(COUNTIF(event_name = 'sidebar_toggle'), 0)"
data_source = "chatbot"
analysis_bases = ["exposures"]

[metrics.chatbot_frequency.statistics.bootstrap_mean]
drop_highest = 0.0

[data_sources.chatbot]
from_expression = """(
  SELECT
    legacy_telemetry_client_id AS client_id,
    CAST(submission_timestamp AS DATE) AS submission_date,
    event_name
  FROM `mozdata.firefox_desktop.events_stream`
  WHERE event_category IN ('genai.chatbot')
    AND event_name IN ('sidebar_toggle', 'onboarding_finish')
)"""
experiments_column_type = "none"
friendly_name = "Chatbot Events"
description = "Events for chatbot usage tracking"
```

### Key points

**Data source requirements:**
- The `from_expression` must be a SQL subquery that produces at minimum `client_id` and `submission_date` columns
- Set `experiments_column_type = "none"` when your data source doesn't include experiment enrollment information (most custom sources). Jetstream will join with its own enrollment data instead.

**Metric `select_expression` patterns:**
- **Binary metric** (did the client do X?): `COALESCE(LOGICAL_OR(condition), FALSE)` → use with `[statistics.binomial]`
- **Count metric** (how many times?): `COALESCE(COUNTIF(condition), 0)` → use with `[statistics.bootstrap_mean]`
- **Sum metric** (total value): `COALESCE(SUM(column), 0)` → use with `[statistics.bootstrap_mean]`

**`analysis_bases`:** Controls whether the metric is computed over all enrolled clients (`enrollments`) or only exposed clients (`exposures`). Defaults to `["enrollments", "exposures"]`. Set to `["exposures"]` for metrics that only make sense for clients who actually saw the treatment.

:::tip
To find the right BigQuery table and column names for your `from_expression`, see [Finding Telemetry in BigQuery](/data-analysis/data-topics/telemetry-discovery).
:::

## Example 4: Segments

Segments let you break down results by subpopulations (e.g., new vs. existing users, specific countries).

```toml
[experiment]
enrollment_period = 14
segments = ["new_users", "existing_users"]

[segments.new_users]
friendly_name = "New Users"
select_expression = "COALESCE(days_since_first_seen < 7, FALSE)"
data_source = "clients_daily"

[segments.new_users.data_source]
from_expression = """(
  SELECT
    client_id,
    submission_date,
    DATE_DIFF(submission_date, first_seen_date, DAY) AS days_since_first_seen
  FROM `mozdata.firefox_desktop.baseline_clients_daily`
)"""
```

Add the segment names to `[experiment] segments = [...]`. Jetstream computes all metrics for each segment in addition to the `all` segment.

:::info
Segments are evaluated once per client at enrollment time. A client is assigned to a segment based on data from the enrollment period, not from the analysis window.
:::

## Example 5: Custom Exposure Signal

By default, Jetstream uses the Nimbus `exposure` event as the exposure signal. If your experiment has a different exposure mechanism (e.g., the user must visit a specific page), define a custom exposure signal.

```toml
[experiment]
enrollment_period = 14
end_date = "2025-07-01"

[experiment.exposure_signal]
name = "visited_target_page"
friendly_name = "Visited the target page"
description = "Clients who visited the page where the treatment is shown"
data_source = "page_visits"
select_expression = "COALESCE(visited, FALSE)"
window_start = 0
window_end = "analysis_window_end"

[data_sources.page_visits]
from_expression = """(
  SELECT
    client_id,
    CAST(submission_timestamp AS DATE) AS submission_date,
    TRUE AS visited
  FROM `mozdata.firefox_desktop.events_stream`
  WHERE event_category = 'my_feature'
    AND event_name = 'page_view'
)"""
experiments_column_type = "none"
```

**`window_start` and `window_end`** control when exposure is checked relative to the analysis window. Setting `window_start = 0` and `window_end = "analysis_window_end"` means exposure is checked from enrollment through the end of each analysis window.

:::caution
Custom exposure signals change which clients are included in the `exposures` analysis basis. Only use this when the default Nimbus exposure event doesn't represent actual exposure to the treatment. Most experiments don't need a custom exposure signal.
:::

## Checklist Before Submitting

Before opening your pull request to metric-hub:

1. **Filename matches slug** — `my-experiment-slug.toml` matches the experiment's slug in Experimenter
2. **CI passes** — The metric-hub CI validates TOML syntax and checks that referenced data sources exist
3. **Data source SQL is tested** — Run your `from_expression` query in BigQuery to verify it returns data with the expected columns
4. **Statistics match metric type** — Use `binomial` for binary metrics (TRUE/FALSE), `bootstrap_mean` for continuous metrics
5. **Preview results** — Use `jetstream preview` to run the analysis on a small date range and check that results look reasonable. See [Testing](./testing) for details.
