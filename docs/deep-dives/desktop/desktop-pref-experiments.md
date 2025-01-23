---
id: desktop-pref-experiments
title: Running Pref-setting Experiments on Desktop
slug: /desktop-pref-experiments
---

[test][prefFlips]

As of Firefox 107, Nimbus supports experiments that set preferences on Desktop.
Unlike Normandy, Nimbus cannot set arbitrary preferences; instead, the
preferences that may be set are determined by the feature manifest.

Each variable in a Nimbus feature can set a single pref of any type.

NB: Support for JSON variables was added in Firefox 126. The value of the pref
will be `JSON.stringify(value)`.

## Example Feature

```yaml
my-feature:
  description: A description of my feature
  owner: whoami@mozilla.com
  hasExposure: false
  variables:
    enabled:
      description: A variable setting a boolean pref to enable a feature.
      type: boolean
      setPref:
        branch: user
        pref: my_feature.enabled
    name:
      description: A variable setting a string pref to determine some name.
      type: string
      setPref:
        branch: user
        pref: my_feature.name
    count:
      description: A variable setting an integer pref to determine some count.
      type: int
      setPref:
        branch: default
        pref: my_feature.count
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

Each variable using `setPref` must specify which branch will be written to.
The default branch is not persisted, so prefs set on the default branch will not
be available until Nimbus completes its startup and loads all its active
experiments from disk.

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

## Conflicts with Incident Response Pref Flips

If a user is enrolled in a setPref experiment/rollout and then enrolls in an
[incident response pref flip][prefFlips], they will be unenrolled from the
setPref experiment/rollout. This will result in an unenrollment event
([glean][glean-telemetry], [legacy][legacy-telemetry]) being submitted with the
following data:

<table>
  <thead>
    <tr>
      <th>Glean Field</th>
      <th>Legacy Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>reason</code></td>
      <td><code>reason</code></td>
      <td>The string <code>"prefFlips-conflict"</code></td>
    </tr>
    <tr>
      <td><code>conflicting_slug</code></td>
      <td><code>conflictingSlug</code></td>
      <td>The slug of the experiment that caused the unenrollment.</td>
    </tr>
  </tbody>
</table>


[prefFlips]: /desktop-incident-response
[glean-telemetry]: https://dictionary.telemetry.mozilla.org/apps/firefox_desktop/metrics/nimbus_events_unenrollment
[legacy-telemetry]: https://probes.telemetry.mozilla.org/?search=unenroll&view=detail&probeId=event%2Fnormandy.unenroll%23unenroll
