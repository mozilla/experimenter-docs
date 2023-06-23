---
id: onboarding-feature-ios
title: Onboarding Feature for iOS
slug: /onboarding-feature-ios
---

# Introduction
The onboarding feature enables experimentating with the 'new user onboarding flow'. The onboarding flow is presented to the user on each new install, and is made up of a series of full screen 'views', referred to as '**cards**'. The purpose of the onboarding flow is to enable the user to configure a small number of app enhancing settings. Each card provides context for each setting and the ability to take an appropratie action, or skip to the next card.

The onboarding feature enables customize each card's:

- title copy
- body copy
- imagery
- button copy
- button actions
- number of buttons (one or two)
- sequencing

# About this document
This document is a guide for staff who wish to configure the new user onboarding flow through the experimenter interface.

It is also a living document:

- the onboarding feature may be under active development
- card types may be added
- card attributes may be added

# Scene setting

The onboarding feature is built on top of Nimbus, Mozilla's experimentation platform. Nimbus allows you to send bits of configuration to application features from Experimenter, the web-application staff use to launch and manage experiments and rollouts.

Using Experimenter in the general case is documented elsewhere, so this document is specifically concerned with configuring the onboarding feature.

# References
For the most up-to-date configurations, the main code base will always be the best place to check.
- [Nimbus manifest](https://github.com/mozilla-mobile/firefox-ios/blob/main/nimbus.fml.yaml)
- [Onboarding feature manifest](https://github.com/mozilla-mobile/firefox-ios/blob/main/nimbus-features/onboardingFrameworkFeature.yaml)

⚠️ The onboarding feature is a [first run experiment](https://experimenter.info/mobile-first-run-experiments)

# Creating an experiment
Only **values that differ** from the card's default values need to be provided to Experimenter. E.g:

#### Existing default card
```json
{
   "cards":{
      "welcome": {
         "title": "Onboarding/Onboarding.Welcome.Title.v114",
         "body": "Onboarding/Onboarding.Welcome.Description.v114",
         "order": 10,
         "image": "welcome-globe",
         "link": {
            "title": "Onboarding/Onboarding.Welcome.Link.Action.v114",
            "url": "https://www.mozilla.org/privacy/firefox/",
         },
          "buttons": {
            "primary": {
              "title": "Onboarding/Onboarding.Welcome.Action.v114",
              "action": "next-card",
            },
          },
          "type": "fresh-install",
          "prerequisites": ["ALWAYS"]
      }
   }
}

```
#### Experimenter card config
```json
{
   "cards":{
      "welcome": {
         "title": "A new title",
      }
   }
}

```
#### Output (the merged result of the existing card and experiment card)
```json
   "cards":{
      "welcome": {
         "title": "A new title",
         "body": "Onboarding/Onboarding.Welcome.Description.v114",
         "order": 10,
         "image": "welcome-globe",
         "link": {
            "title": "Onboarding/Onboarding.Welcome.Link.Action.v114",
            "url": "https://www.mozilla.org/privacy/firefox/",
         },
          "buttons": {
            "primary": {
              "title": "Onboarding/Onboarding.Welcome.Action.v114",
              "action": "next-card",
            },
          },
          "type": "fresh-install",
          "prerequisites": ["ALWAYS"]
      }
   }
```

# Feature Definition
The onboarding feature is split into several values:
- conditions
- cards
- dismissable

## Conditions
The conditions table is a set of triggers, like messaging, that can be used on cards to include or exclude them from appearing. The conditions list is a json of valid JEXL expressions. These expressions can be used in the `prerequisites` or the `disqualifiers` fields in cards. E.g.:

```json
"conditions": {
    "ALWAYS": "true",
    "NOT_INSTALLED_TODAY": "days_since_install > 0"
}
```

## Card definition

| Attribute     | Type                    | Description                                                                                                                           | Default Value                                                  |
|:--------------|:------------------------|:--------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| title         | Free text or TextID     | The title text displayed to the user                                                                                                  | ""                                                             |
| body          | Free text or TextID     | The body text displayed to the user                                                                                                   | ""                                                             |
| order         | Int                     | Used for sequencing cards                                                                                                             | 10                                                             |
| image         | ImageID                 | The image to show for a particular card                                                                                               | welcome-globe                                                  |
| link          | NimbusOnboardingLink    | An optional link. If available, it will appear on the card. If not, no link will be present.                                          | null                                                           |
| buttons       | NimbusOnboardingButtons | The configuartion for buttons.                                                                                                        | A Skip button with a default action of going to the next card. |
| prerequisites | List of JEXL keys       | The list of JEXL keys guiding whether a card can show up for certain users. All prerequisites must be true for a card to show.        | []                                                             |
| disqualifiers | List of JEXL keys       | The list of JEXL keys guiding a card should not show up for certain users. If any disqualifiers are met, then the card will not show. | []                                                             |
| type          | TypeID                  | The type of onboarding the user is seeing.                                                                                            | fresh-install                                                  |

### Default cards
By default, the app is bundled with a collection of pre-defined cards which will be used if no other configuration is provided for the cards. See the [appendix](#default-welcome-card) for an overview of the default cards or the [code](https://github.com/mozilla-mobile/firefox-ios/blob/main/nimbus-features/onboardingFrameworkFeature.yaml) the most up-to-date configuration.

### NimbusOnboardingLink
| Field | Type                  | Description                                    | Default                                    |
|:------|:----------------------|:-----------------------------------------------|:-------------------------------------------|
| title | Free text or StringID | The title of the link                          | "Learn more about our privacy policy"      |
| url   | String                | The url to which the link would take the user. | "https://www.mozilla.org/privacy/firefox/" |

### NimbusOnboardingButtons
| Field     | Type                   | Description                                                                          | Default        |
|:----------|:-----------------------|:-------------------------------------------------------------------------------------|:---------------|
| primary   | NimbusOnboardingButton | The primary button on the card, coloured blue.                                       | A Skip button. |
| secondary | NimbusOnboardingButton | An optional second button. If defined, it will be in grey, below the primary button. | null           |

#### NimbusOnboardingButton
| Field  | Type                  | Description                      | Default   |
|:-------|:----------------------|:---------------------------------|:----------|
| title  | Free text or StringID | The title of the button          | "Skip"    |
| action | OnboardingActions     | The action the button will take. | next-card |

##### OnboardingActions
| Action                     | Description                                                                         |
|:---------------------------|:------------------------------------------------------------------------------------|
| next-card                  | Will take the user to the next card                                                 |
| sync-sign-in               | Will take the user to the sync sign in flow                                         |
| request-notifications      | Will request to allow notifications from the user                                   |
| set-default-browser        | Will send the user to settings to set Firefox as their default browser              |
| open-default-browser-popup | Will open up a popup with instructions for setting Firefox as their default browser |
| read-privacy-policy        | Will open a webview where the user can read the privacy policy                      |

## Dismissable
This is a property for the whole onboarding, and controls whether there is an `x` at the top of the screen or not. This is a simple boolean value:

```json
{
    "dismissable": true
}
```

# Available resources

## TextID
All existing app strings are available to Experimenter. [See the full list here](https://github.com/mozilla-mobile/firefox-ios/blob/main/Client/Frontend/Strings.swift). Note, that only strings with a `tableName` and a `key` can be used.
Free text may also be used instead of a string resource.

⚠️ Localization of **Free Text** is not currently supported.

## Image resources

### Base Resources
| Resource ID   | Description                                   |
|:--------------|:----------------------------------------------|
| welcome-globe | An image of a person hugging the firefox logo |
| sync-devices  | An image of a variety of devices              |
| notifications | An image of notifications                     |

### Campaign - Challenge the Default

| Resource ID      | Description                                                                                                                                                                  |
|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| welcome-ctd      | The welcome image for CTD campaign. |
| sync-devices-ctd | The sync image for CTD campaign. |
| notification-ctd | The notifications image for CTD campaign. |

# Appendix

## Default cards overview

### Default Welcome Card
| Attribute     | Value                                          |
|---------------|------------------------------------------------|
| type          | fresh-install                                  |
| title         | Onboarding/Onboarding.Welcome.Title.v114       |
| body          | Onboarding/Onboarding.Welcome.Description.v114 |
| link          |                                                |
| - title       | Onboarding/Onboarding.Welcome.Link.Action.v114 |
| - url         | "https://www.mozilla.org/privacy/firefox/"     |
| image         | welcome-globe                                  |
| ordering      | 10                                             |
| buttons       |                                                |
| - primary     |                                                |
| -- title      | Onboarding/Onboarding.Welcome.Action.v114      |
| -- action     | next-card                                      |
| prerequisites | ALWAYS                                         |

### Default Sync card
| Attribute     | Value                                         |
|---------------|-----------------------------------------------|
| type          | fresh-install                                 |
| title         | Onboarding/Onboarding.Sync.Title.v114         |
| body          | Onboarding/Onboarding.Sync.Description.v114   |
| image         | sync-devices                                  |
| ordering      | 20                                            |
| buttons       |                                               |
| - primary     |                                               |
| -- title      | Onboarding/Onboarding.Sync.SignIn.Action.v114 |
| -- action     | sync-sign-in                                  |
| - secondary   |                                               |
| -- title      | Onboarding/Onboarding.Sync.Skip.Action.v114   |
| -- action     | next-card                                     |
| prerequisites | ALWAYS                                        |

### Default Notification card
| Attribute     | Value                                                              |
|---------------|--------------------------------------------------------------------|
| type          | fresh-install                                                      |
| title         | Onboarding/Onboarding.Notification.Title.v114                      |
| body          | Onboarding/Onboarding.Notification.Description.v114                |
| image         | notifications                                                      |
| ordering      | 30                                                                 |
| buttons       |                                                                    |
| - primary     |                                                                    |
| -- title      | Onboarding/Onboarding.Notification.TurnOnNotifications.Action.v114 |
| -- action     | request-notifications                                              |
| - secondary   |                                                                    |
| -- title      | Onboarding/Onboarding.Notification.Skip.Action.v115                |
| -- action     | next-card                                                          |
| prerequisites | ALWAYS                                                             |
