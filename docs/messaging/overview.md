---
id: experiments-and-user-messaging
title: Overview
slug: /messaging/overview
sidebar_position: 1
---

Experiments enforce the rule that a user cannot enroll in multiple experiments of the same type (feature). Each messaging surface corresponds to a feature so we can only run a single experiment for any given messaging surface per cohort of users.

There is no practical limitation of Messaging System for how many messages of the same type can exist. If deployed directly through Remote Settings multiple messages targeting the same surface can co-exist.

Messaging System will select a single message to show based on targeting condition and trigger. If multiple messages match, the first one is selected. Through frequency and lifetime settings eventually all messages will be given an opportunity to be shown.

For messages deployed outside of experiments we can use **Priority** (see [Message Lifecycle](/messaging/desktop/message-lifecycle#how-messages-are-displayed)) to rank the order in which they are evaluated.
