---
title: Feature Definition
slug: /technical-reference/feature-definition
sidebar_position: 2
---

In the Nimbus ecosystem, a **feature** is an area of code instrumented for experiments and remote configuration. It can be as small as a single function or as complex as a whole page. Some examples:

- `aboutwelcome` — the about:welcome page in Desktop
- `homescreen` — the homescreen page in Fenix
- `tabTrayFeature` — the tab tray in Firefox iOS

Features are defined in a manifest file specific to your platform. The manifest declares what variables the feature exposes, how they connect to preferences, and what telemetry the feature records.

## Define your feature

Choose the guide for your platform:

- **Desktop** — add your feature to [`FeatureManifest.yaml`](https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/FeatureManifest.yaml). See the [Desktop Feature Manifest Reference](/platform-guides/desktop/feature-manifest) for the complete schema.
- **Mobile (Android / iOS)** — add your feature to your app's `.fml.yaml` file. See the [Feature Manifest Language (FML) specification](/technical-reference/fml/fml-spec) for the complete schema.
  - [Fenix (Firefox Android)](https://github.com/mozilla-mobile/firefox-android/blob/main/fenix/app/nimbus.fml.yaml)
  - [Focus Android](https://github.com/mozilla-mobile/firefox-android/blob/main/focus-android/app/nimbus.fml.yaml)
  - [Firefox iOS](https://github.com/mozilla-mobile/firefox-ios/blob/main/nimbus.fml.yaml)
  - [Focus iOS](https://github.com/mozilla-mobile/focus-ios/blob/main/nimbus.fml.yaml)
- **Web (Cirrus)** — see the [Cirrus integration guide](/platform-guides/web/integration).

## QA testing your feature

After landing a new feature, it is recommended to go through QA before running experiments or rollouts. This provides an extra layer of stability and can surface limitations early.

- See [this document](https://docs.google.com/document/d/1oz1YyaaBI-oHUDsktWA-dLtX7WzhYqs7C121yOPKo2w/edit) for steps on how to file a QA request. Use the `Feature-Configuration` label in Jira. ([Example](https://mozilla-hub.atlassian.net/browse/QA-1785))
- If you have documentation about the feature's configuration, link it to the QA ticket — this helps with test plan and test case creation.

Common questions QA will ask:
- What specific functionality is enabled and how can we see it in action?
- Are there any exposed user preferences in about:preferences?
- If the feature has an exposure event, when does it trigger?
- Does the feature have specific telemetry events and which pipeline (Legacy or Glean)?
