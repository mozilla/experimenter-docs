---
id: sizing
title: Sizing
slug: /sizing
---

# How large should my experiment be?

When running experiments, choosing the right size is essential to balance getting meaningful results with minimizing the risk of exposing a larger user population to a potentially negative treatment.

If the experiment is too small, you risk missing important effects or obtaining inconclusive results (but expose fewer users to the treatment). If the experiment is too large, more information may be gained from the results, but the risk due to a negative impact of a branch is excessively large.

## Statistical Power

Statistical power is the probability that the experiment measures a stat sig impact, given that such an impact really exists ([ref](<https://en.wikipedia.org/wiki/Power_(statistics)>)). It is a function of the analysis (metric & statistical test), the design (number of branches), the number of users in the experiment, and the size of the effect.

- For a given effect size, more users will give a higher power.
- For a given branch volume, larger impacts are easier to measure (higher power) than smaller impacts.
- For a given total experiment size, more branches will reduce the statistical power.

We often talk about the "minimum effect size" (MES) as the smallest impact that we care about. A good guideline is to aim for a power of at least 80% for the MES (as that would give us an 80% chance of detecting the MES if it exists and a higher power of detecting larger effects).

### Commentary on absolute size

Statistical power generally (for the statistical tests that Jetstream performs) scales proportionally to the square root of the number of users. As a result, the power gains from increasing the size of an experiment depend on the actual size being considered. That is to say that going from 1% -> 2% has a much larger impact on the power than going from 9% -> 10%. One corollary of this is that, as a general rule, the power gains of going beyond 10% of users per branch are rather minimal. Generally, a 20% experiment (10%/branch) has only slightly higher power than a 100% experiment. There are of course exceptions depending on the absolute size of the targeted population, the smaller the targeted population, the less this rule applies.

### Commentary on Exposure Rates

Experiments often have 2 goals: 1) to measure the impact on users exposed to the treatment and 2) to quantify the impact on business KPIs. The exposure rate (% of enrolled clients who actually saw the treatment) affects both of these considerations. The exposure funnel proportionally reduces the number of users in the sample, thus reducing the power. Similarly, the smaller the exposure rate, the higher an impact on exposed users would be required to move business KPIs. One corollary to this is that risk is proportionally reduced. As an example, for a 1% exposure rate, we can run a much larger experiment for a given risk level (absolute number of users exposed). If exposure rates are very low, opportunity size is low but so is risk.

## Understand Sizing Drivers

There are often important business considerations which can effect the choice of sizing. These can include:

1. Learning Goal
2. Risks
3. Opportunity size
4. Prioritization
5. Contractual requirements

In many situations, these concerns dwarf statistical considerations.

### Learning Goal

What is the goal of the experiment?

- Measure realized value, if any, from a low risk, high priority feature release. In this case, we can choose a large size or even consider a holdback design.
- Determine opportunity size. In this case, we can run a small experiment to assess the opportunity size (exposure rate).
- Demonstrate feature viability. In this case, statistical power is important, but we can also consider staged designs (see below) which maximize precision while reducing risk, at the expense of additional time/effort. We should strongly consider looking at upstream metrics to validate the causal hypothesis.
- Prove a positive impact on guardrail metrics. In this case, a large experiment may be required.

## Helpful Design Patterns

In this section we introduce a few ways to string together sequences of experiments for various beneficial outcomes such as reducing risk or maximizing realized value.

### Sequentially Larger

In this pattern, we can run a sequence of experiments (2 or more) of increasing size. Some examples include:

1. A small experiment (<5%) followed by a very large experiment (20%-100%).
   - Risk is mitigated by running a small experiment (which will bound potential negative impacts) before exposing a large portion of users.
   - Statistical power is maximalized by the very large experiment, giving the highest chance of measuring an impact.
2. A very small experiment (<1%), followed by a small experiment (<5%), followed by a very large experiment.
   - Similar to above, but further limits the risk of the 5% experiment through the use of a very small, preliminary experiment. See for example the rollout of ToU which used a 4-stage design.

### Exploratory then Explanatory

In this pattern, we run an initial small experiment with many branches to identify the winning variant (using a more sensitive, experiment or feature specific metric) and follow-up with a larger experiment to maximize the power of measuring guardrail impacts. For example:

1. A 10% experiment split into 5 branches (2%/branch) followed by a 2-branch 50% experiment (25%/branch).
   - The initial experiment can choose the winner using a sensitive, design-specific message (e.g., clicks on a promotional message or an upstream usage metric).
   - The follow-on experiment maximizes the power of measuring guardrail impacts.
   - Opportunity cost and risk is minimized compared to a single very large design (fewer users exposed to sub-optimial variants) with equivalent power.

### Smoke Test

In this pattern, a very small experiment (~1% or so) is run prior to the main experiment. This can estimate opportunity size/exposure rates and derisk a larger experiment. This is a special form of the Sequentially Larger pattern.

## Same design, more insights

In this section, we explore methods to increase the learnings from a given design.

### Validate Causal Hypothesis

Most experiments have a "Causal Hypothesis", a directed graph of variables whereby causality flows from the action we take in the experiment through toward the outcome we want to measure. As a simple example, suppose we're building a new feature that we believe users will find valuable. The hypothesis could be: if I promote the feature through a message, users will try out the feature and gain value from the feature, and subsequently return to use the browser more. Graphically, the hypothesis is: promotion -> use feature -> higher retention.

Retention (down funnel) is difficult to move, but metrics up funnel are easier to move. We can go one step up and measure feature usage (more sensitive than retention) or even message interaction (most sensitive). Even if a given experiment fails to measure impact to retention, if we can demonstrate impact to upstream metrics then we still have learnings.

## Frequently Asked Questions

### Q: I'm concerned that the proposed size might not be large enough to measure statistical significance. Or equivalently: I ran an experiment and the results were not stat sig, what can I do?

A: you can follow-on with a larger experiment, now that the variant has been de-risked.

### Q: very few users are expected to be exposed to/interact with my experiment.

A: in that case, the risk is also low. You may need to run a large experiment (up to even enrolling all users who meet a criteria) in order to measure any impacts. Also consider the opportunity size though: if very few users could benefit from the experiment that limits the potential value.

### Q: my experiment is very risky, what should I do?

A: run a staged design, with the number of stages and the sizes influenced by the level of risk.

### Q: I have a lot of variants, I'm not sure which will be the best, and I want to maximize the ability to measure impact.

A: consider the Exploratory then Explanatory design mentioned above.

### Q: I don't know how many users will interact or be exposed.

A: follow the Smoke Test pattern.

### Q: My experiment is low risk and I need to maximize potential achieved value and realize value quickly.

A: Consider the Holdback Pattern where you hold 1%-10% of users back as control and deliver the feature the remaining 90%-99%.

### Q: I've read all of this, my experiment is quite low risk, I mostly care about measuring potential value (positive impacts) to guardrails, there aren't any special considerations, I just need to get a number and you're blocking me.

A: pick a size in the range of 1%-10% per branch, depending on your personal risk tolerance. Consider following up with a secondary experiment if results from the first are inconclusive.
