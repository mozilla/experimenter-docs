module.exports = {
  sidebar: [
    {
      type: "category",
      label: "Welcome",
      items: [
        "welcome",
        "contributing",
        {
          type: "link",
          label: "Design Process",
          href: "https://mana.mozilla.org/wiki/x/XdTNBw",
        },
        {
          type: "link",
          label: "Nimbus Onboarding",
          href:
            "https://mana.mozilla.org/wiki/display/FJT/Nimbus+Onboarding#NimbusOnboarding-Branches",
        },
      ],
    },
    {
      type: "category",
      label: "Experiment Owners",
      items: [
        {
          type: "link",
          label: "Experimentation with Nimbus",
          href:
            "https://docs.google.com/document/d/155EUgzn22VTX8mFwesSROT3Z6JORSfb5VyoMoLra7ws",
        },
        {
          type: "link",
          label: "Monitoring and Analyzing your Experiment",
          href:
            "https://docs.google.com/document/d/155EUgzn22VTX8mFwesSROT3Z6JORSfb5VyoMoLra7ws/edit#heading=h.75kfit458h84",
        },
        "console/custom-audiences",
        "console/preview"
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
      label: "Data Scientists",
      items: ["data-scientists-root"],
    },

    {
      type: "category",
      label: "Fenix Engineers",
      items: [
        "fenix-experiments-getting-started",
        {
          type: "link",
          label: "Android API (proposal)",
          href:
            "https://docs.google.com/document/d/1kchihPal0__A4VOAiPJarNuZXns5KhOHHfIeIzT6zfU/edit#",
        },
        {
          type: "link",
          label: "Feature Variables API",
          href: "feature-variables-and-me",
        },
      ],
    },
    {
      type: "category",
      label: "Firefox for iOS Engineers",
      items: [
        {
          type: "link",
          label: "Feature Variables API",
          href: "feature-variables-and-me",
        },
      ],
    },
    {
      type: "category",
      label: "Fenix Testing",
      items: [
        "android-frontend-testing",
      ],
    },
    {
      type: "category",
      label: "iOS Testing",
      items: [
        "ios-preview-testing"
      ]
    },
    {
      type: "category",
      label: "Desktop Engineers",
      items: [
        "desktop-feature-api",
        "platform-feature-api",
        "desktop-migration-guide",
        "desktop-rollouts",
        "desktop-frontend-testing",
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
