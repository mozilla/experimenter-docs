module.exports = {
  sidebar: [
    {
      type: "category",
      label: "Welcome",
      items: ["welcome", "contributing"],
    },
    {
      type: "category",
      label: "How to Run Experiments",
      items: [
        "process-getting-started",
        {
          type: "link",
          label: "Design Process",
          href:
            "https://mana.mozilla.org/wiki/x/XdTNBw",
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
      items: ["experiment-owners-root"],
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
      ],
    },
    {
      type: "category",
      label: "Desktop Engineers",
      items: [
        "desktop-engineers-root",
        "desktop-feature-api",
        "desktop-migration-guide",
        "desktop-frontend-testing",
      ],
    },
    {
      type: "category",
      label: "Core Nimbus Team",
      items: [
        "experimenter-engineers-root",
        {
          type: "link",
          label: "GitHub Repo",
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
