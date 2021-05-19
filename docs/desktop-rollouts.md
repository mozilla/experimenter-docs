---
id: desktop-rollouts
title: Desktop Rollouts
slug: /desktop-rollouts
---

If you want to set configurations for a feature remotely _for non-experiment users_, you can do so with Nimbus Rollouts.

:::warning
This feature is still in the early stages of development. The first version will be available in Firefox 89 for a limited set of early users and more extensively in Firefox 90. See [our project plan](https://mana.mozilla.org/wiki/display/FJT/Rapid+Rollouts) for more information.
:::

## FAQS

### What is this for?

- Launching a winning branch of an experiment faster than the trains.
- Launching a configuration to non-experiment users _during an experiment_ after a short period of verification
- Configuring different settings for a feature for different audiences remotely
- A "kill switch" if you want to launch a feature but then turn it off if something goes wrong.

### When should I not use a rollout?

If the feature has not yet been extensively tested, isn't production quality, or needs a period of validation on the trains.

### When can I use them?

- In Firefox 89 on Desktop, if you are an L3 Nimbus Reviewer or UJET engineer.
- In Desktop starting in **Firefox 90**
- (Mobile dates TBD)

### Can I run an Nimbus experiment and a rollout simultaneously?

Yes. You can do this if you want understand the impact of a change while also gradually releasing the experience to more users. Keep in mind that if you do plan to release the experience to 100% of users, you should make sure it meets production quality standards. You would need to:

1. Launch an experiment that targets a fixed portion of the population (sized appropriately for whatever you are trying to measure)
2. Launch a rollout using the steps below at a low percentage of the population
3. Monitor your rollout in grafana to determine if you can continue increasing the population size. You may also want to look at the week 1 data from your experiment to make an early determination.
4. If everything looks good, gradually increase the percentage of the roll-out by editing the configuration.

### What if a user enrolls in both a rollout and an experiment?

If a client receives a rollout _and_ enrolls in an experiment for the same feature, the Feature API will **prefer the experiment configuration**.

## How to launch a roll-out

### Step 1 - Register your feature in the Nimbus Manifest

To be able to use rollouts, make sure you [register your feature in the Nimbus manifest](desktop-feature-api#registering-a-new-feature) and add variables you want to be able to set remotely. This process is identical to what you would do for running Nimbus Experiments, so if you've already done that, you don't need to make any changes in Firefox.

### Step 2 - Add a configuration

:::warning
This is for MVP testing only will be replaced by Experimenter UI by Firefox 90.
:::

To rollout changes to a feature, you will need to update (or create, if none exists) the record that matches your feature id in the `nimbus-desktop-defaults` remote settings collection:

```js
{
  // The feature id - should match your manifest entry
  id: "aboutwelcome",

  configurations: [
    {
      slug: "windows-pin",
      description: "For windows users that can use the pin API",
      targeting: "os.windowsBuildId > 12345",
      enabled: true,
      variables: { skipFocus: false },

    },
    {
      slug: "all",
      description: "All users",
      targeting: "true",
      enabled: true,
      variables: { skipFocus: true },
    },
  ],
}
```

Each entry in the `configurations` list can have a targeting `JEXL` expression that you can use to target a specific group of users. They will be evaluated in the order they are defined until one matches.

### Step 3 - Monitor telemetry

You can monitor users that receive your configuration by looking at the [experiments environment](https://firefox-source-docs.mozilla.org/toolkit/components/telemetry/data/environment.html?highlight=experiments#experiments). When a rollout is active, it will add the following:

- `id`: `default-<feature>`, where `<feature>` is the id of your feature in the manifest
- `branch`: The slug of the whatever rollout configuration is active=

## Testing instructions

In the future, we will support a preview workflow like with experiments. For now:

1. Add the config to the staging Remote Settings `nimbus-desktop-defaults` collection.
2. Use the Remote Settings devtools to switch to the staging endpoint.

For writing tests please see [Testing with Desktop Rollouts](desktop-frontend-testing#testing-with-desktop-rollouts)
