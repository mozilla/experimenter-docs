---
id: android-custom-targeting
title: Firefox for Android (Fenix) Targeting Guide
slug: /platform-guides/android/custom-targeting
---

This guide covers how targeting works for Firefox for Android (Fenix) experiments and rollouts in Nimbus. It explains the available targeting attributes, how to write JEXL expressions, and how to test and debug your targeting.

## How Targeting Works

When you create an experiment in Experimenter, you configure **who** should be enrolled. Targeting happens at two levels:

1. **Basic targeting** (UI fields) — application, channel, Firefox version range, locale, country, language
2. **Advanced targeting** — a [JEXL](https://github.com/mozilla/mozjexl) expression evaluated against the client's targeting context to filter users by install age, device properties, UTM attribution, and more

Both levels are combined into a single JEXL expression that the Nimbus SDK evaluates on every Firefox for Android installation. If the expression evaluates to `true`, the client is eligible for enrollment.

### Evaluation Flow

1. Firefox for Android starts and initializes the Nimbus SDK
2. The SDK fetches experiment recipes from Remote Settings
3. For each experiment, the SDK evaluates the `targeting` JEXL expression against the current targeting context
4. Clients that match targeting and fall into an eligible bucket are enrolled. Existing enrollments that no longer match targeting are unenrolled (unless protected by a [sticky clause](#sticky-targeting)).

## Basic Targeting (UI Fields)

These are configured directly in the Experimenter audience form:

| Field | Description |
|-------|-------------|
| **Channel** | A single channel: `release`, `beta`, `nightly`, or `developer`. On mobile, channel is determined by the app ID, so each channel is a separate application. |
| **Min/Max Version** | Firefox version range (e.g., 134 to 140). Uses `app_version|versionCompare(...)` internally. |
| **Locales** | Browser locale codes (e.g., `en-US`, `de`). Can include or exclude. |
| **Languages** | Two-letter language codes (e.g., `en`, `de`). Can include or exclude. This is extracted from the locale. |
| **Countries** | Country codes from the locale region (e.g., `US`, `DE`). Can include or exclude. |
| **Population %** | Percentage of eligible users to enroll (bucketing). |

These fields are translated into JEXL conditions that are combined with any advanced targeting you specify.

## Advanced Targeting

Advanced targeting uses pre-defined configurations or custom JEXL expressions. In the Experimenter UI, you select from a dropdown of pre-defined targeting configs, each backed by a JEXL expression.

These configs are defined in [`targeting/constants.py`](https://github.com/mozilla/experimenter/blob/main/experimenter/experimenter/targeting/constants.py) in the Experimenter repo. To add a new one, see [Adding New Targeting Options](#adding-new-targeting-options) below.

## Targeting Attributes Reference

The targeting context for Firefox for Android is assembled from multiple sources:

1. **App context** — provided by the application at startup (app name, version, channel, device info)
2. **Computed attributes** — calculated by the Nimbus SDK (days since install, language, region)
3. **Recorded context** — app-specific attributes defined in [`RecordedNimbusContext.kt`](https://searchfox.org/mozilla-mobile/source/fenix/app/src/main/java/org/mozilla/fenix/experiments/RecordedNimbusContext.kt) that are recorded to Glean for population sizing
4. **Custom attributes** — additional attributes from [`CustomAttributeProvider.kt`](https://searchfox.org/mozilla-mobile/source/fenix/app/src/main/java/org/mozilla/fenix/messaging/CustomAttributeProvider.kt), available at startup for experiment targeting

### App & Version

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `app_name` | `string` | Application name (always `"fenix"`) | `app_name == 'fenix'` |
| `app_id` | `string` | Application package ID | `app_id == 'org.mozilla.firefox'` |
| `app_version` | `string` | App version string (e.g., `"147.0"`) | `app_version\|versionCompare('134.!') >= 0` |
| `channel` | `string` | Build channel (`release`, `beta`, `nightly`, `developer`) | Usually set via UI, not JEXL |

:::note
Version targeting is typically set via the Min/Max Version UI fields (which generate `app_version|versionCompare('X.!') >= 0` for min and `app_version|versionCompare('X.*') <= 0` for max automatically).
:::

### Install & Update

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `days_since_install` | `number` | Days since app was first installed | `days_since_install < 7` |
| `days_since_update` | `number` | Days since last app update | `days_since_update < 7 && days_since_install >= 7` |
| `is_first_run` | `boolean` | True during the app's first run | `is_first_run` |
| `number_of_app_launches` | `number` | Total number of app launches | `number_of_app_launches <= 20` |

:::note
`isFirstRun` (camelCase, string `"true"`/`"false"`) exists for backwards compatibility. Prefer `is_first_run` (snake_case, boolean) for new targeting.
:::

### Locale & Region

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `locale` | `string` | Full locale tag (e.g., `en-US`) | `locale in ['en-US', 'en-GB']` |
| `language` | `string` | Two-letter language code extracted from locale (e.g., `en`) | `language in ['en', 'fr']` |
| `region` | `string` | Country code extracted from locale (e.g., `US`) | `region in ['US', 'CA']` |

:::note
Locale, language, and region targeting is typically set via the Experimenter UI fields, but can also be used directly in advanced targeting expressions.
:::

### Device & OS

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `android_sdk_version` | `string` | Android API level as a string (e.g., `"33"` for Android 13) | `android_sdk_version\|versionCompare('33') >= 0` |
| `device_manufacturer` | `string` | Device manufacturer (from `Build.MANUFACTURER`) | `device_manufacturer == 'Google'` |
| `device_model` | `string` | Device model (from `Build.MODEL`) | `device_model == 'Pixel 8'` |
| `is_large_device` | `boolean` | Whether the device has a large screen | `is_large_device` |
| `architecture` | `string` | CPU architecture (e.g., `arm`, `x86`) | |

### Install Attribution (UTM)

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `install_referrer_response_utm_source` | `string` | UTM source from install referrer | `install_referrer_response_utm_source == 'eea-browser-choice'` |
| `install_referrer_response_utm_medium` | `string` | UTM medium | |
| `install_referrer_response_utm_campaign` | `string` | UTM campaign | |
| `install_referrer_response_utm_term` | `string` | UTM term | |
| `install_referrer_response_utm_content` | `string` | UTM content | |

### Terms of Use & Privacy

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `user_accepted_tou` | `boolean` | Whether the user has accepted Terms of Use | `user_accepted_tou == false && days_since_install >= 28` |
| `no_shortcuts_or_stories_opt_outs` | `boolean` | Whether the user has not opted out of sponsored shortcuts/stories | `no_shortcuts_or_stories_opt_outs == true` |
| `tou_points` | `number` | Terms of Use experience points (scoring for ToU targeting tiers) | `tou_points == 0` |

### Add-ons

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `addon_ids` | `string[]` | List of installed add-on IDs | `'uBlock0@raymondhill.net' in addon_ids` |

**Detecting ad blockers:**

```
// Has uBlock Origin installed
'uBlock0@raymondhill.net' in addon_ids

// Does NOT have any common ad blocker
('uBlock0@raymondhill.net' in addon_ids) == false
&& ('{d10d0bf8-f5b5-c8b4-a8b2-2b9879e08c5d}' in addon_ids) == false
&& ('adguardadblocker@adguard.com' in addon_ids) == false
&& ('firefox@ghostery.com' in addon_ids) == false
```

### Experiment & Rollout Enrollment

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `is_already_enrolled` | `boolean` | Whether the client is already enrolled in this experiment | Used in sticky clauses |
| `active_experiments` | `string[]` | Currently enrolled experiment slugs | `'my-experiment' in active_experiments` |
| `enrollments` | `string[]` | All experiment enrollments (including past) | `('other-slug' in enrollments) == false` |
| `enrollments_map` | `object` | Experiment slug → branch slug mapping | Used for branch-level exclusion |

### Additional Attributes (Messaging / Display Triggers)

These attributes are available from [`CustomAttributeProvider.kt`](https://searchfox.org/mozilla-mobile/source/fenix/app/src/main/java/org/mozilla/fenix/messaging/CustomAttributeProvider.kt) and are primarily used for messaging display triggers but can also be used in experiment targeting:

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `is_default_browser` | `boolean` | Whether Firefox is the default browser | `is_default_browser` |
| `are_notifications_enabled` | `boolean` | Whether notification permissions are granted | `are_notifications_enabled` |
| `search_widget_is_installed` | `boolean` | Whether the search widget is on the home screen | `search_widget_is_installed` |
| `is_fxa_signed_in` | `boolean` | Whether the user is signed into Firefox Account | `is_fxa_signed_in` |
| `fxa_connected_devices` | `number` | Number of connected FxA devices | `fxa_connected_devices >= 2` |
| `date_string` | `string` | Current date as `yyyy-MM-dd` | |
| `adjust_campaign` | `string` | Adjust campaign ID | |
| `adjust_network` | `string` | Adjust network | |
| `adjust_ad_group` | `string` | Adjust ad group | |
| `adjust_creative` | `string` | Adjust creative | |

:::warning
Attributes from `CustomAttributeProvider` are evaluated at startup. Attributes that require initialization after startup (like `are_notifications_enabled`) **cannot** reliably target first-run experiments — they will only be accurate from the second startup onward.
:::

## Behavioral Targeting (Event Queries)

Firefox for Android supports **behavioral targeting** via event queries — this is a capability unique to the cross-platform Nimbus SDK and is **not available on desktop**.

Event queries let you target users based on their past behavior by querying the Nimbus event store. Events are bucketed by time interval.

### Available Events

| Event | Description |
|-------|-------------|
| `events.app_opened` | Application opened |
| `sync_auth.sign_in` | User signed into Sync |

### Event Query Transforms

| Transform | Returns | Description |
|-----------|---------|-------------|
| `\|eventSum(interval, bucket_count, starting_bucket)` | `number` | Sum of event counts over the interval |
| `\|eventCountNonZero(interval, bucket_count, starting_bucket)` | `number` | Number of buckets with at least one event |
| `\|eventAverage(interval, bucket_count, starting_bucket)` | `number` | Average events per bucket |
| `\|eventAveragePerNonZeroInterval(interval, bucket_count, starting_bucket)` | `number` | Average events per non-zero bucket |
| `\|eventLastSeen(interval, starting_bucket)` | `number` | Buckets since the event last occurred |

**Interval values:** `Minutes`, `Hours`, `Days`, `Weeks`, `Months`, `Years`

**Examples from targeting configs:**

```
// Core active users: opened app at least 21 of the last 28 days
'events.app_opened'|eventCountNonZero('Days', 28, 0) >= 21

// Recently logged in: signed into Sync within the last 12 weeks
'sync_auth.sign_in'|eventCountNonZero('Weeks', 12, 0) >= 1
```

### Pre-Computed Event Queries

The [`RecordedNimbusContext`](https://searchfox.org/mozilla-mobile/source/fenix/app/src/main/java/org/mozilla/fenix/experiments/RecordedNimbusContext.kt) pre-computes one event query and makes it available as a simple numeric attribute:

| Attribute | Type | Description | Equivalent Event Query |
|-----------|------|-------------|----------------------|
| `events.days_opened_in_last_28` | `number` | Days the app was opened in the last 28 days | `'events.app_opened'\|eventCountNonZero('Days', 28, 0)` |

## JEXL Expression Syntax

Nimbus uses [mozjexl](https://github.com/mozilla/mozjexl). The same operators and syntax are available on all platforms — see the [Desktop Targeting Guide](https://github.com/mozilla/mozjexl) for the full JEXL reference.

### Key Filters for Android

In addition to the standard filters, the Nimbus SDK provides event query transforms for behavioral targeting:

| Filter | Description | Example |
|--------|-------------|---------|
| `\|versionCompare` | Compare version strings | `android_sdk_version\|versionCompare('33') >= 0` |
| `\|eventCountNonZero` | Count non-zero event buckets | `'events.app_opened'\|eventCountNonZero('Days', 28, 0) >= 21` |
| `\|eventSum` | Sum event counts over interval | `'events.app_opened'\|eventSum('Days', 7, 0)` |
| `\|eventLastSeen` | Buckets since event last occurred | `'events.app_opened'\|eventLastSeen('Days', 0)` |

## Sticky Targeting

Targeting is re-evaluated periodically. If a targeting expression references attributes that can change, a client could be unenrolled. To prevent this, mark the experiment as using **sticky enrollment**.

On Android, the sticky clause uses `is_already_enrolled`:

```
(is_already_enrolled) || (<original expression>)
```

The same sticky/non-sticky split applies as on desktop — the same sticky/non-sticky split described in the Sticky Targeting section of the Desktop Targeting Guide applies here.

## First-Run Targeting

First-run experiments target users during their very first app session. These use `is_first_run` (or the legacy `isFirstRun == 'true'`).

```
// First-run targeting
is_first_run

// Legacy form (backwards compatibility)
isFirstRun == 'true'

// First-run on Android 13+ (API 33)
(android_sdk_version|versionCompare('33') >= 0) && is_first_run

// Combined first-run check (both forms for compatibility)
(isFirstRun == 'true' || is_first_run == true) && days_since_install < 7
```

:::warning
Custom attributes from `CustomAttributeProvider` that require initialization after startup (like `are_notifications_enabled`, `is_default_browser`) are **not available** for first-run targeting. Only attributes set before the Nimbus SDK initializes can be used.
:::

## Common Targeting Patterns

### New users (installed less than 7 days ago)

```
days_since_install < 7
```

### Existing users (7+ days since install)

```
days_since_install >= 7
```

### Recently updated users (not new)

```
days_since_update < 7 && days_since_install >= 7
```

### Users in the first 2 weeks

```
days_since_install < 15
```

### Core active users (21+ days active in last 28)

```
'events.app_opened'|eventCountNonZero('Days', 28, 0) >= 21
```

### Recently logged into Sync

```
'sync_auth.sign_in'|eventCountNonZero('Weeks', 12, 0) >= 1
```

### Android version requirements

```
// Android 8.0+ (API 26)
android_sdk_version|versionCompare('26') >= 0

// Android 10+ (API 29)
android_sdk_version|versionCompare('29') >= 0

// Android 13+ (API 33)
android_sdk_version|versionCompare('33') >= 0
```

### Early vs. later app launches

```
// First 20 launches
number_of_app_launches <= 20

// After 20 launches
number_of_app_launches > 20
```

### Large screen devices

```
is_large_device
```

### EU DMA browser choice users

```
install_referrer_response_utm_source == 'eea-browser-choice'
```

### Terms of Use targeting

```
// Existing users who haven't accepted ToU
user_accepted_tou == false && days_since_install >= 28

// Users who accepted ToU
user_accepted_tou == true

// ToU experience point tiers
tou_points == 0
tou_points == 1
tou_points > 1
```

### Ad blocker detection

```
// Has any common ad blocker
'uBlock0@raymondhill.net' in addon_ids
|| '{d10d0bf8-f5b5-c8b4-a8b2-2b9879e08c5d}' in addon_ids
|| 'adguardadblocker@adguard.com' in addon_ids
|| 'firefox@ghostery.com' in addon_ids
```

### Mutual exclusion with other experiments

```
('other-experiment-slug' in enrollments) == false
```

## Recorded Targeting Context (Telemetry)

Firefox for Android records a snapshot of targeting attribute values via the `nimbus_system.recorded_nimbus_context` Glean metric, submitted in the `nimbus` ping. This is used for:

- **Population sizing** — estimating how many clients match a targeting expression before launch
- **Debugging** — verifying what attribute values a client had when targeting was evaluated

The recording logic is in [`RecordedNimbusContext.kt`](https://searchfox.org/mozilla-mobile/source/fenix/app/src/main/java/org/mozilla/fenix/experiments/RecordedNimbusContext.kt). The recorded attributes include: `is_first_run`, `event_query_values.days_opened_in_last_28`, UTM parameters, `android_sdk_version`, `app_version`, `locale`, `days_since_install`, `days_since_update`, `language`, `region`, `device_manufacturer`, `device_model`, `user_accepted_tou`, `no_shortcuts_or_stories_opt_outs`, `addon_ids`, and `tou_points`.

## Testing & Debugging

### Nimbus DevTools

The [Nimbus Developer Tools](https://github.com/mozilla-extensions/nimbus-devtools) can be used for testing targeting on Android via the Nimbus CLI or by connecting to Firefox for Android. See the [Nimbus Developer Tools Guide](/resources/nimbus-devtools-guide) for details.

### Preview Mode

You can test experiments using Preview mode:

1. Set the experiment to Preview in Experimenter
2. In Firefox for Android, navigate to `about:config` and enable the Nimbus preview collection
3. The app will fetch and evaluate the preview recipe

### Common Mistakes

- **Using `version` instead of `app_version`** — on Android, the version attribute is `app_version`, not `version`
- **Using `isFirstRun` (string) instead of `is_first_run` (boolean)** — the camelCase form is legacy and compares as a string (`== 'true'`); prefer the snake_case boolean form
- **First-run targeting with late-init attributes** — attributes like `are_notifications_enabled` or `is_default_browser` are not available at first startup
- **Forgetting sticky enrollment** — if your targeting checks a changeable attribute (like `days_since_install`), mark the experiment as sticky
- **Using desktop-style attribute names** — Android uses snake_case (`days_since_install`, `is_first_run`), not camelCase

## Adding New Targeting Options

To add a new pre-defined targeting option to the Experimenter dropdown:

1. **Add to `targeting/constants.py`** — create a new `NimbusTargetingConfig` instance with the JEXL expression, description, and `Application.FENIX.name` in `application_choice_names`
2. **Test locally** — verify the JEXL expression evaluates correctly
3. **Submit a PR** to `mozilla/experimenter` with the new config

If your targeting requires a **new attribute** that doesn't exist yet:

1. **Add the attribute** to [`RecordedNimbusContext.kt`](https://searchfox.org/mozilla-mobile/source/fenix/app/src/main/java/org/mozilla/fenix/experiments/RecordedNimbusContext.kt) — add the field, include it in `toJson()` (which makes it available in the targeting context), and include it in `record()` (which records it to Glean for population sizing)
2. **Add a corresponding Glean metric** in the Fenix `metrics.yaml` for the recorded value
3. **If the attribute is only needed at startup** (not for population sizing), add it to [`CustomAttributeProvider.kt`](https://searchfox.org/mozilla-mobile/source/fenix/app/src/main/java/org/mozilla/fenix/messaging/CustomAttributeProvider.kt) instead
4. **Wait for the release train** — the attribute will be available starting in the Firefox for Android version that ships the change
5. **Add the targeting config** to Experimenter's `constants.py` as above

See [Recording Targeting Context](/advanced/recording-targeting-context) and [Custom Audiences](/advanced/custom-audiences) for more details on the process.

:::warning Legacy: customTargetingAttributes
An older method of adding targeting attributes used the `customTargetingAttributes` parameter on `NimbusAppInfo`:

```kotlin
val appInfo = NimbusAppInfo(
    appName = "fenix",
    channel = BuildConfig.BUILD_TYPE,
    customTargetingAttributes = mapOf(
        "newTargetingAttributeName" to "targetingAttributeValue",
    )
)
```

**This approach is deprecated.** It only supports string key/value pairs and does not record values to Glean for population sizing. Use `RecordedNimbusContext` instead, as described above. See the [Recorded Targeting Context doc](/advanced/recording-targeting-context#adding-new-fields) for the current method.
:::

## Further Reading

- [Behavioral Targeting](/advanced/behavioral-targeting) — event query transforms and available events
- [Recording Targeting Context](/advanced/recording-targeting-context) — how to add new recorded attributes
- [Custom Audiences](/advanced/custom-audiences) — adding new targeting options to the Experimenter dropdown
- [Nimbus Developer Tools Guide](/resources/nimbus-devtools-guide) — testing and debugging tools
