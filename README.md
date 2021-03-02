## Experimenter Docs

This repo is the documentation hub for [Experimenter](https://github.com/mozilla/experimenter).

## Working on the docs

Pages are written in Markdown, and can be found under [`/docs`](/docs).

### Using GitHub

You do not necessarily need to clone or set up this repo locally if you just want to contribute to or change documentation.

If you wish to modify an existing page, navigate to its Markdown file and click the "Edit" pencil icon in the top-right of the content. You will be presented with a Markdown editor. Make and commit your changes.

If you wish to add a new page, navigate to the directory where you wish to generate the new page and click the "Add File" button in the top right of the GitHub UI. From there you can create the page, add content, and commit it.

### Working locally

The site is built using [Docusaurus v2](https://v2.docusaurus.io/) and is automatically deployed from the `main` branch to GitHub Pages using GitHub Actions. To build and run it locally you can:

```
yarn install
yarn start
```

That should open a new browser window automatically, or you can manually browse to http://localhost:3000/ecosystem-platform/ to view the docs.
