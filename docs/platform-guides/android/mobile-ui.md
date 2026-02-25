---
id: getting-started-mobile-required-ui 
title: Required UI
slug: /platform-guides/android/mobile-ui
---

Required user interface components for apps integrating with the Nimbus SDK.

## User Interface Requirements

Currently Nimbus provides no user-interface components of its own, though provides API to connect to existing settings screens.

## Global Opt-Out/Opt-In for Experiments

The settings page should include a `Studies` toggle, which allows users to opt-in or opt-out of experiments. The example from Firefox for iOS is shown:

<img src="/img/firefox-ios/studies-toggle.png" width="300px" />

Toggling the `Studies` flag should set the `Nimbus` value for `globalUserParticipation`:

```kotlin
nimbus.globalUserParticipation = flag
```

## Resetting Telemetry Identifiers

During experiment enrollment, telemetry is generated which can connect the user to the experiment enrollment.

When the user opts-in or opts-out of telemetry collection, the toggle should call:

```kotlin
nimbus.resetTelemetryIdentifiers()
```

This disqualifies existing enrollments. and breaks any connection with experiment enrollment and the enrollment telemetry.

## QA Tooling

> The following are nice-to-haves, obviated by the use of the [`nimbus-cli`][nimbus-cli].

[nimbus-cli]: https://github.com/mozilla/application-services/tree/main/components/support/nimbus-cli

### Disabling Experiment Fetch

For QA testing, you can disable fetching of experiments from Remote Settings. This is used by the `nimbus-cli` tooling and is not intended for end users.

```kotlin
nimbus.setFetchEnabled(false) // disable fetching
nimbus.isFetchEnabled()       // check current state
```

### Preview Collection

To allow testing of experiments before they are published, the client should allow configuring the Nimbus startup to use the `preview-collection`.

<img src="/img/fenix/preview-collection.png" width="300px" />

The above shows a non-user visible settings screen in Fenix. The toggle sets a `Defaults`/`SharedPreferences` flag which is [read at startup to configure `Nimbus` startup](/platform-guides/android/integration#using-the-experiments-preview-collection).

The preview collection is loaded on the next restart, and available to the app on the restart after that.

### Manual Opt-In of Experiments

To allow the manual opt-in of a particular branch, the app must provide a screen to list all available experiments:

```kotlin
val experiments: List<AvailableExperiment> = nimbus.getAvailableExperiments()
```

<img src="/img/fenix/experiments-screen.png" width="300px" /><img src="/img/fenix/experiments-screen-branches.png" width="300px" />

To get the list of branches from an available experiment; you can get the branch slug that the client is enrolled in with `getExperimentBranch`:

```kotlin
val branches = experiment.branches
val branchSlugs: List<String> = branches.map { it.slug }
val enrolledBranchSlug = nimbus.getExperimentBranch(experiment.slug)
```

You can opt-in and out of a given experiment.

```kotlin
// opt in to a particular branch
val newBranchSlug = branchSlugs.get(0)
if (enrolledBranchSlug != newBranchSlug) {
    nimbus.optIn(experiment.slug, newBranchSlug)
} else {
    nimbus.optOut(experiment.slug)
}
```
