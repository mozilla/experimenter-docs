---
id: android-microsurveys
title: Microsurveys
slug: /platform-guides/android/microsurveys
---
## Introduction
The microsurvey feature is an extension of the [messaging framework](/messaging/desktop/mobile-messaging), and adds new functionality to target small surveys directly in the app. It allows us to capture user’s sentiment on any specific app’s features.

It’s composed the of two main user interfaces:

## The Prompt
It is the first UI widget which users see, the prompt is an invitation to start the survey, it’s shown when all the triggers indicated are met, until the user decides to start the survey, choose to cancel or the maximum number of shows is met.

<img src="/img/mobile/microsurveys/prompt.png" alt="Prompt view" className="img-sm-center"/>
<br/>

1. This title of the prompt can be customized.
2. The button starts the survey and shows the survey sheet.
3. The cancel button, dismiss the survey, and it won't be shown anymore to users.

## The Sheet
The survey sheet is shown after the user clicks “Continue” in the prompt, here the user will be able to fill the survey. It will be shown until the user clicks the “X” button (1) or drag down the sheet, which will make the prompt visible again.

<img src="/img/mobile/microsurveys/sheet.png" alt="Sheet view" className="img-sm-center"/>
<br/>

1. The close button which will hide the sheet and show the prompt.
2. The submit button which will send the survey result if at least one field is selected.
3. The question and options both can be customized.

## Survey JSON Recipe
To deploy a microsurvey, two feature configurations are required in Experimenter:

1. Enable the `microsurveys` feature:
> microsurveys Value
```json
{
  "enabled": true
}
```

2. Create a new `message` with the microsurvey content. The microsurvey content uses the existing [messaging framework](/messaging/desktop/mobile-messaging), with an extra field called `microsurvey-config` to control the survey, if you are not familiar please take a look at it first. For example:
> messaging Value
```json
{
  "messages": {
    "feature-print-microsurvey": {
      "title": "microsurvey_prompt_printing_title"
    }
  }
}

```

## Customize the Prompt
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

## Customize the Sheet
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

1.  `text`: A raw string containing the answer text (for example, `"It's great"`). Although bundled string resources were intended to be supported, a [known bug](https://bugzilla.mozilla.org/show_bug.cgi?id=2045036) currently prevents them from being resolved. **The experiment must provide the answer text directly.**
~~2. `ordering`: Indicates the order of the answer in the answers. If no value is provided the default value will be 0. **Note**: The answers are displayed top to bottom e.g. 0 will be the first/top item, 1 will be next and so on. **Always** set either **ALL** the provided answers ordering or **NONE** else you may get unexpected ordering. If ALL answers are default (or manually set to 0), the ordering used will be the same as defined in the array.~~ > **As of [bug 2014170](https://bugzilla.mozilla.org/show_bug.cgi?id=2014170), item ordering is completely randomized.** Support for pinning items to specific positions is planned, but has not yet been implemented.

```json
{
  "messages": {
    "feature-print-microsurvey": {
      "title": "microsurvey_prompt_printing_title",
      "microsurvey-config": {
        "utm-content": "homepage",
        "answers": [
          {
            "text": "your text goes here",
            "ordering": 0
          },
          {
            "text": "your text goes here",
            "ordering": 1
          },
          {
            "text": "your text goes here",
            "ordering": 2
          },
          {
            "text": "your text goes here",
            "ordering": 3
          },
          {
            "text": "your text goes here",
            "ordering": 4
          },
          {
            "text": "your text goes here",
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
        "icon": "ic_home",
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
