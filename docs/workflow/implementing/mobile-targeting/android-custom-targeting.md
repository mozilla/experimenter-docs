---
id: android-custom-targeting
title: Adding new targeting attributes to Android
slug: /android-custom-targeting
---
# Adding new targeting attributes to Android
This page demonstrates how to add new targeting attributes to Android, enabling experiment creators more specific targeting.
For more general documentation on targeting custom audiences, check out [the custom audiences docs](/workflow/implementing/custom-audiences)

## Adding the attribute to the application
The Nimbus SDK exposes a new `customTargetingAttributes` parameter in its initializer that is a `Map<String, String>` map. We can take advantage of this parameter to pass in new targeting attributes without modifying the Nimbus SDK at all.
:::warning
A current limitation is that both the key and the value of the targeting attribute are **strings**. Please reach out to the Nimbus SDK team for any targeting attributes that require integer comparison, or any other richer `JEXL` expressions that cannot be done with strings.
:::


### How to add a new attribute
In [NimbusSetup.kt](https://github.com/mozilla-mobile/fenix/blob/main/app/src/main/java/org/mozilla/fenix/experiments/NimbusSetup.kt#L61) `NimbusAppInfo` now optionally takes in a map `customTargetingAttributes` that will be used to add custom targeting. Simply add a new key-value pair to the map and it will be available for targeting. For example:
```kotlin
val appInfo = NimbusAppInfo(
    appName = "fenix",
    channel = BuildConfig.BUILD_TYPE,
    customTargetingAttributes = mapOf(
        "newTargetingAttributeName" to "targetingAttributeValue",
    )
)
```

Note that since we need to add the targeting attributes on the client code, the attribute changes will have to ride the trains before they are available for targeting.

## Adding the attribute on experimenter
After the targeting attribute is ready on the app, you will need to modify experimenter to allow creating experiments that target the attribute you created. Follow the instructions on [the custom audiences page](/workflow/implementing/custom-audiences#how-to-add-a-new-custom-audience) to add the new targeting on experimenter.
:::warning
The targeting `JEXL` expression on experimenter **must** use the same name as the key given to the SDK. For example, if the app defines a key-value pair, with key `isFirstRun`. experimenter expression must use the same name (i.e `isFirstRun`).
:::

## Example
- Check out this PR for an example on how to add new targeting attributes for Android: https://github.com/mozilla-mobile/fenix/pull/20642
- Check out this PR for an example on how to add new targeting attributes to experimenter: https://github.com/mozilla/experimenter/pull/6257
