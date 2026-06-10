---
id: feature-monitoring
title: Feature Monitoring
slug: /feature-monitoring
---

How to view Grafana dashboards for a feature's health and enrollment metrics on the Feature Health Dashboard in Experimenter.

## What Is Feature Monitoring?

Feature monitoring provides a Grafana dashboard that tracks the health and usage metrics for a specific Nimbus feature config across all live and completed **rollouts**. It is powered by metric definitions in [metric-hub](https://github.com/mozilla/metric-hub/blob/main/featmon/firefox_desktop.toml).

Unlike experiment-level monitoring (which tracks a single experiment), feature monitoring shows aggregate data across all rollouts for a feature, making it easy to spot regressions or unexpected changes in feature behaviour. Note that this is a **health monitoring** tool — it is not designed for statistical comparisons between branches or measuring experiment impact.

## How to Access It

1. Go to the [**Feature Health Dashboard**](https://experimenter.services.mozilla.com/nimbus/features/) in Experimenter.
2. Select an application and a feature config from the dropdowns.
3. If the feature has monitoring configured in metric-hub, a **Open Grafana Dashboard** button appears in the Feature Monitoring card.
4. Click the button to open the dashboard in a new tab.

## Why Is the Dashboard Not Available for My Feature?

If you see the warning **"Grafana dashboard not available"**, it means the feature has not yet been added to the [metric-hub featmon config](https://github.com/mozilla/metric-hub/blob/main/featmon/firefox_desktop.toml).

To enable feature monitoring for your feature, open a pull request against metric-hub adding your feature to `featmon/firefox_desktop.toml`. The file includes examples and comments explaining the required format.

Once your PR is merged, the dashboard will become available for your feature in Experimenter after the next deploy.

## What Metrics Are Available?

The metrics shown in the Grafana dashboard depend on what is configured for your feature in metric-hub. Common metrics include:

- **DAU (Daily Active Users)** — how many users are actively using the feature each day.
- **Event counts** — specific interactions with the feature (clicks, impressions, etc.).
- **Boolean / quantity metrics** — values reported from the feature's Glean metrics.

Metrics are broken down by channel, locale, OS, and country where applicable.

## Need Help?

- To add your feature to metric-hub monitoring, see the [metric-hub featmon config](https://github.com/mozilla/metric-hub/blob/main/featmon/firefox_desktop.toml).
- For questions about what metrics to add or how to interpret the dashboard, ask in [#ask-experimenter](https://mozilla.slack.com/archives/CF94YMZ2T).
