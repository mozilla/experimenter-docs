---
id: message-configuration
title: Configuration & Frequency
slug: /messaging/desktop/message-configuration
sidebar_position: 3
---

Configuration options for controlling how and when messages are displayed to users.

## Frequency Caps

## Message Frequency

How often and how many times a user should see a message is configured through frequency.

The following characteristics can be configured:

### Lifetime

How many times a message gets shown to the user before it is permanently blocked.

### Frequency

How much time to allow between consecutive impressions. After a message is shown once it can be configured to be **temporarily** blocked for a period of time in order to not show it too often.

This capability is highly configurable allowing to specify multiple constraints for example:

- show it at most 3 times per week
- but not more than 1 per day

```json
[
  {
    cap: 1,
    period: 86400000 // Max 1 per day
  },
  {
    cap: 3,
    period: 86400000 * 7 // Max 3 per week
  }
]
```

### Example Configuration

```json
frequency: {
  custom: [
    {
      cap: 1, // How many times
      period: 60480000 // Time in ms
    }
  ],
  lifetime: 10 // Show it at most 10 times
}
```

## Groups and Campaigns

### Message Groups

There is the possibility to make further fine grained configuration that can set impression limits between multiple messages.

Example: we have two messages using 2 different messaging surfaces but the messages have a similar theme or content. We can use the **groups** field in the message configuration to point two separate messages to the same frequency and lifetime configuration. When multiple messages point to the same group configuration any impression from one of the messages counts against the total allowed for the group. If the group frequency is set to 1 per day then whichever message is shown first will prevent all the other messages in the group from appearing for the next 24 hours. When a single message is part of multiple groups, it will not display if either of the groups would not display (i.e. is disabled by preference or frequency capped).

### Campaigns

Campaigns are similar to groups but are used to block messages. If two messages reference the same campaign, blocking any of the messages will prevent the others from ever showing up. This was implemented for snippets, and as of December 22 2022, that is the only place they have been used. For example, all snippets mentioning "FxA accounts" would be grouped together in the same campaign. Block one snippet and it blocks the entire campaign.
