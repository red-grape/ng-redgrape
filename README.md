# ng-redgrape

ng-redgrape is an Angular workspace containing an application and a component library maintained by the red-grape organization.

This repository is written primarily in TypeScript with HTML and SCSS for templates and styles. It also includes a small number of Batchfile scripts for Windows automation.

---

## Contents

- projects/ng-redgrape-core — core library code (buildable Angular library)
- projects/ng-redgrape-ui — UI component library styled with Bootstrap
- src/ — application source (NgRedgrapeApp)

Refer to the individual README files in each project folder for project-specific instructions.

---

## Features

- Angular (v19+) workspace with an application and libraries
- Reusable UI components (Bootstrap-styled) in projects/ng-redgrape-ui
- Core functionality exposed as a buildable library in projects/ng-redgrape-core

---

## Prerequisites

- Node.js (LTS) — >=16
- npm (or yarn)
- Angular CLI (optional, for local development):

```bash
npm install -g @angular/cli
```

---

## Installation

Install dependencies from the repository root:

```bash
npm install
# or
# yarn install
```

---

## Development (run the app)

From the repository root, run the dev server for the application:

```bash
ng serve
# or
npm start
```

Open http://localhost:4200 in your browser. The app will reload automatically when sources change.

---

## Build

Build the application:

```bash
ng build
# or
npm run build
```

Build the libraries:

```bash
# build core library
ng build ng-redgrape-core
# build ui library
ng build ng-redgrape-ui
```

Built artifacts will be placed in `dist/`.

---

## Tests

Run unit tests:

```bash
ng test
# or
npm test
```

Run end-to-end tests (if configured):

```bash
ng e2e
```

---

## Using the UI library

The `projects/ng-redgrape-ui` library provides Bootstrap-styled components. To use them in a consuming app:

1. Build the library: `ng build ng-redgrape-ui`
2. Install Bootstrap and icons in the consuming project (example):

```bash
npm install bootstrap bootstrap-icons
```

3. Add the required CSS and JS to `angular.json` or import them in your styles:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/bootstrap-icons/font/bootstrap-icons.css",
  "src/styles.scss"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

4. Import the library module(s) into your Angular app module.

Refer to `projects/ng-redgrape-ui/README.md` for additional details.

---

## Publishing libraries

After building a library (e.g., `ng build ng-redgrape-core`), publish from the `dist/<library-name>` folder:

```bash
cd dist/ng-redgrape-core
npm publish
```

Adjust registry or access settings if publishing to a private registry.

---

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a branch: `git checkout -b feat/your-feature`
3. Implement changes and add tests
4. Run `npm test` and `ng lint` (if configured)
5. Open a pull request with a clear description of changes

Please follow existing code style and add/update tests for significant changes.

---

## Repository language composition

This repository contains the following primary languages:

- TypeScript (~53%)
- HTML (~21.6%)
- SCSS (~20.4%)
- Batchfile (~5%)

---

## License

This repository is configured to use the Apache License 2.0. If a `LICENSE` file is not present, add one with the Apache-2.0 text.

---

## Notes

- This README is a high-level overview. For project-specific instructions, see the README files under `projects/` and the Angular workspace configuration (angular.json, package.json scripts).
