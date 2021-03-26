---
id: migration-guide-desktop-frontend
title: Migration guide for Desktop Front-end
slug: /migration-guide-desktop-frontend
---

This guide will help you integrate `ExperimentAPI.jsm` in your Desktop front-end code to run Nimbus experiments, while still being able to use preferences for default values and local development.

In order to use `ExperimentAPI.jsm` your code must be able to import `jsm`s in the parent process or a privileged child process.

## Create a new feautre

Take a look a the [Desktop API guide](desktop-api) to register a new feature in the manifest. IF you are already using Firefox preferences to experiment using Normandy, you can add those as `fallbackPref`

```js
// in ExperimentAPI.jsm
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

## Switch Services.prefs usages to NimbusFeatures

Anywhere in the code your are using `Services.prefs` to get values, use `NimbusFeatures` instead:

```js
Services.prefs.getBoolPref("browser.aboutwelcome.enabled");
```

becomes

```js
NimbusFeature.aboutwelcome.isEnabled();
```

## Tests

If you've configured fallback preferences your tests should pass, but we recommend also using the the [Testing Guide](desktop-frontend-testing) to add tests for your feature that enroll experiment configurations.

For more examples and usecases please see the [SDK Docs](https://docs.google.com/document/d/1ev75pG0nAM1lz53WuPQkWqykUlZMmZRbx8wzvvn5DhU/edit#heading=h.hvm8985z4f8s).
