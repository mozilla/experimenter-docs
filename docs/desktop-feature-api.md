---
id: desktop-feature-api
title: Nimbus Feature API (JS)
slug: /desktop-feature-api
---

This guide will help you use the Nimbus Feature API in Desktop Firefox to run experiments, set values remotely, and manage user preferences. If you are familiar with Normandy and are trying to migrate a feature, you may want to check out the [Migration Guide for Pref Experiments](desktop-migration-guide).

### API changes in Firefox 90

- 🆕 Added a [`getVariable()`](#getvariable) API that optimizes accessing single variables.
- 🆕 Added an `isEarlyStartup` option in the manifest. Use this if you need to cache values for early synchronous access.
- ⚠️ Deprecated `getValue()` method in favour of [`getAllVariables()`](#getvariable). Please use this for new code.
- ⚠️ Deprecated the `enabledFallbackPref` in the manifest. If you want to use `.isEnabled()`, you should add an `enabled` variable to the manifest instead and include that in your `variables` payload in experimenter going forward.

## About the Feature API

### Can I use this?

As of Firefox 90, your can use the Desktop Nimbus Feature API if your code is in Javascript and can import `ExperimentAPI.jsm` in the parent process or a privileged child process. We _do_ support First run experiments on Windows, holdbacks, and an early-stage implementation of rollouts

If you have a usecase that isn't supported, please reach out in #ask-experimenter on Slack.

### What is a feature?

In the Nimbus ecosystem, a `feature` is an area of code instrumented for experiments and remote configuration. It can be as small as a single function or as complex as a whole about: page. Some examples:

- `aboutwelcome`, The about:welcome page in Desktop
- `newtab`, The about:newtab page in Desktop

In your code, you will use the Nimbus SDK to access variables associated with those features. e.g.

```js
const { screens, skipFocus } = NimbusFeatures.aboutwelcome.getVariables();
```

## Configuration sources

The Nimbus Feature API will return the correct configuration for a feature given a few different inputs **in this order**:

1. **End-user-setting**: If the _user branch_ of any preferences in the manifest are set, this will override experiment values or defaults. We believe this is important to respect user choice.
2. **Experiment value**: Next, we check if a Nimbus experiment is activated that changes the feature.
3. **Remotely-configured value**: If no experiment is set, we check if there is a remotely-defined value. This is a mechanism that allows us to roll-out changes quickly between releases.
4. **Local default**: Finally, we will return the _default branch_ of preferences in the manifest, if they are defined in [firefox.js](https://searchfox.org/mozilla-central/source/browser/app/profile/firefox.js).

## Registering a new feature

To register a new feature, you will need to choose an identifier and add it to the manifest in [ExperimentAPI.jsm](https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/ExperimentAPI.jsm):

```javascript
// In ExperimentAPI.jsm

const MANIFEST = {
  // Our feature name
  aboutwelcome: {
    description: "The about:welcome page",
    // Include this if you need sychronous access / very early access at startup
    isEarlyStartup: true,
    variables: {
      // Additional (optional) values that we can control
      // The name of these variables is up to you
      enabled: {
        type: "boolean",
        fallbackPref: "browser.aboutwelcome.enabled",
      },
      skipFocus: {
        type: "boolean",
      },
    },
  },
};

// In firefox.js
pref("browser.aboutwelcome.enabled", true);
```

## Importing the Feature API

Import the `NimbusFeatures` module:

```js
XPCOMUtils.defineLazyModuleGetters(this, {
  NimbusFeatures: "resource://nimbus/ExperimentAPI.jsm",
});
```

## API Reference Guide

### `isEnabled()`

`isEnabled({sendExposureEvent = false}): boolean`

Short form for `.getVariable("enabled")`

Note that you should have an `enabled` property defined in the manifest if you plan to use this.

```js
const isEnabled = NimbusFeatures.myFeature.isEnabled();
```

### `getVariable()`

`getVariable(variableName: string, {sendExposureEvent = false}): FeatureValue`

Returns the value of a single feature variable. You can optionally send an exposure event when the function is called.

Warning: **This function will throw in Nightly and CI build** if you do not define `variableName` in the Nimbus manifest.

```js
const foo = NimbusFeatures.myFeature.getValue("foo");

const bar = NimbusFeatures.myFeature.getValue("bar", {
  sendExposureEvent: true,
});

// notAVariable is not defined in the manifest, so this will throw in CI
const baz = NimbusFeatures.myFeature.getValue("notAVariable");
```

### `getAllVariables()`

`getVariable(variableName: string, {sendExposureEvent = false, defaultValues}): FeatureValue`

Returns the value of all variables for a feature. Note that **variables will be merged beftween sources**.

If `options.defaultValues` is defined, it will be preferred before default branch fallback values but after experiment, remote, and user-set preference values.

```js
const { foo, bar } = NimbusFeatures.myFeature.getVariables({
  sendExposureEvent: true,
  defaultValues: { foo: true, bar: false },
});
```

### `getValue()`

:::caution deprecated
Note: This method is deprecated. You should use getAllVariables() instead.
:::

`getValue({sendExposureEvent = false}): FeatureValue`

Returns the value of all feature variables. You can optionally send an exposure event when the function is called.

### `recordExposureEvent()`

Use this to manually send an exposure event. Alternatively, you can use the `sendExposureEvent` option for `isEnabled`/`getValue` (see above).

```js
NimbusFeatures.myFeature.recordExposureEvent();
```

### `ready()`

Wait for the remote experiment and defaults stores to be synced before checking values.

```js
await NimbusFeatures.myFeature.ready();
const { foo } = NimbusFeatures.myFeature.getValue();
```

### `onUpdate()`

Listen for changes, include to remote defaults or pref values.

```js
NimbusFeatures.myFeature.onUpdate(() => {
  const newValue = NimbusFeatures.myFeature.getValue();
  updateUI(newValue);
});
```

### `off()`

Stop listening for changes.

```js
NimbusFeatures.myFeature.onUpdate(aListener);

// Later
NimbusFeatures.myFeature.off(aListener);
```
