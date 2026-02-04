---
id: welcome
title: Welcome
slug: /
---

Welcome to the [Experimenter](https://experimenter.services.mozilla.com/nimbus/) documentation hub, your central resource for A/B experiments and feature rollouts in Firefox Mobile and Desktop. You should find these documents helpful if you are:

* A **product manager** and you have a hypothesis you want to test or a feature you'd like to safely release.
* An **engineer** who needs to implement an experiment or feature rollout in your client
* A **data scientist** helping to design and interpret experiment results
* A **Mozilla leader** who would like insight into completed and ongoing experiments and rollouts.

## What is covered here?

These documents are specific to the Mozilla experimentation program known as **Nimbus**. Nimbus experimentation and support is currently available for our Firefox Desktop and Mobile browser applications.

Our platform code is all open-source however, we do not offer support or services to 3rd party consumers. Some documentation links may only be available to Mozilla employees and NDA contributors.

---

## Platform Capabilities

Nimbus is a full-featured experimentation platform that provides configuration, analysis and client libraries for both experiments and rollouts.

### Experimenter Console
- [Simple experiment configuration UI](/using-experimenter-console)
- [Pre-launch testing support](/platform-guides/desktop/preview)
- [Multifeature experiments](/advanced/branches)
- [Rollouts](/advanced/rollouts)
- [Simple targeting](/configuring)
- [Advanced customizable targeting](/advanced/custom-audiences)
- [Adding Metrics to your Experiment](/data-analysis/jetstream/metrics)
- [Remote settings integration](/advanced/rollouts)
- [Experiment Review / Approval Workflow](/access)
- [Dashboards](/monitoring)
- [Monitoring and Analysis](/data-analysis/jetstream/overview)

### Multiple Language Client Integrations
- [Android (Kotlin)](/platform-guides/android/integration)
- [iOS (Swift)](/platform-guides/ios/integration)
- [Firefox Desktop Frontend (JS)](/platform-guides/desktop/feature-api)
- [Firefox Platform (C++)](/platform-guides/desktop/feature-api)

### Client-side Functionality
<!-- TODO: Uncomment after PR #762 (FAQ) lands -->
<!-- - [Consumer opt-out](/faq/enrollment) -->
- [Integration with console preview testing](/platform-guides/desktop/preview)
<!-- TODO: Uncomment after PR #762 (FAQ) lands -->
<!-- - [View experiments (about:studies)](/faq/enrollment) -->

### Current Client Integrations
- Firefox Desktop
  - Frontend via JS SDK
  - Platform
  - Windows installer
- Firefox Mobile via Nimbus-SDK Rust Component
  - Fenix
  - Firefox iOS
  - Focus Android
  - Focus iOS

### Current Feature Support
- Documented here: [feature definitions](/technical-reference/feature-definition)

### Requesting Feature Support
If you aren't sure we have what you need, pop into #ask-experimenter with your questions or [file an issue](https://mozilla-hub.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10203&issuetype=10097)

---

## Need Help? Not Sure Where to Start?

⭐️ Reach out in [`#ask-experimenter`](https://mozilla.slack.com/archives/CF94YGE03) on Slack <br/>
⭐️ Join [office hours with data science](https://docs.google.com/document/d/1dH-aG8IsYtq6881_Q_cyEtmxli0bK7nuVcUD-5D7q-s/edit?tab=t.0) <br/>

### In this documentation...
⭐️ Take a look at the **Getting Started** section if you are brand new <br/>
⭐️ Check out our **Experimentation Workflow** to get started <br/>
⭐️ Check the **Glossary** for terms you are unfamiliar with <br/>
⭐️ Ask in slack at ask-experimenter for guidance on where to get started

---

## About these docs

This website is built using [Docusaurus](https://v2.docusaurus.io/). If you'd like to edit or add to them, check out the [Contributing](/contributing) page.
