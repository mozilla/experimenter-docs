---
id: mobile-surveys
title: Surveys
slug: /mobile-surveys
---

# Mobile Survey Workflow

The required general steps to launch a mobile survey are:

1. [Create the survey in the survey provider](#create-the-survey)
2. [Determine the survey invitation message copy](#invitation-message-copy)
3. [Determine the audience (targeting and sizing)](#determine-the-audience)
4. [Configure the survey in Nimbus](#configure-in-nimbus)
5. [QA](#qa)
6. [Launch](#launch)
7. [End](#end)

Below, we'll elaborate on each step.

## Create the survey

- Make sure the survey is configured to listen for URL parameters.
- Get the survey link, perhaps something like `https://qsurvey.mozilla.com/s3/<survey_name>?app=android&userid={uuid}`
  - Note that some URL parameters are added to the end, make sure your survey provider supports these (Alchemer does).
  - Note also the special formatting around the `userid={uuid}` parameter, this is used to generate a unique identifier for each message click which allows survey responses to be linked to telemetry. See [the docs](/messaging/mobile-messaging#actions) for more info.

## Invitation message copy

The following copy elements are generally available for surveys:

- Text (required), historically we've used `Please help Firefox by taking this short survey`
- Title (optional), historically this was not used
- Button Label (optional), historically we've used `Take survey`

The full docs are [available here](/messaging/mobile-messaging#message-content)

## Determine the audience

Audience composition for surveys has two parts: the targeting criteria (who are eligible to be enrolled) and the sizing (what fraction of eligible clients will be invited)

Targeting for surveys is either done through Nimbus or through the [messaging system](/messaging/mobile-messaging#triggers). Note that if custom targeting must be implemented, it should be done now and prior to the sizing calculations.

For sizing, the formula for a single survey branch is: `desired responses` / `assumed response rate` / `fraction viewing invitation` / `estimated active users in enrollment period`

To elaborate on each item:

- Desired responses: the number of desired survey responses, e.g. 1000. This is determined by the survey owner.
- Assumed response rate: what proportion of users who see the survey invitation are expected to click on it. Generally values around ~2% (1%-5% range) have been observed historically.
- Fraction viewing invitation: what proportion of users enrolled in the experiment are expected to see the survey invitation. In the absence of specific targeting, this is expected to be around 50%, due to the large number of new and bouncing users on mobile (many users download the app, are enrolled, but then do not open again). If the targeting for this survey is more specific, this fraction may be wildly different. Reach out to data science for assistance in this case.
- Estimated active users in enrollment period: this is the estimated number of clients that will be active at all during the enrollment period. For a 1-week enrollment period, this is equivalent to current WAU. For other enrollment periods, custom calculations are necessary.

Example calculation:

Using 1000 desired responses, 2% click-through-rate, 50% viewing the invitation, and 1M estimated active clients during the period, the sizing for this survey would be 10%.

Note that this calculation was done for a single survey branch. If you're running multiple branches in Nimbus (this is not the same thing as multiple branches in the survey provider!) then you'll need to scale this value by the number of branches.

## Configure in Nimbus

Prerequisite: at least one person on the team will have to have gone through [experiment owner training](/access#onboarding-for-new-authorsowners-l2).

If you want to run surveys both on Android and iOS, you'll need to configure a separate delivery for each one as deliveries are client-specific.

The schema for the JSON value is below:

```json
{
  "actions": {},
  "message-under-experiment": "<GIVE YOUR MESSAGE A NAME>",
  "messages": {
    "<USE THE SAME NAME AS message-under-experiment>": {
      "action": "<SURVEY LINK GOES HERE>",
      "button-label": "<BOTTON LABEL COPY GOES HERE>",
      "style": "SURVEY",
      "text": "<TEXT COPY GOES HERE>",
      "trigger": ["LIST", "OF", "TARGETING"]
    }
  },
  "on-control": "show-next-message",
  "styles": {},
  "triggers": {}
}
```

See below for an example (from the Viewpoint survey):

```json
{
  "actions": {},
  "message-under-experiment": "viewpoint-invitation-message",
  "messages": {
    "viewpoint-invitation-message": {
      "action": "https://qsurvey.mozilla.com/s3/302e5c853d63?app=android&userid={uuid}",
      "button-label": "Take survey",
      "style": "SURVEY",
      "text": "Please help Firefox by taking this short survey",
      "trigger": ["USER_EN_SPEAKER"]
    }
  },
  "on-control": "show-next-message",
  "styles": {},
  "triggers": {}
}
```

## QA

- QA will test to make sure that users see the message, that tapping the button leads to the survey
- In addition, you’ll probably want to check the survey results to confirm that you see QA's answers in the responses (and so you can exclude QA responses from your analysis)
- If you're using the `{uuid}` URL parameter to link surveys with telemetry, you'll want to confirm that this is configured correctly and that you can find the appropriate telemetry (message clicked event) matching the QA responses.

## Launch

Once QA is complete, the survey can be launched. The survey owner should request to launch and then post a message in [#ask-experimenter](https://mozilla.slack.com/archives/CF94YGE03) asking for an approver. As of the time of writing these docs, Rosanne Scholl & Daniel Berry are qualified reviewers for mobile surveys. If your team plans to run many surveys, it's recommended to have some members go through [reviewer training](/access#onboarding-for-new-reviewers-l3) so that the team can self-review their configurations without having to wait on external reviewers. Again, reach out in [#ask-experimenter](https://mozilla.slack.com/archives/CF94YGE03) for help with this.

## End

Once the survey has reached the end of the scheduled enrollment period, one of two things should happen. If there is sufficient volume of responses, the delivery should be ended (not just enrollment, the entire delivery should be ended). To do this, request to end and find a reviewer (see [Launch](#launch) above) to approve. If there aren't enough responses, the survey can be left open to gather more. It's recommended to extend the invitation period in units of whole weeks, to avoid biasing responses.
