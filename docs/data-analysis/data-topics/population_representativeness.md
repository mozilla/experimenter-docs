---
id: population_representativeness
title: Population Representativeness
slug: /data-analysis/data-topics/population_representativeness
---

It is desirable for the group enrolled in a delivery (experiment, (micro)survey, etc.) to be a _representative sample_ of the targeted population. A lack of representativeness could indicate selection biases that would invalidate learnings. We term a lack of representativeness as a "representativeness failure". This page documents common causes of representativeness failures. For simplicity, this document will use the term "experiment", but the same issues apply to non-experiment deliveries (surveys, rollouts, etc.).

At a high level, the delivery funnel (steps to be shown an experimental variant) has the following phases:

1. Synchronization: delivering the recipe (experiment definition) to the client
2. Enrollment: evaluating the targeting criteria and conditionally recording enrollment
3. Exposure: triggering the display or execution of the experiment variant.

At each phase there is the possibility of introducing lack of representativeness, either purposefully or accidentally.

Note: in general, if there is telemetry it is "positive telemetry" on the situations below, i.e., telemetry is emitted when a condition is met. Telemetry is not emitted when a condition is not met. This can make diagnosing issues challenging.

## Synchronization

When an experiment is launched, knowledge of that experiment must be transmitted to the client. In general, clients receive Nimbus recipes by connecting to Remote Settings, a globally distributed CDN. Some common causes of failure to synchronize are:

1. **Low Activity:** a client needs to be sufficiently active in order to trigger a refresh of its internal recipe cache. As a result, low activity users may be less likely to synchronize and thus less likely to be sampled. See [this document](https://docs.google.com/document/d/1-TgZcuiA3UDZ30Vo2Ot7d_Lyqncx7AaBhAqq8GxlP8M/edit#heading=h.g5mbvod6ojw6) for more info. 
2. **Network Issues:** clients need to make a successful connection to the Remote Settings CDN. Structural challenges may arise here: users on certain mobile networks or in certain locales may have difficulty connecting, and thus less likely to be sampled.
3. **Out-of-date Versions:** Nimbus generally supports a rolling version window and aims to support the most recent 12-18 months of versions. Users running versions older than that may not be eligible.
   1. **Certificate Expiration:** the Remote Settings certificate expires periodically and when this happens, users on old Firefox versions (with the old certificate) lose the ability to connect to Remote Settings, and thus lose the ability to synchronize.
   2. **Reliance on New Nimbus Functionality:** a delivery may require certain Nimbus functionality that was made available in a certain release. Users on older versions will lack that functionality, and thus not be eligible.

## Enrollment

Nimbus provides a broad ability to "target" a delivery to a certain population. While this is useful, by design it can induce representativeness failures, depending on the execution. For example, an experiment that targets users in Europe will not enroll users in North America. As a result, attempts to generalize learnings may be fraught.

This section primarily aims to document _unexpected_ representativeness failures (those not explicitly introduced by targeting criteria) that can cause structural biases in which users are enrolled into an experiment.

1. **Cross-experiment Dependencies:** explicitly targeting or explicitly excluding another delivery can introduce unexpected representativeness failures.
   1. **Location Example:** Suppose a prior experiment (Experiment-A) was run on 50% of `en-US` locale users. Another experiment, Experiment-B is configured to explicitly exclude the users in Experiment-A, but otherwise has no locale-based targeting criteria. Relative to the general population, Experiment-B will be underweight `en-US` users.
   2. **Time Example:** Suppose a prior experiment (Experiment-A) was run a year ago on new users. Experiment B wishes to follow-up on Experiment-A and explicitly targets Experiment-A. However, note that the Experiment-A cohort are no longer new users. Many users will have churned, and any remaining will have been using the product for a year.
   3. **Namespace Rollovers:** In the case of multiple small experiments on a single Feature, Nimbus's sampling mechanism is robust such that successive experiments sample different hashes of the user space, so that the targeting from prior experiments does not impact the sampled population for subsequent experiemnts. However, it is possible for this to be violated if a large, live experiment is running when the [namespace is exhausted](./bucketing.md#namespace-rollovers).
      1. If an experiment samples 10% of `en-US` users and the namespace _does not_ rollover, a subsequent experiment also requesting 10% of `en-US` users will get 10%.
      2. If an experiment samples 10% of `en-US` locale users and the namespace _does_ rollover, a subsequent experiment also requesting 10% of `en-US` users will get roughly 9% (10% of the 90% not enrolled + 0% of the 10% enrolled).
      3. As below, Features with co-enrollment are not subject to the issues with namespace rollovers. This includes the mobile messaging system, and thus surveys and microsurveys.
2. **Multi-feature Experiments:** a client can (generally) only be enrolled in one experiment per Feature (application surface) at a time. A Multi-Feature experiment is one that runs on multiple application surfaces simultaneously (e.g., the experiment turns on new functionality and uses the messaging system to inform the user of the feature). A client is (generally) eligible for a multi-feature experiment if they are not in an experiment on _any_ of the individual Features.
   1. Some Features are configured to allow "co-enrollment", that is, enrollment in multiple experiments and/or rollouts simultaneously, such as the mobile messaging system. These Features are not subject to the above restriction.

## Exposure

Exposure is the step of applying the experimental treatment to the user. The criteria for triggering an exposure can vary depending on the Feature or Feature-specific criteria (such as message triggering logic) which may be arbitrarily precise. Some common examples include:

1. **User Actions:** sometimes, a user action is necessary to trigger exposure, such as opening a menu. In this case, users who do not take the action will not be exposed to the treatment. For example, if a survey invitation is shown on the new-tab page, only users who visit the new tab may be shown the invitation. As another example, on Desktop some features take effect only after an application restart. Users who do not restart the app will not experience the new variant.
2. **Messaging Triggers:** the desktop and mobile messaging systems allow for messages to be configured using trigger points and trigger criteria. Users whose actions do not result in the appropriate trigger point will not experience the message. For example, a trigger point might be "opened the new tab" and the trigger criteria is "12-24 hours after install". Only users who open the new tab during the appropriate window, are eligible to be shown the message.
   1. Note that the desktop messaging system offers further control over message display through the use of message groups. These can be used to set temporal caps on message frequency, but are, by-design, cross experiment. So if a prior experiment displays a message in a message group, subsequent experiments are blocked from that message group until the cap has expired.
