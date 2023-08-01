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

2. Scroll down to the **Preview Url** section of the page. Select the branch you want and copy the `about:studies` URL.

3. Open `about:config` in **Firefox Desktop v90+** and set `nimbus.debug` to `true`. Paste the URL you copied above in your browser.

4. You should be enrolled! To exit the experiment, go to `about:studies` and click "Remove"

#### Earlier Desktop Firefox versions (<90)

To use preview with earlier versions of Firefox, you can use your Browser Toolbox devtools to run [this code snippet](https://gist.github.com/piatra/fb3876257f876386da104df593000ce9).
