---
id: for-data-scientists
title: For Data Scientists
slug: /getting-started/for-data-scientists
sidebar_position: 1
---

This page describes the roles data scientists play in experimentation at Mozilla.

Some other things you may be looking for are:

* Documentation about using [Jetstream](/data-analysis/jetstream/overview), Mozilla's experiment analysis tool
* Technical documentation about [datasets used in experimentation](https://docs.telemetry.mozilla.org/tools/experiments.html)
* [Process documentation](https://experimenter.info/getting-started/for-experiment-owners) for the Mozilla data science organization

## What Is the Role of Experimentation at Mozilla?

Experimentation informs product decision-making at Mozilla.
This suite of experimentation tools is designed for product managers and other investigation owners to A/B test hypotheses they have about new and existing products and features.
[Experimenter](https://experimenter.services.mozilla.com/nimbus/) (internal link) contains examples of completed and active experiments.

## Collaborating with Experiment Owners

Data scientists support experiment owners in setting up and interpreting their experiments.
[The Firefox experiment design process](https://experimenter.info/getting-started/for-experiment-owners) describes the process for both data scientists and stakeholders.

Experiment owners come to [Office Hours](https://docs.google.com/document/d/1dH-aG8IsYtq6881_Q_cyEtmxli0bK7nuVcUD-5D7q-s/edit#) to talk to data scientists to:

* validating that the experimental design will answer their questions
* consulting on telemetry specifications
* sample size recommendations based on the target audience + learning goals
* guidance about interpretation of results

If there is follow work needed outside of office hours, a Data Org Jira ticket is filed.  Example:
* writing [custom metrics](/data-analysis/jetstream/metrics) if needed

## Sampling Framework

Each experiment begins with an enrollment period with fixed start and end dates during which clients can enroll in the experiment. After the declared enrollment period ends, we modify the recipe to instruct clients to stop enrolling, and ignore clients that report enrollment anyway. Because enrollment depends on the client checking for software updates, samples will be skewed towards active users at the beginning of the enrollment period. We typically leave enrollment open for a week to account for weekly seasonality (e.g. weekday vs. weekend users) and to give clients who are active less often a chance to enroll. This makes our experiment population essentially a sample of the weekly active users (WAU).

For each client, experiment metrics are analyzed over a defined period of time from enrollment. We report results for an analysis period (e.g. the first day after enrollment) after all clients have had a chance to experience the treatment for that duration. The [Jetstream overview](/data-analysis/jetstream/overview#analysis-paradigm) describes the analysis paradigm in more depth and how it relates to the length of an experiment.

For more nuances about sampling, enrollment and exposure (whether or not the client actually saw the treatment or control), see [the experiment lifecycle overview](/technical-reference/client-sdk-lifecycle).

## Sample Size Recommendations

Sample size recommendations the fraction of the Firefox population that should be enrolled in your recipe.  This is determined by discussing your [experiment design document](https://docs.google.com/document/d/1_bWn_1y5x1zf6zl7Loj4O1qKnVdxzIMXOawIpf32CsM/edit?tab=t.0) at [Data science office hours](https://docs.google.com/document/d/1dH-aG8IsYtq6881_Q_cyEtmxli0bK7nuVcUD-5D7q-s/edit#).

The information in the [Experiment brief](https://docs.google.com/document/d/1_bWn_1y5x1zf6zl7Loj4O1qKnVdxzIMXOawIpf32CsM/edit) needs to provide the information needed for sizing.

### Filtering
Nimbus can filter on several factors, including:

- channel
- minimum version
- country
- locale
- OS
- client preference values (on desktop)
- other factors

This additional filtering always happens logically _after_ a client passes the sizing filter.
You must inflate your population fraction to account for filtering.

For a concrete example, imagine that Firefox WAU is 1,000 clients. 20% of WAU is from Canada. You wish to deploy an experiment to Canadian users. Your power analysis says that you need 50 clients in total to enroll. You should specify a population fraction of at least 25%, because 1,000 \* 0.2 (from Canada) \* 0.25 (your filter) = 50.

### Multiple Experiments on the Same Feature
If there are already Live experiments on the same feature as your experiment, you **sometimes** need to inflate the sample size to account for clients enrolled in the existing Live experiments that the Nimbus front-end is not aware of. Instructions below.

1. Find the most recent experiment that launched for your feature on your channel.
2. Go to the recipe JSON for that experiment. You'll see something like:
`
 "bucketConfig": {
    "count": 3478,
    "namespace": "firefox-desktop-urlbar-release-2",
    "randomizationUnit": "normandy_id",
    "start": 3678,
    "total": 10000
  },
`
3. The example JSON above shows that the most recent experiment used buckets 3678 to 7156 (= 3678 + 3478). If your new experiment needs less than 28.44% (= (10,000 - 7156)/100) of the clients, then you do not need to inflate the percentage to account for Nimbus being unaware of clients enrolled in previous experiments.
4. If your new experiment needs more than 28.44% of the clients, then you must inflate the percentage to account for 71.56% of the clients already being enrolled in experiments. For example, if your new experiment needs 30% of the clients, then you must input 41.92% (= 30% / 71.56%) into "Population %" in the Nimbus front-end.

### Non-Normal Distributions
Most of our telemetry metrics are not normally distributed. A couple approaches that you may find helpful are:

* powering a Mann-Whitney U-test. [Gpower](https://www.psychologie.hhu.de/arbeitsgruppen/allgemeine-psychologie-und-arbeitspsychologie/gpower) implements the Mann-Whitney U-test.
* log-transforming the data and the expected difference and powering a _t_ test in log space.

## Metrics and Statistics

Two weeks after the beginning of the enrollment period, Jetstream will begin to produce auto-generated reports summarizing the results of the experiment. [Here is one such report](https://experimenter.services.mozilla.com/nimbus/custom-messaging-in-aboutwelcome-for-chrome-users-to-import/results) (internal link).

To see which metrics are included by default to this auto-generated report as well as information on adding custom and default metrics, statistics and confidence, see the [Jetstream documentation](/data-analysis/jetstream/overview).

If you want to perform some analysis by hand, [Jetstream datasets](https://docs.telemetry.mozilla.org/datasets/jetstream.html) are also available in BigQuery. Many telemetry datasets also include an `experiments` field, which when filtered on the experiment slug, can identify rows in the dataset enrolled in the experiment.

For certain experiments, data scientists may need to construct confidence intervals for relative or percent differences. Example implementations can be found in [this notebook](https://colab.research.google.com/drive/1sVOdVdraPwec_Hit4OiaDDH4TJGzaIcc?usp=sharing).

## Watch Out For

Here are other things to watch out for:
- Are there other experiments taking place at the same time as yours? How might that affect the interpretation of your results, or limit your sample sizes?
- Are there multiple implementation phases to this new feature? Does Product want to compare results from one phase to another?
- ...
