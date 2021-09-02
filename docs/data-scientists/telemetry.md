---
id: telemetry
title: Telemetry for Experiments
slug: /telemetry
---

This section is an overview of Nimbus Telemetry intended for the analysis of experiments.

## Standard Events

The following events are sent during an experiment's lifecycle.

You can find the manifest entries for these events in [metrics.yaml](https://github.com/mozilla/application-services/blob/main/components/nimbus/metrics.yaml) for iOS and Android, and the `normandy` section under [Events.yaml](https://searchfox.org/mozilla-central/source/toolkit/components/telemetry/Events.yaml) for Desktop.

### Enrollment

Recorded when a user has met the conditions and is first bucketed into an experiment (i.e. targeting matched and they were randomized into a bucket and branch of the experiment). Expected a maximum of once per experiment per user.

| Android, iOS (`event.name`) | Desktop (`event.method`) |
| --------------------------- | ------------------------ |
| `enrollment`                | `enroll`                 |

### Exposure

This records an event at the moment the user is exposed to an experiment
treatment. The event is triggered either by the code checking that a
certain experiment feature is enabled or when that feature value is used.
This is different from enrollment or experiment activation because it
registers when a user actually gets exposed to the experiment feature.

:::tip
Exposure is not sent by default in Firefox Desktop. You should call [recordExposureEvent()](/desktop-feature-api#recordexposureevent). See [API documentation](/desktop-feature-api) for more info.
:::

| Android, iOS (`event.name`) | Desktop (`event.method`) |
| --------------------------- | ------------------------ |
| `exposure`                  | `expose`                 |

### Disqualification

Recorded when a user becomes ineligible to continue receiving the
treatment for an enrolled experiment, for reasons such as the user
opting out of the experiment or no longer matching targeting for the
experiment.

| Android, iOS (`event.name`) | Desktop (`event.method`) |
| --------------------------- | ------------------------ |
| `disqualification`          | Not available            |

### Unenrollment

Recorded when the experiment has finished running for its designed duration, or if telemetry is disabled by the user.

| Android, iOS (`event.name`) | Desktop (`event.method`) |
| --------------------------- | ------------------------ |
| `unenrollment`              | `unenroll`               |
