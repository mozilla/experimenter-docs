---
id: troubleshooting
title: Troubleshooting
slug: /data-analysis/jetstream/troubleshooting
sidebar_position: 8
---

### How Can I See What Jetstream Is Doing? 

For checking on daily Jetstream runs, the `jetstream` DAG can be viewed via the [Airflow Web UI](https://workflow.telemetry.mozilla.org/tree?dag_id=jetstream). This show whether the run is still in progress or has completed.

For checking on reruns after a config change, the [metric-hub CI](https://app.circleci.com/pipelines/github/mozilla/metric-hub?branch=main) will show all active runs and indicate whether a rerun has been successful or if there have been any errors.

For viewing the Argo workflows Jetstream is running, connect to the Argo dashboard by running:

```
gcloud container clusters get-credentials jetstream --zone us-central1-a --project moz-fx-data-experiments && kubectl port-forward --namespace argo $(kubectl get pod --namespace argo --selector='app=argo-server' --output jsonpath='{.items[0].metadata.name}') 8080:2746
```

The dashboard can than be accessed via [127.0.0.1:8080](http://127.0.0.1:8080) through the web browser and provides a detailed overview of past workflows, the statuses of each step in a workflow and container logs.

### How Do I Know if Something Went Wrong?

Jetstream logs errors to the console and, optionally, to the `monitoring.logs` BigQuery table. Logging to BigQuery is enabled by default when running Jetstream via Airflow, as it allows for better alerting and monitoring of errors. It is by default disabled for runs triggered via the metric-hub CI.

Errors can be viewed on the [Jetstream error dashboard] in Looker.

Additionally, alerts can be set up in Looker to check for errors daily and sent an email if failures have been detected. To subscribe to these alerts, go to the [Jetstream error dashboard], click on the _Alerts_ (bell) icon on the _Critical Errors Last Run_ tiles and follow the "Error Count" alert.

### Something Went Wrong, What Do I Do?

1. Check the [Jetstream error dashboard] for more details on the error that occurred.
1. If the experiment uses a custom configuration, make sure the configuration is valid. Sometimes, SQL written for specifying metrics in the configuration file can contain logical errors that result in failures when computing statistics.
    * It is possible that SQL that was once valid starts to fail, because the query has become too complex. This can happen if new fields get added to a table that is being queried. In these cases, try to rewrite and simplify the SQL query or consider using source tables instead of derived views. 

If you are unsure of what might have gone wrong or what to, you can open [an issue in Jira](https://jira.mozilla.com/projects/CIRRUS/issues/CIRRUS-68?filter=allopenissues) or ask for help in the [#ask-experimenter](https://mozilla.slack.com/archives/CF94YGE03) Slack channel.

### Some Results Appear to Be Missing

It can take up to 2 days for results of the overall time period to be available after an experiment ends. For example, if an experiment ends on 2021-04-05, then results for the overall time period will be computed in the next daily analysis run on 2021-04-06. As running the analysis can take a few hours to complete results will be available on 2021-04-07.

If results other than for the overall period are missing or more than 2 days have passed and no overall results are available, check the [Jetstream error dashboard] if there are any analysis errors for your experiment.

If there have been no errors, or the errors cannot be resolved, open [an issue in Jira](https://jira.mozilla.com/projects/CIRRUS/issues/CIRRUS-68?filter=allopenissues) or ask for help in the [#ask-experimenter](https://mozilla.slack.com/archives/CF94YGE03) Slack channel.

### How Do I Debug Operational or More Complex Errors?

Debugging operational or more complex errors is usually done by Jetstream engineers.

1. Check the [Jetstream error dashboard] for more details on the error that occurred.
1. To get more detailed logs or view each individual workflow step, connect to the Argo dashboard and navigate to the workflow where errors might have occurred.
1. Once errors have been resolved, to rerun affected experiments for the date when they failed make sure to install the Jetstream CLI locally and execute: `jetstream run-argo --date=2021-04-26 --experiment_slug=bug-1695015-pref-new-tab-modernized-ux-region-1-release-86-88`. For example: `jetstream run-argo --date=2021-04-26 --experiment_slug=bug-1695015-pref-new-tab-modernized-ux-region-1-release-86-88`

The logs can indicate a couple of different problems:

#### There Has Been an Operational Error Related to Kubernetes

This could happen, for example, if available memory or CPUs have been exceeded. To get more information about the pods that failed, navigate to the [`jetstream` Kubernetes cluster in the GCP web console](https://console.cloud.google.com/kubernetes/workload?project=moz-fx-data-experiments&pageState=(%22savedViews%22:(%22i%22:%22bf4f1f5805924fe2ba1cd23bd3b0ef8b%22,%22c%22:%5B%22gke%2Fus-central1-a%2Fjetstream%22%5D,%22n%22:%5B%5D))). The web UI allows to view the memory and CPU usage of specific pods or the entire cluster as well as pod logs. This information can help to decide whether the cluster needs to be resized. Resizing the cluster or allocating more resources is worth considering if these errors happen frequently. For occasional failures, simply rerunning the affected experiment is sufficient.

## An External Config or Outcome Definition Is Causing Failures

1. Ensure that the config is valid and that SQL does not contain any logical errors.
1. If the SQL has become too complex, try to simplify queries or use source tables instead of derived views.
1. Fix the configuration. Once the new config gets merge, the experiment will be rerun automatically.
        
## There Has Been an Error Because of a Timeout When Using an External API

Timeouts occasionally happen when running queries in BigQuery, fetching experiments from the Experimenter API or fetching config files from GitHub. Jetstream implements a retry mechanism for most of these cases but it is possible that all of these retries fail. Rerunning affected experiments should in most cases resolve these issues. However, if this failures keep happening then this could indicate API changes.
        
## There Is a Bug in the Jetstream Code Base
1. Add a test case to [jetstream] to reproduce the error.
1. Fix the bug and open a PR against the repository.
1. Once the fix has been approved, merged and deployed, the affected experiment can be rerun.

## Airflow Returned an Error or Is Sending Notification Emails

1. Check the Airflow logs
1. Errors in Airflow can happen if there has been a problem with the Airflow cluster itself, e.g. the jetstream tasks could not be started. In this case, clearing the affected task to trigger a rerun should fix the issue. If problems persist, then reach out to data ops by [opening a Bugzilla ticket](https://bugzilla.mozilla.org/enter_bug.cgi?product=Data%20Platform%20and%20Tools).
1. Airflow failures can also occur if the analysis workflow could not be started. For example, if connecting to the Argo cluster failed. Check if the `jetstream` cluster is in a healthy state and if the analysis run can be started using a locally installed Jetstream CLI.
1. The Jetstream DAG has some upstream dependencies that need to successfully complete in order for jetstream to run. If one of these upstream dependencies fails, then Airflow will keep sending email alerts with `up_for_retry` in the subject. Failures in the upstream dependencies need to be resolved before jetstream can run. Check for the owner of the upstream task that failed and open a [Bugzilla ticket](https://bugzilla.mozilla.org/enter_bug.cgi?product=Data%20Platform%20and%20Tools) with the owner tagged.


[jetstream]: https://github.com/mozilla/jetstream
[jetstream error dashboard]: https://mozilla.cloud.looker.com/dashboards/246
