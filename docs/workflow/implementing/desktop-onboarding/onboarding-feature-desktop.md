---
id: onboarding-feature-desktop
title: Onboarding
slug: /platform-guides/desktop/onboarding
---

This guide explains how to use the Desktop onboarding feature to experiment with the new user onboarding flow, including customizing card content, imagery, sequencing, and first run experiment setup on Windows.

The onboarding feature enables experimentation with the 'new user onboarding flow'. The onboarding flow is presented to the user on each new install and is made up of a series of full screen 'views', referred to as 'cards'. The purpose of the onboarding flow is to enable the user to configure a small number of app enhancing settings. Each card provides context for each setting and the ability to enable/skip.

The onboarding feature enables staff — most likely experiment owners, product owners, user research and marketing teams to customize each card's:

    title copy
    body copy
    imagery
    button copy
    sequencing

At the time of writing, Desktop first run experiments are only supported on Windows.  This note describes what first run experiments are, sketches how first run experiments work on Windows, and suggests approaches for supporting first run experiments on macOS.

First run experiments are those that make changes to onboarding, that need data from brand-new clients, or that otherwise relate to clients who are using Firefox on their device for the first time, [reference](https://experimenter.info/advanced/first-run-experiments/#how-do-i-know-if-an-experiment-should-be-first-run).

## How First Run Experiments Work on Windows

Firefox experiments are defined by recipes.  Recipes that might apply to a particular Firefox user are delivered to Firefox via a “pull” -- an HTTP GET request -- from [Remote Settings](https://firefox.settings.services.mozilla.com).  The [Experimenter](https://experimenter.services.mozilla.com/nimbus/) system manages the recipes themselves and pushes them to Remote Settings for wider distribution; you can safely think of Remote Settings as a CDN (Content Distribution Network) for efficiently distributing recipes.

The initial pull of the experiment recipes is both time consuming and relatively late in Firefox startup.  To avoid the perception of slow Firefox startup, the Windows installer and Firefox coordinate to start Firefox while the installer UI is still present and to only display the Firefox UI (and hide the installer UI) after the initial pull of current experiment recipes is complete.  See the [First Startup documentation](https://firefox-source-docs.mozilla.org/toolkit/modules/toolkit_modules/FirstStartup.html).

## How First Run Experiments Work on Mac

First run experiments are not supported on Mac.  Nick Alexander [explores some of the challenges and possible approaches here](https://docs.google.com/document/d/1RYoekrHwd5NRqE7mgMSIvkl1l9fhwOpfc2J2S92CwS0/edit).  There is considerable engineering and QA work needed.   

## Background

The onboarding feature is built on top of Nimbus, Mozilla's experimentation platform. Nimbus allows you to send bits of configuration to application features from Experimenter, the web-application staff use to launch and manage experiments and rollouts.

Using Experimenter in the general case is documented elsewhere, so this document is specifically concerned with configuring the onboarding feature.

## References

For the most up-to-date configurations, the main code base will always be the best place to check.

* Nimbus manifest
* onboarding feature manifest

## Creating an Experiment

Only values that differ from the default card(s) needs providing by the Experimenter. E.g:

### Existing Default Card

(add example)

### Experimenter Card Config

(see sample experiments on the [about-welcome feature](https://experimenter.services.mozilla.com/nimbus?applications=DESKTOP&allFeatureConfigs=DESKTOP%3Aaboutwelcome&tab=completed))

