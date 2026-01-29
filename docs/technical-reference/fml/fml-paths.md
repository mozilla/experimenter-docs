---
id: fml-paths
title: Paths
slug: /technical-reference/fml/fml-paths
sidebar_position: 2
---

This document explains how to reference and link FML files using paths, URLs, and GitHub repository shortcuts.

## Paths and URLs

In several places paths to link one `.fml.yaml` file to another.

For convenience, we should use the conventions around URLs used in Carthage and npm package managers:

- a relative path must use `/` as a separator
- a relative path may use `./` and `../` in their prefixes
- an absolute URL may be used, but this must start with `https://`
- a Github repository may be specified with a prefix of `@`.
  - e.g. `@mozilla/nimbus-shared` expands to `https://raw.githubusercontent.com/mozilla/nimbus-shared/main/`

> Hint: The rules of the URL construction would be a good place to consider local development and branches.

When invoked in conjunction with the `repo-file` argument, these `@` paths may be overriden:

## Remapping @ Prefixes With Repo Files

```sh
nimbus-fml generate --repo-file v102.0.json input.fml.yaml output-dir
```

A `v102.0.json` may look like:

```json
{
  "mozilla-mobile/android-components": "releases/102.0",
  "mozilla/application-services": "v93.1.0"
}
```

A path to `@mozilla-mobile/android-components/components/messaging/nimbus.fml.yaml` would resolve to `https://raw.githubusercontent.com/mozilla-mobile/android-components/releases/102.0/components/messaging/nimbus.fml.yaml`.

Defining local paths are useful for working with multiple repos at a time. A `local-dependencies.json` may look like this:

```json
{
  "mozilla-mobile/android-components": "../android-components",
  "mozilla/application-services": "../application-services"
}
```

Defining local paths is also useful for imposing structure on a complicated filesystem. e.g. an `app-structure.json` file may look like

```json
{
  "my/messaging": "./Messaging/nimbus-manifests",
  "my/onboarding": "./Onboarding/nimbus-manifests"
}
```

## Multiple Repo Files

The `nimbus-fml` command line can accept multiple repo-files at a time, resolving `@` links as it goes.

```sh
nimbus-fml generate --repo-file ./app-structure.json --repo-file @mozilla-mobile/dependency-versions/v102.0.json --language swift ./input.fml.yaml output-dir
```

## The Fetch Command

The FML command line interface includes a `fetch` command to help build intuition around how these paths work.

```sh
nimbus-fml fetch @mozilla/application-services/Cargo.toml
```

It takes a single `INPUT` file, and any number of `--repo-file` options and outputs the file (if found) to `stdout`.

In this case, the file will be from `https://raw.githubusercontent.com/mozilla/application-services/main/Cargo.toml`

Using the repo file from above, the command

```sh
nimbus-fml fetch --repo-file v102.0.json @mozilla/application-services/Cargo.toml
```

would fetch from `https://raw.githubusercontent.com/mozilla/application-services/v93.1.0/Cargo.toml`
