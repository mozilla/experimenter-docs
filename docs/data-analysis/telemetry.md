---
id: telemetry
title: Telemetry
slug: /data-analysis/telemetry
---

This section is an overview of Nimbus Telemetry intended for the analysis of experiments.

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

## Experiment Annotations

In addition to the standard Nimbus events that are generated, Nimbus
also interacts with both the Legacy Telemetry and the Glean Experiment
API, recording experiment information that is included in the 
`experiments` field of the main ping in Legacy, and in the 
`ping_info.experiments` field of all Glean pings. The information that
is recorded in this way includes the experiment slug, the branch slug,
and the enrollment ID.
