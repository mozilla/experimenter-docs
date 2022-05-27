---
id: desktop-enroll-locally
title: Desktop Local Experiment Iteration
slug: /desktop-enroll-locally
---

# Debugging an experiment from experimenter locally

Trying to iterate on an experiment in Preview on experimenter.services.mozilla.com can be painful, because even after you change something and post to preview, you have a wait a while for the updated recipe to be propagated to the CDN.

## Enable Nimbus debugging

* In `about:config`, set:
  * `nimbus.debug` to `true`

## Enable the Browser Toolbox

* In `about:config`, set:
  * `devtools.chrome.enabled` to `true`
  * `devtools.debugger.remote-enabled` to `true`

## Prepare a few things:
* Load `about:studies` and unenroll this profile from anything that might interfere
* On the Experimenter page for your experiment, select the contents of the `Recipe JSON` field from the `Details` tab, and copy it into your Copy/Paste buffer

## Do the Enrollment
* Open `Tools > Browser Tools > Browser Toolbox`
* Switch to the browser console
* In the input area, do the following:
 	* `const branchSlug = 'treatment-a'; # or whatever branch you want
 	* `let recipe = ` _paste_recipe_json_here_ `;`
	* `const { ExperimentManager: em } = ChromeUtils.import("resource://nimbus/lib/ExperimentManager.jsm");`
	* `let branch = recipe.branches.find(b => b.slug == branchSlug);`
	* `em.forceEnroll(recipe, branch);`

## Reload `about:studies`, and you should see the experiment
