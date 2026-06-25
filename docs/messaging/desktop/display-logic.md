---
id: display-logic
title: Display Logic
slug: /messaging/desktop/display-logic
sidebar_position: 2
---

There are three types of display logic you should consider when using any of the [messaging surfaces](/messaging/desktop/desktop-messaging-surfaces):

* **Triggers**: In what context should the message be shown? (e.g. when the user opens a URL)
* **Targeting**: For what kinds of users, or browser state, should the message be shown? (e.g. locale, country, prefs)
* **Frequency and Blocking**: How many times should the message be shown, and in what conditions should it never be shown again?

:::note

The [Messaging System source docs](https://firefox-source-docs.mozilla.org/browser/components/asrouter/docs/index.html) are the most up-to-date reference for [triggers](https://firefox-source-docs.mozilla.org/toolkit/components/messaging-system/docs/TriggerActionSchemas/index.html) and [targeting attributes](https://firefox-source-docs.mozilla.org/browser/components/asrouter/docs/targeting-attributes.html). The examples below cover the most common cases. Check the source docs for the complete list and exact names.

:::

## Triggers

A trigger is a particular "event" (or set of events) that must occur for the message to be displayed. You can see a [complete list of triggers](https://firefox-source-docs.mozilla.org/toolkit/components/messaging-system/docs/TriggerActionSchemas/index.html#available-trigger-actions) in Firefox source docs, but here are some of the most common ones:

:::note

Always check the [Trigger Action Schemas source docs](https://firefox-source-docs.mozilla.org/toolkit/components/messaging-system/docs/TriggerActionSchemas/index.html) for the most up-to-date list of triggers and the exact trigger context each one provides.

:::

### `openURL`

The message will display when the user navigates to a URL that matches the provided hosts or patterns. The most general configuration for this is `"*"`, which means the message will effectively trigger the first time any window is opened.

### `preferenceObserver`

The message will display when a preference has changed. Note that this does *not* trigger if the preference was already set to the desired value at startup.

### `defaultBrowserCheck`

The message will display when Firefox checks whether it is the default browser. This check runs both at startup and when a new tab is opened, so the trigger supplies a `source` value to tell the two apart:

* `source == 'startup'`: the check ran during browser startup
* `source == 'newtab'`: the check ran because the user opened a new tab

A common pattern is to gate a default-browser message to new tabs only by combining the trigger with `source == 'newtab'` in your targeting. Pairing `defaultBrowserCheck` with `source == 'newtab'` is appropriate when you want the message to appear on the new tab page; use the new-tab feature-callout trigger (below) instead when you are rendering a feature callout anchored to new-tab UI. See the [complete trigger list](https://firefox-source-docs.mozilla.org/toolkit/components/messaging-system/docs/TriggerActionSchemas/index.html#available-trigger-actions) in Firefox source docs for the exact trigger names and the `source` values each one provides.

:::warning

You may notice `source == 'newtab'` appears to "fail" in the JEXL debugger. This is because `source` is part of the **trigger context**; it only exists when the trigger actually fires. The standalone JEXL debuggers (`about:asrouter` and nimbus-devtools) evaluate targeting against your **client targeting context**, which does *not* include trigger-supplied variables like `source`.

As a result, an expression referencing `source` evaluates against an unknown variable and returns an [empty result](/platform-guides/desktop/targeting-debug#targeting) (neither `true` nor `false`) in the debugger, even though it will work correctly at runtime when the trigger fires. This is expected: targeting that depends on trigger context must be verified through [force or natural enrollment](/messaging/desktop/desktop-messaging#testing-the-experiment), not the debugger.

:::


## Targeting

Sometimes you want to limit messages to a particular group of users, to users with a particular kind of behavior. This is expressed as a combination of "targeting attributes", for example:

> All users in the `US`, for `beta and nightly channels`, `version 98.01 or higher`, who `do not have Firefox set to their default browser`.

You can see a complete [list of the available attributes](https://firefox-source-docs.mozilla.org/browser/components/asrouter/docs/targeting-attributes.html) in Firefox Source docs, but here are some common examples:

* `locale` (language, e.g. `en-CA`)
* `region` (based on IP, e.g. `US`, `FR`)
* `preferenceValue` (any Firefox preference value)

:::note

Always check the [Targeting Attributes source docs](https://firefox-source-docs.mozilla.org/browser/components/asrouter/docs/targeting-attributes.html#attributiondata) for the most up-to-date list of targeting attributes and their exact names.

:::


## Frequency and Blocking

Depending on the needs of your campaign, messages can be configured to be shown only once or to *re-show* multiple times, under certain conditions.

### Impressions

We refer to the number of times a message can be shown in terms of "number of impressions". The details of a what counts as a single impression differ depending on the UI of the specific surface you are using, so you should read our [messaging surfaces](/messaging/desktop/desktop-messaging-surfaces) documentation to understand exactly what counts.

### Frequency

The number of impressions a message is allowed to be shown is expressed in terms of "[frequency caps](/messaging/desktop/message-configuration#frequency-caps)". There are two types of frequency caps to think about:
* **Lifetime frequency**: the number of times message can *ever* be shown;
* **Frequency-per-period**: the number of times an a message can be shown in a given period. This can be any period of time, but the most common ones are daily or weekly.

Some examples:

**Lifetime cap of `3`, weekly cap of `1`**. *The message will be shown a maximum of once a week, three times overall.*

**Lifetime cap of `1`**. *The message will only ever be shown once.*


### Blocking

If a user takes an action to `block` a message, it will *never* show again, even if it was configured to have multiple impressions.

In most surfaces, this is when a user clicks the "x" or one of the action buttons. For some surfaces, this behavior can be configured. An action that closes a message *without* blocking it (i.e. that allows it show again if frequency capping allows) is referred to as a `dismiss`.

Blocks carry through to all messages with the same `message id`.

