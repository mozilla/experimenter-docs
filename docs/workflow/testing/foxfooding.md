---
id: foxfooding
title: Foxfooding
slug: /foxfooding
---

# Feature team setting up a Foxfood

Create a rollout with the change you want Mozillians to be able to try. 
Set the Audience size to the lowest it will accept - or .0001 with 1 expected client.  We aren't going to actually launch this - but lowest is always safest.
Click "Preview for Testing" - and it's ready!


# Foxfooding with Nimbus Dev Tools

Start by installing Nimbus Dev Tools.  If you aren't a developer, don't let the "Dev Tools" or add-on scare you away. This is easy!

Install the Nimbus Dev Tools.xpi from [Nimbus DevTools GitHub](https://github.com/mozilla-extensions/nimbus-devtools/releases) repository.  It is a one click install.    

If you have any questions on how to do that, there is a [65 second video on how to install Nimbus dev tools](https://mozilla.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=b7b2d02b-79ba-43a0-a708-b2a60107f0bf). Please ask in ask-experimenter if you have any questions.
Here is the [link to docs on how to install Nimbus Dev Tools](https://experimenter.info/nimbus-devtools-guide#installation). 

## Using Nimbus Dev Tools to Foxfood

Here is a 90 second video on [how to force enroll into a foxfooding experiment](https://mozilla.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=91da9998-b2e8-4314-aa83-b330014e2441).
- open the nimbus dev tools add-on (through puzzle piece or hamburger menu)
- go to "experiment browser", then change the top filter for "Status" to "Preview"
- Find the Foxfooding rollout name you wish to try
- For that Foxfooding rollout - click "select branch" and select the only option
- click "actions" and select "force enroll"
- check in about:studies (you may need to refresh page) and you will be enrolled to foxfood.
