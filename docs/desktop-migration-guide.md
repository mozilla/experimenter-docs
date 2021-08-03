---
id: desktop-migration-guide
title: Migration Guide (JS)
slug: /desktop-migration-guide
---

This guide will help you migrate your Desktop front-end code to run experiments with Nimbus, while still being able to use preferences for default values and local development.

Prerequisites: 
* Your experimental variables are already instrumented with Firefox preferences
* Your code can import a `jsm`

## An illustrative example (about:myself)

For the purposes of this guide, we will be migrating an imaginary about page (`about:myself`), which uses the following preferences defined in `firefox.js`:

```js
pref("browser.aboutmyself.enabled", true);
pref("browser.aboutmyself.bgcolor", "#FE8DAE");
```

## Step 1: Add a new feature to the manifest

First, you will need to register a new feature `FeatureManifest.js`. In this case, we're creating one called `aboutmyself`.

Each preference is registered as a `variable`:

```js
const FeatureManifest = {
  aboutmyself: {
    description: "A page that shows personal browsing stats.",
    variables: {
      enabled: {
        type: "boolean",
        fallbackPref: "browser.aboutmyself.enabled",
      }
      text: {
        type: "string",
        fallbackPref: "browser.aboutmyself.text",
      },
    },
  },
};

```

See the [Desktop Feature API docs](desktop-feature-api) for more details.

## Step 2: Update your feature code from `Services.prefs` to `NimbusFeatures`

First, you will need to import `ExperimentAPI.jsm`:

```js
XPCOMUtils.defineLazyModuleGetters(this, {
  NimbusFeatures: "resource://nimbus/ExperimentAPI.jsm",
});
```

Then anywhere in your code that uses `Services.prefs` to get experiment-defined values, use `NimbusFeatures` instead:

```js
const enabled = Services.prefs.getBoolPref("browser.aboutmyself.enabled");
```

becomes

```js
const enabled = NimbusFeatures.aboutmyself.getVariable("enabled");
```

## Step 3: Run tests

If you've configured fallback preferences your tests should pass as written, but we recommend also using the the [Testing Guide](desktop-frontend-testing) to add tests for your feature that enroll experiment configurations.

## Links

- [PR Example of a switch from prefs to NimbusFeatures](https://phabricator.services.mozilla.com/D118760) (This is slightly outdated) 
