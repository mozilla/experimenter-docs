module.exports = {
  sidebar: [
    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/intro",
        "getting-started/contributing"
      ],
    },
    {
      type: "category",
      label: "Experiment Owners",
      items: [
        "experiment-owners/access",
        "experiment-owners/custom-audiences",
        "experiment-owners/preview"
      ],
    },

    {
      type: "category",
      label: "Data Scientists",
      items: [
        "data-scientists/data-scientists-root",
        "data-scientists/telemetry"
      ],
    },

    {
      type: "category",
      label: "Firefox for Android",
      items: [
        "fenix-experiments-getting-started",
        {
          type: "link",
          label: "Feature Variables API",
          href: "feature-variables-and-me",
        },
        "android-frontend-testing",
        {
          type: "link",
          label: "Adding custom targeting attributes",
          href: "android-custom-targeting"
        }
      ],
    },
    {
      type: "category",
      label: "Firefox for iOS",
      items: [
        {
          type: "link",
          label: "Feature Variables API",
          href: "feature-variables-and-me",
        },
        {
          type: "link",
          label: "Adding custom targeting attributes",
          href: "ios-custom-targeting"
        },
        "ios-preview-testing"
      ],
    },
    {
      type: "category",
      label: "Firefox for Desktop",
      items: [
        "desktop-feature-api",
        "desktop-migration-guide",
        "desktop-rollouts",
        "desktop-feature-api-testing",
      ],
    },
    {
      type: "category",
      label: "Jetstream",
      items: [
        "jetstream/jetstream",
        "jetstream/metrics",
        "jetstream/statistics",
        "jetstream/outcomes",
        "jetstream/configuration",
        "jetstream/data-products",
        "jetstream/operations",
        "jetstream/troubleshooting",
        {
          type: "link",
          label: "GitHub Repo",
          href: "https://github.com/mozilla/jetstream",
        },
      ],
    },
    {
      type: "category",
      label: "Core Nimbus Team",
      items: [
        "android-feature-api",
        "client-sdk-states-and-lifecycle",
        {
          type: "link",
          label: "Experimenter GH Repo",
          href: "https://github.com/mozilla/experimenter",
        },
        {
          type: "link",
          label: "How to Launch a Nimbus Experiment",
          href:
            "https://mana.mozilla.org/wiki/display/FJT/How+to+Launch+a+Nimbus+Experiment",
        },
        {
          type: "link",
          label: "Nimbus Data Transfer Object",
          href:
            "https://mana.mozilla.org/wiki/pages/viewpage.action?pageId=130920248",
        },
        {
          type: "link",
          label: "Experiment Telemetry",
          href:
            "https://mana.mozilla.org/wiki/display/FJT/Nimbus+Engineering#NimbusEngineering-ExperimentTelemetry",
        },
        {
          type: "link",
          label: "Lessons Learned",
          href:
            "https://mana.mozilla.org/wiki/display/FJT/Lessons+Learned+-+Experiment+Incidents+and+Close+Calls",
        },
      ],
    },
  ],
};
