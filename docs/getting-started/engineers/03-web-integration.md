---
id: getting-started-for-nimbus-web-integration
title: Getting Started for Nimbus Web Integration
slug: getting-started-for-nimbus-web-integration
---

## Introduction

This guide outlines the high level steps and considerations for integrating Nimbus (Cirrus) into your web application. More detailed steps are available in the [checklist](https://docs.google.com/document/d/1GyO3o81RxrfXdN0oLz__6F0S3eCPbLKx5nHmDyv5i34/copy?usp=sharing)


## Integration Steps
To integrate Nimbus (Cirrus) with your web application, these are high-level steps, you can find more detailed version in the [checklist](https://docs.google.com/document/d/1GyO3o81RxrfXdN0oLz__6F0S3eCPbLKx5nHmDyv5i34/copy?usp=sharing):

1. **Glean**
- Integrate [Glean](https://docs.telemetry.mozilla.org/concepts/glean/glean.html) on your web application.

2. **FML**
- Make [Feature Manifest Language (FML) configuration](https://experimenter.info/fml-spec#introducing-the-fml)   available in your repository.

3. **Probe Scraper**
- Add application into [probe scraper](https://mozilla.github.io/glean/book/user/adding-glean-to-your-project/enable-data-ingestion.html#add-your-product-to-probe-scraper) for data collection.

4. **Cirrus Container Image**
- Verify Access to Cirrus container image: [Mozilla Cirrus Docker Hub](https://hub.docker.com/r/mozilla/cirrus/tags).

5. **Deploy Cirrus Container**
- Deploy Cirrus container as a sidecar container in your Kubernetes deployment and add the [environment variables](https://github.com/mozilla/experimenter/tree/main/cirrus#environment-setup).
- Sidecar pattern in Kubernetes
<img src="/img/nimbus-on-web/sidecar-pattern-kubernetes.png"  alt="Sidecar pattern in Kubernetes" className="img-lg" />

- Example of Deployment architecture
<img src="/img/nimbus-on-web/deployment-architecture-example.png" alt="Example of Deployment architecture" className="img-lg" />

6. **Configure Feature Manifest Language (FML)**
- Add feature in Feature Manifest Language (FML).

7. **Integrate Glean SDK**
- Identify key metrics and configure with your application.

8. **Call Cirrus Container**
- Pass the unique client id and context when calling the container to receive the features. Refer to [API docs](https://github.com/mozilla/experimenter/tree/main/cirrus) for more details.
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

9. **Validation and Testing**
- Validate setup and test the integration thoroughly.

10. **Experiment Analysis**
- Add application support on Jetstream/OpMon and Metric hub.

11. **Additional Considerations**
- Provide training resources for experiment owners and reviewers.

## Additional Notes

For any questions or assistance, reach out to the Nimbus team on Slack channel #ask-experimenter.
