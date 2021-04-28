---
id: operations
title: Jetstream Architecture and Operations
---

**[Jetstream]** is part of the Cirrus ecosystem and depends on some external services.

![Cirrus overview](https://github.com/mozilla/experimenter-docs/blob/main/static/img/jetstream/cirrus.png)
*High-level overview of Cirrus*

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


[jetstream]: https://github.com/mozilla/jetstream
[jetstream error dashboard]: https://sql.telemetry.mozilla.org/dashboard/jetstream-errors?p_experiment=%25
