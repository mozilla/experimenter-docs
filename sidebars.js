module.exports = {
  sidebar: [
    {
      type: "category",
      label: "Getting Started",
      items: ["getting-started/intro", "getting-started/contributing"],
    },
    {
      type: "category",
      label: "Experiment Owners",
      items: [
        "experiment-owners/access",
        "experiment-owners/custom-audiences",
        "experiment-owners/preview",
      ],
    },
    {
      type: "category",
      label: "The Nimbus Cookbook",
      items: [
        {
          type: "link",
          label: "Feature Manifest Language Specification",
          href: "/fml-spec",
        },
        "cookbook/fml/index",
      ],
    },
    {
      type: "category",
      label: "Data Scientists",
      items: [
        "data-scientists/data-scientists-root",
        "data-scientists/telemetry",
        "data-scientists/bucketing",
        "data-scientists/validating-experiments",
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
          href: "/feature-variables-and-me",
        },
        "android-frontend-testing",
        {
          type: "link",
          label: "Adding custom targeting attributes",
          href: "/android-custom-targeting",
        },
        {
          type: "link",
          label: "Feature Manifest Language Specification",
          href: "/fml-spec",
        },
      ],
    },
    {
      type: "category",
      label: "Firefox for iOS",
      items: [
        {
          type: "link",
          label: "Feature Variables API",
          href: "/feature-variables-and-me",
        },
        {
          type: "link",
          label: "Adding custom targeting attributes",
          href: "/ios-custom-targeting",
        },
        "ios-preview-testing",
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
        "desktop-targeting-debug",
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
        "client-sdk-states-and-lifecycle",
        "integration-tests",
        {
          type: "link",
          label: "Experimenter GH Repo",
          href: "https://github.com/mozilla/experimenter",
        },
        {
          type: "link",
          label: "How to Launch a Nimbus Experiment",
          href: "https://mana.mozilla.org/wiki/display/FJT/How+to+Launch+a+Nimbus+Experiment",
        },
        {
          type: "link",
          label: "Nimbus Data Transfer Object",
          href: "https://mana.mozilla.org/wiki/pages/viewpage.action?pageId=130920248",
        },
        {
          type: "link",
          label: "Experiment Telemetry",
          href: "https://mana.mozilla.org/wiki/display/FJT/Nimbus+Engineering#NimbusEngineering-ExperimentTelemetry",
        },
        {
          type: "link",
          label: "Lessons Learned",
          href: "https://mana.mozilla.org/wiki/display/FJT/Lessons+Learned+-+Experiment+Incidents+and+Close+Calls",
        },
      ],
    },
    {
      type: "category",
      label: "Messaging System",
      items: [
        "messaging/messaging-surfaces",
        "messaging/display-logic",
        {
          type: "link",
          label: "Triggers & User Actions",
          href: "https://firefox-source-docs.mozilla.org/toolkit/components/messaging-system/docs/",
        },
        "messaging/frequency-cap",
        {
          type: "link",
          label: "Available Targeting",
          href: "https://firefox-source-docs.mozilla.org/browser/components/newtab/content-src/asrouter/docs/targeting-attributes.html",
        },
        "messaging/mobile-messaging"
      ],
    },
  ],
};
