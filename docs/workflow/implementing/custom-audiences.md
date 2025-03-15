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
