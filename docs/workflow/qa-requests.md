---
id: qa-requests
title: Requesting QA
slug: /workflow/qa-requests
---

How to file a QA request so QA can test your experiment, rollout, or feature before launch.

The canonical process lives in a Google Doc: [How to file a QA request](https://docs.google.com/document/d/1oz1YyaaBI-oHUDsktWA-dLtX7WzhYqs7C121yOPKo2w/edit). This page reproduces it so you do not have to leave the docs site.

## What a QA request is

QA is a soft sign-off before launch. Feature testing alone is not enough for experiments or rollouts. A QA passthrough verifies that the feature turns on and off through Nimbus, that it works across the desired platforms and important locales, that the targeting expression enrolls only the intended users, and that the telemetry the analysis depends on is gathered while enrolled.

If your work requires QA, you file a Jira ticket in the Quality Assurance (QA) project to start QA involvement. For the rules on when you may skip QA for an experiment or rollout, see [QA Sign-off](/workflow/risk-mitigation#qa-sign-off).

## Issue types

The QA project (pid 10212) has three issue types. Pick the one that matches your work.

| Issue type | When to use | Create form |
| --- | --- | --- |
| Nimbus/Remote delivery (`11290`) | Experiments, rollouts, and messaging delivered through Nimbus or Remote Settings, including pre-flips through the Nimbus Secure Experiments collection. This is the type experiment owners file. | [Create](https://mozilla-hub.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10212&issuetype=11290) |
| Functional (`11461`) | Feature-configuration testing before you experiment, and general feature work. | [Create](https://mozilla-hub.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10212&issuetype=11461) |
| Embedded QA (`10064`) | Projects that will be in development for at least three release cycles. Identical fields to Functional. | [Create](https://mozilla-hub.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10212&issuetype=10064) |

## Before you file a Nimbus/Remote delivery request

- A Data Science (DS) Jira ticket if your experiment or rollout needs analysis. The DS team assesses feasibility on their [board](https://mozilla-hub.atlassian.net/jira/software/c/projects/DS/boards/258). This ticket is not required if no data analysis is needed.
- An Experimenter recipe (Nimbus page). The delivery team uses it to confirm the experiment or rollout can run on the current infrastructure, and QA uses it to test the recipe. See the [experiment workflow overview](/workflow/overview) to create one.

## How to file

1. Go to [jira.mozilla.com](https://mozilla-hub.atlassian.net).
2. Click **Create** at the top of the page.
3. In the first dropdown, select the **Quality Assurance (QA)** project.
4. In the second dropdown, select the issue type from the three above.

Each field has a role in QA work. Fields are marked by importance:

- **Mandatory**: required to start QA. If these are missing, QA will follow up with questions and will not assign an owner until the details are provided.
- **Recommended**: not blocking, but they speed up the process.
- **Optional**: self-explanatory.

After you fill in the fields for your issue type, click **Create**. An email is sent to the QA team.

## Field guidance: Nimbus/Remote delivery

Use this form for experiments and rollouts. Depending on complexity, QA needs one to three days for testing (documenting, questions, test case preparation, execution, and sign-off).

| Field | Importance | Guidance |
| --- | --- | --- |
| Summary | Mandatory | Short description of the experiment or rollout. Example: "QA for holdback experiment for new MR1 onboarding on about:welcome". |
| Reporter | Mandatory | Usually set to your account. Change it if you are filing on someone else's behalf. |
| Priority | Mandatory | How urgent and important the work is. |
| Link to Nimbus recipe / Experiment Brief / Design document | Recommended | Add any or all of: the Nimbus recipe (Experimenter page), the Experiment Brief, and the Design Document. Providing these at filing time helps ensure a QA contact is assigned. |
| Assignee | Optional | Leave as is unless a specific QA has worked on your prior experiments. |
| Due Date | Optional | The date by which you want testing done, or the tentative launch date. |
| Attachment | Optional | Use if the experiment is in a custom build or add-on. If the build lives elsewhere, note the location in the description instead. |
| Channels | Optional | The Firefox channel and version your experiment targets. If unset, QA sets these from the linked Nimbus recipe. |
| Bugs to be filed at | Optional | Where QA should log bugs. If unset, QA finds an appropriate Bugzilla component or uses Shield: Shield Studies. |
| Contacts: Feature owner(s) + engineer(s) | Optional | People who can answer questions after the ticket is assigned. |
| Description | Optional | Additional details not already in the Nimbus/Experimenter ticket. |
| Delivery mechanism | Optional | Dropdown for how the experiment or rollout is delivered, usually Nimbus. |
| Collaborators, Labels | Optional | QA fills these in (QA adds a QA:Experiment or QA:Rollout label after assignment). |

## Field guidance: Functional (feature)

Use this form for feature-configuration testing before you experiment. Add the `Feature-Configuration` label. See [QA-1785](https://mozilla-hub.atlassian.net/browse/QA-1785) for an example ticket. If you have documentation about the feature's configuration, link it to the ticket so QA can build the test plan and cases.

Key Mandatory fields:

| Field | Guidance |
| --- | --- |
| Feature name | The name of your feature. Example: "Normandy: Don't unenroll users when prefs change". |
| Summary | Short description of the request. |
| Target release | The Firefox version you plan to release in. |
| Priority | How urgent and important the work is. |
| Product | The platform your feature is on. |
| Shipping Method | Normal train release, System Add-on (Balrog or other delivery), or Other (web page or anything else). |
| Relevant Links | Links to tracking bugs or anything that helps QA. |
| Link to Technical Documentation | Documentation, designs, UX flows, or feature technical documentation. |
| Feature Owners | Who QA should contact with issues or requests. |
| Reporter | Usually your account. Change it if filing for someone else. |
| Engineering team | Select your team from the dropdown so QA can route the ticket. |

Recommended fields include Description (work in scope, work not in scope, other details), Bugwork (when the work is only verifying bug fixes to a released feature), Engineers, EPM, and Product Manager.

## Timing

- Nimbus/Remote delivery: file at least two days before launch for a low-complexity request, about one week before for a medium or high-complexity request. If QA lacks sufficient detail, the deadline may slip.
- Functional: file by the Friday before the target Nightly cycle begins.

QA cannot start without a due date, or at least a Firefox version number, because the work cannot be prioritized. You may still file early and add the date later.

## FAQ

**This experiment or feature already had a round of QA. Do I need a new one?**
Yes if the targeting changed or a new feature configuration was added, or if the previous QA was a different issue type (for example, the first was Functional and the new one is a rollout). Not necessarily for a code change on the feature (self-testing can cover it) or a change to the targeted version or channel (a risk the team can accept).

**Can I reuse an old QA ticket?**
Only if it has not been marked Resolved. If it is still open and changes occur, update the ticket and notify the assigned QA.

**Can I file one ticket for both a feature and an experiment?**
No. They are treated differently: separate QA documentation, tests, and sign-offs. File one ticket for each.

**Can I file a QA request before I know I need it?**
Yes. If you are planning an experiment or rollout but the timeline or some details are not final, file the request and update the ticket once the timeline and details are known.

**Can I reserve QA time by filing in advance?**
No. QA prioritizes tickets by how actionable they are and by bandwidth.

## Contacts

- Nimbus/Remote delivery: Slack [#ask-experimenter](https://mozilla.slack.com/archives/CF94YGE03) or @sescalante.
- Functional: dte-leads on Slack.

## Examples

- [QA-5522](https://mozilla-hub.atlassian.net/browse/QA-5522) (Nimbus/Remote delivery)
- [QA-5474](https://mozilla-hub.atlassian.net/browse/QA-5474) (Nimbus/Remote delivery)
- [QA-1785](https://mozilla-hub.atlassian.net/browse/QA-1785) (Functional feature-configuration)
