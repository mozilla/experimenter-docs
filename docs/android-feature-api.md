---
id: android-feature-api
title: PROPOSAL - Android Feature API
slug: /android-feature-api
---

## Manifest

This file should live in Fenix and be readable by the Android Feature API:

```yaml
default_menu_message:
  description: "A menu message that asks people to set to default",
  variables:
    enabled:
      type: "boolean",
      # Optional
      defaultValue: false
    icon:
      type: "string",
      defaultValue: "firefox-logo"
    position:
      type: "int",
      defaultValue: 4
    text:
      type: "string"
      # Q: How do we do localized/unlocalized text here?
      defaultValue: "Set as default browser"

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

    // I'd be open to switching this to "variables", but this is the current format
    "enabled": false,
    "value": {
      "icon": "red-icon-123"
    }
  }
}

```

## SDK API

The SDK exposes a "get branch by feature" method, which returns a value only if an experiment is enrolled
for a given feature id. `value` is returned as stringified JSON; the Rust SDK has no knowledge of feature or application-specific types.

```rust
pub struct Branch {
    pub slug: String,
    pub ratio: i32,
    pub feature: FeatureConfig,
}

pub struct FeatureConfig {
    pub feature_id: String,
    pub enabled: Boolean,
    pub value: String

}

pub fn get_branch_by_feature(feature_id: String) -> Option<Branch>
```

Some important notes:

- The SDK should only enroll a maximum of one experiment per feature at a time.

## Android API

The Android API:

- reads the manifest to see which variables it expects
- calls `get_branch_by_feature` from the Rust SDK and parses the JSON from `featureConfig.value`

### `get[type]Variable(variable)`

```kotlin
public @Nullable Boolean getBoolVariable(@Nonnull String variableName)
public @Nullable Int getIntVariable(@Nonnull String variableName)
public @Nullable String getStringVariable(@Nonnull String variableName)
public @Nullable String getJSONVariable(@Nonnull String variableName)
```

Example:

````kotlin
// TODO: Discuss
NimbusFeatures.defaultMenuMessage.getIntVariable("position")
NimbusFeatures.defaultMenuMessage.variables.position
NimbusFeatures.getIntVariable("default_menu_message", "position")
``

### `isEnabled()`

```kotlin
public @Nullable Boolean isEnabled()
````

In Desktop this checks `featureConfig.enabled`, but I'd be fine with changing it to be synactic sugar for `getBoolVariable("enabled")`

### `getAllVariables()`

This is the equivalent of `getValue()` in Desktop. Do we need this for the first iteration?

### `recordExposureEvent()`

Use this to manually send an exposure event.

```kotlin
NimbusFeatures.myFeature.recordExposureEvent();
```
