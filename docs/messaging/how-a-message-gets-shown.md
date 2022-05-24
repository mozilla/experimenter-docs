---
id: how-a-message-gets-shown
title: How a Message Gets Shown
slug: /messaging/how-a-message-gets-shown
---

All messages belong to a message provider (a source):
- Local provider: shipped with Firefox
- Remote settings: a remote settings bucket
- Experiments: part of a treatment branch

All messages have an associated [trigger](https://experimenter.info/messaging/display-logic/#triggers) (user action targeted by the message) and targeting condition. Additionally messages have a frequency cap and they can belong to a group that also has a frequency cap.

Deciding to show a message [starts with the trigger action](https://searchfox.org/mozilla-central/rev/65d4d3399afa79c8de5a0cc11752d2ba7c31edc1/browser/components/newtab/lib/ASRouter.jsm#1323), when this happens we look at all the messages matching that trigger. We filter out blocked messages or messages that reached their frequency cap (or their groups frequency cap) and we evaluate targeting returning the first message that matched targeting.

This cycle can result in a message being shown (which will send an Exposure event + message specific telemetry events) or no message being shown if targeting didn’t match (but it can still result in a Reach event being sent).

### Message Priority ###
Several messages can be listening for the same trigger condition in which case we can set a higher priority for the message we prefer.
