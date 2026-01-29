---
id: messaging-journey
title: Journey
slug: /messaging/desktop/desktop-messaging-journey
sidebar_position: 6
---

From inception to launch, a message goes through the below three steps for Firefox Desktop:

## Message Design

Once an idea has been developed, the next step is designing the experiment message. A good place to start for some inspiration, is to look through previous messaging system experiments (Examples in Source doc) as well as looking into the available capabilities through the  [Messaging Surfaces](/messaging/desktop/desktop-messaging-surfaces). The OMC team has vast experience with running these experiments and can provide feedback and answer any questions in the #omc Slack channel.

## Running an Experiment

First, determine if your experiment will require any on-train development work to support the launch as well as any translated strings that need to land prior. Once that’s been determined, we can get started with creating the experiment.
For a more in-depth guide and step by step process, visit [OMC: Experimenter onboarding document](https://mozilla-hub.atlassian.net/wiki/spaces/FIREFOX/pages/233406786/OMC+Experimenter+Onboarding)

## Message in Firefox

Once the experiment has successfully concluded and analysis shows promising results, we can land the new message in tree. Depending on the messaging surface, the following files is where the JSON for our different messages exists

* [`browser/components/aboutwelcome/modules/AboutWelcomeDefaults.sys.mjs`][AboutWelcomeDefaults]
* [`browser/components/asrouter/modules/FeatureCalloutMessages.sys.mjs`][FeatureCalloutMessages]
* [`browser/components/asrouter/modules/OnboardingMessageProvider.sys.mjs`][OnboardingMessageProvider]

Visit [Firefox Source docs](https://firefox-source-docs.mozilla.org/browser/components/asrouter/docs/index.html): newtab for details on how to develop within our components.

[AboutWelcomeDefaults]: https://searchfox.org/mozilla-central/source/browser/components/aboutwelcome/modules/AboutWelcomeDefaults.sys.mjs
[FeatureCalloutMessages]: https://searchfox.org/mozilla-central/source/browser/components/asrouter/modules/FeatureCalloutMessages.sys.mjs
[OnboardingMessageProvider]: https://searchfox.org/mozilla-central/source/browser/components/asrouter/modules/OnboardingMessageProvider.sys.mjs
