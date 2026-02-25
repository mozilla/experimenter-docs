---
id: desktop-feature-manifest
title: Feature Manifest Reference
slug: /platform-guides/desktop/feature-manifest
---

# Desktop Feature Manifest Reference

The desktop Nimbus Feature Manifest ([`FeatureManifest.yaml`](https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/FeatureManifest.yaml)) defines every feature that can be configured by experiments and rollouts in Firefox Desktop. Each feature entry declares what variables it exposes, how those variables connect to Firefox preferences, and what telemetry it records.

After adding or modifying a feature in the manifest, a build step is required to update the generated header file.

:::tip
This reference covers the **Desktop** manifest format (`FeatureManifest.yaml`). For mobile apps, see the [Feature Manifest Language (FML) specification](/technical-reference/fml/fml-spec).
:::

## Feature properties

Each top-level key in `FeatureManifest.yaml` is a feature ID. The feature definition supports these properties:

| Property | Required | Type | Default | Description |
| :--- | :---: | :--- | :--- | :--- |
| `description` | Yes | string | — | Human-readable description of the feature |
| `owner` | Yes | string | — | Email of the team or person responsible |
| `hasExposure` | Yes | boolean | — | Whether this feature records [exposure events](/data-analysis/jetstream/overview#enrollment-vs-exposure) |
| `exposureDescription` | If `hasExposure: true` | string | — | Describes when/how the exposure event fires |
| `variables` | Yes | object | — | Variable definitions (can be `{}` if the feature has no variables) |
| `isEarlyStartup` | No | boolean | `false` | Cache values in Firefox prefs for synchronous access during early startup |
| `allowCoenrollment` | No | boolean | `false` | Allow multiple simultaneous experiment/rollout enrollments for this feature |
| `applications` | No | string[] | `["firefox-desktop"]` | Which Firefox processes can enroll (see [Applications](#applications)) |
| `schema` | No | object | — | JSON Schema for validation (see [Schema validation](#schema-validation)) |

### Applications

The `applications` array specifies which Firefox processes can use this feature:

- `"firefox-desktop"` — the main browser process (default)
- `"firefox-desktop-background-task"` — the background task runner

```yaml
applications:
  - firefox-desktop
  - firefox-desktop-background-task
```

If omitted, defaults to `["firefox-desktop"]`.

### Schema validation

The optional `schema` property points to a JSON Schema file that validates the combined feature configuration. It has two fields:

- `uri` — a `resource://` URI that Firefox loads at runtime for client-side validation
- `path` — a filesystem path (relative to the repo root) where Experimenter can find the schema

```yaml
schema:
  uri: resource://nimbus/schemas/PrefFlipsFeature.schema.json
  path: toolkit/components/nimbus/schemas/PrefFlipsFeature.schema.json
```

## Variable properties

Each key under `variables` defines a configurable variable. Variables support these properties:

| Property | Required | Type | Description |
| :--- | :---: | :--- | :--- |
| `description` | Yes | string | Human-readable description of the variable |
| `type` | Yes | string | One of `boolean`, `string`, `int`, `json` |
| `fallbackPref` | No | string | Pref to read the default value from (mutually exclusive with `setPref`) |
| `setPref` | No | string or object | Pref that Nimbus actively sets on enrollment (mutually exclusive with `fallbackPref`) |
| `enum` | No | array | Constrains allowed values (`string` and `int` types only) |

### Variable types

| Type | Values | Supports `enum` | Notes |
| :--- | :--- | :---: | :--- |
| `boolean` | `true` / `false` | No | |
| `string` | Text values | Yes | |
| `int` | Whole numbers | Yes | |
| `json` | Arbitrary JSON objects/arrays | No | Stored as JSON strings in prefs |

### `fallbackPref` vs `setPref`

These are **mutually exclusive** — a variable can use one or the other, not both.

| | `fallbackPref` | `setPref` |
| :--- | :--- | :--- |
| **What it does** | Reads the current pref value as the default when no experiment is active | Nimbus actively **sets** the pref when the user enrolls |
| **On enrollment** | No change to the pref | Pref is set to the experiment branch value |
| **On unenrollment** | No change to the pref | Original pref value is restored |
| **If user changes pref** | No effect on enrollment | Causes automatic unenrollment |
| **Use case** | Feature gates and defaults that already exist as browser prefs | Controlling prefs that other code reads directly |

**`fallbackPref` example:**
```yaml
enabled:
  type: boolean
  fallbackPref: browser.aboutwelcome.enabled
  description: Whether the about:welcome page is enabled
```

**`setPref` example:**
```yaml
enabled:
  type: boolean
  setPref:
    branch: default  # or "user"
    pref: browser.search.visualSearch.featureGate
  description: Feature gate for visual search
```

The `setPref` object format has two fields:
- `branch` — which pref branch to set: `"default"` (resets each startup) or `"user"` (persists to disk)
- `pref` — the pref name

:::note
For a deep dive into pref experiment behavior including unenrollment scenarios, pref branch trade-offs, and conflict handling, see [Pref Experiments](/platform-guides/desktop/pref-experiments).
:::

### `enum` constraints

The `enum` property restricts a `string` or `int` variable to a fixed set of values:

```yaml
rankingMode:
  type: string
  enum:
    - default
    - interest
    - random
  description: The ranking algorithm to use
```

`enum` is not supported for `boolean` or `json` types.

## Examples

### Simple feature with a feature gate

```yaml
search:
  description: Search service related features
  owner: search-and-suggest-program@mozilla.com
  hasExposure: true
  exposureDescription: >
    Recorded when the visual search context menu item is shown.
  variables:
    visualSearchEnabled:
      type: boolean
      setPref:
        branch: default
        pref: browser.search.visualSearch.featureGate
      description: Feature gate for visual search
```

### Feature with multiple variable types

```yaml
urlbar:
  description: The Address Bar
  owner: search-and-suggest-program@mozilla.com
  hasExposure: true
  exposureDescription: >
    Recorded once per session on first urlbar interaction.
  variables:
    onboardingTimesToShow:
      type: int
      fallbackPref: browser.urlbar.quickactions.timesToShowOnboardingLabel
      description: Number of times to show the onboarding label
    quickSuggestRankingMode:
      type: string
      fallbackPref: browser.urlbar.quicksuggest.rankingMode
      enum:
        - default
        - interest
        - random
      description: The ranking mode for QuickSuggest
    scoreMap:
      type: json
      description: JSON object mapping result types to scores
```

### Early startup feature

```yaml
aboutwelcome:
  description: The about:welcome page
  owner: omc-core@mozilla.com
  hasExposure: true
  exposureDescription: >
    Recorded once per session when about:welcome is shown.
  isEarlyStartup: true
  variables:
    enabled:
      type: boolean
      fallbackPref: browser.aboutwelcome.enabled
      description: Whether the about:welcome page is enabled
    screens:
      type: json
      fallbackPref: browser.aboutwelcome.screens
      description: Content to show in the onboarding flow
```

### Co-enrolling feature

```yaml
prefFlips:
  description: Flip arbitrary prefs for incident response
  owner: beth@mozilla.com
  hasExposure: false
  allowCoenrollment: true
  variables:
    prefs:
      type: json
      description: The prefs to set
  schema:
    uri: resource://nimbus/schemas/PrefFlipsFeature.schema.json
    path: toolkit/components/nimbus/schemas/PrefFlipsFeature.schema.json
```

## Further reading

- [Feature API Reference](/platform-guides/desktop/feature-api) — how to access feature values in code
- [Pref Experiments](/platform-guides/desktop/pref-experiments) — deep dive into `setPref` and `fallbackPref` behavior
- [Co-enrolling Features](/technical-reference/fml/coenrolling-features) — how `allowCoenrollment` works
- [FeatureManifest.yaml on Searchfox](https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/FeatureManifest.yaml) — the live manifest
