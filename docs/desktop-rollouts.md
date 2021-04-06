---
id: desktop-rollouts
title: Desktop Rollouts
slug: /desktop-rollouts
---

If you want to set configurations for a feature remotely _outside of an experiment_, you can do so with Nimbus "Remote Defaults".

:::warning
This feature is still in the early stages of development. The first version will be available in Firefox 89.
:::

## Caveats & Prerequisites

- Because this feature is in the early stages of testing, it is only available to Experiment Reviewers and the UJET team
- This feature is currently Desktop-only in
- You must have access to the `nimbus-desktop-defaults` remote settings collection to test/deploy changes

## Step 1 - Register your feature in Firefox

To be able to use remote defaults, make sure you register your feature in `ExperimentAPI.jsm` and add variables you want to be able to set remotely. This process is identical to what you would do for running Nimbus Experiments, so if you've already done that, you don't need to make any changes in Firefox.

See the documentation for the [Nimbus Feature API](desktop-feature-api) for more details.

## Step 2 - Add a configuration to Remote Settings

To rollout changes to a feature, you will need to update (or create, if none exists) the record that matches your feature id in the `nimbus-desktop-defaults` remote settings collection:

```js
{
  // The feature id - should match your manifest entry
  id: "aboutwelcome",

  configurations: [
    {
      description: "For windows users that can use the pin API",
      targeting: "os.windowsBuildId > 12345",
      enabled: true,
      variables: { skipFocus: false },

    },
    {
      description: "All users",
      targeting: "true",
      enabled: true,
      variables: { skipFocus: true },
    },
  ],
}
```

:::warning
Warning: The format of this JSON is not yet finalized. In the future, this will be managed by UI.
:::

### Configurations

Each entry in the `configurations` list can have a targeting `JEXL` expression that you can use to target a specific group of users. They will be evaluated in the order they are defined until one matches.

## FAQ

### How do rollouts interact with experiments?

If a client receives a remote default _and_ enrolls in an experiment, the Feature API will **prefer the experiment configuration**.

### How do I test a remote default?

In the future, we will support a preview workflow like with experiments. For now:

1. Add the config to the staging Remote Settings `nimbus-desktop-defaults` collection.
2. Use the Remote Settings devtools to switch to the staging endpoint.
