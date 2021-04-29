# Testing on mobile

We have three parts to test:

1. The experiment definition document, as defined in Experimenter and delivered by Remote Settings. Problems with this definition should be resolved by the experiment owner.
2. The Nimbus system (Nimbus client side SDK and the Experimenter/Remote Settings/Glean)
3. How the app responds to different branches/feature configurations. Problems with the app's response to different branches should be resolved by the app's engineering team.

Testing the Nimbus system is out of the scope of this document.

At this point, there are few if any tools for QA to use to test either of 1, or 3.

However, using a local build, and by changing the `NIMBUS_URL` to the Remote Settings staging server at https://settings.stage.mozaws.net we can effectively vary the experiments definition document to test the app, and to replicate the experiment definition document used in production. This is [documented here][nimbus-url].

Building Fenix locally is [documented in the Fenix repository][local-build].

[local-build]: https://github.com/mozilla-mobile/fenix#build-instructions
[nimbus-url]: https://github.com/mozilla-mobile/fenix#using-nimbus-servers-during-local-development

## Overview

We wish to get the app to ingest the experiment definition of our choice. Here is a sample experiment definition, which you can generate with the [staging instance of Experimenter][stage-experimenter]. 

[stage-experimenter]: https://stage.experimenter.nonprod.dataops.mozgcp.net/nimbus/

```json
{
  "data": [
    {
      "slug": "nimbus-aa-validation-for-ios-v2",
      "appId": "org.mozilla.ios.FirefoxBeta",
      "appName": "firefox_ios",
      "channel": "beta",
      "endDate": null,
      "branches": [
        {
          "slug": "treatment",
          "ratio": 40,
          "feature": {
            "value": {},
            "enabled": true,
            "featureId": "the-feature-id"
          }
        },
        {
          "slug": "control",
          "ratio": 60,
          "feature": {
            "value": {},
            "enabled": true,
            "featureId": "the-feature-id"
          }
        }
      ],
      "outcomes": [],
      "arguments": {},
      "probeSets": [],
      "startDate": "2021-04-19T22:40:44.614622Z",
      "targeting": "true",
      "featureIds": [
        "the-feature-id"
      ],
      "application": "org.mozilla.ios.FirefoxBeta",
      "bucketConfig": {
        "count": 8000,
        "start": 0,
        "total": 10000,
        "namespace": "nimbus-aa-validation-for-ios-v2-1",
        "randomizationUnit": "nimbus_id"
      },
      "schemaVersion": "1.4.0",
      "userFacingName": "A replica of the experiment under test",
      "referenceBranch": "control",
      "proposedDuration": 28,
      "isEnrollmentPaused": false,
      "proposedEnrollment": 7,
      "userFacingDescription": "Is Nimbus working? This experiment tries to find out.",
      "id": "nimbus-aa-validation-for-ios-v2",
      "last_modified": 1619530368808
    }
  ]
}
```

## The annotated guide to the experiment definition

Many of the fields in the above JSON correspond to the experiment UI.

These fields affect which OS, app and build the experiment is for. These should align with the developer or nightly builds of the app your using, on the platform you're using. If these don't line up, the app will not pick up this experiment.

 * `appName`: pick `fenix` or `firefox_ios`
 * `appId`: The experimenter UI should help you select the right one.
 * `channel`: this must be `nightly` or `developer`. The experimenter UI should help you select the right one.
 * `feature_id`/`featureIds`: this is the identifier of the app feature under test. This should match what is hard coded into the App. Experimenter will put these in all the right places. If the feature id is not already listed, you can [add it here][experimenter-admin].

[experiment-admin]: https://stage.experimenter.nonprod.dataops.mozgcp.net/admin/

These fields affect segment the population for eligibility for the experiment, and which branch they'll be given.

 * `targeting`: Experimenter will help you generate this JEXL query string. If Nimbus evaluates this on a given device to `true`, then the device is eligible for the experiment. If your testing the app, then you 
 * `bucketConfig`: `start` `count` and `total`. Of the total eligible users, the proportion that will actually be enrolled in the experiment is given by `(count - start) / total`. For testing purposes, you should make `start = 0`, `count = 10000`, `total = 10000`, i.e. enroll 100% of eligible devices.

If the device is enrolled in the experiment (i.e. is targeted as eligible, and in the experiment bucket), then it will be enrolled in to one of the two or more branches. Once enrolled it will not change branches.

 * `branch` -> `slug`: This should match the branches that the app's feature responds to. In most cases, it will be `treatment` and `control`.
 * `branch`->`ratio`: The `ratio` property of each branch, gives the proportion of the enrolled population wil get a particular branch. Tip: make your ratios add up to 100. In the above example, the `control` branch gets 60 out of every (60 + 40) enrollments, i.e. 60%.

## Changing between experiments

To test the app's behaviour in the face of the branches, you'll need one experiment per branch. Each experiment needs the same feature id. They cannot be run in parallel.

### Experimenter

The experiment can be ended remotely.

### Client side

Once enrolled in an experiment, the user should not be able to enroll in a different branch.

Once the experiment has been ended, you can reset the app by clearing app data and caches. The experiment is downloaded on first run after the reset or install, after a few second; and the experiment enrollment will happen on second run.

## Alternatives to Experimenter

It may not be desirable to use Experimenter: you should be able to set up a simple file server on your network. It should be able to serve the experiment JSON file directly, which you can edit the JSON directly.

This local server should serve the file from the path: `/buckets/main/collections/nimbus-mobile-experiments/records`. Setting the `NIMBUS_URL` to this local server should be done in the same way as above.

## Experiment set-ups for testing branches

You should have one experiment per branch: 

 * they should  have `targeting` = `"true"`, `bucketConfig` to have `start` = `0`, `total = 10000` and `count = 10000`.
 * For the branch under test, set the branch `ratio` to `100` and the others to `0`.
 
This will ensure that all clients that load the experiment will enroll in it and choose that exact branch.

## Testing the experiment document itself

The only thing you can test on small scale is the targeting string. You should make an experiment with the same targeting as the experiment brief. You should ensure every client enrolls in a branch which has visible changes (e.g. `treatment`).

You can then vary the device (e.g. the locale or language), or by using a small range of phones of different sizes and operating system versions.

## Conclusion

Much of these will be ameliorated by testing tooling. We appreciate that the current situation is less than ideal.