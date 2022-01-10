---
id: fenix-experiments-getting-started
title: Implementing an experiment
slug: /fenix-engineers
---

## Client configuration prechecks

✅ Get a copy of the experiment brief for your experiment from the [Experiments Repository](https://mana.mozilla.org/wiki/x/FaXNBw) mana page.

✅ Assure that your experiment brief contains values for:

- experiment name
- featureID
- branch names (for a basic a/b experiment, prefer _control_ and _treatment_)

✅ Confirm the **featureID** is added to the experimenter list of console values.

> NOTE: featureID setup access is controlled via experimenter Django admin.
>
> Please ask for help in the `#ask-experimenter` channel

## Fenix setup

Preparing your app for experimentation is now about getting your app features to get its configuration from the Nimbus Feature API.

1. [Instrument your application feature with the Feature API][feature-api].
1. Once your feature is instrumented, you should add the feature-id to Experimenter.
1. Now Experimenter knows about the feature, you can configure your application features with an experiment.

[feature-api]: feature-variables-and-me
## Local Testing

1. Setup your local Fenix build to point to the experimenter
   [staging url](https://github.com/mozilla-mobile/fenix#using-nimbus-servers-during-local-development).
1. Build Fenix with the updated remote-settings configuration.
1. Configure your experiment in the [experimenter nimbus staging site](https://stage.experimenter.nonprod.dataops.mozgcp.net/nimbus/).
1. Run Fenix and check you are able to see your expected behavior.
