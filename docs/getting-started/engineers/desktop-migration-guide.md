---
id: desktop-migration-guide
title: Desktop Migration Guide (JS)
slug: /desktop-migration-guide
---

## To migrate front-end normandy prefs to Nimbus controlled experiments or rollouts
This guide will help you migrate your Desktop front-end code to run experiments with Nimbus, while still being able to use preferences for default and user-override values

Prerequisites:
* Your experimental variables are already instrumented with Firefox preferences
* You don't use the `user branch` of each pref for anything other than actual user-defined values or testing (see docs on [order of precedence](/desktop-feature-api#configuration-sources))
* Your code can import a ESM

### An illustrative example (about:myself)

For the purposes of this guide, we will be migrating an imaginary about page (`about:myself`), which uses the following preferences defined in `firefox.js`:

```js
pref("browser.aboutmyself.enabled", true);
pref("browser.aboutmyself.bgcolor", "#FE8DAE");
```

## Step 1: Add a new feature to the manifest

First, you will need to register a new feature in [FeatureManifest.yaml](https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/FeatureManifest.yaml). In this case, we're creating one called `aboutmyself`.
After adding the feature a build step is required to update the appropriate header file.

Read more to find out if you want to send an [exposure event](/deep-dives/jetstream/overview#enrollment-vs-exposure). This is optional but a decision must be recorded in the manifest.

Each preference is registered as a `variable`:

```yaml
aboutmyself:
  description: A page that shows personal browsing stats
  # Exposure is optional, in which case `hasExposure` would be false
  # and `exposureDescription` would not be defined
  hasExposure: true
  exposureDescription: The exposure is the earliest moment that the user could be affected by the experimental treatment
  variables:
    enabled:
      type: boolean
      fallbackPref: browser.aboutmyself.enabled
    bgColor:
      type: string
      fallbackPref: browser.aboutmyself.bgcolor
```

## Step 2: Update your feature code

First, you will need to import `ExperimentAPI.sys.mjs`:

```js
const lazy = {}
ChromeUtils.defineESModuleGetters(lazy, {
  NimbusFeatures: "resource://nimbus/ExperimentAPI.sys.mjs",
});
```

Then anywhere in your code that uses `Services.prefs` to get experiment-defined values, use `lazy.NimbusFeatures` instead:

```js
element.style.backgroundColor = Services.prefs.getBoolPref("browser.aboutmyself.bgColor");
```

becomes

```js
element.style.backgroundColor = NimbusFeatures.aboutmyself.getVariable("bgColor");
```

See the [API reference docs](/desktop-feature-api#api-reference-guide) for more details, including listening to changes.

## Step 3: Run tests

If you've configured fallback preferences your tests should pass as written, but we recommend also reading [Testing Guide](/desktop-feature-api-testing) to add experiment-specific tests.

## FAQ

### What happens if I run a Normandy experiment and a Nimbus experiment simultaneously?

If possible, we do not recommend you run Normandy and Nimbus experiments on the same user population simultaneously. If a user were to enroll in an experiment from both sources, the value returned would follow the rules defined in [Configuration Sources docs](/desktop-feature-api#configuration-sources). (Nimbus values override default pref branch values; user pref branch values override Nimbus).

If you have a long-running Normandy experiment during which you must launch a Nimbus experiment, you can add a custom targeting rule to exclude users from a specific experiment ID.


## Links

- [PR Example of a switch from prefs to NimbusFeatures](https://phabricator.services.mozilla.com/D118760) (This is slightly outdated)
