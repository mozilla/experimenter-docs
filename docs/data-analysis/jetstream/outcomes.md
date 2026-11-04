---
id: outcomes
title: Outcomes
slug: /data-analysis/jetstream/outcomes
sidebar_position: 4
---

An Outcome is a reusable configuration snippet
that defines metrics and statistical summaries for Jetstream to compute,
which will be displayed on the Experimenter results page.

Outcomes are defined in TOML snippets in the [`jetstream/outcomes/` path of the metric-hub repository](https://github.com/mozilla/metric-hub/tree/main/jetstream/outcomes).

See what [outcomes are available](https://mozilla.github.io/metric-hub/outcomes/firefox_desktop/firefox_suggest/).

Watch a demo about how to use Outcomes:

<iframe src="https://drive.google.com/file/d/10pHG1S8ucpVBlNgCq2CIR5lXPLdJQfwm/preview" width="640" height="480"></iframe>

## Defining an Outcome

A simple Outcome definition (excerpted from [a live Outcome](https://github.com/mozilla/metric-hub/tree/main/jetstream/outcomes/firefox_desktop/picture_in_picture.toml)) looks like:

```toml
friendly_name = "Picture in Picture"
description = "Usage and engagement metrics for the video Picture-in-Picture feature."
default_metrics = ["used_picture_in_picture"]

[metrics.used_picture_in_picture]
friendly_name = "Used Picture in Picture"
description = "Fraction of clients that used PiP over the measurement window"
select_expression = """
    LOGICAL_OR(
        event_category = "pictureinpicture"
        AND event_method = "create"
    )
"""
data_source = "events"
statistics = { binomial = {} }
```

The important elements are:

* Top-level `friendly_name` and `description` fields, which define how the Outcome appears in Experimenter
* The optional top-level `default_metrics` field, which specifies the metrics that will be showed at the top of the visualization page as the "primary metrics"
* One or more `metrics` blocks that describe the metrics to compute, and any supporting `data_source`s as necessary.

The configuration language is identical to the custom experiment configuration language described in [Configuring Jetstream].

Opening a pull request to `metric-hub` with an Outcome definition will cause it to be validated.
If it passes, a data scientist can merge the Outcome definition without additional review.

Experimenter will need to be re-deployed to pick up a new Outcome. Please ask in #nimbus-project if you're in a hurry!

[Configuring Jetstream]: ./configuration

## Choosing Analysis Periods

By default, every metric defined in an Outcome is computed for the weekly and overall analysis windows.

To control which analysis windows an Outcome's metrics are computed for,
add top-level lists of metric slugs named after the analysis periods,
just like the `[metrics]` section of a [custom experiment configuration](./configuration#metrics-section).
The available periods are `daily`, `weekly`, `28_day`, `overall`, `preenrollment_weekly`, and `preenrollment_days28`.

```toml
friendly_name = "Picture in Picture"
description = "Usage and engagement metrics for the video Picture-in-Picture feature."
default_metrics = ["used_picture_in_picture"]

daily = ["used_picture_in_picture"]
weekly = ["used_picture_in_picture"]
overall = ["used_picture_in_picture"]

# Required for metrics whose statistics use covariate adjustment
# with `period = "preenrollment_week"`
preenrollment_weekly = ["used_picture_in_picture"]

[metrics.used_picture_in_picture]
# ...
[metrics.used_picture_in_picture.statistics.linear_model_mean]
[metrics.used_picture_in_picture.statistics.linear_model_mean.covariate_adjustment]
period = "preenrollment_week"
```

:::caution
If the outcome includes any analysis period list, the **default of weekly and overall no longer applies**:
each metric is then computed **only** for the periods whose lists include it,
so a metric that isn't listed anywhere won't be computed.
:::

If a metric uses [covariate adjustment](../data-topics/preenrollment_bias#covariate-adjustment--cuped),
include it in the matching pre-enrollment list (`preenrollment_weekly` or `preenrollment_days28`)
so the pre-enrollment values it adjusts against are computed.

## Parameterizing Outcomes

It is also possible to parameterize `select_expression` in outcomes, values the parameters to be replaced with can then be specified in external jetstream config.

Example of an outcome using parameterization:

```toml
friendly_name = "Picture in Picture"
description = "Usage and engagement metrics for the video Picture-in-Picture feature."
default_metrics = ["used_picture_in_picture"]

### parameters definition
[parameters]

[parameters.id]
friendly_name = "ID associated with the experiment"
description = "ID associated with this experiment"
default = "0"  # this will be the default value if not overwritten in an external config
distinct_by_branch = false  # if set to true, ensure to specify `branch_name` for each parameter

[metrics.used_picture_in_picture]
friendly_name = "Used Picture in Picture"
description = "Fraction of clients that used PiP over the measurement window"
select_expression = "id = {{parameters.id}}"  # this allows us to reference defined parameters here
data_source = "events"
statistics = { binomial = {} }
```

Instruction on how to specify parameter values can be found [Jetstream Configuration](configuration.md#overwriting-outcomes-parameters)


## When Should I Use Outcomes?

As a data scientist, it's useful to define Outcomes whenever an endpoint is going to be used more than once.
It reduces the amount of work you will need to do for each follow-up experiment and ensures that metrics are defined consistently.

If you're not certain about how you want to define a metric, it's okay to use a custom configuration first,
and then copy-paste the metrics into an Outcome for later use.

## What Happens If an Outcome Changes?

Changing an Outcome does not re-run any experiments.
A commit hash associated with the version of each Outcome is captured in the [experiment metadata](./data-products) published to GCS,
so it's possible to understand which version of an Outcome was associated with an experiment analysis.
