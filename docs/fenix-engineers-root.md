---
id: fenix-engineers-root
title: Implementing an experiment
slug: /fenix-engineers
---

## Client configuration prechecks
✅  Get a copy of the experiment brief for your experiment from the [Experiments Repository](https://mana.mozilla.org/wiki/x/FaXNBw) mana page.

✅  Assure that your experiment brief contains values for:
  - experiment name
  - featureID
  - branch names (for a basic a/b experiment, prefer *control* and *treatment*)

✅  Confirm the **featureID** is added to the experimenter list of console values.  
> NOTE: featureID setup access is controlled via experimenter Django admin.
> - **staging**, ask for help in the #nimbus-rust-sdk slack channel
> - **production**, ask for help in the #experimenter slack channel

## Fenix setup

1. Update [experiments.kt](https://github.com/mozilla-mobile/fenix/blob/master/app/src/main/java/org/mozilla/fenix/experiments/Experiments.kt) **Experiment** to include the featureID string as your experiment constant.
2. Confirm [experiments.kt](https://github.com/mozilla-mobile/fenix/blob/master/app/src/main/java/org/mozilla/fenix/experiments/Experiments.kt) **ExperimentBranch** contains the branch names you intend to use or add them if you are using something other than the *control* and *treatment* default values.
3. Initialize your experiment in the appropriate location and call **getExperimentBranch** to get your experiment.

### Example

This is an example of the configuration of a Fenix **Bookmarks A/B** experiment on the “**Bookmarks Icon**” (bookmark-icon) featureID using the **treatment** and **control** branches.

**Experiments.kt**

```
class Experiments {
    companion object {
        const val BOOKMARK_ICON = "bookmark-icon"
    }
}

class ExperimentBranch {
    companion object {
        const val TREATMENT = "treatment"
        const val CONTROL = "control"
    }
}
```

**HomeMenu.kt**

```
val experiments = context.components.analytics.experiments
        val bookmarksIcon = experiments.getExperimentBranch(Experiments.BOOKMARK_ICON)
            .let {
                when (it) {
                    ExperimentBranch.TREATMENT -> R.drawable.ic_bookmark_list
                    else -> R.drawable.ic_bookmark_filled
                }
            }
```

## Local Testing
1. Setup your local Fenix build to [point to the experimenter
 [staging url](https://github.com/mozilla-mobile/fenix#using-nimbus-servers-during-local-development).
1. Build Fenix with the updated remote-settings configuration.
1. Configure your experiment in the [experimenter nimbus staging site](https://stage.experimenter.nonprod.dataops.mozgcp.net/nimbus/).
1. Run Fenix and check you are able to see your expected behavior.
