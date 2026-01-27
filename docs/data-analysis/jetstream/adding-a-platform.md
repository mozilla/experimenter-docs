---
id: adding-a-platform
sidebar_position: 10
title: Applications
slug: /data-analysis/jetstream/adding-a-platform
---

Jetstream runs analyses for experiments launched on several different applications, such as Fenix or Firefox Desktop. When adding a new application in Experimenter, the new application also needs to be configured in Jetstream to enable automated analyses for launched experiments.

---
## Add support for application in jetstream
- Inside [platform_config.toml](https://github.com/mozilla/jetstream/blob/main/platform_config.toml) add the configuration for the new application


An example of desktop configuration
```
[platform.firefox_desktop]
enrollments_query_type = "normandy"
app_id = "firefox-desktop"
```

---
### Configuration breakdown
- `[platform.platform_name]` - Specify application name
- `enrollments_query_type` - whether enrollments should be determined based on Glean events (`glean-event`) data or Normandy data (`normandy`) (default: `glean-event`)
- `app_id` - application ID as defined in [probe-scraper repository.yaml](https://github.com/mozilla/probe-scraper/blob/main/repositories.yaml)
