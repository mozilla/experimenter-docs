---
id: data-products
title: Data Products
sidebar_position: 6
slug: /data-analysis/jetstream/data-products
---

Jetstream writes analysis results and enrollments information to BigQuery. Statistics data and metadata gets exported to GCS to make it accessible to the Experimenter console.

## BigQuery Datasets

### Results Datasets

The datasets that back the Experimenter results dashboards are available in BigQuery in the `mozanalysis` dataset in `moz-fx-data-experiments`. [Technical documentation][jetstream-dtmo] is available in the Mozilla data docs.

### Monitoring Datasets

Datasets used for monitoring the operation of Jetstream are part of the `monitoring` dataset in `moz-fx-data-experiments`.

#### Error Logs

Jetstream logs errors and warning encountered during its analysis runs to `monitoring.logs`. This datasets is used as basis for the [Jetstream error dashboard] and for setting up alerts.

The `logs` table has the following schema:

| Column name             | Type        | Description                                           |
| ----------------------- | ----------- | ----------------------------------------------------- |
| `timestamp`             | `TIMESTAMP` | Timestamp of when the log event was recorded          |
| `experiment`            | `STRING`    | Experiment slug for which event was recorded          |
| `message`               | `STRING`    | Log message                                           |
| `log_level`             | `STRING`    | Log level: ERROR, WARNING                             |
| `exception`             | `STRING`    | Raised exception object                               |
| `filename`              | `STRING`    | Name the Jetstream code file the exception was raised |
| `func_name`             | `STRING`    | Name the Jetstream function the exception was raised  |
| `exception_type`        | `STRING`    | Class name the exception raised                       |

#### Query Cost

The `monitoring.query_cost_v1` dataset contains the cost of each query run when analysing experiments. The dataset is updated daily and scrapes the cost information from the BigQuery logs. The query for determining the costs is part of [bigquery-etl](https://github.com/mozilla/bigquery-etl/tree/main/sql/moz-fx-data-experiments/monitoring/query_cost_v1). The dataset is basis for the [jetstream cost monitoring dashboard](https://sql.telemetry.mozilla.org/dashboard/jetstream-cost) and [alerts set up](https://sql.telemetry.mozilla.org/alerts/91) to send notifications when an analysis query exceeds a certain threshold.

The `query_cost_v1` table has the following schema:

| Column name             | Type        | Description                                           |
| ----------------------- | ----------- | ----------------------------------------------------- |
| `submission_timestamp`  | `TIMESTAMP` | Timestamp of when the query was executed              |
| `destination_table`     | `STRING`    | Name of the table query was writing data to           |
| `query`                 | `STRING`    | SQL of the executed query                             |
| `total_bytes_processed` | `INT64`     | Number of bytes the query processed                   |
| `cost_usd`              | `FLOAT`     | Cost of the query in USD based on [BigQuery pricing]  |

#### Experimenter Experiments

For monitoring Nimbus experiments, some common failure cases are exposed as part of the [Experiments Enrollments dashboard](https://mozilla.cloud.looker.com/dashboards-next/216). These monitoring rules will require access to collected experiments enrollment data which is available in `monitoring.experimenter_experiments_v1`. This dataset is part of [bigquery-etl](https://github.com/mozilla/bigquery-etl/tree/main/sql/moz-fx-data-experiments/monitoring/experimenter_experiments_v1) and updated every 10 minutes by fetching data from the Experimenter API.

## GCS Data Export

Jetstream exports statistics data and metadata of analysed experiments to the `mozanalysis` GCS bucket.

### Statistics Data

After each analysis run has completed, Jetstream exports the statistics results of each experiments to the `statistics` sub-directory as JSON. The JSON files follow the naming format:

`statistics_<experiment_slug>_<period>.json`

Each file contains a JSON object for every row in the corresponding statistics table. The JSON files are pulled in by Experimenter and used for visualizing results on the Experimenter results page.

### Metadata

Metadata of analyzed experiments contains information about all metrics and outcomes that are computed during any analysis period. Metadata is written to JSON files into the `metadata` sub-directory with the following naming schema:

`metadata_<experiment_slug>.json`

Each JSON metadata file contains the following information:

```json
"metrics": {
    "metric_slug": {
        "friendly_name": "Friendly metric name",
        "description": "Metric description defined in mozanalysis or metric-hub",
        "bigger_is_better": true
    }
    // ...
},
"outcomes": {
    "outcome_slug": {
        "slug": "outcome_slug",
        "friendly_name": "Friendly outcome name",
        "description": "Outcome description defined in metric-hub",
        "metrics": [    // metrics computed as part of outcome
            "metric_slug",
            "another_metric_slug"
        ],
        // commit hash of outcome version that was used in analysis
        "commit_hash": "74e45eb4c3bf4ea7f1d65f888a70bfa0f6a86c1e" 
    }
    // ...
}
```

Metadata of metrics and outcomes is used to show names, descriptions and whether larger numbers are better in the Experimenter results. 

[jetstream-dtmo]: https://docs.telemetry.mozilla.org/datasets/jetstream.html
[jetstream error dashboard]: https://mozilla.cloud.looker.com/dashboards/246
[bigquery pricing]: https://cloud.google.com/bigquery/pricing
