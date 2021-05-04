---
id: jetstream
title: Jetstream overview
---

**[Jetstream]** is an analysis framework for experiments.
Jetstream aggregates and summarizes product telemetry,
using the experiment definitions in Experimenter,
to produce the datasets that drive the results dashboards.

Most investigation owners will not interact with Jetstream directly.
Jetstream computes a default set of statistics for every experiment.
Investigation owners can add additional [metrics] to a results dashboard by choosing
[outcome]s in Experimenter while designing an experiment.

Data scientists can extend Jetstream with new outcomes by contributing
[outcome] definitions
to the [jetstream-config] repository.

Data scientists can also ask Jetstream to evaluate custom metrics for a particular experiment
by contributing [experiment configurations]
to jetstream-config.

Jetstream is not a monitoring platform,
which means that Jetstream does not emit real-time results.
The first interesting results will usually be available
a week after the enrollment period ends.
Typically, that means results will begin to appear 
two weeks after the day the experiment launches.

## Analysis paradigm

Experiments are analyzed using the concept of analysis windows. Analysis
windows describe an interval marked from each client’s day of
enrollment. The “day 0” analysis window aggregates data from the days
that each client enrolled in the experiment. Because the intervals are
demarcated from enrollment, they are not calendar dates; for some
clients in an experiment, day 0 could be a Tuesday, and for others a
Saturday.

The week 0 analysis window aggregates data from each client’s days 0
through 6, the week 1 window aggregates data from days 7 through 13, and
so on.

Clients are given a fixed amount of time, specified in Experimenter and
often a week long, to enroll. Final day 0 results are available for
reporting at the end of the enrollment period, after the last eligible
client has enrolled, and week 0 results are available a week after the
enrollment period closes. Results for each window are published as soon
as complete data is available for all enrolled clients.

The "overall" window, published after the experiment has ended, is a
window beginning on each client’s day 0 that spans the longest period
for which all clients have complete data.

### Analysis steps

When analyzing experiments, the following steps are executed for each experiment:

![Experiment analyis steps](https://github.com/mozilla/experimenter-docs/blob/main/static/img/jetstream/analysis-steps.png)

A [default configuration](https://github.com/mozilla/jetstream/tree/main/jetstream/config)
which depends on the experiment type and, if defined, a custom configuration
provided via the [jetstream-config] repository are parsed and used for analysis.
The experiment definition and config parameters are used to run some checks
to determine if the experiment can be analyzed. These checks include, for example,
validating start dates, end dates and enrollment periods.

If the experiment is valid, then metrics are calculated for each analysis period
(daily, weekly, 28 days, overall) and written to BigQuery. Metrics are either
specified or a reference to existing metrics defined in [mozanalysis](https://github.com/mozilla/mozanalysis)
is provided in the configuration files. Next, for each segment, first
[pre-treatments](https://github.com/mozilla/jetstream/blob/main/jetstream/pre_treatment.py)
are applied to the metrics data which is then used to calculate
[statistics](https://github.com/mozilla/jetstream/blob/main/jetstream/statistics.py).
Statistics data is written to BigQuery and later exported to GCS as JSON. 

## Datasets

The datasets that back the Experimenter results dashboards
are available in BigQuery.
[Technical documentation][jetstream-dtmo]
is available in the Mozilla data docs.

[experiment configurations]: configuration.md
[jetstream]: https://github.com/mozilla/jetstream
[jetstream-config]: https://github.com/mozilla/jetstream-config
[jetstream-dtmo]: https://docs.telemetry.mozilla.org/datasets/jetstream.html
[metrics]: metrics.md
[outcome]: outcomes.md
