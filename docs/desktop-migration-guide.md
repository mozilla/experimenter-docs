---
id: desktop-migration-guide
title: Migration Guide (JS)
slug: /desktop-migration-guide
---

This guide will help you migrate your Desktop front-end code to run experiments with Nimbus, while still being able to use preferences for default and user-override values

Prerequisites: 
* Your experimental variables are already instrumented with Firefox preferences
* You don't use the `user branch` of each pref for anything other than actual user-defined values or testing (see docs on [order of precedence](/desktop-feature-api#configuration-sources)
* Your code can import a `jsm`

### An illustrative example (about:myself)

For the purposes of this guide, we will be migrating an imaginary about page (`about:myself`), which uses the following preferences defined in `firefox.js`:

```js
pref("browser.aboutmyself.enabled", true);
pref("browser.aboutmyself.bgcolor", "#FE8DAE");
```

## Step 1: Add a new feature to the manifest

First, you will need to register a new feature in [FeatureManifest.js](https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/FeatureManifest.js). In this case, we're creating one called `aboutmyself`.

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
      bgColor: {
        type: "string",
        fallbackPref: "browser.aboutmyself.bgcolor",
      },
    },
  },
};

```

## Step 2: Update your feature code

First, you will need to import `ExperimentAPI.jsm`:

```js
XPCOMUtils.defineLazyModuleGetters(this, {
  NimbusFeatures: "resource://nimbus/ExperimentAPI.jsm",
});
```

Then anywhere in your code that uses `Services.prefs` to get experiment-defined values, use `NimbusFeatures` instead:

```js
element.style.backgroundColor = Services.prefs.getBoolPref("browser.aboutmyself.bgColor");
```

becomes

```js
element.style.backgroundColor = NimbusFeatures.aboutmyself.getVariable("bgColor");
```

See the [API reference docs](/desktop-feature-api#api-reference-guide) for more details, including listening to changes.

## Step 3: Run tests

If you've configured fallback preferences your tests should pass as written, but we recommend also reading [Testing Guide](/desktop-frontend-testing) to add experiment-specific tests.

## Links

- [PR Example of a switch from prefs to NimbusFeatures](https://phabricator.services.mozilla.com/D118760) (This is slightly outdated) 
