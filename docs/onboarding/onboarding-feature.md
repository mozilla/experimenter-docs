---
id: onboarding-feature-android
title: Onboarding Feature for Android
slug: /onboarding
---

# Introduction
The onboarding feature enables experimentation with the 'new user onboarding flow'. The onboarding flow is presented to the user on each new install and is made up of a series of full screen 'views', referred to as '**cards**'. The purpose of the onboarding flow is to enable the user to configure a small number of app enhancing settings. Each card provides context for each setting and the ability to enable/skip.

The onboarding feature enables staff — most likely experiment owners, product owners, user research and marketing teams to customize each card's:

- title copy
- body copy
- imagery
- button copy
- sequencing

# About this document
This document is a guide for staff who wish to configure the new user onboarding flow through the experimenter interface.

It is also a living document:

- the onboarding feature may be under active development
- card types may be added
- card attributes may be added 

# Scene setting

The onboarding feature is built on top of Nimbus, Mozilla's experimentation platform. Nimbus allows you to send bits of configuration to application features from Experimenter, the web-application staff use to launch and manage experiments and rollouts.

Using Experimenter in the general case is documented elsewhere, so this document is specifically concerned with configuring the onboarding feature. [Example experiment](https://experimenter.services.mozilla.com/nimbus/lifestyles-images-onboarding-experiment/summary)

# References
For the most up-to-date configurations, the main code base will always be the best place to check.
- [Nimbus manifest](https://github.com/mozilla-mobile/firefox-android/blob/main/fenix/app/nimbus.fml.yaml)
- [onboarding feature manifest](https://github.com/mozilla-mobile/firefox-android/blob/main/fenix/app/onboarding.fml.yaml)

⚠️ The onboarding feature is a **first run experiment**. 
- [for information on first run experiment](https://experimenter.info/mobile-first-run-experiments)

# Creating an experiment
Only **values that differ** from the default card(s) needs providing by the Experimenter. E.g:

#### Existing default card
```json
{
   "cards":{
      "default-browser":{
         "card-type":"default-browser",
         "title":"juno_onboarding_default_browser_title_nimbus",
         "ordering":10,
         "body":"juno_onboarding_default_browser_description_nimbus",
         "link-text":"juno_onboarding_default_browser_description_link_text",
         "image-res":"ic_onboarding_welcome",
         "image-is-illustration":true,
         "primary-button-label":"juno_onboarding_default_browser_positive_button",
         "secondary-button-label":"juno_onboarding_default_browser_negative_button"
      }
   }
}

```
#### Experimenter card config
```json
{
   "cards":{
      "default-browser":{
         "image-res":"onboarding_default_browser",
         "image-is-illustration":false
      }
   }
}

```
#### Output (the merged result of the existing card and experiment card)
```json
 "cards":{
      "default-browser":{
         "card-type":"default-browser",
         "title":"juno_onboarding_default_browser_title_nimbus",
         "ordering":10,
         "body":"juno_onboarding_default_browser_description_nimbus",
         "link-text":"juno_onboarding_default_browser_description_link_text",
         "image-res":"onboarding_default_browser",
         "image-is-illustration":false,
         "primary-button-label":"juno_onboarding_default_browser_positive_button",
         "secondary-button-label":"juno_onboarding_default_browser_negative_button"
      }
   }
```

# Card definition
| Attribute              | Type                        | Description                                  | Notes                                                                                                         |       
|------------------------|-----------------------------|----------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| card-type              | Card Type                   | The type of the card                         | [See defined cards types](#card-types)                                                                                     |
| title                  | Free text  or   Resource ID | The title text displayed to the user         |                                                                                                               | 
| body                   | Free text  or  Resource ID  | The message text displayed to the user       | May contain linkable text                                                                                     | 
| link-text (optional)   | Free text or  Resource ID   | The text to link from the ‘body’ text        | Must match the linkable text from the ‘body’ exactly e.g. body: This is a policy link, link-text: policy link |
| image-res              | Resource ID                 | The resource ID of the image to be displayed |                                                                                                               | 
| image-is-illustration  | Boolean                     | True if the image type is an illustration    |                                                                                                               |
| ordering               | Integer                     | Used to sequence the cards                   | The system used for ordering is counting in tens, e.g. 10, 20, 30…                                            |
| primary-button-label   | Free text  or  Resource ID  | The text to display on the primary button    |                                                                                                               | 
| secondary-button-label | Free text or  Resource ID   | The text to display on the secondary button  |                                                                                                               | 

## Card types
- default-browser
- sync-sign-in
- notification-permission

# Default cards
By default, the app is bundled with a collection of pre-defined cards which will be used if no other configuration is provided for the cards. See the [appendix](#default-cards-overview) for an overview of the default cards or the [code](https://github.com/mozilla-mobile/firefox-android/blob/bfb1acebe37ea6fcff80d12f4084a54bb8a6cd1a/fenix/app/onboarding.fml.yaml#L4) the most up-to-date configuration. 

# Available resources

## String resources
All existing app strings are available to Experimenter. [See the full list here](https://github.com/mozilla-mobile/firefox-android/blob/main/fenix/app/src/main/res/values/strings.xml).
Free text may also be used instead of a string resource.

⚠️ Localization of **Free Text** is not currently supported.

## Image resources

### Campaign - Default (Illustrations)
| Card type               | Resource ID                |
|-------------------------|----------------------------|
| default-browser         | ic_onboarding_welcome      |
| sync-sign-in            | ic_onboarding_sync         |
| notification-permission | ic_notification_permission |

### Campaign - Lifestyle (Photographic)

| Card type               | Resource ID                                                                                                                                                               |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| default-browser         | [onboarding_default_browser](https://raw.githubusercontent.com/mozilla-mobile/firefox-android/main/fenix/app/src/main/res/drawable-xxhdpi/onboarding_default_browser.webp)| 
| sync-sign-in            | [onboarding_sync](https://raw.githubusercontent.com/mozilla-mobile/firefox-android/main/fenix/app/src/main/res/drawable-xxhdpi/onboarding_sync.webp)                      |
| notification-permission | [onboarding_notification](https://raw.githubusercontent.com/mozilla-mobile/firefox-android/main/fenix/app/src/main/res/drawable-xxhdpi/onboarding_notification.webp)      |

# Appendix

## Default cards overview

### Default browser card
| Attribute              | Value                                                 |
|------------------------|-------------------------------------------------------|
| card-type              | default-browser                                       |
| title                  | juno_onboarding_default_browser_title_nimbus          |
| body                   | juno_onboarding_default_browser_description_nimbus    |
| link-text (optional)   | juno_onboarding_default_browser_description_link_text |
| image-res              | ic_onboarding_welcome                                 |
| image-is-illustration  | true                                                  |
| ordering               | 10                                                    |
| primary-button-label   | juno_onboarding_default_browser_positive_button       |
| secondary-button-label | juno_onboarding_default_browser_negative_button       |

### Sync card
| Attribute              | Value                                   |
|------------------------|-----------------------------------------|
| card-type              | sync-sign-in                            |
| title                  | juno_onboarding_sign_in_title           |
| body                   | juno_onboarding_sign_in_description     |
| link-text (optional)   | null                                    |
| image-res              | ic_onboarding_sync                      |
| image-is-illustration  | true                                    |
| ordering               | 20                                      |
| primary-button-label   | juno_onboarding_sign_in_positive_button |
| secondary-button-label | juno_onboarding_sign_in_negative_button |

### Notification card
| Attribute              | Value                                                   |
|------------------------|---------------------------------------------------------|
| card-type              | notification-permission                                 |
| title                  | juno_onboarding_enable_notifications_title_nimbus       |
| body                   | juno_onboarding_enable_notifications_description_nimbus |
| link-text (optional)   | juno_onboarding_default_browser_description_link_text   |
| image-res              | ic_notification_permission                              |
| image-is-illustration  | true                                                    |
| ordering               | 30                                                      |
| primary-button-label   | juno_onboarding_enable_notifications_positive_button    |
| secondary-button-label | juno_onboarding_enable_notifications_negative_button    |
| secondary-button-label | juno_onboarding_sign_in_negative_button                 |