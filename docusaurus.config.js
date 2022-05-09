module.exports = {
      title: "Experimenter Docs",
  tagline: "Documentation souce for Data scientists, Product Managers and Engineers",
  url: "https://experimenter.info",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "mozilla",
  projectName: "experimenter-docs",
  themeConfig: {
    prism: {
      additionalLanguages: ["kotlin", "swift", "rust", "toml"]
    },
    hideableSidebar: true,
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Mozilla Experimentation and Feature Delivery",
      logo: {
        alt: "Experimenter Logo",
        src: "img/logo.svg",
        srcDark: "img/logo-dark.svg",
      },
      items: [
        {
          href: "https://experimenter.services.mozilla.com/nimbus/",
          label: "Nimbus",
          position: "right",
        },
        {
          href: "https://mana.mozilla.org/wiki/display/FJT/Project+Nimbus",
          label: "Mana",
          position: "right",
        },
        {
          href: "https://github.com/mozilla/experimenter-docs",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Mozilla Corporation`,
    },
    algolia: {
      apiKey: "cce683dfea9772207408c2b161a22641",
      indexName: "experimenter",
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/mozilla/experimenter-docs/edit/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
