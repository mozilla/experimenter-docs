---
id: fenix-custom-targeting
title: Adding new targeting parameters to Fenix
---
# Adding new targeting parameters to Fenix
This page demonstrates how to add new targeting parameters to Fenix, enabling experiment creators more specific targeting.
For more general documentation on targeting custom audiences, check out [the custom audiences docs](console/custom-audiences.md)

## Adding the attribute to the application
The Nimbus SDK exposes a new `customTargetingAttributes` parameter in its initializer that is a `Map<String, String>` map. We can take advantage of this parameter to pass in new targeting attributes without modifying the Nimbus SDK at all.
:::warning
A current limitation is that both the key and the value of the targeting parameter are **strings**. Please reach out to the Nimbus SDK team for any targeting parameters that require integer comparison, or any other richer `JEXL` expressions that cannot be done with strings.
:::


### How to add a new attribute
In [NimbusSetup.kt](https://github.com/travis79/fenix/blob/sdk-344-first-run-flag/app/src/main/java/org/mozilla/fenix/experiments/NimbusSetup.kt#L67) the map `customTargetingAttributes` will be used to add custom targeting. Simply add a new key-value pair to the map and it will be available for targeting. For example:
```kotlin
customTargetingAttributes = mapOf(
    "isFirstRun" to context.settings().isFirstRun.toString(),
    "newTargetingAttributeName" to "targetingAttributeValue"
)
```

## Adding the attribute on experimenter
After the targeting parameter is ready on the app, you will need to modify experimenter to allow creating experiments that target the parameter you created. Follow the instructions on [the custom audiences page](console/custom-audiences.md#how-to-add-a-new-custom-audience) to add the new targeting on experimenter.
:::warning
The targeting `JEXL` expression on experimenter **must** use the same name as the key given to the SDK. For example, for targeting users on their first run, the app defines a key-value pair, with key `isFirstRun`. The experimenter expression must use the same name (i.e `isFirstRun`)
:::

## Example
Check out this PR for an example on how to add new targeting attributes for Fenix: https://github.com/mozilla-mobile/fenix/pull/20642
Check out this PR for an example on how to add new targeting attributes to experimenter: https://github.com/mozilla/experimenter/pull/6257
