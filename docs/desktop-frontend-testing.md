---
id: desktop-frontend-testing
title: Desktop Front-end testing
slug: /desktop-frontend-testing
---

In order to make testing easier we created some helpers that can be accessed by including

```js
const { ExperimentFakes } = ChromeUtils.import(
  "resource://testing-common/NimbusTestUtils.jsm",
);
```

## Testing your feature integrating with Nimbus

You need to provide a feature configuration and await enrollment

```js
let doEnrollmentCleanup = await ExperimentFakes.enrollWithFeatureConfig({
  featureId: "<YOUR FEATURE>",
  // The feature is on
  enabled: true,
  // If you defined `variables` in the MANIFEST
  // the `value` should match that schema
  value: null,
});

// Now you can assume the feature is enabled so you can
// test and that it's doing the right thing

// Assert.ok(It works!)

// Finishing up
await doExperimentCleanup();
```

## Testing with a live Nimbus recipe

If you already published an experiment through Nimbus then you will want to test enrollment in the browser.

1. Flip the following pref to true in the browser you want to enroll (in about:config)

> nimbus.debug

2. Then fill in the required details and navigate to the following address

These steps assume you used the Preview functionality in Experimenter and the recipe is not yet deployed to production.

> about:studies?optin_slug=<YOUR_EXPERIMENT_SLUG>&optin_branch=<BRANCH_SLUG_TO_ENROLL>&optin_collection=nimbus-preview
