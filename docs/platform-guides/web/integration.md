---
id: getting-started-for-nimbus-web-integration
title: Getting Started
slug: /platform-guides/web/integration
---

## Introduction

This guide outlines the high level steps and considerations for integrating Nimbus (Cirrus) into your web application. More detailed steps are available in the [checklist](https://docs.google.com/document/d/1GyO3o81RxrfXdN0oLz__6F0S3eCPbLKx5nHmDyv5i34/copy?usp=sharing)


## Integration Steps
To integrate Nimbus (Cirrus) with your web application, these are high-level steps, you can find more detailed version in the [checklist](https://docs.google.com/document/d/1GyO3o81RxrfXdN0oLz__6F0S3eCPbLKx5nHmDyv5i34/copy?usp=sharing):

1. **Glean**
- Integrate [Glean](https://docs.telemetry.mozilla.org/concepts/glean/glean.html) on your web application.

2. **FML**
- Make [Feature Manifest Language (FML) configuration](https://experimenter.info/fml-spec#introducing-the-fml) available in your repository, for example:
    ```
    about:
    description: Nimbus Feature Manifest for Experimenter Web testing
    channels:
      - developer
      - staging
      - production
    features:
      example-feature:
        description: An example feature.
        variables:
          emoji:
            description: An emoji to show for this treatment.
            type: Option<String>
            default: ❤️
          enabled:
            description: If the feature is enabled.
            type: Boolean
            default: false
        defaults:
          - channel: developer
            value: { "enabled": false }
          - channel: staging
            value: { "enabled": false }
          - channel: production
            value: { "enabled": false }
    ```

3. **Wait for Nimbus team to deploy your Cirrus Servers**
- The Nimbus team will give you URLs to use for calling Cirrus in stage and prod.

4. **Call Cirrus Server**
- Pass a unique client id and context when calling the service to receive the features. The client id can be a temporary or stable id depending on your use case. Any stable id must be included in the application's glean data deletion requests. Refer to [API docs](https://github.com/mozilla/experimenter/tree/main/cirrus) for more details.
    ```json
    {
        "client_id": "4a1d71ab-29a2-4c5f-9e1d-9d9df2e6e449",
        "context": {
            "key1": "value1",
            "key2": {
                "key2.1": "value2",
                "key2.2": "value3"
            }
        }
    }
    ```

5. **Validation and Testing**
- Validate setup and test the integration thoroughly.

6. **Experiment Analysis**
- Run an A/A experiment and confirm that Cirrus telemetry can be correlated to application telemetry for analysis.

7. **Additional Considerations**
- Provide training resources for experiment owners and reviewers.

## Additional Notes

For any questions or assistance, reach out to the Nimbus team on Slack channel #ask-experimenter.
