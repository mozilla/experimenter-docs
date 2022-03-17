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

You can add a metric to your experiment
by having a data scientist write a
[custom configuration](configuration.md)
for your experiment, or by associating
an Outcome with your experiment in the Experiment Console.

[Outcomes](outcomes.md) are collections of metrics
that relate to each other.
Data scientists can extend and define outcomes
in the outcomes path of the
[`jetstream-config`](https://github.com/mozilla/jetstream-config/tree/main/outcomes) repository.

A small set of guardrail metrics (called Core Firefox Metrics in Nimbus Console)
specific to each platform
is run by default for each experiment.
These are defined in the main Jetstream repository
in [jetstream/config/](https://github.com/mozilla/jetstream/tree/main/jetstream/config).
