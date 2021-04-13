---
id: android-feature-api
title: PROPOSAL - Android Feature API
slug: /android-feature-api
---

## Manifest

This file should live in Fenix and be readable by the Android Feature API.

Note that:

- Default values are required for Android/iOS
- Valid `type`s are `boolean`, `string`, `int`, `drawable`
- `choices` is optional

```yaml
default_menu_message:
  description: "A menu message that asks people to set to default",
  variables:
    enabled:
      type: "boolean",
      # required
      defaultValue: false
    icon:
      type: "drawable",
      choices:
        - "firefox-logo", "firefox-logo-red"
      defaultValue: "firefox-logo-red"
    position:
      type: "int",
      defaultValue: 4
    text:
      type: "string"
      # choices or free text
      defaultValue: "Hello world"
```

## Experiment API (DTO)

See [full documentation](https://mana.mozilla.org/wiki/pages/viewpage.action?pageId=130920248). The following is an example of a branch:

```js
{
  // Slug can be any arbitrary value
  "slug": "treatment-red-icon",
  // For bucketing
  "ratio": 1,
  "features": [
    {
    // Should match manifest entry
    "featureId": "tab_bar"
    "enabled": false,

    // This contains a subset of the variables defined in the manifest entry
    "value": {
      "icon": "red-icon-123",
      "text": "Hello world"
    }
  }]
}

```

## SDK API

The SDK exposes a `get_feature_config_variables` method, which return a value only if an experiment is enrolled
for a given feature id. The return type is a `String`; the Rust SDK has no knowledge of feature or application-specific types.

```rust
pub struct Branch {
    pub slug: String,
    pub ratio: i32,

    // To support multiple features:
    pub features: Vec<FeatureConfig>
}

pub struct FeatureConfig {
    pub feature_id: String,
    pub enabled: Boolean,
    // This is where all the variables are, it will be parsed foreign language side
    pub value: String
}

// returns FeatureConfig.value
pub fn get_feature_config_variables(feature_id: String) -> Option<String>
```

Notes:

- The SDK should only enroll a maximum of one experiment per feature at a time and should enforce this at enrollment time.

## Android API

### NimbusFeatures.getVariables(featureId)

- Returns a `NimbusFeatureConfig` instance
- Calls `get_feature_config_variables` from the Rust SDK, parses the JSON
- Exposes methods for getting variables of supported types (`boolean`, `string`, `int`)
- Should not allow feature ids or variable names that aren't defined in the manifest

Example:

```kotlin
NimbusFeatures.getVariables("default_menu_message").getInt("position")
NimbusFeatures.getVariables("default_menu_message").getBool("enabled")
```

### `recordExposureEvent(featureId)`

Use this to manually send an exposure event.

```kotlin
NimbusFeatures.recordExposureEvent("default_menu_message")
```

## Enhancements (Later)

- isEnabled
- Figure out localized strings
- More application-specific types like colours etc.
- Generating types from the manifest (probably later)
- Rust API
