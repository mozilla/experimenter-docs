---
id: getting-started-for-ios-engineers
title: Getting Started for iOS Engineers
slug: getting-started-for-ios-engineers
---

## Introduction

Nimbus is an experimentation platform from Mozilla.

This document shows you how to set up the Nimbus SDK with a new iOS app. It assumes that your app is already using the [Glean SDK](https://github.com/mozilla/glean/blob/main/docs/dev/ios/setup-ios-build-environment.md) and [Rust Swift Components](https://github.com/mozilla/rust-components-swift).

[nimbus-cli]: https://github.com/mozilla/application-services/tree/main/components/support/nimbus-cli

## Building with Nimbus

### Generating Swift with the Nimbus FML

The [Feature Manifest Language](/fml-spec) provides type-safe access to configuration coming out of the Nimbus SDK, and is used to configure your application features, by generating Swift from a Feature Manifest.

A build phase needs to be added to the app, calling in to [`nimbus-fml.sh`](https://github.com/mozilla-mobile/focus-ios/blob/081a572c5ac63c81ef2bb67d07b977c8d1b98ba0/bin/nimbus-fml.sh). This is configured with a project specific [`nimbus-fml-configuration.sh`](https://github.com/mozilla-mobile/focus-ios/blob/081a572c5ac63c81ef2bb67d07b977c8d1b98ba0/bin/nimbus-fml-configuration.sh).

This will generate a Swift file in a `$MODULE/Generated/AppConfig.swift`, where `AppConfig` is the name of the manifest as specified in the FML files.

## The start-up sequence

The `nimbus` object, an instance of the `NimbusInterface` manages the connection between your app and the Nimbus SDK.

It can be constructed with a `NimbusBuilder`. Here is a minimal example:

```swift
import Foundation
import MozillaAppServices

public static var nimbus: NimbusInterface = {
    // App settings, to allow experiments to target the app name and the
    // channel. The values given here should match what `Experimenter`
    // thinks it is.
    let appSettings = NimbusAppSettings(
        appName: "example-app",
        channel: "release"
    )

    guard let dbPath = defaultDatabasePath() else {
        log.error("Nimbus didn't get to create, because of a nil dbPath")
        return NimbusDisabled.shared
    }

    return NimbusBuilder(dbPath: dbPath)
        .with(url: remoteSettingsURL)
        .with(featureManifest: AppConfig.shared)
        .build(appInfo: appSettings)
}()

static func defaultDatabasePath() -> String? {
    let paths = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)
    if paths.count == 0 {
        return nil
    }
    return paths[0].appendingPathComponent("nimbus.db").path
}
```

The Nimbus object should be constructed and configured as soon as the app is launched, for example, at the beginning of
[`application(_:willFinishLaunchingWithOptions)`](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623032-application).

```swift
func application(
    _ application: UIApplication,
    willFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil
) -> Bool {
    let sdk = nimbus // or wherever you've put the nimbus singleton

    // Fetch experiments on a background thread.
    // These will not be ready until the next startup.
    sdk.fetchExperiments()
}
```

### Getting errors out of `Nimbus`

By design, Nimbus is deliberately unobtrusive; if it fails then it should not crash, but continue as if not enrolled in any experiments.

The `errorReporter` callback is there to connect `Nimbus` to any error reporting framework in the rest of the app.

```swift
    return NimbusBuilder(dbPath: dbPath)
        // …
        .with(errorReporter: { err ->
            log.error("Error in Nimbus SDK", err)
        }
        // …
        .build(appInfo: appInfo)
```

### Connecting the `NimbusInterface` to FML generated code

The FML generated code has a runtime dependency on the `NimbusInterface`.

To connect it to the Nimbus object, we need to tell the `NimbusBuilder`. In this case, the generated class is `AppConfig.shared`.

```swift
    return NimbusBuilder(dbPath: dbPath)
        // …
        .with(featureManifest: AppConfig.shared)
        // …
        .build(appInfo: appInfo)
```

### Handling First Run experiments

Since `fetchExperiments` from the remote settings URL is slow, and we wish to be able have access to the Nimbus experimental configuration as early in start up as possible, Nimbus downloads and caches the experiment recipes on the `n`th run of the app and only applies them and makes them available to the app at the beginning of the _next_ i.e. the `(n + 1)`th run of the app.

Astute readers will notice that when `n = 0`, i.e. the very first time the app is run, there are no experiment recipes downloaded. If Remote Settings experiment recipes JSON payload is available as a `raw/` resource, it can be loaded in at first run:

```swift
    return NimbusBuilder(dbPath: dbPath)
        // …
        .isFirstRun(isFirstRun)
        .with(initialExperiments: Bundle.main.url(forResource: "initial_experiments", withExtension: "json"))
        .with(timeoutLoadingExperiments: TIME_OUT_LOADING_EXPERIMENT_FROM_DISK_MS)  // defaults to 200 (ms)
        // …
        .build(appInfo: appInfo)
```

The `initial_experiments.json` file can be downloaded, either as part of the build, or in an automated/timed job. e.g. this is the [Github Action workflow used by Firefox for iOS](https://github.com/mozilla-mobile/firefox-ios/blob/main/.github/workflows/update-nimbus-experiments.yml).

### Using the experiments preview collection

The preview collection is a staging area for new experiments to be tested on the device. This should be toggleable via the UI, but should trigger a restart.

Adding the `usePreviewCollection` flag allows the builder to configure a `NimbusInterface` object connected to the experiment recipes in the preview collection.

```swift
    return NimbusBuilder(dbPath: dbPath)
        // …
        .with(url: remoteSettingsURL)
        .using(previewCollection: usePreviewCollection)
        // …
        .build(appInfo: appInfo)
```

### Instrumenting the app for testing

The [`nimbus-cli`][nimbus-cli] allows QA and engineers to launch the app in different experimental configurations. It largely obviates the need for configuring Nimbus to use the preview collection, above.

To connect the `NimbusInterface` object to the command line, we need to feed the command line arguments through `NimbusBuilder`:

```swift
    return NimbusBuilder(dbPath: dbPath)
        // …
        .with(commandLineArguments: CommandLine.args)
        // …
        .build(appInfo: appInfo)
```

## A complete `NimbusBuilder` example

```swift
import Foundation
import MozillaAppServices

public static var nimbus: NimbusInterface = {
    let defaults = UserDefaults.standard
    let usePreviewCollection = defaults.bool(forKey: NimbusUsePreviewCollectionDefault)
    let isFirstRun = !defaults.bool(forKey: NimbusIsFirstRunDefault)
    if isFirstRun {
        defaults.set(false, forKey: NimbusIsFirstRunDefault)
    }

    // App settings, to allow experiments to target the app name and the
    // channel. The values given here should match what `Experimenter`
    // thinks it is.
    let appSettings = NimbusAppSettings(
        appName: "example-app",
        channel: "release",
        customTargetingAttributes: [
            "is_first_run": isFirstRun,
        ]
    )

    let errorReporter: NimbusErrorReporter = { err in
        log.error("Error in Nimbus SDK", err)
    }

    guard let dbPath = defaultDatabasePath() else {
        log.error("Nimbus didn't get to create, because of a nil dbPath")
        return NimbusDisabled.shared
    }

    let bundles = [
        Bundle.main,
        Bundle.main.fallbackTranslationBundle()
    ].compactMap { $0 }

    return NimbusBuilder(dbPath: dbPath)
        .with(url: remoteSettingsURL)
        .using(previewCollection: usePreviewCollection)
        .with(errorReporter: errorReporter)
        .with(initialExperiments: Bundle.main.url(forResource: "initial_experiments", withExtension: "json"))
        .isFirstRun(isFirstRun)
        .with(bundles: bundles)
        .with(featureManifest: AppConfig.shared)
        .build(appInfo: appSettings)
}()
```
