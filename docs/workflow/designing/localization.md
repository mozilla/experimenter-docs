---
id: localization-process
title: Localization
slug: /localization-process
---

This guide explains how to localize content for Nimbus experiments outside the standard product release cycle using Pontoon and either multi-locale or single-locale recipe workflows.

:::info

Localization support for Nimbus experiments is constantly improving. Make sure to check this page again before setting up new experiments.

:::

Using the process described in this page it's possible to localize content for experiments outside of the standard product release cycle. There are two different workflows, depending on the experiment's target:
* Firefox Desktop 113 and later versions include support for [multi-locale recipes](#multi-locale-recipe-firefox-113-and-later).
* For older versions of Firefox Desktop, and potentially other platforms, there is a manual process using [single-locale recipes](#single-locale-recipe).

In most cases, the translation will be performed through [Pontoon](https://pontoon.mozilla.org/), the internal Translation Management System (TMS) in use at Mozilla.

<img src="/img/workflow/localization_workflow.png" alt="Overview of localization workflow" class="img-xl-center"/>

The standard process expects content to be translated and reviewed by **community**, which ensures higher quality but requires longer turn-around. On a case by case basis, it will be possible to consider alternative sources (internal staff, external paid vendors, or machine translation).

| PROVIDER                      | QUALITY     | SPEED                         | SLA  |
|-------------------------------|-------------|-------------------------------|------|
| Community (Pontoon)           | High        | Low (1-2 weeks)               | N/A  |
| Pretranslation (Pontoon)[^1]  | Medium-Low  | High (minutes without review) | 100% |
| Paid vendors                  | Medium-High | Medium-High (48h or more)     | 100% |

The localization EPM assigned to the issue will be able to advise on the best choice.

[^1]: Currently still in a testing phase.

## Multi-locale recipe (Firefox 113 and later)

### Set up the experiment

Each localizable string is set up in the experiment using a `$l10n` object. The object properties are:
* `ìd`: a unique identifier for the string. It can only contain letters, numbers, and `-`.
* `text`: the text of the string.
* `comment`: a comment used to provide more context to localizers.

An identifier can be reused throughout the recipe, but it always has to be associated to the same text.

Here’s an example of string definition in a recipe fragment:

```json
"title": {
  "raw": {
    "$l10n": {
      "id": "welcome-text",
      "text": "Welcome to Firefox",
      "comment": "welcome text"
    }
},
```

In order to move forward with the translation request:
* The experiment needs to be set up as a **draft** in Experimenter, with all localizable strings defined in each branch as `$l10n` objects.
* The list of locales needs to be selected in the `Audience` section.
* The `Localization` checkbox in the `Branches` section can remain deselected at this stage.

[Automation](https://github.com/mozilla-l10n/nimbus-l10n/#automation-to-extract-strings-from-experiment-recipe) in the l10n repository will use Experimenter’s API to find the draft, extract the list of requested locales and the strings to translate (by searching for `$l10n` objects).

### Request Translation

Once the experiment is set up as a draft and the content has been finalized, to initiate a translation request [create a new issue here](https://github.com/mozilla-l10n/nimbus-l10n/issues/new?assignees=flodolo&template=new_translation_multilocale_recipe.yaml). Use the **Submit new issue** button at the bottom of the page after filling all mandatory fields in the form; this will generate a standard GitHub issue, so it will still be possible to add comments later.

#### Issue title

Include a descriptive name for the experiment, e.g. `PiP alternative dismiss message`.

#### Information about the experiment

Provide as much information as possible about the experiment, including links to the experiment brief and mock-ups of the UI where applicable. This information will be used by the Localization EPM assigned to the issue to prepare the file for translation, and provide context to localizers.

#### Deadline

Provide the desired deadline (optional). Unless there is pre-established availability from staff to localize the content, expect about 7 days to complete the process from request to delivery. The time required might change depending on the amount of text to translate.

### Retrieve Translated Content

Once translation has been completed, automation will add a comment in the original issue with the translation in JSON format. This data can be copied directly in the `Localization` field in Experimenter (`Branches` section). Note that GitHub provides a convenient copy button, when hovering over a code block.

The JSON will look like this:

```json
{
  "en-US": {
    "message-text": "This is an example localized experiment",
    "ok-button-text": "OK",
    "welcome-text": "Welcome to Firefox"
  },
  "fr": {
    "message-text": "Ceci est un exemple d’expérience localisée",
    "ok-button-text": "D’accord",
    "welcome-text": "Bienvenue dans Firefox"
  }
}
```

## Single-locale recipe

This solution has a few limitations:
* To target multiple locales (e.g. `de` and `fr`), it’s necessary to create separate experiments, each targeting a single locale.
* The process to request translations and retrieve translated content is completely manual.

One of the benefits is that the request can be started before actually setting up the experiment in Experimenter.

### Request Translation

Once the content needed for the experiment is finalized, to initiate a translation request [create a new issue here](https://github.com/mozilla-l10n/nimbus-l10n/issues/new?assignees=flodolo&template=new_translation.yaml).

For a description of fields shared with the multi-locale recipe request (*Issue title*, *Information about the experiment*, *Deadline*), see the [previous section](#request-translation).

#### List of locales

Provide the list of locales that need to be translated. Keep in mind that:
* [Locales are not regions](https://mozilla-l10n.github.io/documentation/localization/globalization_best_practices.html#region--language). So, for example, French (fr) should be requested, not France.
* Not all locales are supported. For example, our infrastructure supports a generic `French (fr)`, but not `Canadian French (fr-CA)`. In case, reach out to the [Localization Team](https://mozilla-hub.atlassian.net/wiki/spaces/FDPDT/pages/11045331/Localization+l10n+and+Translation) to clarify any doubts.

Given the short turn-around for localization, we are currently limiting the requests to tier 1 locales (`de`, `fr`) — where we potentially also have internal copywriters as a backup — and locales that have internal staff available for support (`it`, `ja`).

#### Content to translate

If the experiment is small, it’s possible to provide the content to translate directly in the issue. Alternatively, consider providing a link to a spreadsheet with one string per row, and 2 columns (one for the English text, one for comments or context) (an example is available [here](https://docs.google.com/spreadsheets/d/11pIMJUxkiMELx-w6Czywy2ZRqCy2McUebnOT__yTU_Y/edit)).

If you’re working with a developer already familiar with [Fluent](https://projectfluent.org/), they can also help providing directly Fluent content with comments. Note that we only support a subset of features in experiments:
* Only plain messages with a value, no attributes or variants (e.g. plurals).
* No terms or variables, so brand names like `Firefox` need to be hard-coded in the text.

Example of Fluent format:

```
intro-message = Switch to Firefox Home with themed background
# Button label that enables the theme
intro-button-enable = Use background
```

### Retrieve Translated Content

Once translation has been completed, the requester will be notified in the original issue, with a link to a JSON file that includes all translations. The experiment owner will need to copy each translation manually in the experiment recipes.

The JSON file uses the following structure:

```json
{
  "complete": true,
  "complete_locales": [
    "de",
    "en-US",
    "fr",
    "it"
  ],
  "translations": {
    "en-US": {
      "device-migration-fxa-spotlight-header": "Using an older device?",
      "device-migration-fxa-spotlight-body": "Back up your data to make sure you don’t lose important info like bookmarks and passwords –– especially if you switch to a new device.",
    },
    "de": {
      "device-migration-fxa-spotlight-header": "Verwenden Sie ein älteres Gerät?",
      "device-migration-fxa-spotlight-body": "Sichern Sie Ihre Daten, um wichtige Informationen wie Lesezeichen und Passwörter nicht zu verlieren – insbesondere, wenn Sie zu einem neuen Gerät wechseln.",
    },
    "fr": {
      "device-migration-fxa-spotlight-header": "Vous utilisez un appareil plus ancien ?",
      "device-migration-fxa-spotlight-body": "Sauvegardez vos données pour vous assurer de ne pas perdre d’informations importantes comme des marque-pages ou des mots de passe, surtout si vous changez d’appareil.",
    },
    "it": {
      "device-migration-fxa-spotlight-header": "Stai utilizzando un dispositivo meno recente?",
      "device-migration-fxa-spotlight-body": "Salva i tuoi dati per non perdere informazioni importanti come segnalibri e password, soprattutto se hai in programma di passare a un nuovo dispositivo.",
    }
  }
}
```

* `complete`: boolean field that indicates if the experiment has been translated in all requested locales.
* `complete_locales`: list of all locales completely translated.
* `translations` includes a key for each locale (e.g. `it` for Italian), which in turns includes all pairs of unique message identifiers and translations. `en-US` is also provided as a reference..
