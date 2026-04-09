---
id: desktop-targeting
title: Desktop Targeting Guide
slug: /platform-guides/desktop/targeting
---

This guide covers how targeting works for Firefox Desktop experiments and rollouts in Nimbus. It explains the available targeting attributes, how to write JEXL expressions, and how to test and debug your targeting.

## How Targeting Works

When you create an experiment in Experimenter, you configure **who** should be enrolled. Targeting happens at two levels:

1. **Basic targeting** (UI fields) — application, channel, Firefox version range, locale, country
2. **Advanced targeting** — a [JEXL](https://github.com/mozilla/mozjexl) expression evaluated against the client's targeting context to filter users by preferences, profile age, installed add-ons, and more

Both levels are combined into a single JEXL expression that the Nimbus Desktop Client evaluates on every Firefox installation. If the expression evaluates to `true`, the client is eligible for enrollment.

### Evaluation Flow

1. Firefox starts up and initializes the Nimbus Desktop Client
2. The client fetches experiment recipes from Remote Settings
3. For each experiment, the client evaluates the `targeting` JEXL expression against the current targeting context
4. Clients that match targeting and fall into an eligible bucket are enrolled. Existing enrollments that no longer match targeting are unenrolled.

## Basic Targeting (UI Fields)

These are configured directly in the Experimenter audience form:

| Field | Description |
|-------|-------------|
| **Channels** | One or more of `release`, `beta`, `nightly`, `esr`. Desktop supports selecting **multiple channels** simultaneously (e.g., release + beta). Selecting no channels means all channels, including ESR and Unbranded builds. |
| **Min/Max Version** | Firefox version range (e.g., 134 to 140). Uses `firefoxVersion` internally. |
| **Locales** | Browser locale codes (e.g., `en-US`, `de`). Can include or exclude. |
| **Countries** | Country codes from GeoIP (e.g., `US`, `DE`). Can include or exclude. |
| **Population %** | Percentage of eligible users to enroll (bucketing). |

These fields are translated into JEXL conditions that are combined with any advanced targeting you specify.

## Advanced Targeting

Advanced targeting uses pre-defined configurations or custom JEXL expressions. In the Experimenter UI, you select from a dropdown of pre-defined targeting configs, each backed by a JEXL expression.

These configs are defined in [`targeting/constants.py`](https://github.com/mozilla/experimenter/blob/main/experimenter/experimenter/targeting/constants.py) in the Experimenter repo. To add a new one, see [Adding New Targeting Options](#adding-new-targeting-options) below.

## Targeting Attributes Reference

The following attributes are the official Nimbus desktop targeting context. These are the attributes available in JEXL targeting expressions and recorded in the `nimbus-targeting-context` telemetry ping. The canonical list is defined in [`TargetingContextRecorder.sys.mjs`](https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/lib/TargetingContextRecorder.sys.mjs).

### Profile & User State

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `profileAgeCreated` | `number` | Profile creation date as Unix timestamp (seconds since epoch) | `(currentDate\|date - profileAgeCreated\|date) / 86400000 >= 28` |
| `currentDate` | `Date` | Current date/time | Used with `\|date` filter for arithmetic |
| `isFirstStartup` | `boolean` | True during the browser's very first startup (requires `--first-startup` flag from installer) | `isFirstStartup` |
| `userMonthlyActivity` | `array` | Daily activity for the past 28 days, each entry has `numberOfURLsVisited` and `date` | `userMonthlyActivity\|length >= 14` |
| `userPrefersReducedMotion` | `boolean` | User has the reduced motion accessibility preference enabled | `!userPrefersReducedMotion` |
| `totalBookmarksCount` | `number` | Total number of bookmarks | `totalBookmarksCount >= 5` |
| `addressesSaved` | `number` | Number of saved addresses for autofill | `addressesSaved >= 1` |
| `hasPinnedTabs` | `boolean` | Has pinned tabs in any open window | `hasPinnedTabs` |
| `profileGroupProfileCount` | `number` | Number of profiles in the current profile group (0 if feature not enabled) | `profileGroupProfileCount > 1` |

**Common profile age patterns:**

```
// New profile (created within 24 hours)
(currentDate|date - profileAgeCreated|date) / 3600000 <= 24

// Profile at least 28 days old
(currentDate|date - profileAgeCreated|date) / 86400000 >= 28

// Profile less than 7 days old
(currentDate|date - profileAgeCreated|date) / 86400000 < 7
```

**User engagement tiers** (based on active days in the last 28):

| Tier | Active Days | Expression |
|------|-------------|------------|
| Infrequent | 1–6 | `userMonthlyActivity\|length >= 1 && userMonthlyActivity\|length < 7` |
| Casual | 7–13 | `userMonthlyActivity\|length >= 7 && userMonthlyActivity\|length < 14` |
| Regular | 14–20 | `userMonthlyActivity\|length >= 14 && userMonthlyActivity\|length < 21` |
| Core | 21+ | `userMonthlyActivity\|length >= 21` |

### Browser Version & Build

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `firefoxVersion` | `number` | Major Firefox version (e.g., 147) | `firefoxVersion >= 134` |
| `version` | `string` | Full version string (e.g., `"147.0.1"`) | `version\|versionCompare('134.!') >= 0` |

:::note
Version targeting is typically set via the Min/Max Version UI fields (which generate `version|versionCompare('X.!') >= 0` for min and `version|versionCompare('X.*') <= 0` for max automatically). The `firefoxVersion` attribute is commonly used in advanced targeting configs for simpler major-version checks.
:::
| `buildId` | `number` | Build ID as a number (e.g., `20260101000000`) | `buildId >= 20260101000000` |
| `browserSettings` | `object` | Browser settings; contains `update.channel` (`release`, `beta`, `nightly`, `esr`) | `browserSettings.update.channel in ['beta', 'release']` |

:::note
Channel targeting is typically set via the Channels UI field (which generates `browserSettings.update.channel in [...]` automatically).
:::
| `distributionId` | `string` | Distribution/partner build ID (empty string for standard installs) | `distributionId == ''` |

### Locale & Region

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `locale` | `string` | Full locale with region (e.g., `en-US`) | `locale in ['en-US', 'en-GB']` |
| `region` | `string` | Country code from GeoIP (e.g., `US`) | `region in ['US', 'CA', 'GB']` |

:::note
Locale and region targeting is typically set via the Experimenter UI fields (which generate `locale in [...]` / `region in [...]` expressions automatically), but can also be used directly in advanced targeting expressions.
:::

### Operating System & Hardware

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `os` | `object` | OS information (see sub-fields below) | `os.isWindows` |
| `os.isWindows` | `boolean` | Running on Windows | `os.isWindows` |
| `os.isMac` | `boolean` | Running on macOS | `os.isMac` |
| `os.isLinux` | `boolean` | Running on Linux | `os.isLinux` |
| `os.windowsBuildNumber` | `number` | Windows build number | `os.windowsBuildNumber >= 18362` |
| `os.windowsVersion` | `number` | Windows major version | `os.windowsVersion >= 10` |
| `memoryMB` | `number` | RAM available to Firefox (MiB) | `memoryMB >= 4096` |
| `archBits` | `number` | CPU pointer size (32 or 64) | `archBits == 64` |
| `primaryResolution` | `object` | Primary display resolution: `{width, height}` in CSS pixels | `primaryResolution.width >= 1920` |

**Common OS patterns:**

```
// Windows 10 1903 or newer
os.isWindows && os.windowsBuildNumber >= 18362

// Windows 22H2 or newer
os.isWindows && os.windowsBuildNumber >= 19045

// macOS only
os.isMac
```

### Default Browser & System Integration

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `isDefaultBrowser` | `boolean` | Firefox is the system default browser | `!isDefaultBrowser` |
| `doesAppNeedPin` | `boolean` | Firefox can be and isn't pinned to taskbar/Start menu | `doesAppNeedPin` |
| `isDefaultHandler` | `object` | Default handler status: `{html, pdf}` (Windows only) | `isDefaultHandler.pdf` |
| `defaultPDFHandler` | `object` | System's default PDF handler: `{knownBrowser, registered}` (Windows only) | `defaultPDFHandler.registered` |
| `isMSIX` | `boolean` | Installed via MSIX package (Windows only) | `isMSIX` |

### Firefox Account & Sync

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `isFxAEnabled` | `boolean` | Firefox Account service is enabled | `isFxAEnabled` |
| `isFxASignedIn` | `boolean` | User is signed into FxA | `isFxASignedIn` |
| `usesFirefoxSync` | `boolean` | Has Firefox Sync configured | `usesFirefoxSync` |

### Installation & Attribution

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `attributionData` | `object` | Download attribution: `{source, medium, ua}` | `attributionData.medium == 'email'` |
| `attributionData.source` | `string` | Download source (e.g., `addons.mozilla.org`) | `attributionData.source == 'addons.mozilla.org'` |
| `attributionData.medium` | `string` | Attribution medium (e.g., `email`, `cpc`) | `attributionData.medium == 'email'` |
| `attributionData.ua` | `string` | User agent at download time | `attributionData.ua == 'chrome'` |

### Experiment & Rollout Enrollment

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `activeExperiments` | `string[]` | Currently enrolled experiment slugs (active only) | `'my-experiment' in activeExperiments` |
| `activeRollouts` | `string[]` | Currently enrolled rollout slugs (active only) | `!('some-rollout' in activeRollouts)` |
| `enrollmentsMap` | `object` | Map of experiment/rollout slug → branch slug for all enrollments (active and inactive). See [enrollmentsMap details](#enrollmentsmap) below. | `enrollmentsMap['my-holdback'] == 'treatment'` |

### New Tab & Home Page

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `homePageSettings` | `object` | Home page configuration (see sub-fields below) | `homePageSettings.isDefault` |
| `homePageSettings.isDefault` | `boolean` | Using the default home page | `homePageSettings.isDefault` |
| `homePageSettings.isCustomUrl` | `boolean` | Using a custom URL as home page | `!homePageSettings.isCustomUrl` |
| `homePageSettings.isLocked` | `boolean` | Home page is locked by enterprise policy | `!homePageSettings.isLocked` |
| `homePageSettings.isWebExt` | `boolean` | Home page is set by an extension | `!homePageSettings.isWebExt` |

### Add-ons & Extensions

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `addonsInfo` | `object` | Installed add-ons: `{addons, hasInstalledAddons}` where `addons` is an object keyed by add-on ID | See ad blocker detection below |

**Detecting specific add-ons:**

```
// Has uBlock Origin installed
'uBlock0@raymondhill.net' in addonsInfo.addons|keys

// Has any common ad blocker
'uBlock0@raymondhill.net' in addonsInfo.addons|keys
|| '{d10d0bf8-f5b5-c8b4-a8b2-2b9879e08c5d}' in addonsInfo.addons|keys
|| 'firefox@ghostery.com' in addonsInfo.addons|keys
```

### Enterprise

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `hasActiveEnterprisePolicies` | `boolean` | Any enterprise policies are active | `!hasActiveEnterprisePolicies` |

### Preferences (via `|preferenceValue` filter)

You can target users based on **any** Firefox preference using the `|preferenceValue` filter. This reads the preference value at evaluation time — there is no restriction on which preferences can be used in targeting expressions.

**Syntax:** `'pref.name'|preferenceValue`

You can also provide a default value for prefs that might not be set: `'pref.name'|preferenceValue(defaultValue)`

Two related filters are also available (see [Filters](#filters-pipe-operators) for the full list):
- `'pref.name'|preferenceIsUserSet` — returns `true` if the user has explicitly set the pref (vs. using the default)
- `'pref.name'|preferenceExists` — returns `true` if the pref exists at all

**Commonly used preferences in targeting:**

| Preference | Type | Description |
|------------|------|-------------|
| `browser.newtabpage.enabled` | boolean | New Tab page enabled |
| `browser.newtabpage.activity-stream.feeds.section.topstories` | boolean | Pocket stories enabled |
| `browser.newtabpage.activity-stream.feeds.section.highlights` | boolean | Highlights section enabled |
| `browser.newtabpage.activity-stream.feeds.topsites` | boolean | Top Sites enabled |
| `browser.newtabpage.activity-stream.showSponsoredTopSites` | boolean | Sponsored Top Sites enabled |
| `browser.newtabpage.activity-stream.showSearch` | boolean | Search on New Tab enabled |
| `browser.urlbar.suggest.quicksuggest.sponsored` | boolean | Sponsored suggestions enabled |
| `browser.contentblocking.category` | string | Privacy level: `standard`, `strict`, `custom` |
| `browser.startup.page` | integer | Startup page: `1` (home), `3` (restore session) |
| `browser.toolbars.bookmarks.visibility` | string | Bookmarks toolbar visibility |
| `media.videocontrols.picture-in-picture.video-toggle.has-used` | boolean | Has used Picture-in-Picture |
| `network.trr.mode` | integer | DNS-over-HTTPS mode |
| `security.sandbox.content.level` | integer | Content sandbox level |
| `termsofuse.acceptedVersion` | integer | Accepted Terms of Use version |

:::note Population Sizing
While any preference can be used in targeting expressions, only a specific set of preferences are **recorded in the `nimbus-targeting-context` telemetry ping** for population sizing. This set is defined in [`TargetingContextRecorder.sys.mjs`](https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/lib/TargetingContextRecorder.sys.mjs). If you need to size a population based on a preference that isn't in the recorded set, you'll need to add it there first (requires a Firefox change).
:::

**Examples:**

```
// Users who have disabled Pocket stories
!('browser.newtabpage.activity-stream.feeds.section.topstories'|preferenceValue)

// Users with strict content blocking
'browser.contentblocking.category'|preferenceValue == 'strict'

// Users who have NOT accepted Terms of Use v4
!('termsofuse.acceptedVersion'|preferenceValue == 4)

// Check if a pref exists before using it
'some.new.pref'|preferenceExists && 'some.new.pref'|preferenceValue == 'enabled'

// Use a default value for a pref that may not be set
'sidebar.position_start'|preferenceValue(true)
```

## JEXL Expression Syntax

Nimbus uses [mozjexl](https://github.com/mozilla/mozjexl), a Mozilla-extended version of JEXL. Here's what you need to know:

### Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `&&` | Logical AND | `os.isWindows && os.windowsBuildNumber >= 18362` |
| `\|\|` | Logical OR | `os.isLinux \|\| os.isMac` |
| `!` | Logical NOT (unary) | `!isDefaultBrowser` |
| `==` | Equality | `attributionData.medium == 'email'` |
| `!=` | Inequality | `attributionData.source != 'addons.mozilla.org'` |
| `<`, `>`, `<=`, `>=` | Comparison | `os.windowsBuildNumber >= 18362` |
| `in` | Element in array or substring in string | `'9ebfe2c2f9ea3c58' in attachedFxAOAuthClients\|mapToProperty('id')` |
| `+` | Add / concatenate strings | |
| `-` | Subtract | `currentDate\|date - profileAgeCreated\|date` |
| `*` | Multiply | `'termsofuse.acceptedDate'\|preferenceValue * 1` |
| `/` | Divide | `(currentDate\|date - profileAgeCreated\|date) / 86400000` |
| `%` | Modulus | |
| `? :` | Ternary (conditional) | `('e6eb0d1e856335fc' in attachedFxAOAuthClients\|mapToProperty('id')) ? ... : ...` |
| `intersect` | Array intersection (returns elements in both arrays) | `(blocklist intersect addonsInfo.addons\|keys)\|length > 0` |

See the [mozjexl documentation](https://github.com/mozilla/mozjexl) for the full language specification.

### Filters (Pipe Operators)

Filters transform values using the pipe (`|`) syntax. The complete list is defined in [`FilterExpressions.sys.mjs`](https://searchfox.org/mozilla-central/source/toolkit/components/utils/FilterExpressions.sys.mjs); the ones commonly used in targeting are:

| Filter | Description | Example |
|--------|-------------|---------|
| `\|preferenceValue` | Get a Firefox preference value (optional default) | `'browser.urlbar.showSearchSuggestionsFirst'\|preferenceValue` |
| `\|preferenceIsUserSet` | True if the user has explicitly set the pref | `!('browser.newtabpage.enabled'\|preferenceIsUserSet)` |
| `\|preferenceExists` | True if the pref exists at all | `'pref.name'\|preferenceExists` |
| `\|versionCompare` | Compare version strings (returns negative, 0, or positive) | `version\|versionCompare('95.!') >= 0` |
| `\|date` | Parse as date (for arithmetic) | `(currentDate\|date - profileAgeCreated\|date) / 86400000 >= 28` |
| `\|length` | Array or string length | `userMonthlyActivity\|length >= 21` |
| `\|keys` | Get object keys as an array | `addonsInfo.addons\|keys` |
| `\|mapToProperty` | Extract a property from each element in an array | `'9ebfe2c2f9ea3c58' in attachedFxAOAuthClients\|mapToProperty('id')` |
| `\|regExpMatch` | Regex match (returns matches or null) | `'browser.search.param.google_channel_us'\|preferenceValue('')\|regExpMatch('^[ntc]us5$')` |

### Date Arithmetic

Date calculations are common for profile age targeting. The pattern is:

```
(currentDate|date - profileAgeCreated|date) / <divisor>
```

| Divisor | Unit |
|---------|------|
| `3600000` | Hours (1000 × 60 × 60) |
| `86400000` | Days (1000 × 60 × 60 × 24) |

### Promise Attributes

Some attributes (like `isFxASignedIn`, `isDefaultBrowser`, `doesAppNeedPin`) are asynchronous. The JEXL evaluator automatically awaits them — you don't need to do anything special in your expressions.

## Sticky Targeting

Targeting is re-evaluated periodically, not just at enrollment time. If a targeting expression references attributes that can change (like `isDefaultBrowser` or preference values), a client could be **unenrolled** if the expression no longer matches. To prevent this, mark the experiment as using **sticky enrollment**.

### How It Works

When sticky enrollment is enabled, Experimenter wraps specific parts of the targeting expression in a **sticky clause**:

```
(experiment.slug in activeExperiments) || (<original expression>)
```

This means:
- **New clients** must match the original expression to enroll
- **Already-enrolled clients** match via the `experiment.slug in activeExperiments` check, so they stay enrolled even if the original expression would no longer be true

Not all parts of the targeting are wrapped in the sticky clause. Experimenter splits the expression into **sticky** and **non-sticky** parts:

| Always sticky (skipped for enrolled clients) | Never sticky (always evaluated) |
|---|---|
| Advanced targeting config expression | Channel |
| Min version | Max version |
| Locales / Countries | AI feature pref check |
| Languages | Pref conflict checks |
| Excluded / Required experiments | |

This means an enrolled client will still be unenrolled if it moves to a channel or version outside the experiment's range, but won't be unenrolled if its locale, profile age, or other targeting context attributes change.

**When to use sticky targeting:**
- Profile age conditions (profile ages over time)
- Preference-based targeting (users might change settings)
- Default browser status (users might set Firefox as default during the experiment)
- Any time-dependent or user-changeable condition in the advanced targeting expression

**When you don't need sticky targeting:**
- OS or region (these rarely change)
- Static attributes like `distributionId` or `hasActiveEnterprisePolicies`
- When you *want* clients to be unenrolled if they no longer match

In the Experimenter UI, sticky enrollment is configured on the Audience page. Some pre-defined targeting configs have `sticky_required: true` set automatically.

## First-Run Targeting

First-run experiments target users during their very first Firefox session. These use `isFirstStartup` and have special requirements:

- The experiment recipe must be available via **Remote Settings** before the user launches Firefox
- On Windows, the installer coordinates with Firefox to ensure early experiment loading
- First-run experiments are marked with `is_first_run_required: true` in the targeting config

**Important:** First-run targeting is only supported on Windows. macOS first-run is not supported because the OS handles initial application launch differently.

```
// First-run targeting example
isFirstStartup
```

See the [Onboarding Feature Guide](/platform-guides/desktop/onboarding) for details on building first-run experiments.

## Common Targeting Patterns

### Exclude enterprise users

Most consumer experiments should exclude enterprise-managed browsers:

```
!hasActiveEnterprisePolicies
```

### New users with attribution

Target users who installed Firefox from a specific campaign:

```
(currentDate|date - profileAgeCreated|date) / 86400000 < 28
&& attributionData.medium == 'email'
&& attributionData.campaign == 'spring2026'
```

### Users who haven't adopted a feature

Target users who haven't set Firefox as default and haven't pinned it:

```
!isDefaultBrowser && doesAppNeedPin
```

### Windows version requirements

Target Windows 10 1903+ users (required for some UI features):

```
os.isWindows && os.windowsBuildNumber >= 18362
```

### Exclude users with ad blockers

```
!('uBlock0@raymondhill.net' in addonsInfo.addons|keys)
&& !('{d10d0bf8-f5b5-c8b4-a8b2-2b9879e08c5d}' in addonsInfo.addons|keys)
&& !('firefox@ghostery.com' in addonsInfo.addons|keys)
```

### Users with specific privacy settings

```
'network.trr.mode'|preferenceValue == 2
```

### Engagement-based targeting (regular users)

```
userMonthlyActivity|length >= 14 && userMonthlyActivity|length < 21
```

### Mutual exclusion with other experiments

```
!('other-experiment-slug' in activeExperiments)
```

### Branch-level dependency with `enrollmentsMap` {#enrollmentsmap}

`enrollmentsMap` is an object that maps experiment/rollout slugs to branch slugs. Unlike `activeExperiments` and `activeRollouts` (which only contain currently active enrollments), `enrollmentsMap` includes **both active and inactive** enrollment records. This makes it useful for targeting based on a client's enrollment history — for example, requiring that a client was previously enrolled in a specific branch of a holdback experiment.

```
// Require enrollment in the delivery branch of a holdback
enrollmentsMap['long-term-holdback-2026-growth-desktop'] == 'delivery'
```

:::warning 12-Month Retention Limit
Inactive enrollment records are **permanently deleted from the client's store after 12 months** (365.25 days), measured from the original enrollment date. Once deleted, the key is removed from `enrollmentsMap` and any targeting expression that references it will no longer match.

This means if experiment B's targeting depends on enrollment in experiment A via `enrollmentsMap`, and experiment A ends, you have a **12-month window** before clients start losing the enrollment record. After that point, clients will begin unenrolling from experiment B with `targeting-mismatch` as their `enrollmentsMap` entries for experiment A are cleaned up.

If a long-term holdback is replaced by a successor (e.g., a 2025 holdback replaced by a 2026 holdback), update dependent targeting expressions to accept **both** holdbacks before the 12-month window expires:

```
enrollmentsMap['long-term-holdback-2025h1-growth-desktop'] == 'delivery'
|| enrollmentsMap['long-term-holdback-2026-growth-desktop'] == 'delivery'
```
:::

**Key differences between enrollment attributes:**

| Attribute | Includes Active | Includes Inactive | Provides Branch | Retention |
|-----------|:-:|:-:|:-:|---|
| `activeExperiments` | ✅ | ❌ | ❌ | Current session only |
| `activeRollouts` | ✅ | ❌ | ❌ | Current session only |
| `enrollmentsMap` | ✅ | ✅ | ✅ | 12 months from enrollment date |

## Recorded Targeting Context (Telemetry)

Firefox records a snapshot of all the targeting attribute values listed above in the `nimbus-targeting-context` ping, which lands in BigQuery at `mozdata.firefox_desktop.nimbus_targeting_context`. This is used for:

- **Population sizing** — estimating how many clients match a targeting expression before launch
- **Debugging** — verifying what attribute values a client had when targeting was evaluated
- **Analysis** — understanding the characteristics of enrolled populations

The recording logic is in [`TargetingContextRecorder.sys.mjs`](https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/lib/TargetingContextRecorder.sys.mjs). In addition to the targeting attributes, the ping also records:

- `nimbus_targeting_environment.pref_values` — values of the allow-listed preferences
- `nimbus_targeting_environment.attr_eval_errors` — errors evaluating specific attributes
- `nimbus_targeting_environment.user_set_prefs` — preferences with user-modified values (from the Feature Manifest)

## Testing & Debugging

### Nimbus DevTools

The [Nimbus Developer Tools](https://github.com/mozilla-extensions/nimbus-devtools) extension is the primary tool for testing and debugging targeting expressions. Install the latest release from the [GitHub releases page](https://github.com/mozilla-extensions/nimbus-devtools/releases) (requires Firefox Nightly 137+).

The **JEXL Debugger** page lets you:

1. View your complete client targeting context (all the attributes listed above with their current values)
2. Edit any context value to simulate different user profiles
3. Enter a JEXL expression and evaluate it
4. See the result (`true`/`false`) and — if false — which specific sub-expressions failed

This makes it easy to iterate on complex targeting expressions and understand exactly why a client does or doesn't match.

See the [Nimbus Developer Tools Guide](/resources/nimbus-devtools-guide) for detailed instructions on all features.

### Preview Mode

You can test experiments on your own browser without publishing:

1. Set the experiment to Preview in Experimenter
2. In Firefox, go to `about:studies` and enable the Preview collection
3. Your browser will fetch and evaluate the preview recipe

See the [Preview Guide](/platform-guides/desktop/preview) for more.

### Common Mistakes

- **Missing `|date` filter in date arithmetic** — `currentDate - profileAgeCreated` won't work; you need `currentDate|date - profileAgeCreated|date`
- **String vs. number comparison** — `firefoxVersion` is a number, not a string; use `firefoxVersion >= 134`, not `firefoxVersion >= '134'`
- **Forgetting sticky enrollment** — if your targeting checks a changeable attribute (preferences, default browser status), mark the experiment as sticky
- **Enterprise exclusion** — most consumer experiments should include `!hasActiveEnterprisePolicies` unless you specifically want enterprise users
- **Overly broad version ranges** — be specific about which Firefox versions your feature exists in

## Adding New Targeting Options

To add a new pre-defined targeting option to the Experimenter dropdown:

1. **Add to `targeting/constants.py`** — create a new `NimbusTargetingConfig` instance with the JEXL expression, description, and applicable applications
2. **Test locally** — verify the JEXL expression evaluates correctly using the [Nimbus DevTools](#nimbus-devtools) JEXL Debugger
3. **Submit a PR** to `mozilla/experimenter` with the new config

If your targeting requires a **new attribute** that doesn't exist yet, you'll need to:

1. **Add the attribute** to the Nimbus targeting context in Firefox Desktop
2. **Register it in the recorded targeting context** by adding an entry to `ATTRIBUTE_TRANSFORMS` in [`TargetingContextRecorder.sys.mjs`](https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/lib/TargetingContextRecorder.sys.mjs) and a corresponding metric in [`metrics.yaml`](https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/metrics.yaml) — this ensures it's available in telemetry for population sizing and analysis
3. **If the attribute needs a new preference**, also add it to the `PREFS` list in `TargetingContextRecorder.sys.mjs`
4. **Wait for the Firefox train** — the attribute will be available starting in the Firefox version that ships the change
5. **Add the targeting config** to Experimenter's `constants.py` as above

See [Advanced Targeting](/advanced/custom-audiences) for more details on the process.

## Further Reading

- [Nimbus Developer Tools Guide](/resources/nimbus-devtools-guide) — JEXL debugger and experiment enrollment tools
- [Advanced Targeting](/advanced/custom-audiences) — adding new targeting options
- [Experiment Workflow](/workflow/experiments) — full experiment design process
- [Onboarding Feature Guide](/platform-guides/desktop/onboarding) — first-run experiments
