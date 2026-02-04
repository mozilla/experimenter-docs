---
id: for-product
title: For Product Managers
slug: /for-product
---

This guide explains the role and responsibilities of Experiment Owners (typically Product Managers) in the experimentation process, from initial design through launch and analysis.

## Role Overview

Product Managers often write the initial experiment to capture the logistical information, but it can also be engineers or program managers.  Often engineers fill in the technical change information - so ownership can be a collaboration to get the logistical and technical information for the remote change entered correctly.

## Responsibilities

- Watching training for new experiment owners [here](https://mozilla.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=7efb5737-cce9-4c9a-b8a3-b26e010e5855) - the slide deck in the video is [here](https://docs.google.com/presentation/d/1ASlVAds63qOzCDnyLWlbKAcgvTkVfojDeGFqIYty4iI/edit#slide=id.p)
- Starting and completing the [experiment brief](https://docs.google.com/document/d/1_bWn_1y5x1zf6zl7Loj4O1qKnVdxzIMXOawIpf32CsM/edit?usp=share_link) - which aligns everyone supporting the experiment to the learning goals.
- Align on the design of the experiment by attending a [data science office hours](https://www.google.com/url?q=https://docs.google.com/document/d/1dH-aG8IsYtq6881_Q_cyEtmxli0bK7nuVcUD-5D7q-s/edit%23&sa=D&source=calendar&ust=1646684514330583&usg=AOvVaw0O5Sbz3fHVx2rFDcl3DpNg) on [Wednesday and Thurday](https://mozilla-hub.atlassian.net/wiki/spaces/DATA/pages/6849684/Office+Hours).  The goal is whenever possible to answer all questions possible within office hours.
- If follow up work is needed from data science, then we need to file a [Data Org Jira ticket](https://mozilla-hub.atlassian.net/jira/software/c/projects/DO/boards/269).
- Implementing the experiment in [Nimbus console AKA Experimenter](https://experimenter.services.mozilla.com/)
- Creating the [QA "Nimbus/Remote delivery" Jira ticket](https://mozilla-hub.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10212&issuetype=11290) (linked in experiment brief)
- Launching the experiment, ending enrollment, ending experiment (the [experimentation workflow](/workflow/overview))
- Working with the experiment team (in slack at #ask-experimenter) to identify a set of reviewers trained and authorized to review experiments in your feature area. The experiment team will train them on how to review.

## Where do I start?

- Watch the 5 minute video on [experiment workflow](https://experimenter.info/workflow/overview) for an overview of the experiment lifecycle to understand the stages / ordering. Use the [Workflow Miro board](https://experimenter.info/workflow/overview) as your source for current links and guidance.

<img title="design-miro-board" src="/img/getting-started/design-miro-board.png"/>

:::tip IMPORTANT
**You must watch the training video before writing your first experiment.** 
- The training for new experiment owners is [here](https://mozilla.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=3bcc9a08-50a4-45bb-88fe-af2001116cb3) 
- The slide deck in the video is [here](https://docs.google.com/presentation/d/1ASlVAds63qOzCDnyLWlbKAcgvTkVfojDeGFqIYty4iI/edit?usp=share_link).
:::

- **Ask any questions in ask-experimenter** (you will have questions the first few times). Please ask for a shadow in #ask-experimenter your first time(s) through and someone will hop on zoom to write with you. We are happy to help people through the learning curve.
- **Start by opening the Experiment Brief link.** If it is your first [Experiment Brief](https://docs.google.com/document/d/1_bWn_1y5x1zf6zl7Loj4O1qKnVdxzIMXOawIpf32CsM/edit?usp=share_link) - there is an optional 5 minute ["how to video"](https://mozilla.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=178918e0-cc77-4acd-a0a6-ae5c00e3cb68).
- **Fill out your experiment brief.** As the Product Manager you are responsible for clearly articulating the product goals and questions that need to be answered. Capture as much as you can. It will improve and evolve as you have conversations with different subject matter experts. The experiment brief is the authoritative source to capture the shared understanding.
   - **Referencing one source (the experiment brief)** for the verbose experiment background enables the subject matter experts (engineering, QA, experiment tooling, data) to efficiently support the effort and respond to changing requirements. 
   - The experiment owner will **keep editing the experiment brief** throughout the lifecycle of the experiment. Capture the decisions as they are made back in your experiment brief. Decisions left in in slack channels, verbal discussions, various notes, jira tickets, etc - increase the likelihood of errors and wasted effort..
   - There is a **Checklist section** at the end of your Experiment Brief to help you through the steps of your experiment.
- **Link the experiment brief to your experiment** when you create your experiment in the [Nimbus experiment tool](https://experimenter.services.mozilla.com/).

## Key Resources for Experiment Owners

Rather than duplicate links that may later break as the process improves - links to the resources and training videos are in the [Workflow Miro Board](https://experimenter.info/workflow/overview).

- There are several weekly touchpoints [Office Hours](https://mozilla-hub.atlassian.net/wiki/spaces/DATA/pages/6849684/Office+Hours) for in person assistance from subject matter experts in different areas.
- If you are confused on any aspect - that's expected the first few experiments until you've gotten the rhythm. Ask in the #ask-experimenter Slack channel - it is an open community of support from several disciplines.

## When shipping product changes: a guide on when to use what option

|                                                           |                                                                     Experiment (Experimentation Program)                                                                      |                                                         Rollout                                                         |                                                                Holdback                                                                |
| --------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: |
| Definition                                                |                    Experiment with 2 or more branches (treatment groups). Insights gathered at the end of experiment timeframe. Can be scaled to Rollout.                     |          Delivery where you ship 1 change, and that change goes to all the users in the determined population.          |                            When you run an experiment (see Experiment column) at the same time as Rollout.                             |
| Population and timeframe                                  |                                                            A fixed set of population for a fixed set of timeframe                                                             |        A fixed set of population at each shipping phase (population size is variable - can be scaled up & down)         |          Can have different population sizes between Rollout and experiment. Time frame of rollout and experiment can differ.          |
| Measure causal DAU impact                                 |                                                                                      Yes                                                                                      |                                                           No                                                            |                                                                  Yes                                                                   |
| See statistical significant insights on guardrail metrics |                                                                                      Yes                                                                                      |                                                           No                                                            |                                                                  Yes                                                                   |
| When to use                                               | Looking for a causal relationship between a product change and key business metrics like DAU and 2-week retention. Also when measuring the impact of a potential new feature. |             Looking to primarily reduce technical risks such as scalability when shipping a product change              | Looking to make a product change available immediately to a wide population while monitoring product change impact to business metrics |
|                                                           |                                                Delays the speed of making the product change available to a wider population.                                                 | No insights on key business metrics like DAU, as tooling is not set up to make control and treatment group comparisons. |  If a product change has detrimental impact to guardrail metrics and DAU, we may or may not be too late in rolling back the changes.   |
| Advantages                                                |                                                          Can measure impact first, then if positive ship the change                                                           |                                           Can scale up or down as appropriate                                           |                                              Faster than blocking on impact measurements                                               |
| Experiment brief needed                                   |                                                                                      Yes                                                                                      |                                                           No                                                            |                                                                  Yes                                                                   |

## Example of how to construct a balanced launch plan

[What Velocity team practices today]

- First, run a small experiment
  - Goal: Reduce business risk and decide whether to ship
  - Example: 5% of users\*; observe DAU impact of 1% to 10%
- Then, if results of small experiment is positive, ship via rollout + holdback
  - Goal: Measure impact at scale
  - Example: 50% of users, 25% get feature and the other 25% doesn’t; observe DAU impact of 3%-5%

\*Note that: 5% can be whatever population you choose to target. Can be en-US, “infrequent users”, “users who haven’t imported bookmarks”, etc.
