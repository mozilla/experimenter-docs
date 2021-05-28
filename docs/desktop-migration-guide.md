---
id: desktop-migration-guide
title: Migration Guide (JS)
slug: /desktop-migration-guide
---

This guide will help you integrate `ExperimentAPI.jsm` in your Desktop front-end code to run Nimbus experiments, while still being able to use preferences for default values and local development.

In order to use `ExperimentAPI.jsm` your code must be able to import `jsm`s in the parent process or a privileged child process.

## Add a new feature to the manifest

Take a look a the [Desktop Feature API docs](desktop-feature-api) to register a new feature in the manifest. If you are already using Firefox preferences to experiment using Normandy, you can add those as `fallbackPref`

```js

// If these are your preferences in firefox.js
pref("browser.aboutwelcome.enabled", true);
pref("browser.aboutwelcome.skipFocus", false);

// This is what your manifest entry would look like
const MANIFEST = {
  aboutwelcome: {
    description: "The about:welcome page",
    variables: {
      enabled: {
        type: "boolean",
        fallbackPref: "browser.aboutwelcome.enabled",
      }
      skipFocus: {
        type: "boolean",
        fallbackPref: "browser.aboutwelcome.skipFocus",
      },
    },
  },
};

```

## Switch Services.prefs usages to NimbusFeatures

Anywhere in the code your are using `Services.prefs` to get values, use `NimbusFeatures` instead:

```js
Services.prefs.getBoolPref("browser.aboutwelcome.skipFocus");
```

becomes

```js
NimbusFeature.aboutwelcome.getVariable("skipFocus");
```

## Tests

If you've configured fallback preferences your tests should pass, but we recommend also using the the [Testing Guide](desktop-frontend-testing) to add tests for your feature that enroll experiment configurations.
