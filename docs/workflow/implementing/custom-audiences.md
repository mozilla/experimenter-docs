---
id: custom-audiences
title: Advanced Targeting
sidebar_position: 3
---

Advanced Targeting let you target specific groups of users (or custom audience) beyond the regular targeting options. Advanced Targeting can be configured for any experiment through the experimenter UI:

![advanced targeting screenshot](/img/audiences/custom-audiences.png)

They are:

- Optional - Don't use them unless you need to limit the experiment to specific group of users.
- Specific to a particular application (Not all audiences can target all applications)
- Evaluated on clients via an expression language (`JEXL`)

### How to add new Advanced Targeting

Create a PR against [targeting/constants.py](https://github.com/mozilla/experimenter/blob/main/experimenter/experimenter/targeting/constants.py) that adds a new JEXL expression.  There is a [recorded session showing 2 examples of adding advanced targeting](https://mozilla.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=8527feae-303e-41b3-b9df-b0a800f3cd41) to demoonstrate where to start.

Request review from a console core team member. It should be available in the Experimenter UI a few minutes after the PR has merged.

If you're an iOS or a Android developer check the following instructions for how to add new client-side targeting attributes:
- [iOS](/ios-custom-targeting)
- [Android](/android-custom-targeting)

:::info
New Advanced Targeting should be tested by the Nimbus QA team before they are used in production. This could involve any or all of the following:

- Test the whole JEXL expression on each application/device it is intended to run on.
- Ask QA to help verify it by creating a dummy experiment.
- Launch an A/A in nightly to see if real users enroll correctly
:::

### Sticky Targeting

Every time Nimbus checks to see if there are new recipes or recipe ends - it checks that users still meet the targeting criteria for the recipes that they are already enrolled in.  

- ex: it says enroll only US and you change countries to Germany - you no longer meet the targeting and will unenroll.  
- ex: it says max version 140 and you update to 141 - you no longer meet the targeting and will unenroll

There are targeting cases where we want people to stay enrolled when they no longer meet the targeting criteria.   These are typically when the targeting criteria is based on time or a pref state.  We make that targeting "Sticky" - which means the targeting criteria is evaluated at the start, but not at each check-in.

- ex: it says enroll new users with less that 7 days old profile - on day 8 we want users to stay enrolled.  We make the targeting Sticky so they stay in day 8 and beyond.
- ex: it says enroll only people without a certain feature - we promote the feature to only those people.  We make the targeting Sticky so they stay enrolled even if they use the feature.
