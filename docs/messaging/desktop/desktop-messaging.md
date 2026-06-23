---
id: desktop-messaging
title: Desktop Messaging
slug: /messaging/desktop/desktop-messaging
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Step-by-step guide for creating and launching messaging system experiments.

## Before You Start

Before beginning, familiarize yourself with the key messaging system concepts:

- **[Surfaces](/messaging/desktop/desktop-messaging-surfaces)** - Different message types (doorhangers, feature callouts, spotlights, etc.)
- **[Display Logic](/messaging/desktop/display-logic)** - Triggers, targeting, and frequency capping
- **[Configuration & Frequency](/messaging/desktop/message-configuration)** - Detailed configuration options

Also review the [Getting Started guide](/getting-started/for-engineers) and [Workflow overview](/workflow/overview) for experimenter fundamentals.

### Helpful Tools & Resources

- **[Skylight](https://fxms-skylight.netlify.app/)** - View live messaging experiments, rollouts, and dashboards
- **[ASRouter Devtools](https://firefox-source-docs.mozilla.org/browser/components/asrouter/docs/debugging-docs.html)** - Preview and test message JSON
- **[Nimbus DevTools Guide](/resources/nimbus-devtools-guide)** - Advanced testing and debugging
- **[#omc](https://mozilla.enterprise.slack.com/archives/C90HG2UQH)** - Slack channel for messaging system questions and reviews

## Getting Started Workflow

When an experiment is kicked-off, an [experiment brief](/workflow/overview) is created by a Product Manager, which will detail the experiment's hypothesis, design, content, targeting, and audience sizing.

As an engineer, your goal will be to create the experiment in Experimenter and the applicable JSON for each treatment branch that matches the brief's design, content and targeting.

At a high level, the following is how to configure the experiment:

### 1. Experiment Overview

- Navigate to [https://experimenter.services.mozilla.com/nimbus/](https://experimenter.services.mozilla.com/nimbus/) and select **Create New**
- Add the public name which is visible to users in `about:studies` (this will also create the unique experiment slug)
- Add the hypothesis as defined in the experiment brief
- Set the application (typically Firefox Desktop)
- Include links to the Experiment Brief and applicable Jira ticket

### 2. Configure Branches

The number of treatment branches and their content will be defined in the experiment brief. Ensure that:

- The appropriate [feature configuration](/messaging/desktop/message-configuration) has been set
- The JSON defined here matches the [message schema](/messaging/desktop/message-configuration)
- For multi-branch experiments, the control branch includes a `message_id` and is not an empty object to ensure exposure event

:::warning

An empty object for control will never trigger or go through ASRouter and won't record an exposure event. As a result, the exposure analysis on Experimenter won't work correctly as there's no baseline to compare the treatments to.

:::

Ask in [#omc](https://mozilla.enterprise.slack.com/archives/C90HG2UQH) for review if you need clarification on multi-branch experiment setup.

### 3. Select a Feature ID

#### Holdback Experiments & Rollouts

For rollouts and holdback experiments, you should pick up a placeholder Feature ID (`fxms-message`) that is not in use. See the [list of current messaging system feature IDs](https://experimenter.services.mozilla.com/nimbus/?status=Live#). You can verify what is in use by checking the Experimenter UI and filtering for the specific feature ID using the **All Features** dropdown on the left.

#### Non-Holdback Experiments

When picking a feature ID for a non-holdback experiment, you should first prefer to run it on the [feature that matches the surface](/messaging/desktop/desktop-messaging-surfaces) that your experiment is using (`spotlight`, `featureCallout`, `infobar`, `cfr`, etc.).

If there are any other experiments using that feature ID that overlap in time with yours, you may still be able to use it, but ask in [#omc](https://mozilla.enterprise.slack.com/archives/C90HG2UQH) to verify.

**Audience Overlap Considerations:**

In the case of experiment targeting overlaps, for each segment that overlaps, you must ensure that the sum of all audience sizes, including the audience size of your experiment is no more than 100%. For example, if an experiment exists that uses the same targeting segment as yours is enrolling at 30%, your experiment may use that same feature ID at up to 70%, for a combined 100% of the population of that targeting segment.

If you are unable to use the feature that matches the surface of your message, reach out to [#omc](https://mozilla.enterprise.slack.com/archives/C90HG2UQH) or a data scientist to discuss other options.

**Rollout Priority:**

Experiments take priority over rollouts, so one option is to share an ID with an existing rollout. If all IDs are taken by an experiment, it may still be usable depending on audience overlap. Check whether the targeting populations intersect. If your experiment targets Germany and the existing one targets Canada, they don't share users and can safely reuse the same ID.

The key is that the 'effective audience' (after all targeting criteria) doesn't overlap, not just that the IDs are "free." This also includes things like the channel, locales, and the enrollment %.

## Testing the Experiment

When creating the JSON for treatment branches, you can verify the changes by updating the experiment to Preview Mode and by selecting **Launch to Preview**. This will provide a link that will force enroll the user into the experiment. Alternatively, you can copy paste the JSON into `about:asrouter` to preview it.

### Force Enrollment Testing

To test the experiment using forced enrollment:

1. In `about:config`, set `nimbus.debug` to `true`
2. Go to Experimenter and select the branch of the experiment you want to enroll yourself within
3. Copy the `about:studies?...` enrollment link for that branch and paste it into the address bar
4. You should now be opted into the experiment. Verify by checking `about:studies`
5. Trigger the surface your message uses to confirm the branch is live (e.g. open `about:welcome` for an onboarding/spotlight message, or perform the relevant [trigger](/messaging/desktop/display-logic) for an infobar, CFR, or feature callout)
6. To unenroll, go to `about:studies` and remove yourself from the study
7. To enroll into another branch, repeat steps 2-4 and re-trigger the surface

:::tip

The [Nimbus Developer Tools](/resources/nimbus-devtools-guide) provide a faster way to force enroll — you can paste the experiment's `Recipe JSON` (or a feature configuration) directly instead of using the `about:studies` link.

:::

:::info

Using `about:asrouter` is helpful for quickly previewing and configuring the UI elements of the message, but it will **not** preview the targeting and triggering.

Force enrolling through Experimenter will preview the message-level targeting and triggering but **not** the advanced targeting. To test the full behavior, see the section on [testing natural enrollment](#natural-enrollment-testing).

:::

### Natural Enrollment Testing

To test experiment with natural enrollment on first startup:

#### 1. Generate a Normandy ID

We first need to generate a normandy ID, which will later be passed into the `user.js` file. In `about:config` set `devtools.chrome.enabled` pref to `true`.

In the browser console, paste the following (replacing `{YOUR_EXPERIMENT_SLUG}` with your experiment slug):

```javascript
await ChromeUtils.importESModule("resource://nimbus/lib/ExperimentManager.sys.mjs").ExperimentManager.generateTestIds((await (await fetch("https://firefox.settings.services.mozilla.com/v1/buckets/main-preview/collections/nimbuspreview/records/{YOUR_EXPERIMENT_SLUG}")).json()).data)
```

This will return an object with the respective branch IDs, which can then be populated in your `user.js` file.

#### 2. Update the user.js File

- Open browser profile (`about:profiles`)
- Create a new profile and create a `user.js` file in browser's profile folder (`../Firefox/Profiles`)
- Fill it with the normandy ID generated above:

```javascript title="user.js"
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Common preferences file used by both unittest and perf harnesses.
/* globals user_pref */
user_pref(
  "messaging-system.rsexperimentloader.collection_id",
  "nimbus-preview"
);
user_pref("app.normandy.user_id", "${GENERATED_BRANCH_NORMANY_ID_GOES_HERE}");
user_pref("messaging-system.log", "all");
user_pref("browser.ping-centre.log", true);
```

:::tip

Use "Show Finder" (for root directory) to get quick access to the folder. Also save the path to the profile for the next step.

:::

#### 3. Launch Firefox with the Profile

Run the appropriate Firefox build that matches the preview targeting (i.e. Nightly, Release, Beta) and add the profile with first-startup syntax:

<Tabs>
<TabItem value="mac" label="macOS">

```bash
/Applications/Firefox/Contents/MacOS/firefox --first-startup --profile "/Users/{username}/Library/Application Support/Firefox/Profiles/{profileName}"
```

</TabItem>
<TabItem value="windows" label="Windows">

```bash
"C:\Program Files\Mozilla Firefox\firefox.exe" --first-startup --profile "C:\Users\{username}\AppData\Roaming\Mozilla\Firefox\Profiles\{profileName}"
```

</TabItem>
</Tabs>

#### 4. Verify Enrollment

Check `about:studies` page and `about:telemetry#events` page to verify natural enrollment.

### Testing Telemetry

To test the experiment's telemetry pings, this should be done regularly during development to ensure no breaking changes were introduced and telemetry is working as intended:

```bash
./mach run --temp-profile --setpref "browser.ping-centre.log=true" --setpref "browser.newtabpage.activity-stream.telemetry=true" --setpref "nimbus.debug=true"
```

You can verify telemetry when running the browser console (**Tools > Web Developer > Browser Toolbox**).

## Launching & Post-Launch

Once the experiment has been created and is in preview mode, ensure that the experiment has been tested locally through forced and/or natural enrollment from the above steps.

### QA Testing

Create a QA ticket in the Jira experiment FXE ticket (**Automation > Create QA when in Preview Mode**) and link the experiment to the generated QA ticket.

### Launch Request

When the experiment has received green from QA:

1. Select **"Request Launch"** in the experiment
2. Copy the link into the [#omc](https://mozilla.enterprise.slack.com/archives/C90HG2UQH) Slack channel for review
3. Someone on the team will approve or request changes in the experiment

:::info

Whenever you are using messaging system, please leverage [#omc](https://mozilla.enterprise.slack.com/archives/C90HG2UQH) for an experiment reviewer/launch request rather than [#ask-experimenter](https://mozilla.enterprise.slack.com/archives/CF94YGE03).

:::

### Post-Launch Monitoring

After the experiment launches:

1. Monitor the experiment Looker dashboard (found on the left-hand side of the experiment under **Links** > **"Live Monitoring Dashboard"**)
2. Set reminders to check enrollment trends and anomalies. You can use: `/remind me to check experiment enrolments everyday at 1pm`
3. If enrollment is trending towards the audience sizing, on the enrollment end date, manually end enrollment by requesting to end enrollment and linking the experiment into the [#omc](https://mozilla.enterprise.slack.com/archives/C90HG2UQH) Slack channel for review
4. If enrollment is not trending towards the sizing, flag this with data science in the experiment Slack channel
5. The experiment must also be manually ended once the observation period has concluded, following the same procedure as requesting launch and enrollment end

## Additional Resources

- [Messaging System Documentation](/messaging)
- [Experimenter Documentation](https://experimenter.info)
- [Feature Monitoring](/workflow/feature-monitoring)
- [Testing Guide](/workflow/testing)
- [Nimbus DevTools Guide](/resources/nimbus-devtools-guide)
---
id: desktop-messaging
title: Desktop Messaging
slug: /messaging/desktop/desktop-messaging
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Step-by-step guide for creating and launching messaging system experiments.

## Before You Start

Before beginning, familiarize yourself with the key messaging system concepts:

- **[Surfaces](/messaging/desktop/desktop-messaging-surfaces)** - Different message types (doorhangers, feature callouts, spotlights, etc.)
- **[Display Logic](/messaging/desktop/display-logic)** - Triggers, targeting, and frequency capping
- **[Configuration & Frequency](/messaging/desktop/message-configuration)** - Detailed configuration options

Also review the [Getting Started guide](/getting-started/for-engineers) and [Workflow overview](/workflow/overview) for experimenter fundamentals.

### Helpful Tools & Resources

- **[Skylight](https://fxms-skylight.netlify.app/)** - View live messaging experiments, rollouts, and dashboards
- **[ASRouter Devtools](https://firefox-source-docs.mozilla.org/browser/components/asrouter/docs/debugging-docs.html)** - Preview and test message JSON
- **[Nimbus DevTools Guide](/resources/nimbus-devtools-guide)** - Advanced testing and debugging
- **[#omc](https://mozilla.enterprise.slack.com/archives/C90HG2UQH)** - Slack channel for messaging system questions and reviews

## Getting Started Workflow

When an experiment is kicked-off, an [experiment brief](/workflow/overview) is created by a Product Manager, which will detail the experiment's hypothesis, design, content, targeting, and audience sizing.

As an engineer, your goal will be to create the experiment in Experimenter and the applicable JSON for each treatment branch that matches the brief's design, content and targeting.

At a high level, the following is how to configure the experiment:

### 1. Experiment Overview

- Navigate to [https://experimenter.services.mozilla.com/nimbus/](https://experimenter.services.mozilla.com/nimbus/) and select **Create New**
- Add the public name which is visible to users in `about:studies` (this will also create the unique experiment slug)
- Add the hypothesis as defined in the experiment brief
- Set the application (typically Firefox Desktop)
- Include links to the Experiment Brief and applicable Jira ticket

### 2. Configure Branches

The number of treatment branches and their content will be defined in the experiment brief. Ensure that:

- The appropriate [feature configuration](/messaging/desktop/message-configuration) has been set
- The JSON defined here matches the [message schema](/messaging/desktop/message-configuration)
- For multi-branch experiments, the control branch includes a `message_id` and is not an empty object to ensure exposure event

:::warning

An empty object for control will never trigger or go through ASRouter and won't record an exposure event. As a result, the exposure analysis on Experimenter won't work correctly as there's no baseline to compare the treatments to.

:::

Ask in [#omc](https://mozilla.enterprise.slack.com/archives/C90HG2UQH) for review if you need clarification on multi-branch experiment setup.

### 3. Select a Feature ID

#### Holdback Experiments & Rollouts

For rollouts and holdback experiments, you should pick up a placeholder Feature ID (`fxms-message`) that is not in use. See the [list of current messaging system feature IDs](https://experimenter.services.mozilla.com/nimbus/?status=Live#). You can verify what is in use by checking the Experimenter UI and filtering for the specific feature ID using the **All Features** dropdown on the left.

#### Non-Holdback Experiments

When picking a feature ID for a non-holdback experiment, you should first prefer to run it on the [feature that matches the surface](/messaging/desktop/desktop-messaging-surfaces) that your experiment is using (`spotlight`, `featureCallout`, `infobar`, `cfr`, etc.).

If there are any other experiments using that feature ID that overlap in time with yours, you may still be able to use it, but ask in [#omc](https://mozilla.enterprise.slack.com/archives/C90HG2UQH) to verify.

**Audience Overlap Considerations:**

In the case of experiment targeting overlaps, for each segment that overlaps, you must ensure that the sum of all audience sizes, including the audience size of your experiment is no more than 100%. For example, if an experiment exists that uses the same targeting segment as yours is enrolling at 30%, your experiment may use that same feature ID at up to 70%, for a combined 100% of the population of that targeting segment.

If you are unable to use the feature that matches the surface of your message, reach out to [#omc](https://mozilla.enterprise.slack.com/archives/C90HG2UQH) or a data scientist to discuss other options.

**Rollout Priority:**

Experiments take priority over rollouts, so one option is to share an ID with an existing rollout. If all IDs are taken by an experiment, it may still be usable depending on audience overlap. Check whether the targeting populations intersect. If your experiment targets Germany and the existing one targets Canada, they don't share users and can safely reuse the same ID.

The key is that the 'effective audience' (after all targeting criteria) doesn't overlap, not just that the IDs are "free." This also includes things like the channel, locales, and the enrollment %.

## Testing the Experiment

When creating the JSON for treatment branches, you can verify the changes by updating the experiment to Preview Mode and by selecting **Launch to Preview**. This will provide a link that will force enroll the user into the experiment. Alternatively, you can copy paste the JSON into `about:asrouter` to preview it.

### Force Enrollment Testing

To test the experiment using forced enrollment:

1. In `about:config`, set `nimbus.debug` to `true`
2. Go to Experimenter and select the branch of the experiment you want to enroll yourself within
3. Copy the `about:studies?...` enrollment link for that branch and paste it into the address bar
4. You should now be opted into the experiment. Verify by checking `about:studies`
5. Trigger the surface your message uses to confirm the branch is live (e.g. open `about:welcome` for an onboarding/spotlight message, or perform the relevant [trigger](/messaging/desktop/display-logic) for an infobar, CFR, or feature callout)
6. To unenroll, go to `about:studies` and remove yourself from the study
7. To enroll into another branch, repeat steps 2-4 and re-trigger the surface

:::tip

The [Nimbus Developer Tools](/resources/nimbus-devtools-guide) provide a faster way to force enroll — you can paste the experiment's `Recipe JSON` (or a feature configuration) directly instead of using the `about:studies` link.

:::

:::info

Using `about:asrouter` is helpful for quickly previewing and configuring the UI elements of the message, but it will **not** preview the targeting and triggering.

Force enrolling through Experimenter will preview the message-level targeting and triggering but **not** the advanced targeting. To test the full behavior, see the section on [testing natural enrollment](#natural-enrollment-testing).

:::

### Natural Enrollment Testing

To test experiment with natural enrollment on first startup:

#### 1. Generate a Normandy ID

We first need to generate a normandy ID, which will later be passed into the `user.js` file. In `about:config` set `devtools.chrome.enabled` pref to `true`.

In the browser console, paste the following (replacing `{YOUR_EXPERIMENT_SLUG}` with your experiment slug):

```javascript
await ChromeUtils.importESModule("resource://nimbus/lib/ExperimentManager.sys.mjs").ExperimentManager.generateTestIds((await (await fetch("https://firefox.settings.services.mozilla.com/v1/buckets/main-preview/collections/nimbuspreview/records/{YOUR_EXPERIMENT_SLUG}")).json()).data)
```

This will return an object with the respective branch IDs, which can then be populated in your `user.js` file.

#### 2. Update the user.js File

- Open browser profile (`about:profiles`)
- Create a new profile and create a `user.js` file in browser's profile folder (`../Firefox/Profiles`)
- Fill it with the normandy ID generated above:

```javascript title="user.js"
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Common preferences file used by both unittest and perf harnesses.
/* globals user_pref */
user_pref(
  "messaging-system.rsexperimentloader.collection_id",
  "nimbus-preview"
);
user_pref("app.normandy.user_id", "${GENERATED_BRANCH_NORMANY_ID_GOES_HERE}");
user_pref("messaging-system.log", "all");
user_pref("browser.ping-centre.log", true);
```

:::tip

Use "Show Finder" (for root directory) to get quick access to the folder. Also save the path to the profile for the next step.

:::

#### 3. Launch Firefox with the Profile

Run the appropriate Firefox build that matches the preview targeting (i.e. Nightly, Release, Beta) and add the profile with first-startup syntax:

<Tabs>
<TabItem value="mac" label="macOS">

```bash
/Applications/Firefox/Contents/MacOS/firefox --first-startup --profile "/Users/{username}/Library/Application Support/Firefox/Profiles/{profileName}"
```

</TabItem>
<TabItem value="windows" label="Windows">

```bash
"C:\Program Files\Mozilla Firefox\firefox.exe" --first-startup --profile "C:\Users\{username}\AppData\Roaming\Mozilla\Firefox\Profiles\{profileName}"
```

</TabItem>
</Tabs>

#### 4. Verify Enrollment

Check `about:studies` page and `about:telemetry#events` page to verify natural enrollment.

### Testing Telemetry

To test the experiment's telemetry pings, this should be done regularly during development to ensure no breaking changes were introduced and telemetry is working as intended:

```bash
./mach run --temp-profile --setpref "browser.ping-centre.log=true" --setpref "browser.newtabpage.activity-stream.telemetry=true" --setpref "nimbus.debug=true"
```

You can verify telemetry when running the browser console (**Tools > Web Developer > Browser Toolbox**).

## Launching & Post-Launch

Once the experiment has been created and is in preview mode, ensure that the experiment has been tested locally through forced and/or natural enrollment from the above steps.

### QA Testing

Create a QA ticket in the Jira experiment FXE ticket (**Automation > Create QA when in Preview Mode**) and link the experiment to the generated QA ticket.

### Launch Request

When the experiment has received green from QA:

1. Select **"Request Launch"** in the experiment
2. Copy the link into the [#omc](https://mozilla.enterprise.slack.com/archives/C90HG2UQH) Slack channel for review
3. Someone on the team will approve or request changes in the experiment

:::info

Whenever you are using messaging system, please leverage [#omc](https://mozilla.enterprise.slack.com/archives/C90HG2UQH) for an experiment reviewer/launch request rather than [#ask-experimenter](https://mozilla.enterprise.slack.com/archives/CF94YGE03).

:::

### Post-Launch Monitoring

After the experiment launches:

1. Monitor the experiment Looker dashboard (found on the left-hand side of the experiment under **Links** > **"Live Monitoring Dashboard"**)
2. Set reminders to check enrollment trends and anomalies. You can use: `/remind me to check experiment enrolments everyday at 1pm`
3. If enrollment is trending towards the audience sizing, on the enrollment end date, manually end enrollment by requesting to end enrollment and linking the experiment into the [#omc](https://mozilla.enterprise.slack.com/archives/C90HG2UQH) Slack channel for review
4. If enrollment is not trending towards the sizing, flag this with data science in the experiment Slack channel
5. The experiment must also be manually ended once the observation period has concluded, following the same procedure as requesting launch and enrollment end

## Additional Resources

- [Messaging System Documentation](/messaging/overview)
- [Experimenter Documentation](https://experimenter.info)
- [Feature Monitoring](/feature-monitoring)
- [Testing Guide](/workflow/testing)
- [Nimbus DevTools Guide](/resources/nimbus-devtools-guide)
