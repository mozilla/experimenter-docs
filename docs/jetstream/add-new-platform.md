# Adding a Platform

Jetstream runs analyses for experiments launched on several different platforms, such as Fenix or Firefox Desktop. When adding a new platform in Experimenter, the new platform also needs to be configured in Jetstream to enable automated analyses for launched experiments.

---
## Add support for platform in jetstream
- Inside [platform_config.toml](https://github.com/mozilla/jetstream/blob/main/platform_config.toml) add the configuration for the new platform


An example of desktop configuration
```
[platform.firefox_desktop]
enrollments_query_type = "normandy"
app_id = "firefox-desktop"
```

---
### Configuration breakdown
- `[platform.platform_name]` - Specify platform name
- `enrollments_query_type` - whether enrollments should be determined based on Glean events (`glean-event`) data or Normandy data (`normandy`) (default: `glean-event`)
- `app_id` - application ID as defined in [probe-scraper repository.yaml](https://github.com/mozilla/probe-scraper/blob/main/repositories.yaml)
