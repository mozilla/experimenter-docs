---
id: statistics
title: Statistics
slug: statistics
sidebar_position: 3
---

Statistics reduce observations of many clients
from a single analysis window
to one or many rows
describing the population.

Any summarization of the client-level data can be implemented as a statistic.

For example, a statistic could implement a statistical test,
like a Mann-Whitney U test or a Student's _t_-test.

Other statistics summarize the data from a branch
to a kernel density estimate
or a cumulative distribution function
that can be directly plotted.

Statistics can summarize each branch of the data,
compute pairwise comparisons of each branch to a reference branch,
or both.

For example, the `bootstrap_mean` statistic computes
a mean and its bootstrapped 95% confidence interval for each branch,
as well as bootstrapped CIs for the difference between each branch
and the reference branch.

## Pretreatments

Sometimes it's necessary to transform a metric before applying a statistic.
Pretreatments are a facility for specifying these transformations.

It is an error to pass a null value into a statistic.
Data scientists must explicitly handle nulls,
either by writing a metric with a `COALESCE()` clause,
coercing nulls to zero with the `zero_fill` pretreatment,
or dropping rows with null values using the `remove_nulls` pretreatment.

:::caution Don't drop that mic

Dropping null values for engagement metrics can create misleading results.
Imagine an experiment that forces all but your most committed users to churn:
if you dropped all the clients that didn't return in the second week,
your engagement metrics would skyrocket, since only the die-hards would be left!
Coercing those nulls to zero instead
will accurately reflect the decline in your population's engagement.

Dropping nulls can be necessary for performance metrics,
where there's no sensible way to aggregate users that didn't return.

:::

## Available pretreatments

Supported pretreatments are listed below. Some pretreatments accept parameters, which are listed below the name of the pretreatment.

* `remove_nulls`: Remove rows with null values in the metric column
* `remove_indefinites`: Remove rows with null or infinite values in the metric column
* `censor_highest_values`: Removes the highest _fraction_ of rows in the metric column.
  * `fraction`: Fraction of rows to remove. Defaults to 1 - 1e-5.
* `log`: Log-transforms the metric column.
  * `base`: Base of the logarithm. Defaults to 10.0.
* `zero_fill`: Replace null values in the metric column with zero.

## Available statistics

**Statistics** that Jetstream knows about are listed below. Some statistics accept parameters, which are listed below the name of the statistic.

* `binomial`: Binomial outcome with bootstrapped CIs for differences between branches
* `bootstrap_mean`: Mean with bootstrapped confidence intervals. Removes the top 0.5% of values by default.
  * `num_samples`: Number of bootstrap samples to compute. Defaults to 10,000.
  * `drop_highest`: Fraction of highest samples to drop. Defaults to 0.005.
* `count`: A count of rows
* `deciles`: Bootstrapped confidence intervals for differences between branches at deciles
  * `num_samples`: Number of bootstrap samples to compute. Defaults to 10,000.
* `empirical_cdf`: A sampled eCDF of each branch's distribution for a metric. Parameters are:
  * `log_space`: Whether the CDF should be sampled at geometric (instead of linear) intervals (default: false)
  * `grid_size`: Number of samples (default: 256)
* `kernel_density_estimate`: A sampled KDE of each branch's distribution for a metric. Parameters are:
  * `bandwidth`, `adjust`, `kernel`: see https://www.statsmodels.org/stable/generated/statsmodels.nonparametric.kde.KDEUnivariate.fit.html
  * `gridsize`: Number of samples (default: 256)
  * `log_space`: Whether the KDE should be sampled at geometric (instead of linear) intervals (default: false)

## How do I implement a statistic?

Statistics are defined in code at https://github.com/mozilla/jetstream/blob/main/jetstream/statistics.py.

Statistics should inherit from
and implement the interface described by
the abstract `Statistic` base class.

Most statistics only need to implement the `transform` method,
which accepts a `DataFrame` representing a single analysis window,
a metric label describing the name of the column to analyze, and
a branch label representing a reference branch,
and returns a `StatisticResultCollection`.

A `StatisticResultCollection` is a wrapper around a `StatisticResult`.
The meaning of the values on a StatisticResult is elaborated in the
[statistics table schema documentation](https://docs.telemetry.mozilla.org/datasets/jetstream.html#statistics-tables).
