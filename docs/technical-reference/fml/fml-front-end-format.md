---
id: fml-front-end-format
title: Front-end Format
slug: /technical-reference/fml/fml-front-end-format
sidebar_position: 10
---

- Status: accepted
- Deciders: @travis79, @jhugman, @teshaq, @k88hudson
- Date: 2021-10-26

## Context and problem statement

In order to allow product teams to define experimentable application features, there needs to be a manifest file which defines these in a way that is understandable to the Nimbus ecosystem.  The feature manifest should define data types used in the application code to configure features. It should also be able to define a complete default configuration for each application feature.

The purpose of this document is to define the decision on the format of the feature manifest but not be a full specification of the schema or language of it.

## Decision drivers

- It should not be onerous to write and maintain for a junior engineer or intern
- A single feature should be readable/guessable by a product owner or designer
- Once written, it should be easy to navigate and read, even if there are many features
- It should map easily to Kotlin, Swift (and Rust)
- No algebraic types
- No inheritance / polymorphism
- Defaults should be specifiable at the property level
- Defaults should be specifiable at the feature level
- Alignment with Desktop Nimbus which is already using a feature manifest, in the hopes that the schema can be shared between mobile and desktop eventually

## Decision outcome

The front-end format for the Nimbus manifests will follow the [YAML](https://yaml.org/) format.

Pros:

- More concise, and less likely to have errors due to formatting such as missing a bracket or comma
- Support for comments within the document
- A schema can be defined using JSONSchema for the purposes of validation
- YAML is a superset of JSON, so any existing JSON should be able to be parsed by the YAML parser
- JSON can be embedded within YAML
- Support for multiple documents within one file, so each feature could be a separate "document", simplifying and flattening the schema
- Ease of migration for Desktop from JavaScript objects to YAML objects

Cons:

- Yet another data representation language to deal with
- Readability over other formats is marginal

## Examples

To illustrate the YAML format, here is an example of the "homescreen" feature, first in JSON, then the same representation in YAML.

### JSON Example

This example is only intended to illustrate the structure of the data, and not serve as an example of the suggested format. See the YAML example below for the suggested format.

```JSON
{
  "enums": [
    {
      "name": "SectionId",
      "doc": "The sections of the homescreen",
      "variants": [
        {
          "name": "top-sites",
          "doc": "The original frecency sorted sites"
        },
        {
          "name": "jump-back-in",
          "doc": "Jump back in section"
        },
        {
          "name": "recently-saved",
          "doc": "Tabs that have been bookmarked recently"
        }
      ]
    }
  ],
  "objects": [],
  "hints": {},
  "features": [
    {
      "name": "homescreen",
      "doc": "Represents the homescreen feature",
      "props": [
        {
          "name": "sections-enabled",
          "doc": "A map of booleans",
          "type": {
            "EnumMap": [
              {
                "Enum": "HomeScreenSection"
              },
              "Boolean"
            ]
          },
          "default": {
            "jump-back-in": false,
            "recently-saved": false,
            "top-sites": true
          }
        }
      ],
      "default": null
    }
  ]
}

```

### YAML Example

This example is meant to illustrate the concise format and readability of YAML.

```YAML
---
# Define your enumerations here
enums:
  SectionId:
    description: The sections of the homescreen
    variants:
      top-sites:
        description: The original frecency sorted sites
      jump-back-in:
        description: Jump back in section
      recently-saved:
        description: Tabs that have been bookmarked recently
# Define your features here
features:
  homescreen:
    description: Represents the homescreen feature
    variables:
      sections-enabled:
        description: A map of booleans
        variable_type: Map<Enum(SectionId), Boolean>
        default: |
          [
            "top-sites": "true"
            "jump-back-in": "false"
            "recently-saved": "false"
          ]
    default: ~
```

## Other considered options

### Option 1 - JSON

JSON is still technically supported since YAML is a superset of JSON.

### Option 2 - JavaScript/TypeScript

JavaScript and TypeScript parser crates are harder to find and appear less supported in Rust, and using a full-blown javascript engine seems like overkill.

## Additional considerations

- It should be easy to copy a winning branch of an experiment or rollout back into the feature manifest
- Reference to bundled text and icons should allow for multiple choice in the manifest
- An app may consist of multiple projects
- The format/schema/grammar of the feature manifest language should be documented in the nimbus-shared repo
