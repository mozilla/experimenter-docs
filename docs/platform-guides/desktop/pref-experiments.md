---
id: desktop-pref-experiments
title: Pref Experiments
slug: /platform-guides/desktop/pref-experiments
---

How Nimbus supports preference-setting experiments on Desktop Firefox 107+.

As of Firefox 107, Nimbus supports experiments that set preferences on Desktop.
Unlike Normandy, Nimbus cannot set arbitrary preferences; instead, the
preferences that may be set are determined by the feature manifest.

Each variable in a Nimbus feature can set a single pref of any type.

NB: Support for JSON variables was added in Firefox 126. The value of the pref
will be `JSON.stringify(value)`.

::::caution Danger, Will Robinson!
Prefs are complicated and it is easy to shoot yourself in the foot when using them if
you're not cautious. The Nimbus team has prepared some guidance about using
prefs in your feature:

If you do not actually *need* to use a pref in your feature, we recommend that
you do not use one and instead read directly from the Nimbus API (via
`NimbusFeatures.myFeature.getVariable("var")` /
`NimbusFeatures.myFeature.getAllVariables()`).

If you *must* use a pref, then you must be careful about all writers to that
pref. Please read [this section](#user-preference-changes) for a detailed
explanation of
pref writing interactions in Nimbus. We recommend that no other code write to
that pref.

Finally, we advise against instructing users to edit the pref via
`about:config`. This has a knock-on effect of normalizing users interacting with
complex "under the hood" settings which can be taken advantage of by malicious
actors. In addition, manually changing some prefs that are otherwise managed by
client code can violate invariants and force clients into confusing or
unpredicted scnearios.

If you've read to the end of this and aren't scared off, please read [this
section](#pref-branches) on which branch your feature should write to.
::::

## Pref Branches

Each variable using `setPref` must specify which branch will be written to. There are two branches,
each with its trade-offs:

<dl>
 <dt>The default branch</dt>
 <dd>
  The default branch is where Firefox's default pref values come from.

  This branch <em>is not</em> persisted to disk and so there will be a time
  period during startup before Nimbus has finished initializing where default
  pref values will not represent the current experiment state.

  You may want to use this branch if your code distinguishes from user branch
  values versus default branch values.
 </dd>

 <dt>The user branch</dt>
 <dd>
  The user branch is where user's configuration choices are stored (e.g., when
  changing settings via <code>about:preferences</code> or { }
  <code>about:config</code>).

  This branch <em>is</em> persisted to disk and loaded early during startup,
  before Nimbus is initialized. Additionally, if a pref has a value on both the
  default and user branches the user branch value will take precedence (e.g.,
  <code>Services.prefs.getBoolPref("foo.bar.baz")</code> will attempt to read
  from the user branch first).
 </dd>
</dl>

If your feature configuration needs to be available early at startup (e.g., so
that Gecko internals can be initialized properly) you will have to use the user
branch.

Nimbus startup is triggered asynchronously after the UI has been shown
(technically after `sessionstore-windows-restored`) or 5 seconds after
`browser-before-ui-startup` (whichever comes first). Therefore, if your feature
controls whether or not some amount of UI is shown in the browser chrome (e.g.,
whether a button shows on the toolbar or not), you likely will want to use the
user branch.

:::caution Respecting User Choice
It is important to remember that writing to prefs on the user branch can
**overwrite user choices**.

Experimenter can automatically exclude users that have changed prefs controlled
by your feature. To enable this behaviour, check the "Prevent enrollment if
users have changed any prefs set by this experiment" checkbox on the Branches
page of your experiment. If you use this feature, you likely want to enable
"Sticky Enrollment" on the audience page as well to prevent unexpected
unenrollments.

You may also want to use this feature if you are writing to the default pref
branch and any user branch overrides would cause breakage result in incorrect
analysis.
:::

## Configuring Your Feature in Experimenter

If you are configuring an experiment you should include the same prefs **in
every branch of your experiment**. This protects your experiment from being
impacted by user pref changes across all branches.

For example, let's consider the following feature:

```yaml
feature:
  variables:
    enabled:
      type: boolean
      setPref:
        # Defaults to false
        pref: myFeature.enabled
        branch: user
    
    optionalFeatureEnabled:
      type: boolean
      setPref:
        # Defaults to false
        pref: myFeature.optional.enabled
        branch: user
```
If we have an experiment with three branches:

1. **Control**
```
{}
```

2. **Treatment A**
```
{
  "enabled": true
}
```

3. **Treatment B**
```
{
  "enabled": true,
  "optionalFeatureEnabled": true
}
```

Nimbus only registers pref listeners for variables controlled by the current
branch. So if the user is enrolled in the **Control** branch Nimbus will not
listen for any pref changes. In the **Treatment A** branch  Nimbus will listen
for changes to `myFeature.enabled`. In the **Treatment B** branch Nimbus will
listen to changes to both `myFeature.enabled` and `myFeature.optional.enabled`.

It is therefore possible for a user to be in the **Control** branch with
`myFeature.enabled` set to true and it is also possible for a user to tbe in
**Treatment A** branch and have `myFeature.optional.enabled` set to true.

The proper way to set up this experiment is therefore as follows:

1. **Control**
```
{
  "enabled": false,
  "optionalFeatureEnabled": false
}
```

2. **Treatment A**
```
{
  "enabled": true,
  "optionalFeatureEnabled": false
}
```

3. **Treatment B**
```
{
  "enabled": true,
  "optionalFeatureEnabled": true
}
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

## Unenrollment from Pref Experiments

Normally Nimbus will only unenroll from experiments and rollouts when we check
for new recipes (periodically or after startup). During that check, Nimbus will
unenroll if:

* the experiment or rollout is no longer present on Remote Settings (reported as
  `recipe-not-seen` in telemetry);
* the experiment or rollout has a targeting expression that is no longer true
  (reported as `targeting-mismatch`);
* the rollout no longer matches bucketing (reported `bucketing`).

:::caution Including prefs in targeting expressions
If your experiment or rollout includes preference checks in its targeting
expression then it may unexpectedly unenroll or prevent a rollout or experiment
on the same feature from enrolling.

Experimenter can automatically exclude users that have changed prefs controlled
by your feature. If your feature writes to the user branch and uses this feature
(the "Prevent enrollment if users have changed any prefs set by this experiment"
checkbox on the branches page), you **must** enable "sticky enrollment" on the
Audience Page. Otherwise your experiment will automatically unenroll the next
time Nimbus evaluates targeting.
:::

Pref Experiments can unenroll for additional reasons:

* the experiment or rollout sets a pref and that pref changes (either by a user
  making a change in `about:config` or client code using the pref API);
* the feature manifest changed sufficiently; or
* Nimbus enrolled in an [Incident Response Pref Flip][prefFlips] that set the
  same pref.

### Unexpected Preference Changes

If a user is enrolled in an experiment or rollout that sets a pref and that pref
changes, the user will be unenrolled from the experiment (or rollout). This
includes both changes made by the user and changes in code. Experiment runners
should be careful to ensure there is no code in tree that will modify prefs they
are experimenting on, otherwise their populations may get spuriously unenrolled.

The new value of the preference will be persisted.

### Manifest Changes

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

### Conflicts with Incident Response Pref Flips

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

## Restrictions with Fallback Prefs

Variables may not specify both a `fallbackPref` and a `setPref`.

Fallback prefs and set prefs are mutually exclusive. That is, If any variable in
any feature specifies a pref as a fallback pref, no variable may set that
variable as a set pref and vice versa.

These restrictions are enforced at build time.

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


[prefFlips]: /platform-guides/desktop/incident-response
[glean-telemetry]: https://dictionary.telemetry.mozilla.org/apps/firefox_desktop/metrics/nimbus_events_unenrollment
[legacy-telemetry]: https://probes.telemetry.mozilla.org/?search=unenroll&view=detail&probeId=event%2Fnormandy.unenroll%23unenroll
