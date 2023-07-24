---
id: auto-sizing-cli
title: Understanding the Experiment Sizing Command-line Interface
slug: /auto-sizing-cli
---

The [Mozanalysis] library includes a feature that allows for sample size calculation. This can be accessed using a command-line interface (CLI), called **[auto-sizing]**. The purpose of this interface is to facilitate quick analyses for experiments that are either straightforward or similar to previous ones.

## How to Configure the Sizing Job

The sizing CLI operates based on a local TOML file, which provides the necessary information for the job. This TOML file details the metrics, segments, and parameters that will be employed for the analysis. The sample sizes are computed based on these parameters using the [`mozanalysis.frequentist_stats.sample_size.z_or_t_ind_sample_size_calc`](https://mozilla.github.io/mozanalysis/api/frequentist_stats/sample_size.html#mozanalysis.frequentist_stats.sample_size.z_or_t_ind_sample_size_calc) method. It's worth noting that within Mozanalysis, 'segments' refer to filters that identify suitable clients for an experiment. On the other hand, 'segments' in Jetstream pertain to groups of clients examined during post-experiment analysis.

### Understanding the TOML File Layout

The TOML configuration file needs to contain four sections - `metrics`, `data_sources`, `segments`, and `segments.data_sources`. Each of these sections should define what is necessary for the experiment. The definitions follow the same format as [Jetstream], and a guide to create your own within the TOML file is available [here](https://experimenter.info/jetstream/configuration#defining-metrics).

In addition to this, the TOML file can include references to metrics, segments, data sources, and segment data sources that are already a part of the [metric-hub]. To call these pre-defined objects, an `import_from_metric_hub` list can be incorporated in the TOML file. As an example, to import the `active_hours` metric for Firefox Desktop, the following code is added to the TOML config file:

```
[metrics.import_from_metric_hub]
firefox_desktop = ["active_hours"]
```

For defining the data collection period for the analysis and the parameters used to calculate sample sizes, a `parameters` section is included in the TOML file. It is divided into two subsections: `parameters.sizing` and `parameters.dates`:

1. `parameters.sizing`: Contains two tags, `power` and `effect_size`. These tags should include lists of values for each parameter. Sample sizes will be calculated for all the metrics given in the TOML file for each combination of power and effect size in those lists.
2. `parameters.dates`: Holds the `start_date` (presented in "%Y-%m-%d" format, e.g., "2023-01-01"), `num_dates_enrollment`, and `analysis_length` values. For more information on how these values are used to retrieve historical data, refer to the [Mozanalysis documentation](https://experimenter.info/experiment-sizing).

## Using CLI Commands

To start the sizing CLI, use the command `auto_sizing run`. Here are the options available at the invocation:

| Option      | Description |
| ----------- | ----------- |
| `--project_id`, `--project-id` | Specifies the BigQuery project to store the metrics table |
| `--dataset_id`, `--dataset-id` | Determines the BigQuery dataset to hold the metrics table |
| `--bucket` | Defines the GCP bucket to save the output JSON. If left blank, the JSON will be saved in the same directory as the config TOML |
| `--target_slug` | Gives a name to the experiment, used when naming the metrics table and output file |
| `--local_config` | Specifies the path to the configuration TOML file |

## Understanding CLI Output

The results of the experiment sizing are saved in a JSON format. If a GCP bucket is provided in the `--bucket` option at invocation, this JSON file is stored in a `sample_sizes` folder in that bucket. If no bucket is given, the JSON results are saved in the same directory as the TOML configuration file.

The results JSON will have an entry for each combination of power and effect size given in the config file. Each of these has an entry for each metric, where the required population percentage and sample size per branch needed to achieve that power with that effect size is recorded. Lastly, a tag is included with a parameters dictionary that stores the power and effect size values. The example below shows the results for a sizing job with the metrics `uri_count` and `active_hours`:

```
{"Power0.8EffectSize0.01": {
        "uri_count": {"sample_size_per_branch": 475269, "population_percent_per_branch": 6.25}, 
        "active_hours": {"sample_size_per_branch": 327233, "population_percent_per_branch": 4.3}, 
        "parameters": {"power": 0.8, "effect_size": 0.01}}, 
"Power0.8EffectSize0.02": {
        "uri_count": {"sample_size_per_branch": 118817, "population_percent_per_branch": 1.56}, 
        "active_hours": {"sample_size_per_branch": 81808, "population_percent_per_branch": 1.08}, 
        "parameters": {"power": 0.8, "effect_size": 0.02}}}
```

[Jetstream]: jetstream/jetstream.md
[metric-hub]: https://github.com/mozilla/metric-hub
[mozanalysis]: https://github.com/mozilla/mozanalysis
[auto-sizing]: https://github.com/mozilla/auto-sizing
