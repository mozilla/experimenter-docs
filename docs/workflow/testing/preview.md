---
id: preview
title: Previewing Experiments
slug: /previewing-experiments
sidebar_position: 1
---

This guide will help you preview what each branch of an experiment will look like for users in the target application.  
Preview does NOT launch your experiment to external users.  Preview enables you to self test your experiment and for QA to test.

:::warning
These steps only apply to Firefox Desktop Version 90+. You can find [instructions for iOS here](ios-preview-testing.md), Fenix instructions are coming soon!
:::

1. For experiments that are already live, go to the summary page. For experiments that have not yet launched, you will need the author to click "Launch to Preview" on the Review & Launch page.

![Launch to Preview Button](/img/preview/preview-button.png)

### Self-Testing with Nimbus Dev Tools Add-on
If you aren't a developer, don't let the "Dev Tools" or add-on scare you away.  This is the easier path!  

Here is a 65 second video on [how to install Nimbus dev tools](https://mozilla.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=b7b2d02b-79ba-43a0-a708-b2a60107f0bf).  Watching the video takes half the time to getting Nimbus Dev Tools installed.  Here is the [link to docs on how to use Nimbus Dev Tools](https://experimenter.info/nimbus-devtools-guide#installation).  The very first link on that page is to the [Nimbus DevTools GitHub repository](https://github.com/mozilla-extensions/nimbus-devtools/releases), where you can find the one click XPI file install.

Here is a 5 minute video on [using Nimbus Dev Tools to test a simple experiment](https://mozilla.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=98d797c3-35e2-413a-b68d-b2a5018b814e).  Watching this will show you how to verify simple experiments.  

### How do I know if I have a simple experiment
There is a Miro flow that can [help determine if you have a good test case here](https://miro.com/app/board/uXjVK_27t2o=/?share_link_id=702720260336).  Reach out in #ask-experimenter if you are unsure and someone can help you determine the complexity. 

### Self-Testing without Nimbus Dev Tools

2. Scroll down to the **Preview Url** section of the page. Select the branch you want and copy the `about:studies` URL.

3. Open `about:config` in **Firefox Desktop v90+** and set `nimbus.debug` to `true`. Paste the URL you copied above in your browser.

4. You should be enrolled! To exit the experiment, go to `about:studies` and click "Remove"

#### Earlier Desktop Firefox versions (<90)

To use preview with earlier versions of Firefox, you can use your Browser Toolbox devtools to run [this code snippet](https://gist.github.com/piatra/fb3876257f876386da104df593000ce9).
