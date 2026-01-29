---
id: message-lifecycle
title: Message Lifecycle
slug: /messaging/desktop/message-lifecycle
sidebar_position: 6
---

End-to-end lifecycle of a message from design through deployment, display logic, localization, and telemetry.

## Message Journey

From inception to launch, a message goes through the below three steps for Firefox Desktop:

### Message Design

Once an idea has been developed, the next step is designing the experiment message. A good place to start for some inspiration, is to look through previous messaging system experiments (Examples in Source doc) as well as looking into the available capabilities through the [Messaging Surfaces](/messaging/desktop/desktop-messaging-surfaces). The OMC team has vast experience with running these experiments and can provide feedback and answer any questions in the #omc Slack channel.

### Running an Experiment

First, determine if your experiment will require any on-train development work to support the launch as well as any translated strings that need to land prior. Once that's been determined, we can get started with creating the experiment. For a more in-depth guide and step by step process, visit [OMC: Experimenter onboarding document](https://mozilla-hub.atlassian.net/wiki/spaces/FIREFOX/pages/233406786/OMC+Experimenter+Onboarding)

### Message in Firefox

Once the experiment has successfully concluded and analysis shows promising results, we can land the new message in tree. Depending on the messaging surface, the following files is where the JSON for our different messages exists:

* [`browser/components/aboutwelcome/modules/AboutWelcomeDefaults.sys.mjs`][AboutWelcomeDefaults]
* [`browser/components/asrouter/modules/FeatureCalloutMessages.sys.mjs`][FeatureCalloutMessages]
* [`browser/components/asrouter/modules/OnboardingMessageProvider.sys.mjs`][OnboardingMessageProvider]

Visit [Firefox Source docs](https://firefox-source-docs.mozilla.org/browser/components/asrouter/docs/index.html): newtab for details on how to develop within our components.

## How Messages Are Displayed

All messages belong to a message provider (a source):
- Local provider: shipped with Firefox
- Remote settings: a remote settings bucket
- Experiments: part of a treatment branch

All messages have an associated [trigger](/messaging/desktop/display-logic/#triggers) (user action targeted by the message) and targeting condition. Additionally messages have a frequency cap and they can belong to a group that also has a frequency cap.

Deciding to show a message [starts with the trigger action](https://searchfox.org/mozilla-central/rev/d1e731d931b7b46237175de1701849a7cf5c8579/browser/components/asrouter/modules/ASRouter.sys.mjs#1655), when this happens we look at all the messages matching that trigger. We filter out blocked messages or messages that reached their frequency cap (or their groups frequency cap) and we evaluate targeting returning the first message that matched targeting.

This cycle can result in a message being shown (which will send an Exposure event + message specific telemetry events) or no message being shown if targeting didn't match (but it can still result in a Reach event being sent).

### Message Priority

Several messages can be listening for the same trigger condition in which case we can set a higher priority for the message we prefer.

## Localization

Remote localization is available for all message types but it does require that strings are landed early to give localizers enough time. This is done via the [ms-language-packs](https://github.com/mozilla-services/ms-language-packs/) repo.

As a fallback, we can use hardcoded strings in the message definition.

## Telemetry

Event telemetry is sent for any interaction with the messaging surfaces and additionally for impressions (when the message is shown). The following types of user interaction is captured by telemetry:
- Impression
- Primary click
- Secondary click (when available)
- Dismiss

Telemetry pings will include the message id, experiment and branch slug (if enrolled) and the event type.

Telemetry from all messaging surfaces ([except doorhangers when not enrolled in an experiment](https://searchfox.org/mozilla-central/rev/d1e731d931b7b46237175de1701849a7cf5c8579/browser/components/newtab/lib/TelemetryFeed.sys.mjs#526)) includes client id in the event ping. **Special care should be taken not to associate any browsing history with messaging events: showing a message when the user visits a particular website is not allowed because it would accidentally leak information about that visit.**

Additional telemetry is available when the message is delivered as an <u>experiment</u>:
- Exposure
- Reach

These events are sent once per feature per browsing session.

**Exposure** (actually displayed to the user) is sent just before the message is shown (similar to Impressions) and only for the messages that are defined as _features_ in the FeatureManifest.

A client will send one **Reach** event for every message available in the branches that the client is not enrolled in.
Example: Experiment has 3 branches [control, treatment-1, treatment-2]. If the user is enrolled in the **control branch** then 2 **Reach** pings will be sent for the messages in the treatment-1,2 branches. The reach ping is sent when the user action (trigger) associated with the message and the targeting conditions are satisfied (in other words when the user would have seen the message if the user would have been enrolled in that branch).
**Exposure** and **Reach** events for a feature get sent when the trigger associated with that message fires and if the message targeting matches.

### Debugging Telemetry Pings

Make sure `browser.ping-centre.log` pref is enabled. Open the Browser Toolbox and interact with the message, any telemetry pings will be logged to the console.

_Because of the implementation of moments pages, telemetry is only sent for when a message is matched (the page will be shown in the next browsing session). No other telemetry is available._

## Limitations

### History State of Past Experiments

If multiple messaging campaigns go out as experiments targeting different surfaces it is possible that users would see both campaigns.

Mitigation is possible through the use of groups for frequency capping. If the experiments happen simultaneously, then using the same group can ensure we control the time it takes for a user to see both campaigns.

Similarly (using targeting) it is possible to prevent a user from seeing a message if impressions from a different message are present. This is only possible if the two messages overlap in the system at the same time.

It is also possible to specifically include or exclude users into experiments based on previous experiments that they might have been a part of.

:::info
Note that when using targeting or groups in this way the message **impressions** are removed once the message has been removed or the experiment has ended.
:::

### No Action to Block Message

For the doorhanger template we had a built-in (into the message surface) button to block a message. For all other surfaces there is no way for the user to block a message from ever being shown. Usually campaigns have had a maximum of 1-2 impressions and it was not considered to add a block action. The benefit of blocking would be that we could group similar messages as part of a **"campaign"** (for example Mozilla VPN) and use the block signal as an indicator not to show future messages with similar content.

[AboutWelcomeDefaults]: https://searchfox.org/mozilla-central/source/browser/components/aboutwelcome/modules/AboutWelcomeDefaults.sys.mjs
[FeatureCalloutMessages]: https://searchfox.org/mozilla-central/source/browser/components/asrouter/modules/FeatureCalloutMessages.sys.mjs
[OnboardingMessageProvider]: https://searchfox.org/mozilla-central/source/browser/components/asrouter/modules/OnboardingMessageProvider.sys.mjs
