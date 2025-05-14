---
title: Experiment Reviewers
slug: /access
---

With Nimbus experiments, instead of a centralized committee responsible for launching and running experiments **we want you, the experiment owner, to drive the process from ideation to completion**.

If you are interested in learning more about your responsibilities, you can find our complete [Access Control Policy here](https://docs.google.com/document/d/1r8oI_Hxe5JQcOejqZcSziX1Aso20AFGBToTFu3BE5j8/edit).

### Onboarding for New Authors/Owners (L2)

In order to use the Nimbus platform to create and launch experiments, you will need to go through the [Experiment Owner onboarding process](https://experimenter.info/for-product). Please ask in [#ask-experimenter](https://mozilla.slack.com/archives/CF94YGE03) if you have any questions and for a shadow on the first experiments(s) you create.

### Onboarding for New Reviewers (L3)

Assuming you have been vouched for by a Nimbus administrator + a Product Owner (product manager or engineering manager if the team doesn’t have a dedicated PM), you should go through the following steps to get review access on Nimbus:

#### Basic access

- Read through [rules and responsibilities for L3 users](https://docs.google.com/document/d/1r8oI_Hxe5JQcOejqZcSziX1Aso20AFGBToTFu3BE5j8/edit#heading=h.6v62tolv8dnv). Please note that you will have access to making changes in production for all experiments, and you should decline if you don't feel sufficiently qualified to review an experiment
- Watch the half hour [reviewer training video](https://mozilla.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=b2608de6-defe-44e4-9517-af5d0035268c).  The [training slides are here](https://docs.google.com/presentation/d/11jGYVCRhzqG5R4aemcNtfQ3umzsQAcZrGiFp5a9T7us/edit#slide=id.g144dc03564c_0_7) for reference and links.
- Follow the steps [setup VPN](https://mozilla-hub.atlassian.net/wiki/spaces/SD/pages/26741194/VPN)
- [File a bug using this template](https://bugzilla.mozilla.org/enter_bug.cgi?product=Cloud%20Services&component=Server%3A%20Remote%20Settings) to be added to either or all of the following collections: `nimbus-desktop-experiments` and/or `nimbus-mobile-experiments` and/or `nimbus-web-experiments` for your LDAP to be added on staging and production.
- Note: on your first review(s) - please ask in #ask-experimenter for a shadow. It's very easy to partner with you sharing a screen to make sure you don't have any questions or uncertainties.

#### Testing Review Workflow on Staging

- Connect to the VPN
- Go to [Nimbus Staging](https://stage.experimenter.nonprod.dataops.mozgcp.net/nimbus/) (not Production!). Ask someone to create a dummy experiment and request review.
- Click "Approve" on the dummy experiment, and then "Open Remote Settings":
  ![image](https://user-images.githubusercontent.com/1455535/144130977-149c2e65-4995-4040-a840-ea2baa0e3dc4.png)
  ![image](https://user-images.githubusercontent.com/1455535/144131295-8469c508-11d6-49e1-91d7-0bcf5d81efa6.png)
- Sign in. You should see a review request like this, if you don't refresh the page
  ![image](https://user-images.githubusercontent.com/1455535/144131521-8516e6e1-7208-47dc-8183-ac1054542007.png)
- **CHECK TO MAKE SURE THE SLUG OF THE DIFF MATCHES THE CHANGE YOU ARE APPROVING** This is important!!
- Press approve if everything looks good. If anything looks wrong, Reject and alert nimbus core team in #ask-experiments
- Congrats, you have tested the workflow. You are now ready to review real experiments on production!

### Reviews

All changes to experiments and rollouts that impact production must be approved by a single L3 Nimbus reviewer, which you can request via the Nimbus console interface. *The requester and reviewer must be different people.*  You can find a list of [recommended reviewers here](https://mozilla-hub.atlassian.net/wiki/spaces/FJT/pages/11470672/Nimbus+Reviewers).
