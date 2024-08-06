---
id: ios-microsurveys
title: Microsurvey Feature for iOS
slug: /messaging/microsurveys/ios
---
## Introduction
This page provides context on the microsurvey feature and a guide to configure the recipes for future microsurveys, specifically on the iOS platform. The microsurvey feature is an extension of the [messaging framework](/messaging/mobile-messaging), and allows us to capture user’s sentiment on any specific app’s features such as the homepage.

Note that this page was created during the MVP phase of the microsurvey project.

## UI
The microsurvey feature is composed of two main UI components. One is the prompt and one is the actual survey.

### Prompt

The prompt is an invitation to start the survey and it is shown when the triggers are met. The triggers are determined through the mobile messaging infrastructure and should be specified by the Nimbus recipe. For testing, we have created a trigger in which the user will be eligible to receive the survey after visiting the homepage twice.

The prompt is shown until the user completes the survey, closes the survey or reaches the maximum number of display specified in the mobile messaging configurations.

<img src="/img/messaging/microsurveys/ios-prompt.png" alt="Prompt view" className="img-sm"/>
<br/><br/>

1. This title of the prompt which can be customized, but also has a fallback string located [here](https://github.com/mozilla-mobile/firefox-ios/blob/f7cd5ff5cbd9e7100c2cb9ae7b7278f3958dfa3f/firefox-ios/Client/Frontend/Strings.swift#L1361).
2. The close button dismisses the survey and it won't be shown again.
3. The continue button starts the survey and shows the survey sheet. The button label can be customized, but also has a fallback string located [here](https://github.com/mozilla-mobile/firefox-ios/blob/f7cd5ff5cbd9e7100c2cb9ae7b7278f3958dfa3f/firefox-ios/Client/Frontend/Strings.swift#L1366).

### Survey (Modal / Bottom Sheet)

The survey sheet is shown after the user clicks on the button in the prompt. It is a modal that starts at medium detent (50%) on iPhone and large detent (100%) on iPad. The user will be able to view and fill out the survey.

<img src="/img/messaging/microsurveys/ios-sheet.png" alt="Sheet view" className="img-sm"/>
<br/><br/>

1. The sheet grabber allows users to expand or dismiss the sheet. If the user dismisses the sheet by dragging down, this will close the sheet and show the prompt.
2. The close button dismisses both the sheet and the prompt.
3. The question and options both can be customized. There are fallback options for the options, but the question is required for the microsurvey message to appear. Fallback strings are located [here](https://github.com/mozilla-mobile/firefox-ios/blob/f7cd5ff5cbd9e7100c2cb9ae7b7278f3958dfa3f/firefox-ios/Client/Frontend/Strings.swift#L1420).
4. The submit button will send the survey result via telemetry and is enabled if at least one option is selected.
5. The privacy notice navigates the user to open a new tab. The prompt will still be shown unless the user has completed the survey and views the confirmation page.

### Additional Views
| User Selected Option    | Confirmation Page |
| ----------------------- | ----------------- | 
| <img src="/img/messaging/microsurveys/ios-user-selected-option.png" alt="Sheet view" className="img-sm"/> | <img src="/img/messaging/microsurveys/ios-confirmation.png" alt="Sheet view" className="img-sm"/> |

## Survey JSON recipe
If you are not familiar with the existing [messaging framework](/messaging/mobile-messaging), please take a look here first. The microsurveys are built on top of the already existing framework, with a couple extra fields to configure the survey.

### Customize the prompt

On the prompt, you can customize the prompt title by using the same `title` field as a normal message. This can be configured with the Nimbus recipe or set with a pre-landed string id that is in our app bundle, which is already localizable. The button title can also be configured using the same `button-label` field.

```json
{
  "messages": {
    "homepage-microsurvey-message": {
    ...
     "title": "Help us make Firefox better. It only takes a minute.",
     "button-label": "Continue",
    ...
    }
  }
}

```

If a customizable string is used, then make sure that translations are provided if needed. See more details on [localization of messages.](/messaging/mobile-messaging#localization-of-messages)

### Customize the survey (modal / bottom sheet)

For the survey, you can control the question, survey options and UTM parameter for the privacy policy link. For the survey question, use the `text` field at the same level as the `title` one, similar to the latter where you can provide either a string or pre landed string id.

```json
{
  "messages": {
    "homepage-microsurvey-message": {
    ...
     "title": "Help us make Firefox better. It only takes a minute.",
     "button-label": "Continue",
     "text": "How satisfied are you with your Firefox homepage?"
    ...
    }
  }
}
```

#### microsurveyConfig

To customize the survey options, icon and UTM parameter, we have to add the `microsurveyConfig` field object. For the survey options, there exists a new field called `options`, it’s an array in which each item will represent a possible survey option for the user to select. Currently, the array is composed of type `Text`, which you can read more about our bundle types [here](https://experimenter.info/fml-spec/#bundle-types).

For the icon, add the `icon` field under `microsurveyConfig`. This is related to the asset used next to the survey question. It should change for each survey feature, but it needs to be a valid icon resource id indicated in our app. This field is composed of type `Image`, which you can read more about our bundle types [here](https://experimenter.info/fml-spec/#bundle-types). The list of standard images can be found [here](https://github.com/mozilla-mobile/firefox-ios/blob/main/BrowserKit/Sources/Common/Constants/StandardImageIdentifiers.swift).

For the UTM parameter, add the `utm-content` field. This is related to the utm-content value that we pass in as a query param for our privacy notice. It should change for each survey feature, but it can be any string. Here is an example case: 
`https://www.mozilla.org/en-US/privacy/firefox/?utm_medium=firefox-mobile&utm_source=modal&utm_campaign=microsurvey&utm_content=homepage`


```json
{
  "messages": {
    "homepage-microsurvey-message": {
      ...
      "title":"Help us make Firefox better. It only takes a minute.",
      "button-label":"Continue",
      "text":"How satisfied are you with your Firefox homepage?",
      ...
      "microsurveyConfig": {
        "utm-content": "homepage",
        "icon":"homeLarge",
        "options": [
            "Very satisfied", 
            "Satisfied",
            "Neutral", 
            "Dissatisfied"
            "Very dissatisfied" 
        ]
      }
    }
  }
}

```

## Triggers
Before targeting any specific feature triggers must be added pre landed on the app or included as part of the JSON recipe.

At the moment, there is one trigger landed specifically to target features:
* `SECOND_HOMEPAGE_VIEW`: Indicate a user has viewed the home screen at least twice.

For adding more triggers please consult with the engineering team.


## MVP Example Recipe
Below is a full example for the homepage feature:

```json
{
  "messages": {
    "homepage-microsurvey-message": {
      "experiment": "{experiment}",
      "surface": "microsurvey",
      "style": "MICROSURVEY",
      "trigger-if-all": [
        "SECOND_HOMEPAGE_VIEW"
      ],
      "text": "How satisfied are you with your Firefox homepage?",
      "title": "Microsurvey/Microsurvey.Prompt.TitleLabel.v127",
      "button-label": "Microsurvey/Microsurvey.Prompt.Button.v127",
      "microsurveyConfig": {
        "utm-content": "homepage",
        "icon": "homeLarge",
        "answers": [
          "Microsurvey/Microsurvey.Survey.Options.LikertScaleOption5.v127",
          "Microsurvey/Microsurvey.Survey.Options.LikertScaleOption4.v127",
          "Microsurvey/Microsurvey.Survey.Options.LikertScaleOption3.v127",
          "Microsurvey/Microsurvey.Survey.Options.LikertScaleOption2.v127",
          "Microsurvey/Microsurvey.Survey.Options.LikertScaleOption1.v127",
          "Microsurvey/Microsurvey.Survey.Options.LikertScaleOption6.v129"
        ]
      }
    }
  }
}
```