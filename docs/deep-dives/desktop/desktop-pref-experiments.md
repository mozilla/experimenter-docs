---
id: desktop-pref-experiments
title: Desktop Pref Experiments
slug: /desktop-pref-experiments
---

# Running Pref-setting Experiments on Desktop

As of Firefox 107, Nimbus supports experiments that set preferences on Desktop.
Unlike Normandy, Nimbus cannot set arbitrary preferences; instead, the
preferences that may be set are determined by the feature manifest.

Each variable in a Nimbus feature can set a single pref. Integer, string, and
boolean typed variables are supported but JSON variables are not supported. If
you want to set a JSON value to a pref, a string variable should be used and
experiments should set the value to a JSON string.

## Example Feature

```yaml
pref-feature:
  description: A description of my feature
  owner: whoami@mozilla.com
  variables:
    string:
      description: A variable setting a string pref.
      type: string
      setPref: test.string
    int:
      description: A variable setting an integer pref.
      type: int
      setPref: test.int
    boolean:
      description: A variable setting a boolean pref.
      type: boolean
      setPref: test.boolean
```

## Experiments vs Rollouts

Users can be enrolled in an experiment and rollout for the same feature. If both
an experiment and rollout set a variable that sets a pref, then the experiment
will take precedence. If the user unenrolls from the experiment, then the pref
will be set to the value specified in the rollout.

When the user is no longer enrolled in either an experiment or a rollout setting
a given pref, then it will be reset to its original value at the time of the
first enrollment, with some caveats:

* If the pref is set on the default branch (see [below](#pref-branches)) and the
  pref was not set before enrollment, then the pref will not change until the
  next restart. This is due to a technical limitation: default branch values
  cannot be cleared.
* If the pref is set on the user branch and the pref was not set before
  enrollment, then the pref will be cleared and will be no longer available.

## Pref branches

By default, values will be set on the default branch. The default branch is not
persisted, so prefs set on the default branch will not be available until Nimbus
completes its startup and loads all its active experiments from disk.

If the feature setting the pref specifies `isEarlyStartup: true`, then the
values will be written to the user branch so that they persisted and available
during early startup on the user branch.

## User Preference Changes

If a user is enrolled in an experiment or rollout that sets a pref and that pref
changes, the user will be unenrolled from the experiment (or rollout). This
includes both changes made by the user and changes in code. Experiment runners
should be careful to ensure there is no code in tree that will modify prefs they
are experimenting on, otherwise their populations may get spuriously unenrolled.

The new value of the preference will be persisted.

## Manifest Changes

Some changes to the feature manifest may result in unenrollment from an active
experiment:

* The feature being removed.
* A variable that is currently setting a pref is removed.
* A variable that is currently setting a pref either changes the pref it is
  setting or no longer sets a pref (i.e., its `setPref` value changes or is
  removed).

It should be noted that unenrollment for these reasons will only occur when the
user is enrolled in a pref-setting experiment. If a feature specifies both
pref-setting and non-pref setting variables, then changes to the manifest will
not result in unenrollment if the active experiment does not have any values for
pref-setting variables.

## Restrictions with Fallback Prefs

Variables may not specify both a `fallbackPref` and a `setPref`.

Fallback prefs and set prefs are mutually exclusive. That is, If any variable in
any feature specifies a pref as a fallback pref, no variable may set that
variable as a set pref and vice versa.

These restrictions are enforced at build time.
