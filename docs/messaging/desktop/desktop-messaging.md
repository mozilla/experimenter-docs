---
id: desktop-messaging
title: Desktop Messaging
slug: /messaging/desktop/desktop-messaging
---

Guide to configuring messaging system experiments on Firefox Desktop, focusing on what is specific to messages: message configuration, behaviors, and the relevant tools and reference docs.

## Before You Start

Familiarize yourself with the key messaging system concepts:

- **[Surfaces](/messaging/desktop/desktop-messaging-surfaces)** - Different message types (doorhangers, feature callouts, spotlights, etc.)
- **[Display Logic](/messaging/desktop/display-logic)** - Triggers, targeting, and frequency capping
- **[Configuration & Frequency](/messaging/desktop/message-configuration)** - Detailed configuration options

The general experiment lifecycle is the same for messaging as for any other experiment and is documented separately:

- **[Workflow overview](/workflow/overview)** and **[Getting Started for engineers](/getting-started/for-engineers)** - experimenter fundamentals and creating experiments
- **[Local Enrollment](/platform-guides/desktop/enroll-locally)** and **[Preview Mode](/platform-guides/desktop/preview)** - forced and natural enrollment, and previewing branches
- **[Testing](/workflow/testing)**, **[Launching](/workflow/launching)**, **[Monitoring](/workflow/monitoring)**, and **[Ending](/workflow/ending)** - testing, launch requests, and post-launch

:::info

Whenever you are working with the messaging system, use **#omc** for experiment review and launch requests rather than #ask-experimenter.

:::

### Helpful Tools & Resources

- **[Skylight](https://fxms-skylight.netlify.app/)** - View live messaging experiments, rollouts, and dashboards
- **[ASRouter Devtools](https://firefox-source-docs.mozilla.org/browser/components/asrouter/docs/debugging-docs.html)** - Preview and test message JSON
- **[nimbus-devtools Guide](/resources/nimbus-devtools-guide)** - Advanced testing and debugging
- **#omc** - Slack channel for messaging system questions and reviews

The Firefox [Messaging System source docs](https://firefox-source-docs.mozilla.org/browser/components/asrouter/docs/index.html) are the most up-to-date reference for anything specific to the messaging system:

- **[UI Templates](https://firefox-source-docs.mozilla.org/browser/components/asrouter/docs/#ui-templates)** - The different message surfaces (doorhangers, feature callouts, spotlights, etc.) and their schemas
- **[Trigger Listeners](https://firefox-source-docs.mozilla.org/toolkit/components/messaging-system/docs/TriggerActionSchemas/index.html)** - The user actions that can cause a message to be shown
- **[Targeting Attributes](https://firefox-source-docs.mozilla.org/browser/components/asrouter/docs/targeting-attributes.html)** - The client and browser state you can target against
- **[Frequency Caps & Groups](https://firefox-source-docs.mozilla.org/browser/components/asrouter/docs/frequency-caps.html#message-groups)** - How often a message can be shown, and how to cap groups of messages together
- **[Schemas](https://firefox-source-docs.mozilla.org/toolkit/components/messaging-system/docs/index.html)** - Message schema definitions

## Configuring Message Branches

Each treatment branch holds the message JSON that matches the brief's design, content, and targeting. When configuring branches:

- Set the appropriate [feature configuration](/messaging/desktop/message-configuration) for the surface you're using
- Ensure the JSON matches the [message schema](/messaging/desktop/message-configuration)
- For multi-branch experiments, give the control branch a real `message_id` rather than an empty object so that it records an exposure event

:::warning

An empty object for control will never trigger or go through ASRouter and won't record an exposure event. As a result, the exposure analysis on Experimenter won't work correctly as there's no baseline to compare the treatments to.

:::

Ask in #omc for review if you need clarification on multi-branch experiment setup.

## Selecting a Feature ID

Which feature ID a messaging experiment uses depends on whether it's a holdback/rollout or a standard experiment, and on which surface the message uses.

### Holdback Experiments & Rollouts

For rollouts and holdback experiments, you should pick up a placeholder Feature ID (`fxms-message`) that is not in use. See the [list of current messaging system feature IDs](https://experimenter.services.mozilla.com/nimbus/?status=Live). You can verify what is in use by checking the Experimenter UI and filtering for the specific feature ID using the **All Features** dropdown on the left.

### Non-Holdback Experiments

When picking a feature ID for a non-holdback experiment, you should first prefer to run it on the [feature that matches the surface](/messaging/desktop/desktop-messaging-surfaces) that your experiment is using (`spotlight`, `featureCallout`, `infobar`, `cfr`, etc.).

If there are any other experiments using that feature ID that overlap in time with yours, you may still be able to use it, but ask in #omc to verify.

**Audience Overlap Considerations:**

In the case of experiment targeting overlaps you must ensure that the sum of all audience sizes, including the audience size of your experiment, is no more than 100% for each segment that overlaps. For example, if an experiment exists that uses the same targeting segment as yours is enrolling at 30%, your experiment may use that same feature ID at up to 70%, for a combined 100% of the population of that targeting segment.

:::note

Co-enrollment is supported for `fxms-message` feature IDs as of Firefox 152, so these audience-overlap constraints may not apply when targeting Firefox 152+.

:::

If you are unable to use the feature that matches the surface of your message, reach out to #omc or a data scientist to discuss other options.

**Rollout Priority:**

Experiments take priority over rollouts, so one option is to share an ID with an existing rollout. If all IDs are taken by an experiment, it may still be usable depending on audience overlap. Check whether the targeting populations intersect. If your experiment targets Germany and the existing one targets Canada, they don't share users and can safely reuse the same ID.

The key is that the 'effective audience' (after all targeting criteria) doesn't overlap, not just that the IDs are "free." This also includes things like the channel, locales, and the audience percentage.

## Previewing Message UI with `about:asrouter`

`about:asrouter` (the [ASRouter Devtools](https://firefox-source-docs.mozilla.org/browser/components/asrouter/docs/debugging-docs.html)) is the fastest way to iterate on a message's UI without enrolling. To enable it, set `browser.newtabpage.activity-stream.asrouter.devtoolsEnabled` to `true` in `about:config`, then open `about:asrouter`.

Paste your message JSON into the editor to render it immediately and check the layout, copy, and buttons. You can also inspect the messages currently available to the client and the provider they came from, and reset a message's impressions and frequency-cap history (or block and unblock it) so you can re-test as if you had never seen it.

:::info

`about:asrouter` previews only the **UI** of a message. It does **not** evaluate targeting or triggering. To test the full behavior of a message, enroll in the experiment. See [Local Enrollment](/platform-guides/desktop/enroll-locally) and [Preview Mode](/platform-guides/desktop/preview).

:::

## Additional Resources

- [Messaging System Documentation](/messaging/overview)
- [Experimenter Documentation](https://experimenter.info)
- [nimbus-devtools Guide](/resources/nimbus-devtools-guide)
