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

Experiment metrics are analyzed over a defined period of time since a client enrolls in an experiment. We report results for an analysis period (e.g. the first day after enrollment) after all clients have had a chance to experience the treatment for that duration. In order to return results in finite time, each experiment starts with an enrollment period of fixed length during which clients can enroll in the experiment. We modify the recipe to instruct clients to stop enrolling, and ignore clients that report enrollment anyway, after the declared enrollment period ends. The [Jetstream overview](jetstream/jetstream.md#analysis-paradigm) describes the analysis paradigm in more depth and how it relates to the length of an experiment.

Because enrollment depends on checking for updates, samples will be skewed towards active users at the beginning of the enrollment period.
We typically leave enrollment open for a week to account for weekly seasonality (e.g. weekday vs. weekend users) and to give clients who are active less often a chance to enroll.
This makes our experiment population essentially a sample of WAU.

For more nuances about sampling, enrollment and exposure (whether or not the client actually saw the treatment or control), see [the experiment lifecycle overview](client-sdk-states-and-lifecycle.mdx).

## Sample size recommendations

Sample size recommendations are made as as percentage of the population. Here, a population is defined as a set of clients filtered on:
- channel
- minimum version
- country
- locale
- other?

The above attributes are the only ones that Nimbus is able to filter to on, before the beginning of enrollment. If you desire additional filters (e.g., filters on preference settings), then Nimbus will apply those filters as clients enroll in the experiment. However, since Nimbus is not able to apply additional filters before the beginning of enrollment, you must inflate your sample size recommendations assuming that clients not satisfying additional filters will be included in the population.

Many of our telemetry metrics are not normally distributed. For non-normally distributed data, you may consider a Mann-Whitney U-test to calculate sample sizes for a comparing 2+ samples. [Gpower](https://www.psychologie.hhu.de/arbeitsgruppen/allgemeine-psychologie-und-arbeitspsychologie/gpower) implements the Mann-Whitney U-test.

## Metrics and statistics

Two weeks after the beginning of the enrollment period, Jetstream will begin to produce auto-generated reports summarizing the results of the experiment. [Here](https://experimenter.services.mozilla.com/nimbus/custom-messaging-in-aboutwelcome-for-chrome-users-to-import/results) is an example of that.

To see which metrics are included by default to this auto-generated report as well as information on adding custom and default metrics, statistics and confidence, see the [Jetstream documentation](https://experimenter.info/jetstream/jetstream).

If you want to perform some analysis by hand, [Jetstream datasets](https://docs.telemetry.mozilla.org/datasets/jetstream.html) are also available on BigQuery. Many telemetry datasets also include an `experiments` field, which when filtered on the experiment slug, can identify rows in the dataset enrolled in the experiment.

## Watch out for

Here are other things to watch out for:
- Are there other experiments taking place at the same time as yours? How might that affect the interpretation of your results, or limit your sample sizes?
- Are there multiple implementation phases to this new feature? Does Product want to compare results from one phase to another?
- ...
