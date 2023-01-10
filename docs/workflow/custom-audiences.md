---
id: custom-audiences
title: Custom Audiences
---

Custom audiences let you target specific groups of users beyond the regular targeting options. Custom audiences can be configured for any experiment through the experimenter UI:

![custom audience screenshot](/img/audiences/custom-audiences.png)

They are:

- Optional - Don't use them unless you need to limit the experiment to specific group of users.
- Specific to a particular application (Not all audiences can target all applications)
- Evaluated on clients via an expression language (`JEXL`)

:::warning
Right now, Desktop-only audiences will appear as options for mobile experiments. This is a [known issue](https://jira.mozilla.com/browse/EXP-1242)
:::

### How to add a new custom audience

Create a PR against [constants/nimbus.py](https://github.com/mozilla/experimenter/blob/main/app/experimenter/targeting/constants.py) that adds a new JEXL expression.

Request review from a console core team member. It should be available in the Experimenter UI a few minutes after the PR has merged.

If you're an iOS or a Android developer check the following instructions for how to add new client-side targeting attributes:
- [iOS](ios-custom-targeting.md)
- [Android](android-custom-targeting.md)

⚠️ **New custom audiences should be tested by the core Nimbus team before they are used in production.**
This could involve any or all of the following:

- Test the whole JEXL expression on each application/device it is intended to run on.
- Ask QA to help verify it by creating a dummy experiment.
- Launch an A/A in nightly to see if real users enroll with the correct
