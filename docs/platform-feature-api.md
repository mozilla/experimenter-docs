---
id: platform-feature-api
title: Nimbus Feature API (Platform)
slug: /platform-feature-api
---

This guide will help you set up the Nimbus Feature API for Platform features.
Support is currently limited to a hybrid approach where enrollment processing
happens in JS and the CPP API exposes `OnUpdate` for notifications about changes
 and `GetInt`/`GetBool` to retrieve the value.

## About the Feature API

### Can I use this?

As of Firefox 92, your can use the Desktop Nimbus Feature API if your code.

If you have a usecase that isn't supported, please reach out in #ask-experimenter on Slack.

### What is a feature?

In the Nimbus ecosystem, a `feature` is an area of code instrumented for experiments and remote configuration. It can be as small as a single function or as complex as a whole about: page. Some examples:

- `aboutwelcome`, The about:welcome page in Desktop
- `newtab`, The about:newtab page in Desktop

### 1. Registering a new feature

To register a new feature, you will need to choose an identifier and add it to the manifest in [FeatureManifest.js](https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/FeatureManifest.js):

```javascript
// In FeatureManifest.js

const MANIFEST = {
  // Our feature name
  aboutwelcome: {
    description: "The about:welcome page",
    // This is required for Platform features
    isEarlyStartup: true,
    variables: {
      skipFocus: {
        type: "boolean",
      },
    },
  },
};
```

```cpp
#include "mozilla/browser/NimbusFeatures.h"

// feature name and variable name to retrieve the value
NimbusFeatures::GetInt("aboutwelcome"_ns, "skipFocus"_ns, false);

// get notified if the value changes
NimbusFeatures::OnUpdate("aboutwelcome"_ns, "skipFocus"_ns,
  [](const char*, void*){}, void*);
```

### 2. Testing

If mochitests are enough we have enrollment helpers that simulate the experiment flow:

```javascript
const { ExperimentFakes } = ChromeUtils.import(
  "resource://testing-common/NimbusTestUtils.jsm"
);

let doExperimentCleanup = await ExperimentFakes.enrollWithFeatureConfig({
  featureId: "firefox100",
  value: { firefoxVersion: 100 },
});

// Your test

// to clear prefs and session data
await doExperimentCleanup();
```

Otherwise for a `gTest` or other requirements you can set a pref `nimbus.syncdatastore.<feature name>.<variable name>` with the appropriate type you defined in the FeatureManifest.

⚠️ This variable naming convention is an implementation detail and might change in the future.

#### Examples

Examples of platform consumers:

* [Bug 1719070 - UA: Add support for a Nimbus experiment to override Firefox's User-Agent string.](https://phabricator.services.mozilla.com/D121112)
