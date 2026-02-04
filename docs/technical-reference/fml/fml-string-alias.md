---
id: fml-string-alias
title: String Aliases
slug: /technical-reference/fml/fml-string-alias
sidebar_position: 6
---

String aliases define named sets of valid strings that can be validated at build time and in Experimenter, enabling type-safe string constants without using enums.

`string-alias` is a type alias annotations for feature variables in the feature manifest language. It defines a named set of strings which can be used and validated elsewhere in the feature manifest.

It is named as a special case of typealiasing found in many languages.

```kt
typealias QueryName = String
val queries = mapOf<QueryName, String>()
```

In this kotlin example above, we are able to use `QueryName` wherever we're able to use `String`, and vice versa: there is nothing else linking `QueryName` with `queries`.

## String-Alias Defines a Named Set of Valid Strings

In FML, the `string-alias` belongs to the variable definition.

```yaml
    queries:
        string-alias: QueryName
        type: Map<QueryName, String>
        default:
            ALWAYS: 'true'
```

Here, `QueryName` is defined as the set of `String`s that are keys in the `queries` map.

In the example above, we're defining a map of named queries. The default has one entry in.

Where `QueryName` is used again, its value is checked against this membership test, by the FML:

```yaml
    available-if:
        type: QueryName
        default: ALWAYS
```

Note that had the `queries` map been empty, we could not have provided a default value for `available-if`.

Now that the `QueryName` string-alias has been defined, it can be used in conjunction with any structural type definition for example:

```yaml
    available-if:
        type: Option<QueryName>
        default: null
```

This means that `available-if` can be either a valid `QueryName` or `null`.


```yaml
    available-if:
        type: List<QueryName>
        default: []
```

This means that `available-if` can be a list of valid `QueryName` strings.

## The Named Set Is Used to Validate Strings by Experimenter

Over time, the number of queries can grow in the FML:

```yaml
    queries:
        string-alias: QueryName
        type: Map<QueryName, String>
        default:
            ALWAYS: 'true'
            USER_RECENTLY_INSTALLED: days_since_install < 7
            USER_EN_SPEAKER: 'en' in locale
            USER_DE_SPEAKER: 'de' in locale
```


Defining `QueryName` allows experimenter to validate a feature configuration before it reaches the application:

```json
{
    "available-if": [
        "USER_RECENTLY_INSTALLED",
        "USER_ES_SPEAKER"
    ]
}
```

In the above example, experimenter shows the user an error:

```
Invalid value "USER_ES_SPEAKER" for type QueryName; did you mean one of "ALWAYS", "USER_DE_SPEAKER", "USER_EN_SPEAKER" or "USER_RECENTLY_INSTALLED"?
```

## The Named Set Can Be Added to by FML Authors or Experiment Owners

This can be fixed by adding a query to the `queries` map in the FML file _or_ the user can add it directly in the feature configuration:

```json
{
    "queries": {
        "USER_ES_SPEAKER": "'es' in locale"
    },
    "available-if": [
        "USER_RECENTLY_INSTALLED",
        "USER_ES_SPEAKER"
    ]
}
```

## Defining the Named Set of Valid Strings

We've seen how a string-alias can be used, and how `QueryName` was defined as a key in a map.

The valid set of strings can be defined by any existing [structural types](/technical-reference/fml/fml-spec#structural-types). Some contrived examples follow:

```yaml
    surfaces:
        type: List<SurfaceName>
        string-alias: SurfaceName
        default: []
```

Any use of `SurfaceName` must be contained in the list of `surfaces`. This may be used as an alternative to an enum, used in a library, but whose variants are defined in an app, thereby breaking the compile-time dependency from library to app.

```yaml
    experiment-slug:
        type: ExperimentSlug
        string-alias: ExperimentSlug
        default: '{experiment}'
```

Any use of `ExperimentSlug` _must_ be the default value. In conjunction with an `Option<>` at the usage site, this lets us specify either an exact value or `null`.

For completeness, the string alias named set can be defined as:
- `MyStringAlias`: a single value
- `Map<MyStringAlias, _>`: keys in a map
- `Map<_, MyStringAlias>`: values in a map
- `List<MyStringAlias>`: items in a list
- `Option<MyStringAliase>`: an option
- `Map<_, List<StringAlias>>`: combinations of these structural types.

:::warning Restriction
Only one string-alias can be defined per feature variable. The following– using one variable to define two named sets of strings– is not possible at this time.

```yaml
    available-events:
        string-alias: EventCategory, EventName
        type: Map<EventCategory, List<EventName>>
```
:::

## String Aliases Can Be Used in Nested Objects

```yaml
features:
    my-onboarding-feature:
        variables:
            queries:
                type: Map<QueryName>
                string-alias: QueryName
                default: {}
            cards:
                type: Map<CardKey, CardData>
                string-alias: CardKey
objects:
    CardData:
        fields:
            exclude-if:
                type: List<QueryName>
                default: []
            include-if:
                type: List<QueryName>
                default: []
```

:::warning Restriction
String-alias can only be defined in a feature variable. The object can only be used, directly or indirectly, by a feature which defines the string-aliases it uses.
:::
