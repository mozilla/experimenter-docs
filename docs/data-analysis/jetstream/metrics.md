---
id: metrics
title: Metrics
sidebar_position: 2
slug: /data-analysis/jetstream/metrics
---

A *metric* describes an aggregation of user activity,
reflected in product telemetry or another data source,
to a scalar value per user.

For example, "sum of a user's active hours" is a metric.
So is "a user's average page load time."

Metrics are applied over a window of time,
called an analysis window.
The [Jetstream overview](./overview) has more details about analysis windows.

:::tip What's in a name?

[Glean](https://mozilla.github.io/glean/book/index.html)
also has a concept called
[metrics](https://mozilla.github.io/glean/book/appendix/glossary.html#metric);
ours are different.

Jetstream metrics represent aggregations of the recorded values of Glean metrics.

:::

[Statistics](./statistics) summarize the distribution of metrics
within and between branches of an experiment.

## How do I add a metric to my experiment?

A small set of default, critical guardrail metrics that are specific to each platform are run by default for each experiment.  Sometimes also called Core metrics.
These are defined for each platform in the metric-hub repository in [jetstream/defaults/](https://github.com/mozilla/metric-hub/tree/main/jetstream/defaults/). Look at the file for your platform. At the top you will see the metrics collected and the timeframe they are available: daily, weekly, or overall (at the end of the experiment).  For help understanding any aspect of guardrail metrics on your platform - link to the file and ask in #ask-experimenter.

[Pre-defined Metrics, AKA Outcomes](https://experimenter.info/deep-dives/jetstream/outcomes) are collections of metrics that relate to each other.  You must associate these pre-defined metrics (outcomes) with your experiment BEFORE LAUNCH in the Experiment Console - Metrics section.
Data scientists can extend and defined outcomes in the outcomes path of the
[`metric-hub`](https://github.com/mozilla/metric-hub/tree/main/jetstream/outcomes) repository.  See what [Outcomes are available](https://mozilla.github.io/metric-hub/outcomes/fenix/default-browser/).

If the metrics you need are not covered by Default (guardrail) or existing Pre-defined Outcomes - you can add a custom metric to your experiment by working with a data scientist to write a [custom configuration](https://experimenter.info/system-architecture#custom-configuration-aka-jetstream-configuration-files) for your experiment.  You work with DS by signing up for [data science experiment office hours](https://docs.google.com/document/d/1dH-aG8IsYtq6881_Q_cyEtmxli0bK7nuVcUD-5D7q-s/edit?tab=t.0#heading=h.yguiolmttiw2).  

## What are the default guardrail metrics?
Open the [file for your platform](https://github.com/mozilla/metric-hub/tree/main/jetstream/defaults) to see the most recent list of what is included.  These don’t change often, but they can.  

The guardrail metrics for [Desktop](https://github.com/mozilla/metric-hub/blob/main/jetstream/defaults/firefox_desktop.toml) as of June 2025.

KPI
- "retained",
- "Days_of_use",
Engagement and KPI
- "active_hours", 
-  "Qualified_cumulative_days_of_use",
- "Client_level_daily_active_users_v2",
- "uri_count"
  
Search Related
-  "Ad_clicks",
-  "Organic_search_count",
-  "search_count",
-  "searches_with_ads",
-  "tagged_search_count",
-  "tagged_follow_on_search_count",
-  "Uri_count"

Leading indicators.  KPI's are hard to move, but these are known positive leading indicators that can impacted KPI metrics.
- "Is_default_browser",

The guardrail metrics for [Android](https://github.com/mozilla/metric-hub/blob/main/jetstream/defaults/fenix.toml) as of June 2025.

KPI metrics:
- "retained",
- "days_of_use",

Engagement with browser metrics:
- "Active_hours"
- "Total_uri_count",
- "Client_level_daily_active_users_v2",

Search related metrics:
- "Serp_ad_clicks", 
- "Organic_searches",
- "Search_count",
- "Searches_with_ads",
- "Tagged_follow_on_searches",


The guardrail metrics for [iOS](https://github.com/mozilla/metric-hub/blob/main/jetstream/defaults/firefox_ios.toml) as of June 2025.

KPI
- "Days_of_use",
-  "retained",

Engagement
- "Active_hours",
- "client_level_daily_active_users_v2",

Search Related
- "search_count",
- "serp_ad_clicks",






