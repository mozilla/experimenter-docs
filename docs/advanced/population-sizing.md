---
id: population-sizing
title: Population Sizing
slug: /advanced/population-sizing
sidebar_position: 3
---

Population sizing can be estimated using targeting context metrics available for Firefox on Desktop, iOS, and Android. Fields needed to translate Advanced Targeting expressions may not be fully available for all platforms.

:::info context
This page covers how to estimate the number of clients that match a particular targeting expression, not how to decide how many enrolled clients an experiment might need.
:::

### Accuracy

Population sizing accuracy of the queries below was investigated in [EXP-6101](https://mozilla-hub.atlassian.net/browse/EXP-6101), and the `(estimated population from preceding week)/(observed population)` ratios were in the following ranges for recent experiments run on Firefox versions that had been out for at least one week:

* Desktop: 0.9-1.3, average 1.163
* Android: 1.02-1.21, average 1.136
* iOS: 1.35-1.53, average 1.448

This means that Desktop estimates were up to +30% larger than observed enrollments, Android estimates were up to 21% larger than observed enrollments, iOS estimates were up to 53% larger than observed enrollments, so estimates may need to be adjusted accordingly to ensure sufficient minimum populations.

### Estimating for Desktop

The following query can be used to estimate available population for Firefox Desktop, if not using Redash then `{{ sql_targeting_expression }}` should be replaced with the actual sql expression:

[Desktop Redash Query](https://sql.telemetry.mozilla.org/queries/112917?p_sql_targeting_expression=TRUE)
```sql
SELECT
  COUNT(DISTINCT metrics.uuid.legacy_telemetry_profile_group_id) AS available_weekly_population,
FROM
  `mozdata.firefox_desktop.nimbus_targeting_context`
WHERE
  DATE(submission_timestamp) BETWEEN CURRENT_DATE - 7 AND CURRENT_DATE - 1
  AND ({{ sql_targeting_expression }})
```

This is available as a templated query in Redash: https://sql.telemetry.mozilla.org/queries/112917?p_sql_targeting_expression=TRUE

#### Translating Desktop Targeting Expressions from JEXL to SQL

To determine the SQL targeting expression for a given experiment, first get the full targeting expression from the Audience section, which is in JEXL format. A simple targeting expression might look like this:

```
(browserSettings.update.channel in ["release"]) && (version|versionCompare('140.!') >= 0) && (locale in ['en-CA', 'en-GB', 'en-US']) && (region == 'US')
```

Translating one condition at a time:
* `browserSettings.update.channel` is available as `normalized_channel`, so `browserSettings.update.channel in ["release"]` could be translated as `normalized_channel = "release"`
* When comparing only the major version, it's available as `metrics.quantity.nimbus_targeting_context_firefox_version`, so `(version|versionCompare('140.!') >= 0)` could be translated as `metrics.quantity.nimbus_targeting_context_firefox_version >= 140`
   * The full version is available as `metrics.string.nimbus_targeting_context_version`, so it could alternatively be translated as `mozfun.norm.extract_version(metrics.string.nimbus_targeting_context_version, "major") >= 140`
*  `locale` is available as `metrics.string.nimbus_targeting_context_locale`, and `[]` should be converted to `()` for BigQuery SQL `IN` expressions, so `locale in ['en-CA', 'en-GB', 'en-US']` could be translated as `metrics.string.nimbus_targeting_context_locale IN ('en-CA', 'en-GB', 'en-US')`
* region is available as `metrics.string.nimbus_targeting_context_region`, and SQL uses a single `=` for equality comparison, so `region == 'US'` could be translated as `metrics.string.nimbus_targeting_context_region = 'US'`
* `==`, `&&`, `||`, and `!` translate to `=`, `AND`, `OR`, and `NOT` respectively

So the SQL version of the targeting expression for Desktop could be:

```sql
(normalized_channel = "release")
AND (metrics.quantity.nimbus_targeting_context_firefox_version >= 140)
AND (metrics.string.nimbus_targeting_context_locale IN ('en-CA', 'en-GB', 'en-US'))
AND (metrics.string.nimbus_targeting_context_region = 'US')
```

:::warning
`NOT` has a different operator precedence in BigQuery than `!` in JEXL, so `NOT` should always be used inside a `()` with a single expression for clarity. For example `!isMac && isFxAEnabled` must be translated as `(NOT BOOL(metrics.object.nimbus_targeting_context_os.isMac)) AND metrics.boolean.nimbus_targeting_context_is_fx_a_enabled`
:::

The Glean dictionary can be searched for [available fields in Firefox Desktop](https://dictionary.telemetry.mozilla.org/apps/firefox_desktop?page=1&search=nimbus_targeting)

### Estimating for Firefox on Android and iOS

The following queries can be used to estimate available population for release channel experiments on Android and iOS, if not using Redash then `{{ sql_targeting_expression }}` should be replaced with the actual sql expression:

For Android release channel:

[Android Redash Query](https://sql.telemetry.mozilla.org/queries/112918?p_sql_targeting_expression=TRUE)
```sql
SELECT
  COUNT(DISTINCT client_info.client_id) AS available_weekly_population,
FROM
  `mozdata.fenix.nimbus`
WHERE
  DATE(submission_timestamp) BETWEEN CURRENT_DATE - 7 AND CURRENT_DATE - 1
  AND ({{ sql_targeting_expression }})
```

For iOS release the table is `mozdata.firefox_ios.nimbus`:

[iOS Redash Query](https://sql.telemetry.mozilla.org/queries/112919?p_sql_targeting_expression=TRUE)
```sql
SELECT
  COUNT(DISTINCT client_info.client_id) AS available_weekly_population,
FROM
  `mozdata.firefox_ios.nimbus`
WHERE
  DATE(submission_timestamp) BETWEEN CURRENT_DATE - 7 AND CURRENT_DATE - 1
  AND ({{ sql_targeting_expression }})
```

#### Translating Android and iOS Targeting Expressions from JEXL to SQL

To determine the SQL targeting expression for a given experiment, first get the full targeting expression from the Audience section, which is in JEXL format. A simple targeting expression might look like this:

```
((is_already_enrolled) || ((isFirstRun == 'true') && (app_version|versionCompare('146.!') >= 0)))
```

Firefox for Android and iOS have the targeting context available through the JSON field `metrics.object.nimbus_system_recorded_nimbus_context`, and can be converted into SQL types using [BigQuery JSON functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/json_functions), especially the converters `BOOL`, `FLOAT64`, `INT64`, and `STRING`, the `LAZY_` prefixed lax converts, and `JSON_QUERY_ARRAY` and `JSON_VALUE_ARRAY` which return `ARRAY<JSON>` and `ARRAY<STRING>` respectively.

:::info context
As of Firefox for Android 146 and Firefox for iOS 145 object keys are `snake_case`, but before that they were `camelCase` due to [Bug 1931891](https://bugzilla.mozilla.org/show_bug.cgi?id=1931891).
:::

Translating one condition at a time:
* `is_already_enrolled` should be omitted
* `isFirstRun` could be translated as `BOOL(metrics.object.nimbus_system_recorded_nimbus_context.is_first_run)`
* `app_version|versionCompare('146.!') >= 0` could be translated as `mozfun.norm.extract_version(STRING(metrics.object.nimbus_system_recorded_nimbus_context.appVersion), "major") >= 146`

So the SQL version of the targeting expression could be:

```SQL
BOOL(metrics.object.nimbus_system_recorded_nimbus_context.is_first_run)
AND mozfun.norm.extract_version(STRING(metrics.object.nimbus_system_recorded_nimbus_context.app_version), "major") >= 146
```

:::warning
`NOT` has a different operator precedence in BigQuery than `!` in JEXL, so `NOT` should always be used inside a `()` with a single expression for clarity. For example `!isMac && isFxAEnabled` must be translated as `(NOT BOOL(metrics.object.nimbus_targeting_context_os.isMac)) AND metrics.boolean.nimbus_targeting_context_is_fx_a_enabled`
:::

The Glean dictionary contains additional info about the `nimbus_system.recorded_nimbus_context` metric [in Firefox for Android](https://dictionary.telemetry.mozilla.org/apps/fenix/metrics/nimbus_system_recorded_nimbus_context) and [in Firefox for iOS](https://dictionary.telemetry.mozilla.org/apps/firefox_ios/metrics/nimbus_system_recorded_nimbus_context). The Source link on those pages leads to the metric definition in `metrics.yaml`, which includes a JSONSchema definition of available object keys and types.
