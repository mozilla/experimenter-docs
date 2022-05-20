---
id: outcomes
title: Outcomes
---

An Outcome is a reusable configuration snippet
that defines metrics and statistical summaries for Jetstream to compute,
which will be displayed on the Experimenter results page.

Outcomes are defined in TOML snippets in the [`outcomes/` path of the jetstream-config repository](https://github.com/mozilla/jetstream-config/tree/main/outcomes).

See what [outcomes are available](https://mozilla.github.io/jetstream-config/outcomes/firefox_desktop/firefox_suggest/).

Watch a demo about how to use Outcomes:

<iframe src="https://drive.google.com/file/d/10pHG1S8ucpVBlNgCq2CIR5lXPLdJQfwm/preview" width="640" height="480"></iframe>

## Defining an Outcome

A simple Outcome definition (excerpted from [a live Outcome](https://github.com/mozilla/jetstream-config/blob/main/outcomes/firefox_desktop/picture_in_picture.toml)) looks like:

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

The configuration languge is identical to the custom experiment configuration language described in [Configuring Jetstream].

Opening a pull request to `jetstream-config` with an Outcome definition will cause it to be validated.
If it passes, a data scientist can merge the Outcome definition without additional review.

Experimenter will need to be re-deployed to pick up a new Outcome. Please ask in #nimbus-project if you're in a hurry!

[Configuring Jetstream]: jetstream/configuration.md

## Parameterizing Outcomes

It is also possible to parameterize `select_expression` in outcomes, values the parameters to be replaced with can then be specified in external jetstream config.

Example of an outcome using parametization:

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


## When should I use Outcomes?

As a data scientist, it's useful to define Outcomes whenever an endpoint is going to be used more than once.
It reduces the amount of work you will need to do for each follow-up experiment and ensures that metrics are defined consistently.

If you're not certain about how you want to define a metric, it's okay to use a custom configuration first,
and then copy-paste the metrics into an Outcome for later use.

## What happens if an Outcome changes?

Changing an Outcome does not re-run any experiments.
A commit hash associated with the version of each Outcome is captured in the [experiment metadata](jetstream/data-products.md) published to GCS,
so it's possible to understand which version of an Outcome was associated with an experiment analysis.
