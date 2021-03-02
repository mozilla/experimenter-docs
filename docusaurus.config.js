module.exports = {
  title: "Experimenter Docs",
  tagline: "Documentation hub for Experimenter/Nimbus",
  url: "https://github.com/mozilla/experimenter-docs",
  baseUrl: "/experimenter-docs/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "mozilla",
  projectName: "experimenter-docs",
  themeConfig: {
    navbar: {
      title: "Experimenter Docs",
      logo: {
        alt: "Experimenter Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        {
          href: "https://github.com/mozilla/experimenter-docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Mozilla Corporation`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/mozilla/experimenter-docs/edit/main/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
