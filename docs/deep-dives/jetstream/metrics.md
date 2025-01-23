---
id: metrics
title: Metrics
sidebar_position: 2
slug: metrics
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

[Pre-defined Metrics, AKA Outcomes](https://experimenter.info/deep-dives/jetstream/outcomes) are collections of metrics that relate to each other.  You can associate these pre-defined metrics (outcomes) with your experiment in the Experiment Console - Metrics section.
Data scientists can extend and define outcomes in the outcomes path of the
[`metric-hub`](https://github.com/mozilla/metric-hub/tree/main/jetstream/outcomes) repository.  See what [Outcomes are available](https://mozilla.github.io/metric-hub/outcomes/fenix/default-browser/).

If the metrics you need are not covered by Default (guardrail) or existing Pre-defined Outcomes - you can add a metric to your experiment by working with a data scientist to write a [custom configuration](https://experimenter.info/system-architecture#custom-configuration-aka-jetstream-configuration-files) for your experiment.




