---
id: telemetry
title: Telemetry
slug: /data-analysis/telemetry
---

This section is an overview of Nimbus Telemetry intended for the analysis of experiments.

:::tip Looking for product telemetry?
This page covers Nimbus SDK lifecycle events (enrollment, exposure, etc.). To find product telemetry metrics in BigQuery for your experiment analysis, see [Finding Telemetry in BigQuery](/data-analysis/data-topics/telemetry-discovery).
:::

## Standard Events

The following events are sent during an experiment's lifecycle.

You can find the manifest entries for these events in [metrics.yaml](https://github.com/mozilla/application-services/blob/main/components/nimbus/metrics.yaml) for iOS and Android, and the `normandy` section under [Events.yaml](https://searchfox.org/mozilla-central/source/toolkit/components/resources/telemetry/Events.yaml) for Desktop.

### Enrollment

Recorded when a user has met the conditions and is first bucketed into an experiment (i.e. targeting matched and they were randomized into a bucket and branch of the experiment). Expected a maximum of once per experiment per user.

| Android, iOS (`event.name`) - Glean | Desktop (`event.method`) - Legacy | Desktop (`event.name`) - Glean |
| ----------------------------------- | --------------------------------- | ------------------------------ |
| `enrollment`                        | `enroll`                          | `enrollment`                   |

### Enroll Failed

Recorded when enrollment in an experiment failed for some reason. The
specific `reason` is included in the event's `extra` field.

| Android, iOS (`event.name`) - Glean | Desktop (`event.method`) - Legacy | Desktop (`event.name`) - Glean |
| ----------------------------------- | --------------------------------- | ------------------------------ |
| `enroll_failed`                     | `enroll_failed`                   | `enroll_failed`                |

### Exposure

This should be recorded at the moment the user sees an experiment
treatment *or would have seen it* if they are in a control branch.
The event is triggered either by the code checking that a
certain experiment feature is enabled or when that feature value is used.
This is different from enrollment or experiment activation because it
registers when a user actually gets exposed to the experiment feature.

:::tip
Exposure is not sent by default in Firefox Desktop. You should call [recordExposureEvent()](/platform-guides/desktop/feature-api#recordexposureevent). See [API documentation](/platform-guides/desktop/feature-api) for more info.
:::

| Android, iOS (`event.name`) - Glean | Desktop (`event.method`) - Legacy | Desktop (`event.name`) - Glean |
| ----------------------------------- | --------------------------------- | ------------------------------ |
| `exposure`                          | `expose`                          | `exposure`                     |

### Disqualification

Recorded when a user becomes ineligible to continue receiving the
treatment for an enrolled experiment, for reasons such as the user
opting out of the experiment or no longer matching targeting for the
experiment. 

:::tip
Note: Disqualification will be deprecated in favor of the 
`enroll_failed` event being added to the Nimbus SDK used on mobile.
:::

| Android, iOS (`event.name`) - Glean | Desktop (`event.method`) - Legacy | Desktop (`event.name`) - Glean |
| ----------------------------------- | --------------------------------- | ------------------------------ |
| `disqualification`                  | Not available                     | Not available                  |

### Unenrollment

Recorded when the experiment has finished running for its designed duration, or if telemetry is disabled by the user.

| Android, iOS (`event.name`) - Glean | Desktop (`event.method`) - Legacy | Desktop (`event.name`) - Glean |
| ----------------------------------- | --------------------------------- | ------------------------------ |
| `unenrollment`                      | `unenroll`                        | `unenrollment`                 |

### Unenroll Failed

Recorded when unenrollment in an experiment failed for some reason. The
specific `reason` is included in the event's `extra` field.

| Android, iOS (`event.name`) - Glean | Desktop (`event.method`) - Legacy | Desktop (`event.name`) - Glean |
| ----------------------------------- | --------------------------------- | ------------------------------ |
| `enroll_failed`                     | `enroll_failed`                   | `enroll_failed`                |

### Enrollment Status

A newer, richer form of enrollment telemetry that records the SDK's evaluation of **every recipe** each time it applies pending experiments. Unlike the older `enrollment`/`unenrollment` events (which only fire on state changes), `enrollment_status` gives a complete snapshot of why each recipe is or isn't enrolled.

:::info
`enrollment_status` is disabled by default and currently enabled via a rollout on Desktop and Fenix. Only clients enrolled in the enabling rollout emit these events.
:::

These events are sent via the `nimbus-targeting-context` ping, so they live in the `nimbus_targeting_context` table (not in `events_stream`).

**Extra keys:**

| Key | Type | Description |
|-----|------|-------------|
| `slug` | string | Experiment/rollout slug |
| `status` | string | `Enrolled`, `NotEnrolled`, `Disqualified`, `WasEnrolled` |
| `reason` | string | Why this status was assigned (see below) |
| `branch` | string | Branch assigned (only when status is `Enrolled`) |
| `error_string` | string | Error message (when reason is `Error`) |
| `conflict_slug` | string | Conflicting experiment/rollout slug (when reason is `FeatureConflict`) |

**Possible `reason` values:** `Qualified`, `NotTargeted`, `EnrollmentsPaused`, `NotSelected`, `Error`, `FeatureConflict`, `OptOut`, `OptIn`, `ChangedPref`, `UnenrolledInAnotherProfile`, `ForceEnrollment`

**Example query** — check enrollment status distribution for a specific experiment:

```sql
SELECT
  (SELECT value FROM UNNEST(e.extra) WHERE key = 'slug') AS slug,
  (SELECT value FROM UNNEST(e.extra) WHERE key = 'status') AS status,
  (SELECT value FROM UNNEST(e.extra) WHERE key = 'reason') AS reason,
  COUNT(*) AS cnt
FROM `mozdata.firefox_desktop.nimbus_targeting_context`,
UNNEST(events) AS e
WHERE DATE(submission_timestamp) = '2025-01-15'
  AND e.category = 'nimbus_events'
  AND e.name = 'enrollment_status'
  AND (SELECT value FROM UNNEST(e.extra) WHERE key = 'slug') = 'my-experiment-slug'
GROUP BY 1, 2, 3
ORDER BY cnt DESC
```

## Experiment Annotations

In addition to the standard Nimbus events that are generated, Nimbus
also interacts with both the Legacy Telemetry and the Glean Experiment
API, recording experiment information that is included in the 
`experiments` field of the main ping in Legacy, and in the 
`ping_info.experiments` field of all Glean pings. The information that
is recorded in this way includes the experiment slug, the branch slug,
and the enrollment ID.
