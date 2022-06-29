---
id: metrics
title: Metrics
---

A *metric* describes an aggregation of user activity,
reflected in product telemetry or another data source,
to a scalar value per user.

For example, "sum of a user's active hours" is a metric.
So is "a user's average page load time."

Metrics are applied over a window of time,
called an analysis window.
The [Jetstream overview](jetstream.md) has more details about analysis windows.

:::note What's in a name?

[Glean](https://mozilla.github.io/glean/book/index.html)
also has a concept called
[metrics](https://mozilla.github.io/glean/book/appendix/glossary.html#metric);
ours are different.

Jetstream metrics represent aggregations of the recorded values of Glean metrics.

:::

[Statistics](statistics.md) summarize the distribution of metrics
within and between branches of an experiment.

## How do I add a metric to my experiment?

A small set of critical guardrail metrics (called Core Firefox Metrics in Nimbus Console)
specific to each platform is run by default for each experiment.
These are defined for each platform in the Jetstream-config repository in [jetstream-config/defaults/](https://github.com/mozilla/jetstream-config/blob/main/defaults/)

[Outcomes](outcomes.md) are collections of metrics that relate to each other.  You can associate an Outcome with your experiment in the Experiment Console - Metrics section.
Data scientists can extend and define outcomes in the outcomes path of the
[`jetstream-config`](https://github.com/mozilla/jetstream-config/tree/main/outcomes) repository.  See what [Outcomes are available](https://mozilla.github.io/jetstream-config/outcomes/firefox_desktop/firefox_suggest/).

If the metrics you need are not covered by Guardrail/Core metrics or existing Outcomes - you can add a metric to your experiment by having a data scientist write a[custom configuration](configuration.md) for your experiment. 




