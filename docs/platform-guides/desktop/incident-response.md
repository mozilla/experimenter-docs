---
id: desktop-incident-response
title: Incident Response
slug: /platform-guides/desktop/incident-response
---

How to use the prefFlips feature for incident response pref flips on Desktop Firefox 129+.

As of Firefox 129 (and 128.2 ESR), Firefox supports flipping any pref via
Nimbus. This is done with the `prefFlips` feature. The JSON Schema definition
for the feature value can be found [here][jsonschema].

## Warning

This feature is *not intended for use in experimentation*. If you want to do an
experiment on some number of prefs in Firefox, you **must** register these prefs
with the [Feature Manifest][feature-manifest]. This ensures that prefs
controlled via Nimbus are subject to code review. See the docs on [Desktop pref
experiments][setPref] for more information.

Because the incident response feature can change *any pref*, it should be used
with caution. Remember: with great power comes great responsibility.

Only the release management team can approve incident reponse pref flips.

## Behaviour

When a client enrolls into a rollout using this feature, Nimbus will set (or
unset) all the prefs to the values specified. Prefs on the `user` branch will
persist through startup and be available immediately. Prefs set on the `default`
branch will not persist through startup and will not have their correct values
until Nimbus finishes initialization.

When the client unenrolls, all prefs will be restored to their values before
enrollment. If the pref did not exist before enrollment, it will be cleared if
it was set on the user branch. The default branch does not support clearing, so
the pref and its value from the enrollment will persist until the browser
closes.

As of Firefox 140, this feature supports co-enrollment, which allows the client
to enroll in multiple rollouts at once. The client will apply the configuration
from all enrolled rollouts. If multiple rollouts attempt set the same pref they
must all set it to the same branch and value. If not, the disagreeing rollout
will be unenrolled.


## Multi-feature

The incident response feature *cannot* be used with other features.


## Launching a Pref Flip

1. Create a new experiment in
[Experimenter](https://experimenter.services.mozilla.com/) with an
appropriate public name (this will appear in `about:studies`) for Firefox
Desktop.
2. Fill in the "overview" page as appropriate.
3. Fill in the "branches" page:
    1. Select the `prefFlips` feature.
    2. Check the "This is a rollout (single branch)" checkbox.

       This is not strictly required, but rollout enrollment can be dialed up or
       down without requiring ending the experiment and re-launching. If you do
       not want to use a rollout so that you can set different prefs on different
       branches you likely want to run an experiment, in which case this feature
       is not appropriate for your use case.

    3. Enter a description for the "Control" branch.
    4. Enter a value for the `prefFlips` (see the [example configuration](#example-configuration)).
4. Fill in the "Audience" page:

   <dl>
      <dt>channel</dt>
      <dd>
        You must specify a channel to use this feature. If you want to change a
        pref across multiple channels you must repeat this process for each
        channel.
      </dd>

      <dt>Min Version</dt>
      <dd>
        You must specify a minimum version. The minimum versions supported are
        129 on the Nightly, Beta, Aurora (developer edition), and Release
        channel and 128.2 on the ESR channel.
      </dd>

      <dt>Advanced Targeting</dt>
      <dd>
        <p>
          If you want to enroll the entire population, choose "No Targeting - All
          users". Otherwise, select an appropriate targeting criteria.
        </p>
        <p>
          If a targeting criteria does not exist, one will have to be added. See
          the <a href="/faq/targeting-audiences#how-can-i-add-a-new-advanced-targeting-option">advanced targeting
          FAQ</a> or ask for help in <code>#ask-experimenter</code> on Slack.
        </p>
      </dd>

      <dt>Sticky Enrollment</dt>
      <dd>
        <p>
          Experiment targeting is re-evaluated every time the client checks for
          new recipes. If you want the selected advanced targeting to only be
          evaluated during enrollment, check this box.
        </p>
        <p>
          <strong>Note:</strong> Rollouts can re-enroll after unenrolling (e.g.,
          if enrollment percentage decreased and then increased). In these
          cases, rollouts will re-evaluate targeting, ignoring the sticky flag.
        </p>
      </dd>

      <dt>Percent of Clients</dt>
      <dd>
        Enter the percent of clients you wish to enroll. This value can be
        changed after launch for rollouts.
      </dd>
    </dl>

5. On the Summary Page, request launch.

   Rollouts using the incident response feature cannot be launched to preview.
   We highly reccomend you QA these recipes on the [staging instance of
   experimenter][stage] first.

   **Note:** Experimenter may report errors with your recipe configuration. You
   must fix them before requesting launch. Ask in `#ask-experimenter` on Slack.

6. Ask release management to approve and launch the rollout.

   **Note:** If you are a member of release management, you must get *another*
   member to to approve and launch. Experimenter requires a 2 person sign-off to
   launch experiments: the person who requests the launch cannot be the person
   who approves it.


<a id="example-configuration"></a>

## Example Configuration

```json
{
    "prefs": {
        "the.pref.to.set": {
            "branch": "user",
            "value": "hello world"
        },
        "another.pref.to.set": {
            "branch": "default",
            "value": true
        },
        "unset.this.pref": {
            "branch": "user",
            "value": null
        }
    }
}
```

## Causes of Unenrollment

## Mismatched Types

If you attempt to set a pref to a value of the wrong type, the pref will fail to
set. This will cause the enrollment to end.
 This will result in a unenrollment event
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
      <td>The string <code>"prefFlips-failed"</code></td>
    </tr>
    <tr>
      <td><code>pref_name</code></td>
      <td><code>prefName</code></td>
      <td>The pref that that failed to set.</td>
    </tr>
    <tr>
      <td><code>pref_type</code></td>
      <td><code>prefType</code></td>
      <td>The type of the existing pref.</td>
    </tr>
  </tbody>
</table>

## Conflicts with setPref Experiments

If a user is enrolled in a incident response pref flip and then enrolls in a
[setPref] experiment that changes the same prefs, they will be unenrolled from
the incident response rollout. This will result in a unenrollment event
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

## User Pref Changes

If a pref that is controlled by an incident response rollout is changed, either
by the user or client code, the client will be unenrolled. This will result in an
unenrollment event ([glean][glean-telemetry], [legacy][legacy-telemetry]) being
submitted with the following data:

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
      <td>The string <code>"changed-pref"</code></td>
    </tr>
    <tr>
      <td><code>changed_pref</code></td>
      <td><code>changedPref</code></td>
      <td>The pref that triggered the unenrollment.</td>
    </tr>
  </tbody>
</table>


[feature-manifest]: https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/FeatureManifest.yaml
[jsonschema]: https://searchfox.org/mozilla-central/source/toolkit/components/nimbus/schemas/PrefFlipsFeature.schema.json
[setPref]: /platform-guides/desktop/pref-experiments
[advanced-targeting]: /faq/targeting-audiences#how-can-i-add-a-new-advanced-targeting-option
[stage]: https://stage.experimenter.nonprod.webservices.mozgcp.net/nimbus/
[glean-telemetry]: https://dictionary.telemetry.mozilla.org/apps/firefox_desktop/metrics/nimbus_events_unenrollment
[legacy-telemetry]: https://probes.telemetry.mozilla.org/?search=unenroll&view=detail&probeId=event%2Fnormandy.unenroll%23unenroll
