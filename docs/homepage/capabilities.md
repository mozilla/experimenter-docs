---
id: capabilities
title: Nimbus Features
sidebar_label: Features
slug: /capabilities
---

Nimbus is a full-featured experimentation platform that provides configuration, analysis and client libraries for both experiments and rollouts.

## Experimenter Console
- Simple experiment configuration UI
- Pre-launch testing support
- Multifeature experiments
- Rollouts
- Simple targeting
- Advanced customizable targeting
- Remote settings integration
- Experiment Review / Approval Workflow
- Dashboards
- Monitoring and Analysis

## Experiment Types
|                          | Branches                                                                  | Control            | Co-existence / Avoidance                                                                                               | Enrollment                                                             | Analysis                                                                 | Good for?                                                                                          | Permanent Change                                                                   |
|--------------------------|---------------------------------------------------------------------------|--------------------|------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------|--------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| Experiment               | A/B - equal sizes. Size fixed at launch - cannot grow.                    | Y                  | One per feature at a time.   Avoids other live experiments on a specific feature.  Keep as small as possible to learn. | Fixed timeframe. 7 day typically.  Analysis only AFTER enrollment ends | Automated for default metrics.  Can select outcomes or create new custom | Stat sig differences from control + absolute counts.                                               | No - all changes delivered through nimbus reverted.                                |
| Message experiment       | Same AND each branch is given a messageID that the messaging system uses. | Same as experiment | Same as experiment AND message system throttles max # per time frame                                                   | Same as experiment                                                     | Same as experiment                                                       | Same as experiment                                                                                 | N Same as experiment                                                               |
| Multi-feature experiment | Same as experiment                                                        | Same as experiment | Avoids other live experiment with EITHER FEATURE - **restricted audience                                               | Same as experiment                                                     | Same as experiment                                                       | Same as experiment                                                                                 | N Same as experiment                                                               |
| Holdback Experiment      | Go right to end stage of rollout - 90% treatment                          | Y - 10%            | Same as experiment AND no other feature can be tested in this feature for the duration.                                | Same as experiment                                                     | Same as experiment                                                       | Decision made to deploy quickly - but want data.  A brief step before shipping as default in tree. | No - all changes delivered through nimbus reverted.  Fast follow shipping in tree. |


## Feature Delivery 
|                                            | Branches                          | Control            | Co-existence / Avoidance                                                                                                                      | Enrollment                                                       | Analysis                                                                                     | Good for?                                                                                                                                          | Permanent Change                                                                                          |
|--------------------------------------------|-----------------------------------|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| Rollout Today                              | Size increases 5%, 25%, 50%, 100% | N                  | Unrestricted co-existence Does not avoid other rollouts or experiments.                                                                       | N/A                                                              | None - teams can make and monitor their own dashboards - but no “stat sig analysis” offered. | Risk mitigation for explosive failures (looking for crash, bugs, media issues)                                                                     | Yes.  Changes do not revert on targeted versions.   Teams ship as default in tree in the release at 100%. |
| Branch Promotion                           | 1 - 100%                          | N                  | On an experiment with a winning branch - you can select “promote to rollout” which clones the ticket with the winning configuration filled in | N                                                                | N                                                                                            | Get winning branch to users quicker than trains                                                                                                    | Same as Rollout Today                                                                                     |
| Do No Harm Monitoring Platform  Experiment | Same as experiment                | Same as experiment | Same as experiment.                                                                                                                           | No fixed timeframe means there is no automatic analysis trigger. | Not automated.  Requires OpMon configured or team using their own custom dashboards.         | Code changing/fixes landing during. Risk mitigation for quick major breaking stability / perf changes.   Looking at adding search metrics as well. | N Same as experiment                                                                                      |

## Multiple language Client integrations
- Android (Kotlin)
- iOS (Swift)
- Firefox Desktop Frontend (JS)
- Firefox Platform (C++)

## Client-side functionality
- Consumer opt-out
- Integration with console preview testing
- View experiments (about:studies)

## Current client integrations
- Firefox Desktop
  - Frontend via JS SDK
  - Platform
  - Windows installer
- Firefox Mobile via Nimbus-SDK Rust Component
  - Fenix
  - Firefox iOS
  - Focus Andriod
  - Focus iOS

## Requesting feature support
If you aren't sure we have what you need, pop into #ask-experimenter with your questions or [file an issue](https://mozilla-hub.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10203&issuetype=10097) 
