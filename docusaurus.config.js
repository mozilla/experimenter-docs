const math = require('remark-math');
const katex = require('rehype-katex');

module.exports = {
    title: "Mozilla Nimbus Documentation",
    tagline: "Documentation souce for Data scientists, Product Managers and Engineers",
    url: "https://experimenter.info",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "mozilla",
    projectName: "experimenter-docs",
    plugins: [
        ["@cmfcmf/docusaurus-search-local",
        {
            indexDocs: true,
            language: "en",
            indexDocSidebarParentCategories: 3,
        },],
    ],
    themeConfig: {
        prism: {
            additionalLanguages: ["kotlin", "swift", "rust", "toml", "sql"]
        },
        docs: {
            sidebar: {
                hideable: true
            }
        },
        colorMode: {
            defaultMode: "light",
            disableSwitch: true,
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: "Mozilla Nimbus Documentation",
            logo: {
                alt: "Nimbus Logo",
                src: "img/nimbus.png",
            },
            items: [
                {
                    href: "https://experimenter.services.mozilla.com/nimbus/",
                    label: "Nimbus",
                    position: "right",
                },
                {
                    href: "https://mozilla-hub.atlassian.net/wiki/spaces/PXI/pages/426934273/Nimbus",
                    label: "Confluence",
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
    },
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    routeBasePath: "/",
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl: "https://github.com/mozilla/experimenter-docs/edit/main/",
                    remarkPlugins: [math],
                    rehypePlugins: [katex],
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            },
        ],
        
    ],
    stylesheets: [
        {
          href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
          type: 'text/css',
          integrity:
            'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
          crossorigin: 'anonymous',
        },
      ],
    markdown: {
        mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],
};
