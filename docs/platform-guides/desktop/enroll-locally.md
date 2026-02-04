---
id: desktop-enroll-locally
title: Local Enrollment
slug: /platform-guides/desktop/enroll-locally
---

This guide explains how to enroll in experiments locally without waiting for CDN propagation. You can use either the Nimbus Developer Tools extension or the Browser Console to test experiments directly on your machine.

## Debugging an Experiment From Experimenter Locally

Trying to iterate on an experiment in Preview on experimenter.services.mozilla.com can be painful, because even after you change something and post to preview, you have a wait a while for the updated recipe to be propagated to the CDN.

## Enrollment via Nimbus Developer Tools

Nimbus Developer Tools provides a simple interface to debug experiments. You can download and install the extension from the [Nimbus DevTools GitHub release page](https://github.com/mozilla-extensions/nimbus-devtools/releases). Here are some of the ways you can use it to debug experiments locally:

## Recipe JSON Enrollment
1. Load `about:studies` and unenroll this profile from anything that might interfere
2. On the Experimenter page for your experiment, select the contents of the `Recipe JSON` field from the `Summary` tab, and copy it into your Copy/Paste buffer
3. Navigate to the Nimbus Developer Tools `JSON Enrollment` page
4. Paste the JSON from the `Recipe JSON` field in the provided textarea
5. Click `Enroll`
6. Reload `about:studies`, and you should see the experiment

## Feature Configuration Enrollment
1. Load `about:studies` and unenroll this profile from anything that might interfere
2. Navigate to the Nimbus Developer Tools `Feature Configuration` page.
3. Select the feature ID from the dropdown
4. Set the `isRollout` option to either `true` or `false` as needed
5. Paste the feature configuration JSON into the textarea.
6. Click `Enroll`.
7. Reload `about:studies`, and you should see the experiment

For a more comprehensive overview of the Nimbus Developer Tools, including additional features beyond this, check out the [Nimbus Developer Tools Guide](/resources/nimbus-devtools-guide).

## Manual Enrollment via Browser Console

## Enable Nimbus Debugging

* In `about:config`, set:
  * `nimbus.debug` to `true`

## Enable the Browser Toolbox

* In `about:config`, set:
  * `devtools.chrome.enabled` to `true`
  * `devtools.debugger.remote-enabled` to `true`

## Prepare Your Environment
* Load `about:studies` and unenroll this profile from anything that might interfere
* On the Experimenter page for your experiment, select the contents of the `Recipe JSON` field from the `Details` tab, and copy it into your Copy/Paste buffer

## Complete the Enrollment
* Open `Tools > Browser Tools > Browser Toolbox`
* Switch to the browser console
* In the input area, do the following:
 	* `const branchSlug = 'treatment-a'; // or whatever branch you want`
 	* `let recipe = ` _paste_recipe_json_here_ `;`
	* `const { ExperimentManager: em } = ChromeUtils.importESModule("resource://nimbus/lib/ExperimentManager.sys.mjs");`
	* `let branch = recipe.branches.find(b => b.slug == branchSlug);`
	* `em.forceEnroll(recipe, branch);`

## Verify Enrollment

Reload `about:studies`, and you should see the experiment.
