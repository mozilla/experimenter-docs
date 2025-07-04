---
id: ending
title: Ending Your Experiment
sidebar_label: Ending
slug: /ending
---

# Ending enrollment or ending your experiment

## To end enrollment
1. Has the experiment run for at least 7–14 days (to cover weekly behavioral cycles)?
2. Has it collected enough active users per branch (as estimated in the brief or by DS)?  Check the Live Monitoring link to see how many people enrolled versus what was expected from your initial planning.

If yes → You're likely ready to end enrollment.

Some notes:
* Enrollments can be ended at any time after launch, not just after the proposed period.  Ex: If a bug is found
* If enrollment is ended before sufficient client volume has been achieved, there may not be enough users in the experiment to determine statistical significance.
* By default, clients will continue to enrolled until enrollment is manually ended. If the experiment needs a different enrollment window than when it was ended, a [custom Jestream config](/deep-dives/jetstream/configuration) will need to be created. For assistance creating this, please file a Data Org JIRA ticket or attend the relevant [office hours](https://mozilla-hub.atlassian.net/wiki/spaces/DATA/pages/6849684/Office+Hours) for your experiment. An example of the relevant TOML is below. This will set the enrollment period to be the first 14 days of the experiment. Note that this will impact the observation window (data collection window between enrollment and the end of the experiment, from which the experiment results are calculated).

```toml
[experiment]
enrollment_period = 14
```

Once the experiment has reached the end of the enrollment period, the experiment owner can elect to end enrollment which will prevent new clients from enrolling. To do this, first press the `End Enrollment` button located on the experiment's management page in [the Experimenter console](https://experimenter.services.mozilla.com). This will record the request. A reviewer with [L3 access](/access) *will then need to approve the request*. If your product team does not have a dedicated reviewer, you can request the ending by posting in [#ask-experimenter](https://mozilla.slack.com/archives/CF94YGE03).

<p align="center">
    <img src="/img/workflow/end_enrollment.png"></img>
</p>




## To end the experiment

Once the experiment has run for sufficient time, it can be ended. This is the process by which clients are unenrolled from the experiment and revert to seeing the default experience. Ending the experiment will also trigger the final analysis to be run. This is a nightly batch process, so expect results to be available the day after the experiment was ended.

The process to end the experiment is similar to that of ending enrollment: press the `End Experiment` button to request ending. Then get a reviewer (either from your team or [#ask-experimenter](https://mozilla.slack.com/archives/CF94YGE03)) to approve the change.

<p align="center">
    <img src="/img/workflow/end_experiment.png"></img>
</p>

Some notes:
* Automated analyses are based on the actual observation period (period between enrollment and experiment ending), not the planned period. So experiments that remain open past their scheduled end date will have more days worth of data included in their results.
