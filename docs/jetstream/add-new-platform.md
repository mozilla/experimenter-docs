# Adding a Platform

Jetstream runs analyses for experiments launched on several different platforms, such as Fenix or Firefox Desktop. When adding a new platform in Experimenter, the new platform also needs to be configured in mozanalysis and Jetstream to enable automated analyses for launched experiments.

---
## Adding support in mozanalysis
https://github.com/mozilla/mozanalysis/

- Default metrics and datasources need to be added to mozanalysis. These default metric and data source definitions will be available for custom experiment configurations:
    - Add new metric(s) in `mozanalysis` (if needed). For more detailed guide follow [how do I add a metric to my experiment](https://experimenter.info/jetstream/metrics#how-do-i-add-a-metric-to-my-experiment), and [defining metric](https://experimenter.info/jetstream/configuration#metrics-section)

<br />

- Optionally, segment definitions can also be added in mozanalysis:
    - Add new segment(s) in `mozanalysis` (if needed). For more detailed guide follow [defining segment](https://experimenter.info/jetstream/configuration#defining-segments)

<br />

- After adding support to mozanalysis and merging your changed into the [main branch](https://github.com/mozilla/mozanalysis/tree/main) new package needs to be published to [PyPi](https://pypi.org/project/mozanalysis/)
- Make sure `main` branch is your current branch and create a new git tag using:

```bash
git tag YYYY.M.MINOR
```

- Push the tag to remote using:

```bash
git push origin --tags
```

- This will trigger CI pipeline which will release the new version of `mozanalysis` package to [PyPi](https://pypi.org/project/mozanalysis/)

*More information about the deployment and tag format can be found [here](https://github.com/mozilla/mozanalysis#deploying-a-new-release)*

---
## Update mozanalysis in jetstream
https://github.com/mozilla/jetstream

- Make sure your `main` branch is up-to-date with remote
- Checkout into a new branch `git checkout -b mozanalysis/upgrade-<new_version>`

- Go to [requirements.in](https://github.com/mozilla/jetstream/blob/main/requirements.in#L130) in jetstream project and update mozanalysis package to the new version created in the prior step (git tag)

```
mozanalysis==[new_version]
```

- Update [requirements.txt](https://github.com/mozilla/jetstream/blob/main/requirements.txt) in jetstream project by running the following command:

```bash
pip-compile --generate-hashes --output-file=requirements.txt requirements.in
```

- Commit changes to both `requirements.in` and `requirements.txt` files
- Push your branch to remote
- Create a pull request to merge your branch into the main branch and wait for a review before merging

---
## Add support for platform in jetstream
- Inside [platform_config.toml](https://github.com/mozilla/jetstream/blob/main/platform_config.toml) add configuration for the new platform


An example of desktop configuration
```
[platform.firefox_desktop]
metrics_module = "desktop"
segments_module = "desktop"
enrollments_query_type = "normandy"
app_id = "firefox-desktop"
```

---
### Configuration breakdown
- `[platform.platform_name]` - Specify platform name
- `metrics_module` - mozanalysis metrics module that this platform should use (default: `<platform_name>`)
- `segments_module` - mozanalysis segments module that this platform should use (default: `None`)
- `enrollments_query_type` - whether enrollments should be determined based on Glean events (`glean-event`) data or Normandy data (`normandy`) (default: `glean-event`)
- `app_id` - application ID as defined in [probe-scraper repository.yaml](https://github.com/mozilla/probe-scraper/blob/main/repositories.yaml)
