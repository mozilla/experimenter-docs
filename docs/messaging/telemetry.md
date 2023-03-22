---
id: telemetry
title: Telemetry
slug: /messaging/telemetry
---

Event telemetry is sent for any interaction with the messaging surfaces and additionally for impressions (when the message is shown). The following types of user interaction is captured by telemetry:
- Impression
- Primary click
- Secondary click (when available)
- Dismiss

Telemetry pings will include the message id, experiment and branch slug (if enrolled) and the event type.

Telemetry from all messaging surfaces ([except doorhangers when not enrolled in an experiment](https://searchfox.org/mozilla-central/rev/65d4d3399afa79c8de5a0cc11752d2ba7c31edc1/browser/components/newtab/lib/TelemetryFeed.jsm#645)) includes client id in the event ping. **Special care should be taken not to associate any browsing history with messaging events: showing a message when the user visits a particular website is not allowed because it would accidentally leak information about that visit.**

[Additional telemetry](https://experimenter.info/telemetry/) is available when the message is delivered as an <u>experiment</u>:
- Exposure
- Reach

These events are sent once per feature per browsing session.

**Exposure** (actually displayed to the user) is sent just before the message is shown (similar to Impressions) and only for the messages that are defined as _features_ in the FeatureManifest.

A client will send one **Reach** event for every message  available in the branches that the client is not enrolled in.
Example: Experiment has 3 branches [control, treatment-1, treatment-2]. If the user is enrolled in the **control branch** then 2 **Reach** pings will be sent for the messages in the treatment-1,2 branches. The reach ping is sent when the user action (trigger) associated with the message and the targeting conditions are satisfied (in other words when the user would have seen the message if the user would have been enrolled in that branch).
**Exposure** and **Reach** events for a feature get sent when the trigger associated with that message fires and if the message targeting matches.

**Debugging telemetry pings**

Make sure `browser.ping-centre.log` pref is enabled. Open the Browser Toolbox and interact with the message, any telemetry pings will be logged to the console. 

_Because of the implementation of moments pages, telemetry is only sent for when a message is matched (the page will be shown in the next browsing session). No other telemetry is available._
