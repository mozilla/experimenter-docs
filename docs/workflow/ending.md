---
id: ending
title: Ending Your Experiment
sidebar_label: Ending
slug: /ending
---

# Ending Your Experiment

## To end enrollment

Once the experiment has reached the end of the enrollment period, the experiment owner can elect to end enrollment which will prevent new clients from enrolling. To do this, first press the `End Enrollment` button located on the experiment's managment page in [the Experimenter console](https://experimenter.services.mozilla.com). This will record the request. A reviewer with [L3 access](/access) *will then need to approve the request*. If your product team does not have a dedicated reviewer, you can request the ending by posting in [#ask-experimenter](https://mozilla.slack.com/archives/CF94YGE03). 

<p align="center">
    <img src="/img/workflow/end_enrollment.png"></img>
</p>

Some notes:
* Enrollments can be ended at any time after launch, not just after the proposed period
* If enrollment is ended before sufficient client volume has been achieved, there may not be enough users in the experiment to determine statistical significance. 
* By default, clients enrolled after the planned enrollment window *will be excluded from automated analysis*. If the experiment needs to remain enrolling after the initial window in order to hit a volume threshold, a [custom Jestream config](/jetstream/configuration) will need to be created. For assistance creating this, please file a Data Org JIRA ticket or attend the relevant [office hours](https://mana.mozilla.org/wiki/display/DATA/Office+Hours) for your experiment. 


## To end the experiment

Once the experiment has run for sufficient time, it can be ended. This is the process by which clients are unenrolled from the experiment and revert to seeing the default experience. Ending the experiment will also trigger the final analysis to be run. This is a nightly batch process, so expect results to be available the day after the experiment was ended. 

The process to end the experiment is similar to that of ending enrollment: press the `End Experiment` button to request ending. Then get a reviewer (either from your team or [#ask-experimenter](https://mozilla.slack.com/archives/CF94YGE03)) to approve the change. 

<p align="center">
    <img src="/img/workflow/end_experiment.png"></img>
</p>

Some notes:
* Automated analyses are based on the actual observation period (period between enrollment and experiment ending), not the planned period. So experiments that remain open past their scheduled end date will have more days worth of data included in their results. 