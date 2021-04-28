---
id: operations
title: Jetstream Architecture and Operations
---

**[Jetstream]** is part of the Cirrus ecosystem and depends on some external services.

<img src="/experimenter-docs/img/jetstream/cirrus.png" alt="Cirrus architecture" className="img-xl" />

Jetstream is [scheduled to run in Airflow](https://github.com/mozilla/telemetry-airflow/blob/e5de501d8063cc366e9bb546135f3866136cb47d/dags/jetstream.py#L22) daily. The daily runs will analyze all experiments that are currently active or just ended the day before and write metrics, statistics and errors for each experiment to BigQuery. Active V1 experiments and V6 experiments (Nimbus experiments) are retrieved from the [Experimenter API](https://experimenter.services.mozilla.com/api/v1/experiments/).

Jetstream also fetches custom experiment and outcome configs from [jetstream-config](https://github.com/mozilla/jetstream-config) for analysis. When a new custom config gets merged into jetstream-config, the CI will trigger Jetstream to re-run all analyses for the experiment affected by the config. CircleCI will report on the status of the analysis run and link to the Cloud Logging logs.

After writing analyses results to BigQuery, statistics data is exported to the `mozanalysis` bucket in GCS as JSON. The JSON data is accessed by the analysis dashboard to display results.

## Architecture for Scaling Jetstream

To ensure analysis results are available in a timely manner, Jetstream implements two approaches for reducing the time required to run experiment analyses:
* Parallelization of experiment analyses using [Argo](https://argoproj.github.io/)
* Parallelization of lower-level calculations (statistics, segments, ...) using [Dask](https://dask.org/)

### Parallelizing experiment analyses

[Argo](https://argoproj.github.io/) is a light-weight workflow engine for orchestrating parallel jobs on Kubernetes and is capable of creating tasks dynamically that will be executed in parallel. Using Argo, the analyses for different experiments and analysis dates are split into separate jobs that run in parallel on the `jetstream` Kubernetes cluster in the `moz-fx-data-experiment-analysis` GCP project.

Argo expects each step in the workflow to be a container. The existing Jetstream container, which has the Jetstream CLI installed, can be used for each of these steps.
The full workflow definition is defined in [the `workflows/run.yaml` file](https://github.com/mozilla/jetstream/blob/main/jetstream/workflows/run.yaml).

Depending on how Jetstream is invoked (`rerun`, `run-argo`, or `rerun_config_changed`), Jetstream will determine the dates and experiments that are to be analyzed and injects them as parameters into `run.yaml` before launching the workflow. Argo will create separate jobs for each experiment and each analysis date. Once the analysis is complete, data gets exported as JSON to GCS.

### Parallelizing lower-level calculations

In addition to running experiment analyses in parallel, [Dask](https://dask.org/) is used to parallelize lower-level calculations. The following steps could be executed in parallel:
* Analyses for each analysis period (daily, 28day, weekly, overall)
* Analyses for different segments
* Calculating statistics defined for an experiment analysis

The [`dask.delayed interface`](https://docs.dask.org/en/latest/delayed.html) is used to turn the functions executing these steps into tasks that are added to a task graph which executes these steps in parallel. Dask is configured to use as many cores as are available on the machine by default, with 1 worker for each core. [Multi-threading being avoided, instead processes are used](https://docs.dask.org/en/latest/scheduling.html#local-threads) since the code is dominated by Python code, otherwise there wouldn't be any speedup due Python's Global Interpreter Lock. To manually restrict the number of processes, the `JETSTREAM_PROCESSES` environment variable can be used.

## Setup

Jetstream is executed on the `jetstream` Kubernetes cluster in the `moz-fx-data-experiments` project which is set up following [Argo's installation guide](https://github.com/argoproj/argo/blob/master/docs/quick-start.md):
* When creating or re-creating the cluster, Bigquery and Compute Engine read/write permissions need to be enabled
* Installing Argo:
	* Create an `argo` namespace: `kubectl create ns argo`
	* Install commonly used components: `kubectl apply -n argo -f https://raw.githubusercontent.com/argoproj/argo/stable/manifests/quick-start-postgres.yaml`
	* Create new `clusterrole`: `kubectl create rolebinding default-admin --clusterrole=admin --serviceaccount=argo:default --namespace=argo`
* The [`jetstream` DAG in Airflow](https://github.com/mozilla/telemetry-airflow/blob/master/dags/jetstream.py) triggers the `run-argo` job daily and either requires Compute Engine API access or the parameters `cluster_ip` and `cluster_cert` need to be provided
	* Currently the Airflow cluster does not have Compute Engine API access, so the cluster IP and certificate are stored as secrets and used for running Jetstream

## Troubleshooting

### How can I see what Jetstream is doing? 

For checking on daily Jetstream runs, the `jetstream` DAG can be viewed via the [Airflow Web UI](https://workflow.telemetry.mozilla.org/tree?dag_id=jetstream). This show whether the run is still in progress or has completed.

For checking on reruns after a config change, the [jetstream-config CI](https://app.circleci.com/pipelines/github/mozilla/jetstream-config?branch=main) will show all active runs and indicate whether a rerun has been successful or if there have been any errors.

For viewing the Argo workflows Jetstream is running, connect to the Argo dashboard by running:

```
gcloud container clusters get-credentials jetstream --zone us-central1-a --project moz-fx-data-experiments && kubectl port-forward --namespace argo $(kubectl get pod --namespace argo --selector='app=argo-server' --output jsonpath='{.items[0].metadata.name}') 8080:2746
```

The dashboard can than be accessed via [127.0.0.1:8080](http://127.0.0.1:8080) through the web browser and provides a detailed overview of past workflows, the statuses of each step in a workflow and container logs.

### How do I know if something went wrong?

Jetstream logs errors to the console and, optionally, to the `monitoring.logs` BigQuery table. Logging to BigQuery is enabled by default when running Jetstream via Airflow, as it allows for better alerting and monitoring of errors. It is by default disabled for runs triggered via the jetstream-config CI.

Errors can be viewed on the [Jetstream error dashboard] in Redash.

Additionally, alerts have been set up in Redash to check for errors daily and sent an email if failures have been detected. To subscribe to these alerts, email addresses can be added as _Destinations_ in the [Redash alert configuration](https://sql.telemetry.mozilla.org/alerts/81).

### Something went wrong, what do I do?

1. Check the [Jetstream error dashboard] for more details on the error that occurred.
1. If the experiment uses a custom configuration, make sure the configuration is valid. Sometimes, SQL written for specifying metrics in the configuration file can contain logical errors that result in failures when computing statistics.
    * It is possible that SQL that was once valid starts to fail, because the query has become too complex. This can happen if new fields get added to a table that is being queried. In these cases, try to rewrite and simplify the SQL query or consider using source tables instead of derived views. 

If you are unsure of what might have gone wrong or what to, you can open [an issue in Jira](https://jira.mozilla.com/projects/CIRRUS/issues/CIRRUS-68?filter=allopenissues) or ask for help in the [#ask-experimenter](https://mozilla.slack.com/archives/CF94YGE03) Slack channel.

### Some results appear to be missing

It can take up to 2 days for results of the overall time period to be available after an experiment ends. For example, if an experiment ends on 2021-04-05, then results for the overall time period will be computed in the next daily analysis run on 2021-04-06. As running the analysis can take a few hours to complete results will be available on 2021-04-07.

If results other than for the overall period are missing or more than 2 days have passed and no overall results are available, check the [Jetstream error dashboard] if there are any analysis errors for your experiment.

If there have been no errors, or the errors cannot be resolved, open [an issue in Jira](https://jira.mozilla.com/projects/CIRRUS/issues/CIRRUS-68?filter=allopenissues) or ask for help in the [#ask-experimenter](https://mozilla.slack.com/archives/CF94YGE03) Slack channel.

### How do I debug operational or more complex errors?

Debugging operational or more complex errors is usually done by Jetstream engineers.

1. Check the [Jetstream error dashboard] for more details on the error that occurred.
1. To get more detailed logs or view each individual workflow step, connect to the Argo dashboard and navigate to the workflow where errors might have occurred.
1. Once errors have been resolved, to rerun affected experiments for the date when they failed make sure to install the Jetstream CLI locally and execute: `jetstream run-argo --date=2021-04-26 --experiment_slug=bug-1695015-pref-new-tab-modernized-ux-region-1-release-86-88`. For example: `jetstream run-argo --date=2021-04-26 --experiment_slug=bug-1695015-pref-new-tab-modernized-ux-region-1-release-86-88`

The logs can indicate a couple of different problems:

#### There has been a operational error related to Kubernetes

This could happen, for example, if available memory or CPUs have been exceeded. To get more information about the pods that failed, navigate to the [`jetstream` Kubernetes cluster in the GCP web console](https://console.cloud.google.com/kubernetes/workload?project=moz-fx-data-experiments&pageState=(%22savedViews%22:(%22i%22:%22bf4f1f5805924fe2ba1cd23bd3b0ef8b%22,%22c%22:%5B%22gke%2Fus-central1-a%2Fjetstream%22%5D,%22n%22:%5B%5D))). The web UI allows to view the memory and CPU usage of specific pods or the entire cluster as well as pod logs. This information can help to decide whether the cluster needs to be resized. Resizing the cluster or allocating more resources is worth considering if these errors happen frequently. For occasional failures, simply rerunning the affected experiment is sufficient.

#### An external config or outcome definition is causing failures

1. Ensure that the config is valid and that SQL does not contain any logical errors.
1. If the SQL has become too complex, try to simplify queries or use source tables instead of derived views.
1. Fix the configuration. Once the new config gets merge, the experiment will be rerun automatically.
        
#### There has been an error because of a timeout when using an external API.

Timeouts occasionally happen when running queries in BigQuery, fetching experiments from the Experimenter API or fetching config files from Github. Jetstream implements a retry mechanism for most of these cases but it is possible that all of these retries fail. Rerunning affected experiments should in most cases resolve these issues. However, if this failures keep happening then this could indicate API changes.
        
#### There is a bug in the jetstream code base
1. Add a test case to [jetstream] to reproduce the error.
1. Fix the bug and open a PR against the repository.
1. Once the fix has been approved, merged and deployed, the affected experiment can be rerun.

#### Airflow returned an error or is sending notification emails

1. Check the Airflow logs
1. Errors in Airflow can happen if there has been a problem with the Airflow cluster itself, e.g. the jetstream tasks could not be started. In this case, clearing the affected task to trigger a rerun should fix the issue. If problems persist, then reach out to data ops by [opening a Bugzilla ticket](https://bugzilla.mozilla.org/enter_bug.cgi?product=Data%20Platform%20and%20Tools).
1. Airflow failures can also occur if the analysis workflow could not be started. For example, if connecting to the Argo cluster failed. Check if the `jetstream` cluster is in a healthy state and if the analysis run can be started using a locally installed Jetstream CLI.
1. The Jetstream DAG has some upstream dependencies that need to successfully complete in order for jetstream to run. If one of these upstream dependencies fails, then Airflow will keep sending email alerts with `up_for_retry` in the subject. Failures in the upstream dependencies need to be resolved before jetstream can run. Check for the owner of the upstream task that failed and open a [Bugzilla ticket](https://bugzilla.mozilla.org/enter_bug.cgi?product=Data%20Platform%20and%20Tools) with the owner tagged.


[jetstream]: https://github.com/mozilla/jetstream
[jetstream error dashboard]: https://sql.telemetry.mozilla.org/dashboard/jetstream-errors?p_experiment=%25
