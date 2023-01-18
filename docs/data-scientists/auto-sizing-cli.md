---
id: auto-sizing-cli
title: Experiment Sizing Command-line Interface
slug: /auto-sizing-cli
---

The sample size calculation functionality contained in the [Mozanalysis] library is accessible via a command-line interface (CLI), **[auto-sizing]**. This CLI is intended to enable rapid analyses for simple experiments or experiments with targeting similar to past experiments.

## Sizing job configuration

The sizing CLI relies on a local TOML file to configure the job. This TOML file contains the metrics, segments, and parameters used to carry out the analysis. Sample sizes based on these parameters are calculated using the [`mozanalysis.frequentist_stats.sample_size.z_or_t_ind_sample_size_calc`](https://mozilla.github.io/mozanalysis/api/frequentist_stats/sample_size.html#mozanalysis.frequentist_stats.sample_size.z_or_t_ind_sample_size_calc) method.

### TOML file layout

The TOML configuration file must contain a `metrics`, `data_sources`, `segments`, and `segments.data_sources` section, each containing the definitions for those of interest for the experiments. The definition of each of these follows the same patterns as [Jetstream], and details on how to define your own inside of the TOML file can be found [here](https://experimenter.info/jetstream/configuration#defining-metrics).

The TOML file can also contain references to metrics, segments, data sources, and segment data sources that are already contained in [metric-hub]. To reference these pre-defined objects, an `import_from_metric_hub` list can be included in the TOML file. For instance, to import the `active_hours` metric for Firefox Desktop, the following is included in the TOML config file:
```
[metrics.import_from_metric_hub]
firefox_desktop = ["active_hours"]
```
A `parameters` section in the TOML file is used to define the data collection period for the analysis and the parameters used to calculate sample sizes. This section consists of two subsections: `parameters.sizing` and `parameters.dates`:
1. `parameters.sizing`: Contains two tags, `power` and `effect_size`. These tags should contain lists of values for each parameter, and a sample size will be calculated for all metrics provided in the TOML file for each combination of power and effect size in those lists.
2. `parameters.dates`: Contains the `start_date` (in "%Y-%m-%d" format, e.g. "2023-01-01"), `num_dates_enrollment`, and `analysis_length` values. For details on how those values are used to query historical data, see the [Mozanalysis documentation](https://experimenter.info/experiment-sizing).

## CLI commands

The sizing CLI is invoked using the command `auto_sizing run`. The following options are available at invocation:

| Option      | Description |
| ----------- | ----------- |
| `--project_id`, `--project-id` | BigQuery project to write metrics table to |
| `--dataset_id`, `--dataset-id` | BigQuery dataset to write metrics table to |
| `--bucket` | GCP bucket to write output JSON to. If not provided, JSON will be saved to the same directory as the config TOML |
| `--target_slug` | Name for the experiment. Used when naming metrics table and output file |
| `--local_config` | Path to the configuration TOML file |

## CLI output

Results for experiment sizing are saved in JSON format. If a GCP bucket is provided in the `--bucket` option at invocation, this JSON file is saved in a `sample_sizes` folder in that bucket. If no bucket is provided, the JSON results are saved to the same folder as the TOML configuration file. 

The results JSON will include an entry for each combination of power and effect size provided in the config file. Each of these has an entry for each metric, where the required population percent and sample size to achieve that power with that effect size is recorded. A final tag is included with a parameters dictionary, storing the power and effect size values.


[Jetstream]: jetstream/jetstream.md
[metric-hub]: https://github.com/mozilla/metric-hub
[mozanalysis]: https://github.com/mozilla/mozanalysis
[auto-sizing]: https://github.com/mozilla/auto-sizing