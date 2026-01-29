---
id: sizing-rollouts 
title: Sizing rollouts 
slug: /rollouts/sizing
---
:::tip
See the [Rollout FAQ](/advanced/rollouts) for general rollout information
:::

### Question
How quickly can I get to 100% with a staged rollout?

### Answer

**Your sizing steps** are a balance of:
- how many users do you need to gain confidence to go to the next step?
- How big of a step are you comfortable with?

Some common patterns are:
- Low risk:  5, 10, 50,100 (the steps may be bigger if only a fraction of the populatio will use the feature)
- Med risk: 1, 5, 10, 25, 75, 100
- High risk or scaling risk: .5, 1, 5, 10, 25, 50, 75, 100 (ex: you are worried about too many people using a back end server at once, and want to test small capacity loads)

The first step is usually the one where issues are discovered.  It's easy to stop the rollout, land fixes, and start again with a higher minimum version (after the fixes have landed).

**The speed you increase** is based on:
- What are you observing to decide you are OK moving forward?
- How long will it take to see those changes?

Some common patterns are:
- Fast:  2 days, 7 days, 10 days (ex: a frequently used feature, where the telemetry exists for your team to easily see issues)
- Med: 1 week, 2 week, 3 week
- Slow: 2 week, 4 weeks, 6 weeks (ex: it takes users a while to use the feature or looking at revenue or other indirect impacts)
