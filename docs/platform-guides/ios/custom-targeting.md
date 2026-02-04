---
id: ios-custom-targeting
title: iOS
slug: /platform-guides/ios/custom-targeting
---

This guide demonstrates how to add new targeting attributes to iOS, enabling experiment creators more specific targeting for custom audiences.

:::warning DEPRECATED
**This method of adding new targeting attributes is deprecated. Please use the method described in the [Recorded Targeting Context doc](/advanced/recording-targeting-context#adding-new-fields).**
:::

## Adding the Attribute to the Application
The Nimbus SDK exposes a new `customTargetingAttributes` parameter in its initializer that is a `[String:String]` map. We can take advantage of this parameter to pass in new targeting attributes without modifying the Nimbus SDK at all.
:::warning
A current limitation is that both the key and the value of the targeting attribute are **strings**. Please reach out to the Nimbus SDK team for any targeting attributes that require integer comparison, or any other richer `JEXL` expressions that cannot be done with strings.
:::

Note that since we need to add the targeting attribute on the client code, the attribute changes will have to ride the trains before they are available for targeting.


## How to Add a New Attribute
In [AppDelegate+Experiments.swift](https://github.com/tarikeshaq/firefox-ios/blob/add-first-run-targeting/Client/Application/AppDelegate%2BExperiments.swift#L17) the map `customTargetingAttributes` will be used to add custom targeting. Simply add a new key-value pair to the map and it will be available for targeting. For example:
```swift
Experiments.customTargetingAttributes =  ["isFirstRun": "\(isFirstRun)", "newTargetingAttributeName": "targetingAttributeValue"]
```

## Adding the Attribute on Experimenter

After the targeting attribute is ready on the app, you will need to modify experimenter to allow creating experiments that target the attribute you created. Follow the instructions on [the custom audiences page](/advanced/custom-audiences#how-to-add-a-new-custom-audience) to add the new targeting on experimenter.
:::warning
The targeting `JEXL` expression on experimenter **must** use the same name as the key given to the SDK. For example, for targeting users on their first run, the app defines a key-value pair, with key `isFirstRun`. The experimenter expression must use the same name (i.e `isFirstRun`)
:::

## Examples
- Check out this PR for an example on how to add new targeting attributes for iOS: https://github.com/mozilla-mobile/firefox-ios/pull/8952
- Check out this PR for an example on how to add new targeting attributes to experimenter: https://github.com/mozilla/experimenter/pull/6257
