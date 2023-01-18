module.exports = {
  sidebar: [
    {
      type: "category",
      label: "Welcome",
      items: [
        "homepage/intro",
        "homepage/finding-help",
        "homepage/capabilities"
      ]
    },
    {
      "What's Newsletter": [
        {
          "type": "category",
          "label": "2022",
          "items": [
            {
              type: 'autogenerated',
              dirName: "whats-news/2022",
            }
          ]
        },
        {
          "type": "category",
          "label": "2021",
          "items": [
            {
              type: 'autogenerated',
              dirName: "whats-news/2021",
            }
          ]
        }
      ]
    },
    {
      "Getting Started":
        [
          "getting-started/access",
          {
            type: "category",
            label: "Data Scientists",
            items: [
              "data-scientists/data-scientists-root",
              "data-scientists/telemetry",
              "data-scientists/validating-experiments",
              "data-scientists/experiment-sizing",
              "data-scientists/auto-sizing-cli"
            ],
          },
          {
            type: "category",
            label: "Engineers",
            items: [
              "getting-started/for-engineers",
              "getting-started/desktop-migration-guide",
              "getting-started/desktop-feature-api",
              "deep-dives/mobile/mobile-feature-api"
            ],
          },
          "getting-started/for-product",
          "getting-started/for-leadership"
        ]
    },
    {
      "Experimentation Workflow": [
        "workflow/overview",
        {
          "type": "category",
          "label": "Designing",
          "items": [
            "workflow/localization-process",
            "workflow/rollouts-faq",
          ]
        },
        {
          "type": "category",
          "label": "Implementing",
          "items": [
            "workflow/experiment-owners",
            "workflow/feature-definition",
            "workflow/a-b-experiments",
            "workflow/custom-audiences",
            "workflow/android-custom-targeting",
            "workflow/ios-custom-targeting",
            {
              "type": "category",
              "label": "Messaging Experiments",
              items: [
                "messaging/messaging-surfaces",
                "messaging/display-logic",
                "messaging/telemetry",
                "messaging/groups-and-campaigns",
                "messaging/experiments-and-user-messaging",
                "messaging/how-a-message-gets-shown",
                "messaging/remote-localization",
                "messaging/limitations",
                {
                  type: "link",
                  label: "Triggers & User Actions",
                  href: "https://firefox-source-docs.mozilla.org/toolkit/components/messaging-system/docs/#triggers-and-actions",
                },
                "messaging/frequency-cap",
                {
                  type: "link",
                  label: "Available Targeting",
                  href: "https://firefox-source-docs.mozilla.org/browser/components/newtab/content-src/asrouter/docs/targeting-attributes.html",
                },
                "messaging/mobile-messaging"
              ]
            },
          ],
        },
        "workflow/configuring",
        {
          "type": "category",
          "label": "Testing",
          "items": [
            "workflow/testing",
            "workflow/preview",
            "workflow/ios-preview-testing",
            "workflow/android-frontend-testing",
            "workflow/desktop-feature-api-testing"
          ]
        },
        "workflow/launching",
        "workflow/monitoring",
        "workflow/ending",
        "workflow/analyzing"
      ]
    },
    {
      "Deep Dives": [
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
          "type": "category",
          "label": "Data topics",
          "items": [
            {
              type: 'autogenerated',
              dirName: "deep-dives/data", // Source folder to generate the sidebar slice from (relative to docs)
            }
          ]
        },
        {
          "type": "category",
          "label": "Desktop topics",
          "items": [
            {
              type: 'autogenerated',
              dirName: "deep-dives/desktop", // Source folder to generate the sidebar slice from (relative to docs)
            }
          ]
        },
        {
          "type": "category",
          "label": "Mobile topics",
          "items": [
            {
              type: 'autogenerated',
              dirName: "deep-dives/mobile", // Source folder to generate the sidebar slice from (relative to docs)
            }
          ]
        },
        {
          "type": "category",
          "label": "Experimenter topics",
          "items": [
            {
              type: 'autogenerated',
              dirName: "deep-dives/experimenter", // Source folder to generate the sidebar slice from (relative to docs)
            }
          ]
        },
        {
          "type": "category",
          "label": "Specifications",
          "items": [
            {
              type: 'autogenerated',
              dirName: "deep-dives/specifications", // Source folder to generate the sidebar slice from (relative to docs)
            }
          ]
        }
      ]
    },
    {
      type: "category",
      label: "Experimentation Cookbook",
      items: [
        "cookbook/fml/index",
      ],
    },
    {
      type: "category",
      label: "Additional Links",
      items: [
        "integration-tests",
        "local-enrollment",
        {
          type: "link",
          label: "Experimenter GH Repo",
          href: "https://github.com/mozilla/experimenter",
        },
        {
          type: "link",
          label: "How to Launch a Nimbus Experiment",
          href: "https://mozilla-hub.atlassian.net/wiki/spaces/FJT/pages/11469776/Nimbus+Onboarding#NimbusOnboarding-LaunchingExperimentsusingNimbus!",
        },
        {
          type: "link",
          label: "Nimbus Data Transfer Object",
          href: "https://mozilla-hub.atlassian.net/wiki/spaces/FJT/pages/11469537/The+Nimbus+Data+Transfer+Object+DTO",
        },
        {
          type: "link",
          label: "Experiment Telemetry",
          href: "https://mozilla-hub.atlassian.net/wiki/spaces/FJT/pages/11469458/Nimbus+Engineering#NimbusEngineering-ExperimentTelemetry",
        },
        {
          type: "link",
          label: "Lessons Learned",
          href: "https://mozilla-hub.atlassian.net/wiki/spaces/FJT/pages/11470136/Lessons+Learned+-+Experiment+Incidents+and+Close+Calls",
        },
      ],
    },
    {
      type: "category",
      label: "Frequently Asked Questions",
      items: [
        {
          type: 'autogenerated',
          dirName: "faq", // Source folder to generate the sidebar slice from (relative to docs)
        }
      ],
    },
  ]
};
