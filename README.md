# 🌩 Documentation Hub for Nimbus & Experimenter Users

Check out the docs at: **https://experimenter.info/**

**Please file issues for this repository in [Experimenter](https://github.com/mozilla/experimenter/issues) and add the `experimenter-docs` label.**

## About

This repository is the documentation hub for [Experimenter](https://github.com/mozilla/experimenter). Its purpose is to be a single source of truth for and house user, developer, and data documentation.

The site is built using [Docusaurus v2](https://v2.docusaurus.io/) and is automatically deployed from the `main` branch to GitHub Pages using GitHub Actions.

Relevant ADRs:

- [Use Docusaurus + GH Pages for the Nimbus User Doc Hub](https://github.com/mozilla/experimenter/blob/main/app/experimenter/docs/adrs/0005-doc-hub.md)
- [Location for the new Experiment "Docs Hub" codebase + docs](https://github.com/mozilla/experimenter/blob/main/app/experimenter/docs/adrs/0006-doc-hub-repo.md)

## Contributing

Pages are written in Markdown and can be found under [`docs/`](/docs).

Check out [the Contributing page](https://experimenter.info/contributing) for helpful Docusaurus and GitHub UI tips to learn how to create a new document, edit an existing one, and/or how to adjust the sidebar. You don't have to check out the repository locally to contribute.

### Working locally

To build and run this project locally, clone the repository and run:

```
npm i -g corepack #Install Corepack to get yarn (not necessary on nodejs >=16)
sudo corepack enable #Enable Corepack
yarn
yarn start
```

That should open a new browser window automatically, or you can manually browse to http://localhost:3000/experimenter-docs/ to view the docs.
