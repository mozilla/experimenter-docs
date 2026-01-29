---
title: Feature Definition
slug: /technical-reference/feature-definition
sidebar_position: 2
---

In the experimentation ecosystem, experiment surfaces are described as features. A feature is an area of code instrumented with telemetry and accessible for remote configuration. It can be as small as a single function or as complex as a whole page. Some examples:

    aboutwelcome: The about:welcome page in Desktop
    homescreen: The homescreen page in Fenix
    tabTrayFeature: The tab tray in Firefox iOS


Features are defined in a Feature Manifest file for the application, and the client code uses the Nimbus SDK to access variables associated with those features.

After landing a new feature in `mozilla-central` and before doing an Experiment or Rollout using it, it is recommended to go through QA to provide an extra layer of stability and possibly be informed of certain limitations that could exist with the feature. See **To test your feature** for information on how to involve QA. 

## To define your feature in the feature manifest file
First, look at what is already defined in the manifest file:
* [Desktop](https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/FeatureManifest.yaml)
* Mobile
    * [Fenix (Firefox Android)](https://github.com/mozilla-mobile/firefox-android/blob/main/fenix/app/nimbus.fml.yaml)
    * [Focus Android](https://github.com/mozilla-mobile/firefox-android/blob/main/focus-android/app/nimbus.fml.yaml)
    * [Firefox iOS](https://github.com/mozilla-mobile/firefox-ios/blob/main/nimbus.fml.yaml)
    * [Focus iOS](https://github.com/mozilla-mobile/focus-ios/blob/main/nimbus.fml.yaml)

## To test your feature
Starting with 2023, the Ecosystem QA team has begun to test all the available Desktop Nimbus Features and their configurations. This is done in an attempt to ease testing on future experiments using a feature config (old or new) and to provide a baseline health report for it. 

For engineers looking to test a new config: 
* See [this document](https://docs.google.com/document/d/1oz1YyaaBI-oHUDsktWA-dLtX7WzhYqs7C121yOPKo2w/edit) for steps on how to file a QA request. When logging the ticket, please use the `Feature-Configuration` label in JIRA to mark it as such. [Example](https://mozilla-hub.atlassian.net/browse/QA-1785)
    * If you have documentation regarding the feature’s configuration capabilities, please link it to the QA ticket as this helps with Test Plan and Test Case creation.      
* The most commonly QA asked questions for feature configs are:
    * What specific functionality is enabled in the browser and how exactly could we see it in action?
    * Are there any exposed user preferences in about:preferences when using the feature?
    * If the feature has an `exposure` event, when does it trigger?
    * Does the feature have specific telemetry events and which telemetry data pipeline are we using? Legacy or Glean?
