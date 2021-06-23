---
id: configuration
title: Configuring Jetstream
---

## About configurations

There are two ways to customize the results that appear in Experimenter and [partybal] for an experiment.

You can either reference an [outcome] while creating the experiment in the console,
or commit a custom configuration to the [jetstream-config] repository.

Outcome definitions are also created in jetstream-config and use the same configuration language.

Custom experiment configurations are associated with an experiment by their filename,
which should match the experiment slug, like `my-experiment-slug.toml`.
This works for both Normandy and Nimbus slugs.

[partybal]: https://protosaur.dev/partybal/
[outcome]: jetstream/outcomes.md
[jetstream-config]: https://github.com/mozilla/jetstream-config

## Landing configurations

To add or update a custom configuration, open a pull request against [jetstream-config].
CI checks will validate the columns, data sources, and SQL syntax.
Once CI completes, you may merge the pull request, which will trigger Jetstream to re-run your analysis.
No additional review is necessary to land configurations.

Note that rerunning experiments may be costly!
Don't let this stop you from doing your job,
but try to avoid too much iteration on large and long-running experiments.

## Configuration file syntax

Custom configs for [experiments](#custom-experiment-configurations) and [outcome snippets](#outcome-snippets)
analyzed in [jetstream](https://github.com/mozilla/jetstream) use the same configuration language.

Custom configuration files are written in [TOML](https://toml.io/en/).

### Custom experiment configurations

Configuration files have four main sections:
[`[experiment]`](#experiment-section), [`[metrics]`](#metrics-section), [`[data_sources]`](#defining-data-sources),
and [`[segments]`](#defining-segments).

Examples of every value you can specify in each section are given below.
You do not need to, and should not, specify everything!
Jetstream will take values from Experimenter
and combine them with a reasonable set of defaults.

Lines starting with a `#` are comments and have no effect.

### Experiment section

This part of the configuration file lets you specify the segments you wish to analyze.
Segments are subsets of your enrolled population,
and depend on some factor that could be observed about the client
before they enrolled in the experiment.

Some segments [are described in DTMO](https://docs.telemetry.mozilla.org/concepts/segments.html),
and there are lists of predefined segments in the
[mozanalysis documentation](https://mozilla.github.io/mozanalysis/api/segments/desktop.html).

You can also override some values from Experimenter in the experiment section.

```toml
[experiment]
# The segments that you wish to compute metrics for.
# You can define your own later in the configuration,
# or (more commonly) use a value from mozanalysis.
# The segment of all users is always computed.
segments = ["is_regular_user_v3", "new_or_resurrected_v3"]

# Nominal length of the enrollment period in days.
# Mozanalysis will consider enrollment_period + 1 "dates" of enrollments.
enrollment_period = 7

# The name of the control branch.
# To compare all branches to each other pairwise, use the value `nan`.
reference_branch = "control"

# Override the "enrollment query" mozanalysis will use.
# See https://github.com/mozilla/mozanalysis/issues/93 for more details about
# what the query needs to contain.
# Jetstream interprets this as a Jinja2 template; an `experiment` object is provided
# that lets you access other details from Experimenter, like a slug.
enrollment_query = """
  SELECT
      client_id,
      branch,
      enrollment_date,
      num_enrollments
  FROM mozdata.some_table.name_here
  WHERE
      DATE(submission_timestamp) BETWEEN "{{experiment.start_date_str}}" AND "{{experiment.last_enrollment_date_str}}"
      AND mozfun.map.get_key(environment.experiments, "{{experiment.slug}}") IS NOT NULL
"""

# You can override either or both of the start_date and end_date.
# In conjunction with a custom enrollment query, this can be useful for holdbacks,
# since you don't really care about the period of time before your client upgrades
# to the new version.
start_date = "2020-01-01"
end_date = "2020-12-31"

# If you need Jetstream to decline to run analysis for an experiment,
# you can set this to true.
skip = false
```

### Metrics section

The metrics section allows you to specify and define the metrics that you're collecting,
the statistical summaries that you'd like applied to them, and any filters that you need.
See the [Jetstream docmentation at DTMO][jetstream-dtmo] for more details on the analysis window concept.

You can use the names of metrics defined in mozanalysis without redefining them.
See the [mozanalysis metrics documentation](https://mozilla.github.io/mozanalysis/api/metrics/desktop.html)
for your platform for the set of defined metrics.

```toml
[metrics]
# Metrics to compute for each daily analysis window.
# Defined as a list of strings. The string should be the "slug" of the metric,
# which is the name of the Metric object defined in mozanalysis, or the name
# of the metric definition section in this config file (see below).
daily = []

# Metrics to compute for each weekly analysis window.
weekly = ["uri_count", "retained"]

# Metrics to compute for each 28 days long analysis window
28_day = ["uri_count"]

# Metrics to compute only for the overall analysis window.
overall = ["uri_count", "search_count"]
```

[jetstream-dtmo]: https://docs.telemetry.mozilla.org/datasets/jetstream.html

### Defining metrics

You can define a new metric by adding a new section with a name like

`[metrics.<new_metric_slug>]`

For example, you could define a new metric based on a scalar named
`browser.engagement.cows_clicked` this way:

```toml
[metrics.ever_clicked_cows]
# A clause of a SELECT expression. The expression must contain an aggregation function.
# The expression is evaluated with `GROUP BY client_id, branch` over an analysis window.
# Interpreted as a Jinja2 template. The mozanalysis helper functions are available,
# so you could equivalently write the expression below like:
# select_expression = "{{agg_sum("payload.processes.parent.scalars.browser_engagment_cows_clicked")}} > 0"
# See https://mozilla.github.io/mozanalysis/api/metrics.html for details.
select_expression = "SUM(COALESCE(payload.processes.parent.scalars.browser_engagement_cows_clicked)) > 0"

# The data source to use. You can use the slug of a data source defined in mozanalysis,
# or else define a new data source below.
data_source = "main"

# Whether larger values of this metric are subjectively "better" or not.
# This defaults to true so you don't need to specify it for engagement-type metrics
# where we're trying to encourage more of something. But for performance metrics,
# bigger is often worse, so you should set this to false.
bigger_is_better = true

# A friendly metric name displayed in dashboards.
friendly_name = "Cows clicked"

# A description that will be displayed by dashboards.
description = "Number of cows clicked"
```

You should also add some sections to describe how your new metrics should be summarized for reporting.
You can do this by adding a statistics section to the metric for the statistic you want.

See [Statistics](jetstream/statistics.md) for a list of supported statistics and details about implementing your own.

This looks like:

```toml
[metrics.ever_clicked_cows.statistics.binomial]
# Sometimes it's useful to specify a "pre-treatment" to drop extreme values
# or perform a transformation. There is a list of these in the Jetstream wiki.
# They're specified like this:
# pre_treatments = [
#     {name = "drop_nulls"},   # ⚠️ Use this pretreatment judiciously!
#                              # It can cause misleading results in
#                              # the presence of churn. Engagement metrics
#                              # should be coalesced to zero instead,
#                              # or you should handle zeros explicitly.
#     {name = "log", base = 2},
# ]
# They don't make much sense for a binomial statistic, though.

# You can also change the default width of the confidence interval.
ci_width = 0.95
```


To put it all together, the metrics section (without any comments) for this probe could look like:

```toml
[metrics]
weekly = ["ever_clicked_cows"]

[metrics.ever_clicked_cows]
select_expression = "SUM(COALESCE(payload.processes.parent.scalars.browser_engagement_cows_clicked)) > 0"
data_source = "main"

[metrics.ever_clicked_cows.statistics.binomial]
```

### Defining data sources

Most of the regular data sources are already defined in mozanalysis,
but you can define a new one in a similar way to how new metrics are defined.

Add a section that looks like:

```toml
[data_sources.my_cool_data_source]
# FROM expression - often just a fully-qualified table name. Sometimes a subquery.
from_expression = "(SELECT client_id, experiments, submission_date FROM my_cool_table)"

# See https://mozilla.github.io/mozanalysis/api/metrics.html#mozanalysis.metrics.DataSource for details.
experiments_column_type = "native"
```

Then, your new metric can refer to it like `data_source = "my_cool_data_source"`.

### Defining segments

You can define new segments, just like you can define new metrics.

This looks like:

```toml
[segments.my_segment]
select_expression = '{{agg_any("is_default_browser")}}'
data_source = "my_data_source"

[segments.data_sources.my_data_source]
from_expression = '(SELECT submission_date, client_id, is_default_browser FROM my_cool_table)'
```

Learn more about defining a segment data source in the [mozanalysis documentation][moza-segment-ds].

[moza-segment-ds]: https://mozilla.github.io/mozanalysis/api/segments.html#mozanalysis.segments.SegmentDataSource


### Outcome snippets

Outcome snippets, which define a collection of summaries with a common theme (e.g. "performace", "Picture in Picture use"),
are stored in the `outcomes/` directory and file names serve as unique identifiers. Outcome snippets are organized in different
subdirectories that represent the application they are supporting, e.g. `fenix/` or `firefox_desktop/`.

Configuration files have a set of [`[metrics]` definitions](#defining-metrics) and [`[data_sources]`](#defining-data-sources).
A `friendly_name` and `description` are required at the top of the outcome snippet config file.

Unlike experiment configurations, the `[metrics]` section does not specify the analysis windows metrics
are computed for. Jetstream computes metrics defined in outcome snippets for weekly and overall
analysis windows.

Outcome snippets look, for example, like:

```toml
friendly_name = 'Example config'
description = 'Example outcome snippet'

[metrics.total_amazon_search_count]
select_expression = "SUM(CASE WHEN engine like 'amazon%' then sap else 0 end)"
data_source = "search_clients_engines_sources_daily"
[metrics.total_amazon_search_count.statistics.bootstrap_mean]
[metrics.total_amazon_search_count.statistics.deciles]

[metrics.urlbar_amazon_search_count]
select_expression = """
SUM(CASE
        WHEN source = 'alias' and engine like 'amazon%' then sap
        WHEN source = 'urlbar' and engine like 'amazon%' then sap
        WHEN source = 'urlbar-searchmode' and engine like 'amazon%' then sap
        else 0 end)"""
data_source = "search_clients_engines_sources_daily"
[metrics.urlbar_amazon_search_count.statistics.bootstrap_mean]
[metrics.urlbar_amazon_search_count.statistics.deciles]
```
