---
id: android-feature-api
title: PROPOSAL - Android Feature API
slug: /android-feature-api
---

## Manifest

This file should live in Fenix and be readable by the Android Feature API.

Note that:

- Valid `type`s are `boolean`, `string`, `int`, `drawable`
- `choices` is optional
- In future releases we will support a `defaultValue`, but for the first iteration of the API this isn't a supported default.

```yaml
default_menu_message:
  description: "A menu message that asks people to set to default",
  variables:
    enabled:
      type: "boolean",
    icon:
      type: "drawable",
      choices:
        - "firefox-logo"
        - "firefox-logo-red"
    position:
      type: "int",
    text:
      type: "string"
```

## Experiment API (DTO)

See [full documentation](https://mana.mozilla.org/wiki/pages/viewpage.action?pageId=130920248). The following is an example of a branch:

```js
{
  // Slug can be any arbitrary value
  "slug": "treatment-red-icon",
  // For bucketing
  "ratio": 1,
  "feature": {
    // Should match manifest entry
    "featureId": "tab_bar"
    // This contains a subset of the variables defined in the manifest entry
    "value": {
      "enabled": true,
      "icon": "red-icon-123",
      "text": "Hello world"
    }
  }
}

```

Notes:
The DTO has an `enabled` property, but we will not be handling it here. Instead, we will expect `enabled` to be declared as a boolean variable.

## SDK API

The SDK exposes a `get_feature_config_variables` method, which return a value only if an experiment is enrolled
for a given feature id. The return type is a `String`; the Rust SDK has no knowledge of feature or application-specific types.

```rust
pub struct Branch {
    pub slug: String,
    pub ratio: i32,
    pub feature: FeatureConfig
}

pub struct FeatureConfig {
    pub feature_id: String,
    // This is where all the variables are, it will be parsed foreign language side
    pub value: String
}

// returns FeatureConfig.value
pub fn get_feature_config_variables(feature_id: String) -> Result<Option<String>>
```

Notes:

- The SDK should only enroll a maximum of one experiment per feature at a time and should enforce this at enrollment time.

## Android API

### nimbus.getVariables(featureId, sendExposureEvent)

- Calls `get_feature_config_variables` from the Rust SDK, parses the JSON
- Exposes methods for getting variables of supported types (`boolean`, `string`, `int`)
- Returns `null` if a no value exists for the given `featureId` / `variable`

Example:

```kotlin
nimbus.getVariables("default_menu_message").getInt("position")
nimbus.getVariables("default_menu_message").getBool("enabled")
// In this example, we don't send an exposure event
nimbus.getVariables("default_menu_message", false).getString("text")
```

Note that `getVariables` can take a second param `sendExposureEvent` that is `true` by default, which will send an exposure event when the function is called.

### `recordExposureEvent(featureId)`

Use this to manually send an exposure event.

```kotlin
nimbus.recordExposureEvent("default_menu_message")
```

## Enhancements (Later)

- isEnabled
- Figure out localized strings
- More application-specific types like colours etc.
- Defaults in the manifest
- Generating types from the manifest
- Rust API
