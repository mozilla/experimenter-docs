---
id: android-microsurveys
title: Android Microsurveys
slug: /messaging/microsurveys/android
---
## Introduction
The microsurvey feature is an extension of the [messaging framework](/messaging/mobile-messaging), and adds new functionality to target small surveys directly in the app. It allows us to capture user’s sentiment on any specific app’s features.

It’s composed the of two main user interfaces:

## The prompt
It is the first UI widget which users see, the prompt is an invitation to start the survey, it’s shown when all the triggers indicated are met, until the user decides to start the survey, choose to cancel or the maximum number of shows is met.

<img src="/img/mobile/microsurveys/prompt.png" alt="Prompt view" className="img-sm-center"/>
<br/>

1. This title of the prompt can be customized.
2. The button starts the survey and shows the survey sheet.
3. The cancel button, dismiss the survey, and it won't be shown anymore to users.

## The sheet
The survey sheet is shown after the user clicks “Continue” in the prompt, here the user will be able to fill the survey. It will be shown until the user clicks the “X” button (1) or drag down the sheet, which will make the prompt visible again.

<img src="/img/mobile/microsurveys/sheet.png" alt="Sheet view" className="img-sm-center"/>
<br/>

1. The close button which will hide the sheet and show the prompt.
2. The submit button which will send the survey result if at least one field is selected.
3. The question and options both can be customized.

## Survey JSON recipe
Microsurveys are built on top of the already existing [messaging framework](/messaging/mobile-messaging), with an extra field called `microsurvey-config`  to control the survey, if you are not familiar please take a look at it first.

## Customize the prompt
On the prompt, you can customize the title by using the same `title` field as normal message, for example:

```json
{
  "messages": {
    "feature-print-microsurvey": {
      "title": "microsurvey_prompt_printing_title"
    }
  }
}

```

You can either provide a `string` containing the text that you would like to show or reference a string bundled with the app. The latter is the preferred method so the survey can support multiple languages.

## Customize the sheet
In the sheet we can control the question, answers and UTM parameters for the privacy policy link.

For the question, just use the `text` field at the same level as the `title` one, similar to the latter where you can provide either a string or a bundled string id.

```json
{
  "messages": {
    "feature-print-microsurvey": {
      "title": "microsurvey_prompt_printing_title",
      "text": "microsurvey_survey_printing_title"
    }
  }
}

```

To customize answers and UTM parameters, we have to include the `microsurvey-config` field object. For the answers just include a field called `answers`. This is an array of each possible answer and it should contain two properties:

1.  `text`, a string or bundled string of the text for the question
2. `ordering` indicates the order of the answer in the answers. If no value is provided the default value will be 0. **Note**: The answers are displayed top to bottom e.g. 0 will be the first/top item, 1 will be next and so on. **Always** set either **ALL** the provided answers ordering or **NONE** else you may get unexpected ordering. If ALL answers are default (or manually set to 0), the ordering used will be the same as defined in the array.

```json
{
  "messages": {
    "feature-print-microsurvey": {
      "title": "microsurvey_prompt_printing_title",
      "microsurvey-config": {
        "utm-content": "homepage",
        "answers": [
          {
            "text": "likert_scale_option_1",
            "ordering": 0
          },
          {
            "text": "likert_scale_option_2",
            "ordering": 1
          },
          {
            "text": "likert_scale_option_3",
            "ordering": 2
          },
          {
            "text": "likert_scale_option_4",
            "ordering": 3
          },
          {
            "text": "likert_scale_option_5",
            "ordering": 4
          },
          {
            "text": "likert_scale_option_6",
            "ordering": 5
          }
        ]
      }
    }
  }
}

```

The icon can be added by using the field `icon` under `microsurvey-config`, you have to provide a valid icon resource id, a full list of possible icons can be found [here](https://searchfox.org/mozilla-central/source/mobile/android/android-components/components/ui/icons/src/main/res/drawable) and [here](https://searchfox.org/mozilla-central/source/mobile/android/fenix/app/src/main/res/drawable).
Something to keep in, mind is Android usages a special type vector called [vector drawables](https://developer.android.com/develop/ui/views/graphics/vector-drawable-resources), to visualize it you will need Android studio with Fenix source code, ideally if the icon hasn't been use before confirm with the Android team how it will look.

For the UTM parameters, just add the `utm-content` field. It's the type string, so you just have to add a [query string](https://en.wikipedia.org/wiki/Query_string) which will be appended to the url of the privacy notice.

Below you full example (below example is for “How satisfied are you with your Firefox homepage?”)

```json
{
  "messages": {
    "feature-homepage-microsurvey": {
      "experiment": "{experiment}",
      "title": "micro_survey_prompt_title",
      "text": "microsurvey_homepage_title",
      "surface": "microsurvey",
      "style": "MICRO_SURVEY",
      "trigger-if-all": [
        "SECOND_HOMEPAGE_VIEW"
      ],
      "microsurvey-config": {
        "icon": "mozac_ic_home_24",
        "utm-content": "homepage",
        "answers": [
          {
            "text": "likert_scale_option_1",
            "ordering": 0
          },
          {
            "text": "likert_scale_option_2",
            "ordering": 1
          },
          {
            "text": "likert_scale_option_3",
            "ordering": 2
          },
          {
            "text": "likert_scale_option_4",
            "ordering": 3
          },
          {
            "text": "likert_scale_option_5",
            "ordering": 4
          },
          {
            "text": "likert_scale_option_6",
            "ordering": 5
          }
        ]
      }
    }
  }
}
```

## Triggers
Before targeting any specific feature triggers must be added pre landed on the app or included as part of the JSON recipe.

At the moment, there are two triggers landed specifically to target features, there are:

`RECENTLY_PRINTED`: Indicate a user has utilized the printing functionality.
`SECOND_HOMEPAGE_VIEW`: Indicate a user has entered twice to the home screen.


For adding more triggers please consult with the engineering team.
