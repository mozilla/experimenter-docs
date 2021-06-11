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

Experimentation informs product decision-making at Mozilla. This suite of experimentation tools is designed for Product Managers to A/B test hypotheses they have about new and existing products and features. [Here](https://experimenter.services.mozilla.com/nimbus/) you can see examples of completed and active experiments.

Over half of completed experiments have found statistically significant differences.

## Collaborating with Product

Data scientists support Product Managers in setting up and interpreting their experiments. [Here](https://mana.mozilla.org/wiki/display/FIREFOX/Experiment+Design+Process) is more information about how that collaboration works. 

[This documentation](https://docs.google.com/document/d/155EUgzn22VTX8mFwesSROT3Z6JORSfb5VyoMoLra7ws/edit#) explains how to set up an experiment. The main support that Product Managers need from Data Scientists during experimentat set-up include: validating that the experimental design will answer their questions, sample size recommendations, writing custom metrics if needed, and explaining statistics.

## Sampling framework

We cannot just go take a random sample of our clients. Instead, we must wait for a client to check for updates, and at that time, randomly assign the client to either a treatment or control. To handle this time discrepancy, each experiment starts with an enrollment period during which clients can enroll in the experiment. After the enrollment period ends, no more clients can be added to the experiment. See [this documentation](https://experimenter.info/jetstream/jetstream/#analysis-paradigm) for more information on how we handle clients who enroll at different times within the enrollment period, and how to control the time duration of an experiment.

Because enrollment depends on checking for updates, samples will be skewed towards active users at the beginning of the enrollment period.

For more nuances about sampling, enrollment and exposure (whether or not the client actually saw the treatment or control), see [this documentation](https://experimenter.info/client-sdk-states-and-lifecycle/#key-concepts).

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
