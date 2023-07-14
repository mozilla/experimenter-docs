---
id: groups-and-campaigns
title: Groups & Campaigns
slug: /messaging/groups-and-campaigns
---

### Message Groups ###

There is the possibility to make further fine grained configuration that can set impression limits between multiple messages.

Example: we have two messages using 2 different messaging surfaces but the messages have a similar theme or content. We can use the **groups** field in the message configuration to point two separate messages to the same frequency and lifetime configuration. When multiple messages point to the same group configuration any impression from one of the messages counts against the total allowed for the group. If the group frequency is set to 1 per day then whichever message is shown first will prevent all the other messages in the group from appearing for the next 24 hours. When a single message is part of multiple groups, it will not display if either of the groups would not display (i.e. is disabled by preference or frequency capped).

### Campaigns ###

Campaigns are similar to groups but are used to block messages. If two messages reference the same campaign, blocking any of the messages will prevent the others from ever showing up. This was implemented for snippets, and as of December 22 2022, that is the only place they have been used. For example, all snippets mentioning "FxA accounts" would be grouped together in the same campaign. Block one snippet and it blocks the entire campaign.