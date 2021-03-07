---
id: welcome
title: Welcome
slug: /
---

Welcome to the [Experimenter](https://github.com/mozilla/experimenter) documentation hub! The goal of this website is to serve as a central location for documenting and linking to documentation of all things Experimenter, Nimbus, Jetstream, and related SDKs.

You will find documentation pages linked in the sidebar, and all external links are denoted with an external icon.

This website is built using [Docusaurus](https://v2.docusaurus.io/).

## Important links

In addition to the links in the sidebar here are some important links to have on hand:

| Link            |                                       |                              |
| --------------- | ------------------------------------- | ---------------------------- |
| Legacy Home     | [Production][legacy_home_prod]        | [Staging][legacy_home_stage] |
| Nimbus Home     | [Production][nimbus_home_prod]        | [Staging][nimbus_home_stage] |
| Remote Settings | [Production][rs_prod]                 | [Staging][rs_stage]          |
| Storybook       | [Storybook Directory][storybook_prod] |                              |

[legacy_home_prod]: https://experimenter.services.mozilla.com/
[legacy_home_stage]: https://stage.experimenter.nonprod.dataops.mozgcp.net/
[nimbus_home_prod]: https://experimenter.services.mozilla.com/nimbus
[nimbus_home_stage]: https://stage.experimenter.nonprod.dataops.mozgcp.net/nimbus
[storybook_prod]: https://storage.googleapis.com/mozilla-storybooks-experimenter/index.html
[rs_prod]: https://settings-writer.prod.mozaws.net/v1/admin/
[rs_stage]: https://settings-writer.stage.mozaws.net/v1/admin/

## Contributing

This documentation is managed in the [mozilla/experimenter-docs](https://github.com/mozilla/experimenter-docs) repository. Content is written in Markdown files using [GitHub-flavored Markdown syntax](https://github.github.com/gfm/) and compiled into static pages. Refer to Docusaurus [Markdown features](https://v2.docusaurus.io/docs/markdown-features) for more technical information about these Markdown pages.

In order to protect the main deploy branch we are requiring all content changes (editing existing pages and creating new pages) to be reviewed and merged via Pull Request. **All changes merged into the `main` branch will automatically be deployed.**

### Creating new pages

[Click here](https://github.com/mozilla/experimenter-docs/new/main/docs) to start creating a new Markdown file in the repository. Once you've written your content you can can click "Commit Changes" to create a new branch and be presented with the option to open a Pull Request.

:::important

One caveat to adding new pages is that if you want them to show up in the sidebar they must be added to the [sidebars.js](https://github.com/mozilla/experimenter-docs/blob/main/sidebars.js) file. If you are adding a new file using the GitHub UI you must first make sure you have changed to the branch you just created with your new page commit. Then you can use the UI to add your new page to the sidebar and add that commit to the Pull Request.

:::

### Editing pages

You can edit any page in these docs by clicking the "**Edit this page**" link near the bottom. This will take you to the GitHub markdown file for the page, where you can make changes to the content. Once you've finished updating the content you can can click "Commit Changes" to create a new branch and be presented with the option to open a Pull Request.
