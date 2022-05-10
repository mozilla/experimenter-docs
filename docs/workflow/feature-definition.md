---
title: Feature Definition
sidebar_label: Feature Definition
slug: /feature-definition
---

In the experimentation ecosystem, experiment surfaces are described as features. A feature is an area of code instrumented with telemetry and accessible for remote configuration. It can be as small as a single function or as complex as a whole page. Some examples:

    aboutwelcome: The about:welcome page in Desktop
    homescreen: The homescreen page in Fenix
    tabTrayFeature: The tab tray in Firefox iOS


Features are defined in a Feature Manifest file for the application, and the client code uses the Nimbus SDK to access variables associated with those features.

## To define your feature in the feature manifest file
* Desktop
* Mobile
