---
id: messaging-journey
title: Desktop Messaging Journey
slug: /messaging/desktop-messaging-journey
sidebar_position: 6
---

From inception to launch, a message goes through the below three steps for Firefox Desktop:

## Message Design

Once an idea has been developed, the next step is designing the experiment message. A good place to start for some inspiration, is to look through previous messaging system experiments (Examples in Source doc) as well as looking into the available capabilities through the  [Messaging Surfaces](/messaging/desktop-messaging-surfaces). The OMC team has vast experience with running these experiments and can provide feedback and answer any questions in the #omc Slack channel. 

## Running an Experiment

First, determine if your experiment will require any on-train development work to support the launch as well as any translated strings that need to land prior. Once that’s been determined, we can get started with creating the experiment.
For a more in-depth guide and step by step process, visit [OMC: Experimenter onboarding document](https://mozilla-hub.atlassian.net/wiki/spaces/FIREFOX/pages/233406786/OMC+Experimenter+Onboarding)

## Message in Firefox

Once the experiment has successfully concluded and analysis shows promising results, we can land the new message in tree. Depending on the messaging surface, the following files is where the JSON for our different messages exists

```
browser/components/newtab/aboutwelcome/lib/AboutWelcomeDefaults.jsm
browser/components/newtab/lib/FeatureCalloutMessages.jsm
browser/components/newtab/lib/OnboardingMessageProvider.jsm
```
	
Visit [Firefox Source docs](https://firefox-source-docs.mozilla.org/browser/components/newtab/docs/index.html): newtab for details on how to develop within our components.


