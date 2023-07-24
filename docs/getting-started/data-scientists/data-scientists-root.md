---
id: experiment-sizing
title: Sizing Experiments Using Mozanalysis
slug: /experiment-sizing
---

This page is about using Mozanalysis for experiment sizing. **Mozanalysis** is a toolkit that Mozilla uses to ensure the consistency of experiment results. This toolkit includes features that fetch historical data from BigQuery. The data helps to determine how many subjects we need for a particular experiment to ensure the results are reliable. The results of this process include the sample size and the percentage of the total target population required for each branch of an experiment. The experiment should have a balanced design to achieve a specific power.

## How We Size Experiments

When sizing experiments, Mozanalysis uses historical data from BigQuery. The process is similar to how an experiment's enrollment and analysis would occur through **Jetstream**: an enrollment period is defined, during which we note the clients that meet certain conditions. We then collect and calculate metrics for these clients over a specified analysis period. After we've collected the metrics, we calculate the required sample size that corresponds to the statistical tests we'll be using when we analyze the experiment later.

### Enrollment and Analysis Process

Just as experiments have an enrollment period before collecting metrics, Mozanalysis also records all clients that meet the target conditions during a user-defined enrollment period. This period is set based on the analysis start date and the number of dates to enroll. We then record metrics for a user-defined number of days for the analysis.

An alternative approach is continuous enrollment. In this approach, any client that meets the targeting conditions throughout the entire analysis period is enrolled. We collect metrics from each client from the date of their enrollment until the end of the analysis period.

### Collecting Metrics Over Time

Sometimes, experiments need data that shows how things change over time at the client level. Mozanalysis can divide the analysis period into time series periods (daily, weekly, or monthly). This data will have a row for each client for each time series period, making the number of rows in the time series results (number of periods) times larger than the results for a single analysis window.

## Choosing Targets and Metrics

We use the `Segment` objects in Mozanalysis to select clients for analysis. Users can either reuse existing segments in Mozanalysis or define one at runtime. Segments include a data source, either a table or view in BigQuery, and a SELECT expression to filter that data source. This SELECT expression must include a SQL aggregate function.

Just as with targets, Mozanalysis experiment sizing reuses `Metric` objects from **Jetstream**, and users can either reuse metrics that are currently used in **Mozanalysis** or in **Jetstream configs**, or they can define their own at runtime.

Metrics and target segments are given to Mozanalysis experiment sizing as lists of `Segment` or `Metric` objects. Users can include multiple of each in the analysis. When multiple `Segment` objects are used, Mozanalysis identifies clients that meet the conditions of **all** targets in the list. If users want to run analyses where `Segment`s are joined with OR rather than AND, they should complete multiple experiment sizing tasks for each condition in the OR statement. They then aggregate the results from each separate study.

## Sample Size Calculators

Mozanalysis includes functions that take the results from pulling historical data and the list of metrics from the results and produce sample size estimates for each metric. The estimations are based on the desired power, significance level, and expected relative effect size—a percent change in a metric's statistic. The tests in Mozanalysis provide the necessary sample size per branch of the experiment, assuming the experiment has two branches with an equal number of clients.

The following tests have sample size calculators implemented:

* Z or T test for difference in means for independent samples
* Z test for difference in proportions for independent samples
* Test for difference of Poisson rates
* Empirical effect size Wilcoxen-Mann-Whitney U test, based on an effect size calculated as the 90th percentile of week-to-week changes in the metric

## Example Notebooks

1. [Example with explanations for setting up sizing for a simple experiment](https://colab.research.google.com/drive/1VQDrnVWvR_r-oKD8vD3hwNcZWx8Txg1N?usp=sharing)
2. [Replicating the sizing for the MR holdback](https://colab.research.google.com/drive/1r14UMw_lEjtiyc0VVEvQuhadrDLzIyzn?usp=sharing)
3. [Sizing a mobile experiment](https://colab.research.google.com/drive/1wUdfqCoB-mN7Gk1b6_zkAd2KWu8dp8V_?usp=sharing)
4. [Replicating sizing for Waldo, which uses continuous enrollment](https://colab.research.google.com/drive/1_R4zBUnucRPmHwIVLlPTYInDZwTbCn-F?usp=sharing)
5. [Pulling time series historical data and sizing with empirical sample size calculation](https://colab.research.google.com/drive/1-XT2DMfGSqiCS18yGPIGCs_YWg75qZzn?usp=sharing)

[Jetstream]: jetstream/jetstream.md
[mozanalysis]: https://github.com/mozilla/mozanalysis
