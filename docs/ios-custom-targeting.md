---
id: ios-custom-targeting
title: Adding new targeting parameters to iOS
---
# Adding new targeting parameters to iOS
This page demonstrates how to add new targeting parameters to iOS, enabling experiment creators more specific targeting.
For more general documentation on targeting custom audiences, check out [the custom audiences docs](console/custom-audiences.md)

## Adding the attribute to the application
The Nimbus SDK exposes a new `customTargetingAttributes` parameter in it's initializer that is a `[String:String]` map. We can take advantage of this parameter to pass in new targeting attributes without modifying the Nimbus SDK at all.
:::warning
A current limitation is that both the key and the value of the targeting parameter are **strings**, therefore for any targeting parameters that require integer comparison, or any other richer `JEXL` expressions that cannot be done with strings, please reach out to the Nimbus SDK team.
:::


### How to add a new attribute
In [AppDelegate+Experiments.swift](https://github.com/tarikeshaq/firefox-ios/blob/add-first-run-targeting/Client/Application/AppDelegate%2BExperiments.swift#L17) the map `customTargetingAttributes` will be used to add custom targeting. To add any new values, simply add a new key-value pair to the map and that will be ready for targeting on the app. For example:
```swift
Experiments.customTargetingAttributes =  ["isFirstRun": "\(isFirstRun)", "newTargetingAttributeName": "targetingAttributeValue"]
```

## Adding the attribute on experimenter
After the targeting parameter is ready on the app, you will need to modify experimenter to allow creating experiments that target the parameter you created. Follow the instructions on [the custom audiences page](console/custom-audiences.md#how-to-add-a-new-custom-audience) to add the new targeting on experimenter.
:::warning
The targeting `JEXL` expression on experimenter **must** use the same name as the key given to the SDK. For example, for targeting users on their first run, the app defines a key-value pair, with key `isFirstRun`. The experimenter expression must use the same name (i.e `isFirstRun`)
:::

## Example
Check out this PR for an example on how to add new targeting attributes for iOS: https://github.com/mozilla-mobile/firefox-ios/pull/8952
<!--TODO: Add PR for adding the targeting attribute to experimenter -->