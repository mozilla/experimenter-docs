---
id: data-scientists-root
title: Experimentation for data scientists
slug: /data-scientists
---

This page describes the roles data scientists play in experimentation at Mozilla.

Some other things you may be looking for are:

* Documentation about using [Jetstream](jetstream/jetstream.md), Mozilla's experiment analysis tool
* Technical documentation about [datasets used in experimentation](https://docs.telemetry.mozilla.org/tools/experiments.html)
* [Process documentation](https://mana.mozilla.org/wiki/display/DATA/Mozilla+Data+Organization) for the Mozilla data science organization
  (internal link)

## What is the role of experimentation at Mozilla?

Experimentation informs product decision-making at Mozilla.
This suite of experimentation tools is designed for product managers and other investigation owners to A/B test hypotheses they have about new and existing products and features.
[Experimenter](https://experimenter.services.mozilla.com/nimbus/) (internal link)
and the [experiment review repository](https://mana.mozilla.org/wiki/display/FIREFOX/Experiments+Previously+Reviewed) (internal link)
contain examples of completed and active experiments.

## Collaborating with investigation owners

Data scientists support investigation owners in setting up and interpreting their experiments.
[The Firefox experiment design process](https://mana.mozilla.org/wiki/display/FIREFOX/Experiment+Design+Process) (internal link)
describes the process for both data scientists and stakeholders.

[The Nimbus onboarding guide](https://docs.google.com/document/d/155EUgzn22VTX8mFwesSROT3Z6JORSfb5VyoMoLra7ws/edit#)
explains how to set up an experiment in the experiment console.

The support that investigation owners need from data scientists during experiment set-up includes:

* validating that the experimental design will answer their questions
* consulting on telemetry specifications
* sample size recommendations
* writing [custom metrics](jetstream/metrics.md) if needed
* guidance about interpretation

## Sampling framework

Each experiment begins with an enrollment period with fixed start and end dates during which clients can enroll in the experiment. After the declared enrollment period ends, we modify the recipe to instruct clients to stop enrolling, and ignore clients that report enrollment anyway. Because enrollment depends on the client checking for software updates, samples will be skewed towards active users at the beginning of the enrollment period. We typically leave enrollment open for a week to account for weekly seasonality (e.g. weekday vs. weekend users) and to give clients who are active less often a chance to enroll. This makes our experiment population essentially a sample of the weekly active users (WAU).

For each client, experiment metrics are analyzed over a defined period of time from enrollment. We report results for an analysis period (e.g. the first day after enrollment) after all clients have had a chance to experience the treatment for that duration. The [Jetstream overview](jetstream/jetstream.md#analysis-paradigm) describes the analysis paradigm in more depth and how it relates to the length of an experiment.

For more nuances about sampling, enrollment and exposure (whether or not the client actually saw the treatment or control), see [the experiment lifecycle overview](deep-dives/specifications/client-sdk-states-and-lifecycle.mdx).

## Sample size recommendations

Sample size recommendations are operationalized as the fraction of the Firefox population that should consider enrolling in your recipe.

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

Most of our telemetry metrics are not normally distributed. A couple approaches that you may find helpful are:

* powering a Mann-Whitney U-test. [Gpower](https://www.psychologie.hhu.de/arbeitsgruppen/allgemeine-psychologie-und-arbeitspsychologie/gpower) implements the Mann-Whitney U-test.
* log-transforming the data and the expected difference and powering a _t_ test in log space.

## Metrics and statistics

Two weeks after the beginning of the enrollment period, Jetstream will begin to produce auto-generated reports summarizing the results of the experiment. [Here is one such report](https://experimenter.services.mozilla.com/nimbus/custom-messaging-in-aboutwelcome-for-chrome-users-to-import/results) (internal link).

To see which metrics are included by default to this auto-generated report as well as information on adding custom and default metrics, statistics and confidence, see the [Jetstream documentation](jetstream/jetstream.md).

If you want to perform some analysis by hand, [Jetstream datasets](https://docs.telemetry.mozilla.org/datasets/jetstream.html) are also available in BigQuery. Many telemetry datasets also include an `experiments` field, which when filtered on the experiment slug, can identify rows in the dataset enrolled in the experiment.

For certain experiments, data scientists may need to contruct confidence intervals for relative or percent differences. Example implementations can be found in [this notebook](https://colab.research.google.com/drive/1sVOdVdraPwec_Hit4OiaDDH4TJGzaIcc?usp=sharing).

## Watch out for

Here are other things to watch out for:
- Are there other experiments taking place at the same time as yours? How might that affect the interpretation of your results, or limit your sample sizes?
- Are there multiple implementation phases to this new feature? Does Product want to compare results from one phase to another?
- ...
