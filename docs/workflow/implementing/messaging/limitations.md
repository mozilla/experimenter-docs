---
id: limitations
title: Limitations
slug: /messaging/limitations
---

### History state of past experiments ###

If multiple messaging campaigns go out as experiments targeting different surfaces it is possible that users would see both campaigns.

Mitigation is possible through the use of groups for frequency capping. If the experiments happen simultaneously, then using the same group can ensure we control the time it takes for a user to see both campaigns.

Similarly (using targeting) it is possible to prevent a user from seeing a message if impressions from a different message are present. This is only possible if the two messages overlap in the system at the same time. 

It is also possible to specifically include or exclude users into experiments based on previous experiments that they might have been a part of. 

:::info
Note that when using targeting or groups in this way the message **impressions** are removed once the message has been removed or the experiment has ended.
:::

### No action to block message ###
For the doorhanger template we had a built-in (into the message surface) button to block a message. For all other surfaces there is no way for the user to block a message from ever being shown. Usually campaigns have had a maximum of 1-2 impressions and it was not considered to add a block action. The benefit of blocking would be that we could group similar messages as part of a **“campaign”** (for example Mozilla VPN) and use the block signal as an indicator not to show future messages with similar content.

