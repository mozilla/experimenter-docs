---
id: experiment-sizing
title: Sizing Experiments Using Mozanalysis
slug: /experiment-sizing
---

This page gives an overview of how Mozanalysis can be used to do experiment sizing. **[Mozanalysis]** is a library used to standardize experiment analysis at Mozilla. Mozanalysis contains the statistical tools used by [Jetstream] to produce results from experiments, as well as tools to pull historical data from BigQuery to calculated necessary sample sizes to carry out experiments.

## Experiment sizing paradigm

Experiment sizing in Mozanalysis retrieves historical data from BigQuery in a way that mimicks how experiment enrollment and analysis is conducted by [Jetstream]: an enrollment period is defined, during which clients that satisfy certain target conditions are recorded; following enrollment, metrics are calculated for those clients over a defined analysis period. Following collection of metrics, sample size calculation is performed that corresponds to the statistical tests to be used in analyzing the eventual experiment. 

<img src="/img/mozanalysis/mozanalysis-sizing.png" alt="Mozanalysis sizing workflow" className="img-lg"/>

### Enrollment and analysis

Similar to how experiments use an enrollment period to select clients for a study before collecting metrics for a period of time, Mozanalysis experiment sizing records all clients that satisfy the target conditions during an enrollment period, set by the user based on the analysis start date and the number of dates to enroll. Metrics are then recorded for a user-defined number of days for the analysis.

<img src="/img/mozanalysis/enrollment-period.png" alt="Analysis with an enrollment period" className="img-lg"/>

An alternative to using an enrollment period to select clients is to use continuous enrollment, where any client that satisfies the targeting criteria during the entire analysis period is enrolled; metrics are collected from each client's enrollment date to the end of the analysis period.

<img src="/img/mozanalysis/continuous-enrollment.png" alt="Analysis with continuous enrollment" className="img-lg"/>

### Time series of metrics

In some cases, experiments will require client-level time series data. Mozanalysis can split the analysis period into time series periods (either daily, weekly, or monthly).

<img src="/img/mozanalysis/time-series.png" alt="Time series metrics" className="img-lg"/>

The time series data returned will contain a row for each client for each time series period, so the number of rows in the time series results will be (number of periods) times larger than the results for a single analysis window. Mozanalysis offers a few options to retrieve this data:

1. Download the entire set directly: Mozanalysis will warn the user about the approximate size of the data set they will download.
2. Download the data in chunks: Analysis periods in the time series are keyed by start dates, and the data for each period can be downloaded separately using this key.
3. Calculate aggregated metrics in BQ before downloading: A BQ aggregate function can be used to calculate within-analysis-period statistics before downloading; this will drastically reduce the size of the data, to (number of periods) rows, and is recommended whenever possible.

## Targets and metrics

Selecting clients for analysis is accomplished by using the [`Segment`](https://github.com/mozilla/mozanalysis/tree/main/src/mozanalysis/segments) objects in Mozanalysis; users can either reuse segments that currently exists in Mozanalysis or by defining one at runtime. Segments consist of a data source, either a table or view in BigQuery, and a SELECT expression to filter that data source; this SELECT expression must include a SQL aggregate function. 

Similarly, Mozanalysis experiment sizing reuses `Metric` objects from [Jetstream](jetstream/metrics.md), and users can reuse metrics that are currently implemented in [Mozanalysis](https://github.com/mozilla/mozanalysis/tree/main/src/mozanalysis/metrics) or [jetstream-config], or users can define their own at runtime.

Metrics and target segments are passed to Mozanalysis experiment sizing as lists of `Segment` or `Metric` objects; users may include multiple of each in the analysis. When multiple `Segment` objects are used, Mozanalysis identifies clients that satisfy the conditions of **all** targets in the list. If users would like to run analyses where `Segment`s should be joined with OR rather than AND, multiple experiment sizing tasks should be completed, for each condition in the OR statement, and aggregate the returned results from each separate study.

## Implemented sample size calculators

Mozanalysis contains functions that take the results from pulling historical data and the list of metrics contained in the results and produce sample size estimates for each metric, given the desired power, significance level, and relative effect size expected from the change, a percent change in a statistic of the metric. The following tests have sample size calculators implemented:

* Z or T test for difference in means for independent samples
* Z test for difference in proportions for independent samples
* Test for difference of Poisson rates
* Empirical effect size Wilcoxen-Mann-Whitney U test, based on an effect size calculated as the 90th percentile of week-to-week changes in the metric


## Example Colab notebooks

1. Example with explanations for setting up sizing for a simple experiment [(link)](https://colab.research.google.com/drive/1VQDrnVWvR_r-oKD8vD3hwNcZWx8Txg1N?usp=sharing)
2. Replicating the sizing for the MR holdback [(link)](https://colab.research.google.com/drive/1r14UMw_lEjtiyc0VVEvQuhadrDLzIyzn?usp=sharing)
3. Sizing a mobile experiment [(link)](https://colab.research.google.com/drive/1wUdfqCoB-mN7Gk1b6_zkAd2KWu8dp8V_?usp=sharing)
4. Replicating sizing for Waldo, which uses continuous enrollment [(link)](https://colab.research.google.com/drive/1_R4zBUnucRPmHwIVLlPTYInDZwTbCn-F?usp=sharing)
5. Pulling time series historical data and sizing with empirical sample size calculation [(link)](https://colab.research.google.com/drive/1-XT2DMfGSqiCS18yGPIGCs_YWg75qZzn?usp=sharing)

[Jetstream]: jetstream/jetstream.md
[jetstream-config]: https://github.com/mozilla/jetstream-config
[mozanalysis]: https://github.com/mozilla/mozanalysis