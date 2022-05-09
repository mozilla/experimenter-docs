---
id: rollouts
title: Rollouts
slug: /rollouts
---

If you want to set configurations for a feature remotely _for non-experiment users_, you can do so with a **Rollout**.

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

It's possible, but bear in mind that rollouts are not measurement instruments. Experiments are.

If you have uncertainty about the effect of the feature,
you may wish to be guided by experiment results instead of deploying the feature immediately.

Before you do this, you should consider:

- Future experimentation needs: once you deploy the feature to someone,
  you lose the ability to observe what happens when you introduce that feature to that user.
  Consider whether you have a need for holdbacks.
- Decision criteria: identify the risks you're trying to mitigate with a rollout and decide whether you need multiple stages or not.
  If you have multiple stages, how will you know whether to advance or roll back?
  What signals will help you make your decision? Where will they come from?
  If you are relying on the experiment to guide you, make sure that the timelines are compatible.
  Consult data science before relying on signals derived from the behavior of the rollout group,
  since rollouts are not measurement tools and lack a control.

You would need to:

1. Launch an experiment that targets a fixed portion of the population (sized appropriately for whatever you are trying to measure)
2. When you are ready, launch a rollout using the steps below at a low percentage of the population
3. As the rollout proceeds, consult your decision criteria. Change the percentage of the roll-out by editing the configuration.

Keep in mind that if you do plan to release the experience to 100% of users, you should make sure it meets production quality standards.

### What if a user enrolls in both a rollout and an experiment?

If a client receives a rollout _and_ enrolls in an experiment for the same feature, the Feature API will **prefer the experiment configuration**.

## How to launch a roll-out

### Step 1 - Register your feature in the Nimbus Manifest

To be able to use rollouts, make sure you [register your feature in the Nimbus manifest](desktop-feature-api#registering-a-new-feature) and add variables you want to be able to set remotely. This process is identical to what you would do for running Nimbus Experiments, so if you've already done that, you don't need to make any changes in Firefox.

### Step 2 - Add a configuration

:::warning
This is for MVP testing only will be replaced by Experimenter UI by Firefox 90.
:::

To rollout changes to a feature, you will need to update (or create, if none exists) the record that matches your feature id in the `nimbus-desktop-defaults` [remote settings collection](https://settings-writer.stage.mozaws.net/v1/admin/#/buckets/main-workspace/collections/nimbus-desktop-defaults/records):

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
- `branch`: The slug of the whatever rollout configuration is active

Remember that rollouts are not measurement tools. Rely on experimentation to measure effect sizes.

#### Custom population percentage

If you want to release a rollout to a specific portion of a population, you can add [`bucketSample`](https://searchfox.org/mozilla-central/source/toolkit/components/utils/Sampling.jsm#120) to the `targeting` string to do so. Here's an example

Note that the three inputs are: the start of the range, the number of buckets, and the total buckets (which should always be `10000`).

In this example, this would enroll 20% of all users (from 0-2000).

```
{
  "targeting": "[userId, "YOUR_NAMESPACE_HERE"]|bucketSample(0, 2000, 10000)"
}
```

#### User facing information

Users can see if there are any active rollouts for their profile by going to `about:support > Remote Features`. The section will
mention the name of the feature and the slug of the configuration currently active. There is no user facing name and description
as for experiments.

#### Debug

Set `messaging-system.log` pref to `all` to see logging information like which rollout configuration matched or which did not
apply due to targeting.

## Testing instructions

In the future, we will support a preview workflow like with experiments. For now:

1. Add the config to the staging Remote Settings `nimbus-desktop-defaults` collection.
2. Use the Remote Settings devtools to switch to the staging endpoint.

For writing tests please see [Testing with Desktop Rollouts](desktop-feature-api-testing#testing-with-desktop-rollouts)

## Links

- [Project plan](https://mana.mozilla.org/wiki/display/FJT/Rapid+Rollouts)
