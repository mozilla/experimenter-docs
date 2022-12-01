---
id: localization-process
title: Localization
slug: /localization-process
---
:::info

Localization support for Nimbus experiments is under active development. Make sure to check this page again before setting up new experiments.

:::

Using the process described in this page it’s possible to localize content for experiments outside of the standard product release cycle. The current solution has a few known limitations:
* To target a subset of locales (e.g. `de` and `fr`), it’s necessary to create separate experiments, each targeting a single locale.
* The process to request translations and retrieve translated content is completely manual.

<img src="/img/workflow/localization_workflow.png" alt="Overview of localization workflow" class="img-xl-center"/>

## Request Translation

Once the content needed for the experiment is finalized, to initiate a translation request [create a new issue here](https://github.com/mozilla-l10n/nimbus-l10n/issues/new?assignees=flodolo&template=new_translation.yaml). Use the **Submit new issue** button at the bottom of the page after filling all mandatory fields in the form; this will generate a standard GitHub issue, so it will still be possible to add comments later.

### Issue title

Include a descriptive name for the experiment, e.g. `PiP alternative dismiss message`.

### Information about the experiment

Provide as much information as possible about the experiment, including links to the experiment brief and mock-ups of the UI where applicable. This information will be used by the Localization EPM assigned to the issue to set up the file for translation, and provide context to localizers.

### List of locales

Provide a list of the locales that need to be translated. Keep in mind that:
* [Locales are not regions](https://mozilla-l10n.github.io/documentation/localization/globalization_best_practices.html#region--language). So, for example, French (fr) should be requested, not France.
* Not all locales are supported. For example, our infrastructure supports a generic `French (fr)`, but not `Canadian French (fr-CA)`. In case, reach out to the [Localization Team](https://mozilla-hub.atlassian.net/wiki/spaces/FIREFOX/pages/11045331/Localization+l10n+and+Translation) to clarify any doubts.

In the initial testing phase for this workflow, we plan to limit the requests to tier 1 locales (`de`, `fr`) — where we potentially also have internal copywriters — and locales that have internal staff available for support (`it`, `ja`).

### Deadline

Provide the desired deadline (optional). Keep in mind that this process is still in a testing phase, so it will take longer to set up the request and complete the translation. Unless there is pre-established availability from staff to localize the content, expect about 7 days to complete the process from request to delivery. The time required might change depending on the amount of text to translate.

### Content to translate

If the experiment is small, it’s possible to provide the content to translate directly in the issue. Alternatively, consider providing a link to a spreadsheet with one string per row, and 2 columns (one for the English text, one for comments or context) (an example is available [here](https://docs.google.com/spreadsheets/d/11pIMJUxkiMELx-w6Czywy2ZRqCy2McUebnOT__yTU_Y/edit)).

If you’re working with a developer already familiar with [Fluent](https://projectfluent.org/), they can also help providing directly a Fluent (`.ftl`) file with comments. Note that we only support a subset of features for this workflow:
* Only plain messages with a value, no attributes or variants.
* No terms or variables, so brand names like `Firefox` will be hard-coded in the text.

Example of a Fluent file:

```
intro-message = Switch to Firefox Home with themed background
# Button label that enables the theme
intro-button-enable = Use background
```

## Translation

In most cases, the translation will be performed through [Pontoon](https://pontoon.mozilla.org/), the internal Translation Management System (TMS) in use at Mozilla. The standard process expects content to be translated and reviewed by **community**, which ensures higher quality but requires longer turn-around. On a case by case basis, it will be possible to consider alternative sources (internal staff, external paid vendors, or machine translation).

| PROVIDER                      | QUALITY     | SPEED                         | SLA  |
|-------------------------------|-------------|-------------------------------|------|
| Community (Pontoon)           | High        | Low (1-2 weeks)               | N/A  |
| Pre-translation (Pontoon)[^1] | Medium-Low  | High (minutes without review) | 100% |
| Paid vendors                  | Medium-High | Medium-High (48h or more)     | 100% |

The localization EPM assigned to the issue will be able to advise on these choices.

[^1]: Currently still in a testing phase.

## Retrieve Translated Content

Once translation has been completed, the requester will be notified in the original issue, with a link to a JSON file that include all translations. The experiment owner will need to copy them manually in the experiment recipe for each locale.

The JSON file uses the following structure:

```json
{
  "translations": {
    "en-US": {
      "colorways-title": "Life in color",
      "fx100-message": "Switch to Firefox Home with themed background"
    },
    "it": {
      "colorways-title": "Una vita a colori",
      "fx100-message": "Passa alla Pagina iniziale di Firefox con uno sfondo a tema"
    }
  },
  "complete_locales": [
    "en-US",
    "it"
  ]
}
```

`translations` includes a key for each locale (e.g. `it` for Italian), which in turns includes all pairs of unique message identifiers and translations. `en-US` is also provided as a reference.

The `complete_locales` key includes the list of all locales completely translated.
