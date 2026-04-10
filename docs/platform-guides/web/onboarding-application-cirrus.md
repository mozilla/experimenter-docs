---
id: onboarding-application-cirrus
title: How to Add a New Application to Cirrus
sidebar_label: Onboarding a New Application
---

This guide walks through all the steps required to onboard a new client application to the Cirrus service. These steps assume the application has already been added to Experimenter (`constants.py` and `apps.yaml`) and that all generated FML files have been created.

## Pre-requisites

Before beginning, confirm the following are done:

- Application has been added to Experimenter's `constants.py`
- Application has been added to `apps.yaml`
- All generated FML (Feature Manifest Language) files have been created
- You know the application's FML directory name
- You have an estimate of the application's weekly average requests per second

## Step 1: Add the Application to the Cirrus Helm Chart (Stage + Prod)

**Repository:** `mozilla/webservices-infra`  
**Files to edit:** `cirrus/k8s/cirrus/values-stage.yaml` and `values-prod.yaml`

1. Open `values-stage.yaml` and find an existing `clientApplication` entry (e.g. Mozilla Accounts) to use as a template.

2. Copy the entry and update the following fields:
   - `name`: your application name (e.g. `subplat`)
   - `fmlDir`: the FML directory for your application (e.g. `subplatWeb`)
   - `channel`: set to `"staging"` for stage, `"production"` for prod

3. Set the `internal` vs `external` flag:
   - **internal** — use this if the application runs inside the `webservices-high-nonprod` US West 1 cluster (required for most server-side apps)
   - **external** — use this only for client-side JavaScript use cases (e.g. browser JS)

4. For `values-stage.yaml`:
   - Leave auto-scaling at the default (`min=1, max=1`)
   - Stage does not need scaled auto-scaling

5. For `values-prod.yaml`:
   - Configure auto-scaling based on expected traffic
   - Rule of thumb: each container handles ~20 req/s
   - Set min replicas to support your weekly average req/s at 50% container capacity
     (e.g. if expected traffic is similar to FXA ~2-3 replicas, set min to 5 for safety)
   - This gives double the expected capacity for reliability at launch

6. File a PR in the `webservices-infra` repo.
   - PR title format: `chore(cirrus): Add <appname>`
   - PR description: note which Jira integration ticket this covers (Step 1 of the cloned integration epic)
   - Anyone on the Nimbus team can review

## Step 2 (Optional): Increase Tenant Resource Limits

**Repository:** `mozilla/global-platform-admin`  
**File:** `tenants/cirrus.yaml`

Only needed if the application's expected traffic exceeds current tenant limits.

- Check current resource limits for stage and prod in `tenants/cirrus.yaml`
- If load testing or traffic estimates suggest limits will be hit, update accordingly
- This step can often be skipped for new applications starting at low traffic

## Step 3: Add the Application to Probe Scraper and Glean

**Repository:** `mozilla/probe-scraper`

1. File a Data Org (DO) ticket to register the new application.

2. File a Glean bug following the Glean docs. Make sure:
   - `app_name` ends with `_cirrus` (e.g. `subplat_cirrus`)
   - The app depends on `"glean-server"` and `"nimbus-cirrus"`
   - Do **not** add any metrics or ping files — the right dependencies are already included via `glean-server` and `nimbus-cirrus`

3. Add the application to probe-scraper's `repositories.yaml`
   (see [probe-scraper#617](https://github.com/mozilla/probe-scraper/pull/617) or [probe-scraper#963](https://github.com/mozilla/probe-scraper/pull/963) as examples)

4. Add the application to BigQuery ETL
   (see [bigquery-etl#7268](https://github.com/mozilla/bigquery-etl/pull/7268) as an example)

## Step 4: Sync the FML to Experimenter

1. The application team files a PR in their own repo to sync their FML files to Experimenter.

2. Once merged, notify the Nimbus team in `#ask-experimenter` on Slack so they know the FML is available and features are ready for experiment creation.

## Step 5: Experimenter UI Changes

**Repository:** `mozilla/experimenter`

1. Ensure the application appears in the Experimenter UI as a selectable application.

2. Confirm that the application's features are available for selection when creating a new experiment or rollout.

3. If the application is not showing up, check that `constants.py` and `apps.yaml` were updated correctly in the pre-requisites step.

## Step 6: Validate Configurations Before Running A/A Test

Before running an A/A test to validate enrollment, confirm all of the following:

### Environment Variables

- `CIRRUS_REMOTE_SETTING_REFRESH_RATE_IN_SECONDS` — ensure this is set appropriately for how frequently recipes should be refreshed
- `CIRRUS_GLEAN_MAX_EVENTS_BUFFER` — recommended values:
  - Stage: `1` (makes it easy to test — events flush immediately)
  - Prod: `100`

### Glean App ID / App Name

- Confirm the Glean probe-scraper `app_id` matches Experimenter's `app_id` for this application
- Confirm the Glean probe-scraper `app_name` matches Experimenter's `app_name`
- Confirm `CIRRUS_APP_ID` in the Helm chart matches the above
- Confirm `CIRRUS_APP_NAME` in the Helm chart matches the above

:::caution
If any of these are mismatched, enrollment data will not be attributed correctly.
:::

## Step 7: Run A/A Test and Validate Analysis

1. Create an A/A experiment (two identical branches) for the new application in Experimenter and launch it.

2. After enrollment data starts flowing, validate by joining the application's telemetry events to Cirrus enrollment events in STMO (sql.telemetry.mozilla.org).

3. Check that:
   - Branch sizes approximately match the configured distribution
   - Enrollment events are being recorded with the correct Nimbus user IDs

4. Some user IDs may not match if those users have disabled data collection — this is expected behaviour, not an error.

5. Automated Jetstream analysis is not currently available for Cirrus experiments due to differences between web application enrollments and the existing analysis paradigm. Analysis must be done manually for now.

## Step 8: Add the Application to the Cirrus Shredder Config

**Repository:** `mozilla/bigquery-etl`  
**File:** `shredder/config.yaml` (Cirrus section)

This step ensures that user data deletion requests are handled correctly for the new application.

1. Open the shredder config and find the existing Cirrus entries.

2. Copy an existing entry and update the application name (e.g. `subplat_cirrus`, `subplat_backend_source`).

3. Determine where the application records user IDs for data deletion requests:

   **For client-side applications:**
   - Use the standard `client_id` in the `deletion_request` ping

   **For server-side applications** (e.g. apps running on FXA infrastructure):
   - Standard client IDs do not apply
   - Check if the application is using FXA's user ID system
   - If yes, use the FXA unhashed source configuration
   - If no, work with the application team to confirm where they record user opt-out events, and which ping/field to use

4. If unsure about the deletion request setup, verify with the application team before filing the PR. Do not guess — incorrect shredder config can lead to incomplete data deletion.

5. File a PR in `bigquery-etl`.
   - PR title format: `chore(shredder): Add <appname> to Cirrus shredder config`
   - Reference the Step 8 Jira ticket from the cloned integration epic

## Summary Checklist

**Pre-requisites**
- [ ] Application added to `constants.py` and `apps.yaml` in Experimenter
- [ ] FML files generated

**Step 1**
- [ ] Application added to Cirrus Helm chart (`values-stage.yaml` + `values-prod.yaml`)
- [ ] PR filed in `webservices-infra`

**Step 2**
- [ ] (Optional) Tenant resource limits increased if needed

**Step 3**
- [ ] Application added to Probe Scraper (Data Org ticket + Glean bug filed)
- [ ] `app_name` ends with `_cirrus`, depends on `glean-server` + `nimbus-cirrus`

**Step 4**
- [ ] FML synced to Experimenter
- [ ] Nimbus team notified in `#ask-experimenter`

**Step 5**
- [ ] Application and features visible in Experimenter UI

**Step 6**
- [ ] `CIRRUS_REMOTE_SETTING_REFRESH_RATE_IN_SECONDS` set
- [ ] `CIRRUS_GLEAN_MAX_EVENTS_BUFFER` set (`1` stage / `100` prod)
- [ ] `app_id` and `app_name` match across Probe Scraper, Experimenter, and Helm chart

**Step 7**
- [ ] A/A test launched and enrollment data validated in STMO
- [ ] Branch sizes match configured distribution

**Step 8**
- [ ] Application added to Cirrus shredder config
- [ ] Deletion request source confirmed with application team
- [ ] PR filed in `bigquery-etl`
