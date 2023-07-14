---
id: experiments-and-user-messaging
title: Experiments & User Messaging
slug: /messaging/experiments-and-user-messaging
sidebar_position: 1
---

Experiments enforce the rule that a user cannot enroll in multiple experiments of the same type (feature). Each messaging surface corresponds to a feature so we can only run a single experiment for any given messaging surface per cohort of users.

There is no practical limitation of Messaging System for how many messages of the same type can exist. If deployed directly through Remote Settings multiple messages targeting the same surface can co-exist.

Messaging System will select a single message to show based on targeting condition and trigger. If multiple messages match, the first one is selected. Through frequency and lifetime settings eventually all messages will be given an opportunity to be shown.

For messages deployed outside of experiments we can use **Priority** (see [How a Message Gets Shown](/messaging/how-a-message-gets-shown)) to rank the order in which they are evaluated.
