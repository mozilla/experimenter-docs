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

## Triggers

A trigger is a particular "event" (or set of events) that must occur for the message to be displayed. You can see a [complete list of triggers](https://firefox-source-docs.mozilla.org/toolkit/components/messaging-system/docs/TriggerActionSchemas/index.html#available-trigger-actions) in Firefox source docs, but here are some of the most common ones:

### `openURL`

The message will display when the user navigates to a URL that matches the provided hosts or patterns. The most general configuration for this is `"*"`, which means the message will effectively trigger the first time any window is opened.

### `preferenceObserver`

The message will display when a preference has changed. Note that this does *not* trigger if the preference was already set to the desired value at startup.


## Targeting

Sometimes you want to limit messages to a particular group of users, to users with a particular kind of behavior. This is expressed as a combination of "targeting attributes", for example:

> All users in the `US`, for `beta and nightly channels`, `version 98.01 or higher`, who `do not have Firefox set to their default browser`.

You can see a complete [list of the available attributes](https://firefox-source-docs.mozilla.org/browser/components/asrouter/docs/targeting-attributes.html) in Firefox Source docs, but here are some common examples:

* `locale` (language, e.g. `en-CA`)
* `region` (based on IP, e.g. `US`, `FR`)
* `preferenceValue` (any Firefox preference value)


## Frequency and Blocking

Depending on the needs of your campaign, messages can be configured to be shown only once or to *re-show* multiple times, under certain conditions.

### Impressions

We refer to the number of times a message can be shown in terms of "number of impressions". The details of a what counts as a single impression differ depending on the UI of the specific surface you are using, so you should read our [messaging surfaces](/messaging/desktop/desktop-messaging-surfaces) documentation to understand exactly what counts.

### Frequency

The number of impressions a message is allowed to be shown is expressed in terms of "[frequency caps](/messaging/desktop/frequency-cap)". There are two types of frequency caps to think about:
* **Lifetime frequency**: the number of times message can *ever* be shown;
* **Frequency-per-period**: the number of times an a message can be shown in a given period. This can be any period of time, but the most common ones are daily or weekly.

Some examples:

**Lifetime cap of `3`, weekly cap of `1`**. *The message will be shown a maximum of once a week, three times overall.*

**Lifetime cap of `1`**. *The message will only ever be shown once.*


### Blocking

If a user takes an action to `block` a message, it will *never* show again, even if it was configured to have multiple impressions.

In most surfaces, this is when a user clicks the "x" or one of the action buttons. For some surfaces, this behavior can be configured. An action that closes a message *without* blocking it (i.e. that allows it show again if frequency capping allows) is referred to as a `dismiss`.

Blocks carry through to all messages with the same `message id`.

