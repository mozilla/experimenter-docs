---
id: how-a-message-gets-shown
title: Message Display
slug: /messaging/desktop/how-a-message-gets-shown
sidebar_position: 3
---

All messages belong to a message provider (a source):
- Local provider: shipped with Firefox
- Remote settings: a remote settings bucket
- Experiments: part of a treatment branch

All messages have an associated [trigger](/messaging/desktop/display-logic/#triggers) (user action targeted by the message) and targeting condition. Additionally messages have a frequency cap and they can belong to a group that also has a frequency cap.

Deciding to show a message [starts with the trigger action](https://searchfox.org/mozilla-central/rev/d1e731d931b7b46237175de1701849a7cf5c8579/browser/components/asrouter/modules/ASRouter.sys.mjs#1655), when this happens we look at all the messages matching that trigger. We filter out blocked messages or messages that reached their frequency cap (or their groups frequency cap) and we evaluate targeting returning the first message that matched targeting.

This cycle can result in a message being shown (which will send an Exposure event + message specific telemetry events) or no message being shown if targeting didn’t match (but it can still result in a Reach event being sent).

### Message Priority

Several messages can be listening for the same trigger condition in which case we can set a higher priority for the message we prefer.
