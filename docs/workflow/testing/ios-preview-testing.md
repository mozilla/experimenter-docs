---
id: ios-preview-testing
title: Testing the preview flow on iOS
slug: /ios-preview-testing
---

# Testing the preview flow on iOS

## Launching an experiment to Preview the stage server

The first step to testing the preview flow is to launch an experiment. Go to [experimenter](https://stage.experimenter.nonprod.webservices.mozgcp.net/nimbus/](https://experimenter.services.mozilla.com/nimbus/)) and create your experiment.

For experiments that are already live, go to the summary page. For experiments that have not yet launched, you will need the author to click "Launch to Preview" on the Review & Launch page.

![Launch to Preview Button](/img/preview/preview-button.png)

## How to test

   Here is a [7 minute video overview of testing on iOS](https://drive.google.com/file/d/1SkcWOEsMUjhpwScfE1Hbss53XAII4IkJ/view).  That is the best place to start to understand the landscape.  Testing is possible by anyone (technical or not) with relative ease.

   There is a [step by step recorded training](https://mozilla.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=8f7b5507-f078-44b2-93bd-b2dc0118d399) with the [slide presentation containing all the commands references in the training](https://docs.google.com/presentation/d/1sZc0GQ8QDrCoNWOdr4fOM2ymPs9LXjFrQkNETZrCKs4/edit?slide=id.g3529812eaa4_0_2#slide=id.g3529812eaa4_0_2).


### FAQs

- **Accessing the secret menu**

At this point, you can run your local build of Firefox iOS, once it's run:

1. Access the settings menu and click **5** times on the Firefox version (in this example `Firefox Daylight 0.0.1`) under the about section:
   <img src="/img/firefox-ios/secret-menu-access.png" height="500"/>

2. Scroll all the way to the bottom and click the `Experiments` menu.

3. Click on `Edit` on the top right.

4. Choose the `Use Preview Collection (requires restart)` option.

5. Click `Reset` and restart the app.

6. Repeat the steps 1-2, and you should now see the experiment you launched to preview!

You can also check out this [visual documentation](https://docs.google.com/document/d/1XPF4TQQTxRwWDrp907JtWXi4rCJ0Pg1YOpFGCHz8sBc/edit#) for a clear demonstration of how to switch to the preview collection.

- **What kind of experiment should I create?**

If you would like your test to be more in-depth, we recommend you create an iOS experiment that can be directly tested on the UI. For example, you can create an `onboarding-default-browser` experiment by setting the feature config to `onboarding-default-browser` and setting the appropriate values, [check out this experiment on experimenter for a complete example](https://stage.experimenter.nonprod.webservices.mozgcp.net/nimbus/teshaqtest-preview-flow-showhide-default-browser-title-image)

- **I don't see my experiments on Firefox!**

It takes a little time, but if you still can't see the experiments, try restarting the app and double check that you launched your experiment to preview and set the `Application` to `Firefox iOS` and didn't miss any configuration on experimenter. If you keep facing trouble reach out to use on #ask-experimenter on slack!

- **Pointing a local iOS build to the stage server**

If you will be using the stage server, you want Firefox to look for experiments there. For iOS, you can do that on a local build, which you can get running by [following the instructions on the `firefox-ios` repository](https://github.com/mozilla-mobile/firefox-ios/blob/main/README.md#building-the-code)

Once you have a local build using xcode, you should replace `NIMBUS_URL` with `https://firefox.settings.services.allizom.org/v1/`. You can set that on `info.plist`, which lies in the `Client` directory once you have the project setup. `NIMBUS_URL` will have an initial value of `$(NIMBUS_URL)`, replace that with the setting server's url.
