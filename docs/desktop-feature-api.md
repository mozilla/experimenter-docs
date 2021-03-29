---
id: desktop-feature-api
title: Nimbus Feature API (JS)
slug: /desktop-feature-api
---

This guide will help you use the Nimbus Feature API in Desktop Firefox to run experiments, set values remotely, and manage user preferences. If you are familiar with Normandy and are trying to migrate a feature, you may want to check out the [Migration Guide for Pref Experiments](desktop-migration-guide).

:::info
Your code must be able to import `ExperimentAPI.jsm` in the parent process or a privileged child process. We do not currently support a C++/Rust API.
:::

## About Nimbus Features

In the Nimbus ecosystem, a `feature` is an area of code instrumented for experiments and remote configuration. It can be as small as a single function or as complex as a whole about: page. Some examples:

- `aboutwelcome`, The about:welcome page in Desktop
- `newtab`, The about:newtab page in Desktop

In your code, you will use the Nimbus SDK to access variables associated with those features. e.g.

```js
const { screens, skipFocus } = NimbusFeatures.aboutwelcome.getValue();
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
    // This is a short-form for an "enabled" property
    enabledFallbackPref: "browser.aboutwelcome.enabled",
    variables: {
      // Additional (optional) values that we can control
      // The name of these variables is up to you
      skipFocus: {
        type: "boolean",
        fallbackPref: "browser.aboutwelcome.skipFocus",
      },
    },
  },
};

// In firefox.js
pref("browser.aboutwelcome.enable", true);
pref("skipFocus", false);
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

Returns a value representing the "enabled" state of the feature. You can optionally send an exposure event when the function is called.

```js
const isEnabled = NimbusFeatures.myFeature.isEnabled();
```

### `getValue()`

`getValue({sendExposureEvent = false}): FeatureValue`

Returns the value of all feature variables. You can optionally send an exposure event when the function is called.

```js
const { foo, bar } = NimbusFeatures.myFeature.getValue({
  sendExposureEvent: true,
});
```

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
