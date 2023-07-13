---
id: mobile-feature-api
title: Feature API
slug: /mobile-feature-api
---

# Feature Variables and Me

## About this document

This document is to illustrate the concepts of the Feature Variables feature of Nimbus, internally known as the Feature API.

The API used by software engineers is relatively small, so this document is not just for them. This document is also for designers, product managers and engineering managers who design, work on, and are responsible for features in the mobile apps we build. Successful experimentation requires multiple parts of the team to share an understanding of these concepts.

> 👋 Information
>
> Neither Nimbus, nor all of the Feature Variables work are finished yet, but they are certainly still useful. This document will talk about features that aren't yet implemented, but will serve to illustrate the concepts. A sidebar like this will tell you when a feature isn't ready.

> ⛅️🔬🔭 Nomenclature
>
> Much of the literature around the methodology of experiments Nimbus implements has its roots in medical testing. The feature variables API does not require understanding of double blind experiments or data-science, but this document will occasionally use words like "treatment" or "exposure".

### Document status

**Note: The code in this document still works, but is _not_ the supported way of interacting with the Nimbus Feature API.**

**This document is still useful for the concepts. The [Feature Manifest Language specification](fml-spec) would be the best place for engineers to go having read this document.**

## Introduction

The "Feature" in the "Feature Variables API" refers to features of the application. It's pretty abstract, and how the application is divided up into features is up to the product teams. Over time, a feature may be involved in many experiments.

We can be more specific here:

> ⛅️🔬🔭 Concept
>
> *A feature is an identifiable part of the app in which a change might be detectable by a user*.

However, there is one rule:

> ⛅️🔬🔭 Concept
>
> *For a given user each feature can only be involved in one experiment at a time*.
>
> If we see user change behavior after being exposed to an experimental treatment we need to be able to attribute it to that treatment, not another from a different experiment.
> 
> There is one exception to this rule, which we will discuss [later](#the-exception-to-the-rule)

One easy way to start thinking about features, would be to identify user-visible surfaces of the app: the `new-tab` screen, the `app-menu`, the `context-menu`, the `onboarding`.

Imagine you're a designer, doing a re-design of the app's menu. It would be natural to call the app menu a "feature" of the app.

You've got some hypotheses around the icons, and whether they should be to right or left of the text. There is also some uncertainty around the copy for each menu item.

The uncertainties and hypotheses you have might translate into variations and variables you might configure the menu with. If these variables and variations are documented, they should travel as an adjunct to or part of the design itself. Later these will be turned into a more formal document that lives with the code, but it is at this stage when they should be thought about.

To narrow the scope for documentation purposes, we'll focus on a small number of variables. Within the `app-menu` feature, we'll consider the menu being made up of menu items, and we'll zoom in on the settings menu item.

As a team communication tool, it may help to consider a JSON object to enumerate the variables that are configurable for the settings icon, and their defaults.

```json
{
    "settings-menu-item-title": "Settings",
    "settings-menu-item-icon": "ic_settings",
    "settings-menu-item-enabled": true,
    "settings-menu-item-action": "firefox://settings"
}
```

This JSON object looks like what experimenters will be putting into branch configuration screens in Experimenter, under Feature Configuration.

Where did these keys come from? This is not up to Nimbus, but up to the app, i.e. the app team. In this hypothetical case, you have some theories about the title and the icon, and now the app needs to get those values from nimbus.

> ⛅️🔬🔭  Naming Convention
>
> Nimbus doesn't take a view on how you arrange the JSON, but by convention, like all other identifiers, it prefers kebab-case (i.e. lower-case-words-joined-with-dashes).

In the app code, the `Variables` object is a wrapper around this JSON object, and we have a number of getters to get values out. Notice that all getters return optional types, so it is up to the app developer to provide a default value.

```swift
let variables = nimbus.getVariables("app-menu")
let action: String = variables.getString("settings-menu-item-action") ?? "firefox://settings"
let title: String = variables.getText("settings-menu-item-title") ?? Strings.AppMenuSettingsTitle
let icon: UIImage = variables.getImage("settings-menu-item-icon") ?? UIImage(named: "icon-photon-gear")
let isEnabled: Bool = variables.getBool("settings-menu-item-enabled") ?? true
```

It is a similar story in Kotlin:

```kotlin
val variables = nimbus.getVariables("app-menu")
val action: String = variables.getString("settings-menu-item-action") ?: "firefox://settings"
val title: String = variables.getText("settings-menu-item-title") ?: context.getString(R.string.app_menu_settings_title)
val icon: Drawable = variables.getDrawable("settings-menu-item-icon") ?: context.getDrawable(R.drawable.ic_settings)
val isEnabled: Bool = variables.getBool("settings-menu-item-enabled") ?? true
```

A few things to talk about here:

### Fundamental types: Strings, Int, Bool

`getString(key)`, `getBool(key)` and `getInt(key)` all return values as found in the JSON. If there is a disagreement about types, i.e. if the app is expecting a string, and the value in the JSON is an integer, the app gets `nil` or `null`.

### Everything is optional

If the app asks for a variable that is not specified in this particular experiment, then it gets back `nil` or `null`.

It is thus imperative that the app has a reasonable default. On the other hand, this allows us to have experiments which configure only small parts of a feature.

### Text resources

In the example above, the title uses `getText()`. This gets a string value with `getString()`. The value is then used as a key to look up the app resource string.

For example, on Android: `getText("settings-menu-item-title")` may get a string from the JSON `"app_menu_settings_title"`, which is then resolves to `R.string.app_menu_settings_title` which is then used to look up the String in the `Resources`.

On iOS, `getText` uses a similar process via `LocalizedString` to look up the translated strings. You can specify the `tableName` as well as the `key` in the single value by joining it with a slash.

For example, `getText("settings-menu-item-title")` may get a string from the JSON `"AppMenu/SettingsTitle"` which uses `bundle.localizedString("SettingsTitle", tableName: "AppMenu")` to look up a localized string. If the app doesn't use `tableName`, then you can omit it: e.g. `AppMenu_SettingsTitle` would look for `NSLocalizedString("AppMenu_SettingsTitle")`.

If `getString()` returned a string, and the resource lookup didn't succeed, `getText()` falls back to the string.

This means that you can use either pre-translated strings to try out experiments across locales, or target your experiment on a single language.

> 🎛 Configuration
>
> Resource lookup via `Bundle` and `Context` uses the objects passed to nimbus at construction time at app-startup. In Firefox for iOS and Fenix this is `Bundle.main` and `context.applicationContext` respectively.

### 📷 Image resources

In the example above, the `icon` uses `getImage()` and its Android analog `getDrawable()`. This gets a string value from the JSON with `getString()` and then uses that value to look up the pre-bundled resource.

For example on Android: `getDrawable("settings-menu-item-icon")` uses `getString("settings-menu-item-icon")` which might get the value `"ic_settings"` from JSON. This is then resolved to `R.drawable.ic_settings`, which is then resolved to `context.resources.getDrawable(R.drawable.ic_settings)`.

On iOS: `getImage("settings-menu-item-icon")` uses `getString("settings-menu-item-icon")` which might get the value `"icon_photon_gear"`, which is then used to get the named `UIImage` with `UIImage(named:in:)`.

## Making JSON more manageable

We focused on the settings menu item in the above example, as a way of making a small enough example to reason about in this documentation, but it made for some very long variable names. The `Variables` object has itself a `getVariables(key: String)` method to make navigating the JSON more easily. This in turn allows the JSON to be organized in different ways.

Zooming out of our example above, which had just one menu item: we can re-arrange the JSON to accommodate multiple menu items, with a simpler nested structure:

```json
{
    "settings": {
        "icon": "ic_settings",
        "title": "Settings",
        "action": "firefox://settings",
        "enabled": true
    },
    "bookmarks": {
        "icon": "ic_bookmarks",
        "title": "View Bookmarks",
        "action": "firefox://bookmark_list",
        "enabled": true
    },
    "history": {
        "icon": "ic_history",
        "title": "View History",
        "action": "firefox://history_list",
        "enabled": true
    }
}
```

This might be accessed in Kotlin with:

```kotlin
val menuVariables = nimbus.getVariables("app-menu")
var settingsItem = menuVariables.getVariables("settings").let { vars ->
    val action: String = vars?.getString("action") ?: "firefox://settings"
    val title: String = vars?.getText("title") ?: context.getString(R.string.app_menu_settings_title)
    val icon: Drawable = vars?.getDrawable("icon") ?: context.getDrawable(R.drawable.ic_settings)

    MenuItem(icon, title, action)
}
```

In Swift:

```swift
let menuVariables = nimbus.getVariables("app-menu")
let settingsItem = menuVariables.getVariables("settings") { vars ->
    let action: String = vars?.getString("action") ?? "firefox://settings"
    let title: String = vars?.getText("title") ?? Strings.AppMenuSettingsTitle
    let icon: UIImage = vars?.getImage("icon") ?? UIImage(named: "icon-photon-gear")
    let isEnabled: Bool = vars?.getBool("enabled") ?? true

    MZMenuItem(icon: icon, title: title, action: action)
}
```

> 👋 Information
>
> `variables.getVariables()` can be arbitrarily deep. `variables.getVariables()` returns an optional `Variables` object.

### Structural types

Lists and dictionary types are supported for every type.

For example: `getStringList(key)` returns an list of `String`s (`[String]?` or `List<String>?`). `getIntMap(key)` returns a `[String: Int]?` or `Map<String, Int>?`. Getting a `Map` of anything will always have a key type `String`.

This includes nested variables and enums.

For example, we may have configured a feature to accept some JSON that may look like this:

```json
{
    "ordering": ["settings", "bookmarks", "history"],
    "items": {
        "settings": {
            "icon": "ic_settings",
            "title": "Settings",
            "action": "firefox://settings"
        },
        "bookmarks": {
            "icon": "ic_bookmarks",
            "title": "View Bookmarks",
            "action": "firefox://bookmark_list"
        },
        "history": {
            "icon": "ic_history",
            "title": "View History",
            "action": "firefox://history_list"
        }
    }
}
```

The application code to read that JSON now looks like this in Kotlin:

```kotlin
fun toMenuItem(vars: Variables): MenuItem? {
    val action: String = vars?.getString("action") ?: return null
    val title: String = vars?.getText("title") ?: return null
    val icon: Drawable = vars?.getDrawable("icon") ?: return null
    return MenuItem(icon, title, action)
}

val menuVariables = nimbus.getVariables("app-menu")
// Use the ordering from the experiment or the hardcoded version.
val ordering: List<String> = menuVariables.getStringList("ordering") ?: hardcodedOrdering
// Get a list of MenuItem items from the "items" object, using toMenuItem.
val experimentalItems: Map<String, MenuItem> = menuVariables.getVariablesMap("items", ::toMenuItem) ?: mapOf()

// use the ordering to lookup the menu items from the experiment or the hardcoded version.
val items: List<MenuItem> = ordering.mapNotNull { id -> experimentalItems[id] ?: hardcodedItems[id] }

// Use the items to make the menu
```

And in Swift:

```swift
func toMenuItem(vars: Variables): MZMenuItem? {
    guard let action = vars.getString("action"),
        let title = vars.getText("title"),
        let icon = vars.getDrawable("icon") else {
            return nil
        }
    return MZMenuItem(icon: icon, title: title, action: action)
}

let menuVariables = nimbus.getVariables("app-menu")
// Use the ordering from the experiment or the hardcoded version.
let ordering = menuVariables.getStringList("ordering") ?? hardcodedOrdering
// Get a list of MZMenuItem items from the "items" object, using toMenuItem.
let experimentalItems = menuVariables.getVariablesMap("items", transform: toMenuItem) ?? [:]()

// use the ordering to lookup the menu items from the experiment or the hardcoded version.
let items: [MZMenuItem] = ordering.compactMap { id in experimentalItems[id] ?? hardcodedItems[id] }

// Use the items to make the menu
```

Building the menu like this allows the experiment to add and remove menu items remotely, while still providing a default experience.

### Enumerations of values

The above example leans quite heavily on `String`s. The code may be written in such a way that an `enum` would be more appropriate.

In this contrived example of a homescreen with different sections, we see some JSON with a list and a map. The items of the list correspond to the keys of the map.

```json
{
    "section-ordering": ["topSites", "highlights", "collections"],
    "sections-rows": {
        "topSites": 1,
        "highlights": 1,
        "collections": 2,
        "recentlyViewed": 0
    }
}
```

We can represent these items in Kotlin as an enum.

```kotlin
enum class SectionId {
    recentlyViewed,
    topSites,
    highlights,
    collections
}
```

> 👋 Information
>
> `enum` classes in Kotlin can be resolved only by their name, which cannot include hyphens.

Also in Swift:

```swift
enum SectionId: String {
    case recentlyViewed
    case topSites
    case highlights
    case collections
}
```

Then, when preparing our Home screen, we can get the list:

```kotlin
val variables = nimbus.getVariables("home-screen")
val ordering: List<SectionId>? = variables.getEnumList("section-ordering")
val sectionsRows: Map<SectionId, Int>? = variables.getIntMap("sections-rows")?.mapKeysAsEnums()
```

and in Swift.

```swift
let variables = nimbus.getVariables("home-screen")
let ordering: [SectionId]? = variables.getEnumList("section-ordering")
let sectionRows: [SectionId: Int]? = variables.getIntMap("section-rows").compactMapKeysAsEnums()
```

## Recording exposure events

> ⛅️🔬🔭 Enrollment versus Exposure
>
> When a client is selected to take part in an experiment, they are _assigned_ a branch. This is _enrollment_.
>
> However, the user may not be _exposed_ to the branch until sometime later. The exposure is the earliest moment that the user could be affected by the experimental treatment.
>
> Nimbus records the enrollments and exposure events using Glean.
>
> Enrollments are recorded at each app start-up, and exposure events each time an exposure happens.

For experiments in Firefox for iOS and Android, enrollment happens shortly after app-startup.

In our example above, the app menu is constructed when a tab is open. The user is only exposed to the values of the JSON when they tap on the open-menu icon.

By default, exposure is recorded when `nimbus.getVariables(featureId: String)` is called. Whichever experiment the feature is enrolled in— always exactly zero or one— has an exposure event recorded.

A second, optional argument is allowed for this method `getVariables`, to change this default behavior.

Here, the menu is constructed with variables from Nimbus, but the user doesn't see the menu until they open it.

```kotlin
val menu = createMenu(
    nimbus.getVariables("app-menu", sendExposureEvents = false)
)
val menuButton = Button(
    icon = R.drawable.ic_menu,
    onButtonPressed = {
        nimbus.recordExposureEvent("app-menu")
        show(menu)
    }
)
```

This is a caricature of the same code in Swift.

```swift
let menuSheet = createMenuSheet(
    nimbus.getVariables("app-menu", sendExposureEvents: false)
)
let menuButton = UIButton()
menuButton.addTarget(self, action: #selector(didOpenMenu), for: .touchUpInside)

func didOpenMenu() {
    let nimbus = Nimbus.shared
    nimbus.recordExposureEvent("app-menu")
    viewController.present(menuSheet, animated: true, completion: nil)
}
```

Nimbus will take care of finding out what experiment, if any, the user is enrolled in when using this feature.

## Using configurable features to experiment with another

The feature itself may be configurable, but we don't have to limit feature configuration to experiments _about that feature_.

We can imagine a world where we have multiple configurable features, say: an `app-menu`, `onboarding` and `newtab`. On each of these features we have a messaging surface, and we want to run an experiment to find which is the best surface to show the message about a behavior we wish to maximize: setting the browser to be the device default.

> **Q** Can we configure an experiment to test each of the message on each of these messaging surfaces?
>
> **A** This would be done with an experiment that has three branches, and each branch configures exactly one feature. The application code doesn't have to know about the linkage between the features in this experiment, just get its configuration from Nimbus.
> 

If a user is enrolled in that experiment, no other experiment is allowed to use the features involved.

We might also imagine a world where we have multiple features as before. Two different product teams are experimenting with two new capabilities of the app: both require onboarding instructions, one has an entry point via a app menu item, and the other has an entry point in the new tab screen.

If it was one product team where communication is high, perhaps they might run one experiment, with two treatment branches: one branch with configuration for the `onboarding` and `app-menu` features, and one branch with configuration for the `onboarding` and `new-tab` features.

Both teams require the `onboarding` feature. This allows each team to run their own experiments, which do not interfere with one another.

> ⛅️🔬🔭  Concept
>
> While for any given user a feature may be involved in only one experiment, one experiment should be able to configure multiple features.
>

Because both product teams' experiments require the `onboarding` experiment, no user will be involved in _both_ experiments.

For such an experiment, an experiment would have two branches, each of which configure two features.

### The exception to the rule...

>
> "If a user is enrolled in that experiment, no other experiment is allowed to use the features involved." - this document, above.
> 

As always, there will be an exception to the rule. In the case of feature enrollment, there is a way to allow **certain features** to be co-enrolled. [This document](/fml/coenrolling-features) will give you more information about defining co-enrolling features and which features are currently instrumented to be co-enrollable.

## 🔧⚙️ Working with configurable features

Throughout the process of designing and building these configurable features, the feature variables have needed to be documented. At first, when the feature is being envisioned and designed, the variables should travel with the designs themselves.

When the feature is being implemented, these variables will begin to acquire concrete names, types and organization, which will be used extract JSON from the Nimbus SDK and configure the application features themselves. This documentation will begin to take shape and textual organization that travel in the app's repository.

When the feature is being tested, QA testers are going to want to configure the features within bounds and tolerances set by the designs and the engineers.

Finally, when the feature is part of experiments, then the experiment owner, setting the branches in Experimenter needs to be able configure the branches with variables with spellings and organization that match the app implementation.

**The [Feature Manifest Language specification](fml-spec) would be the best place for engineers to go having read this document.**
