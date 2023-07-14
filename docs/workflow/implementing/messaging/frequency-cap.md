---
id: frequency-cap
title: Messaging System Frequency cap
slug: /messaging/frequency-cap
sidebar_position: 4
---

# Message Frequency

How often and now many times a user should see a message is configured through frequency.

The following characteristics can be configured:

## Lifetime

How many times a message gets shown to the user before it permanently blocked.

## Frequency

How much time to allow between consecutive impressions. After a message is shown once it can be configured to be **temporarily** blocked for a period of time in order to not show it too often.

This capability is highly configurable allowing to specify multiple constrains for example:

- show it at most 3 times per week
- but not more than 1 per day

```
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

# How it looks in practice

```
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
