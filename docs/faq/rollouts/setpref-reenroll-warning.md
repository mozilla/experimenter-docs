---
id: rollout-setpref-reenroll
title: "Warning: Rollouts and setPref Interaction"
---

Rollouts that set prefs via [`setPref`][1] features can have unexpected
interactions. The Nimbus client will always enroll in any available rollouts --
including rollouts it was previously enrolled in -- unless the user has
specifically opted out via `about:studies`. If an enrolled user changes a pref
set by the rollout they will be unenrolled from the rollout, but it will not be
marked as an opt-out. This interaction will result in rollouts that will
constantly override users' prefs *unless* targeting prevents re-enrollment.

To prevent this situation, check the "Prevent enrollment if users have changed
any prefs set by this experiment" box on the branches page of your rollout.

[1]: /desktop-pref-experiments
