# website-element-bundler

Create Polymer v3 js bundles for the website.  Under current development practices, each Polymer widget (group of elements) is created as a standalone component in a repository (example [search widget](https://github.com/UCDavisLibrary/ucd-library-search)).  If you were to just add each widget, individually bundled, to the website there would be problems.  First, bundles would contain duplicate libraries and code (bad for size).  Second, duplicate custom elements (dom-module, iron-pages, etc) would throw errors when they are registered more than once (as each bundle attempts to register w/o knowledge of the other).

To solve this we are using [Webpack](https://webpack.js.org/) to compile all bundles at once and leveraging code splitting to generate bundles for defined entry points as well as a common vender bundle for all shared code.  Finally, the `dist` build will generate a *.ie-bundle.js which is passed through [Babel](https://babeljs.io/) as well to generate ES5 code that when combined with the custom-elements-es5-adapter.js allows for IE11 compatibility.

# Init Repo

To use this repo you need to install the NPM (build) dependencies as well as the Yarn (client) dependencies.

```bash
npm install
cd elements
yarn install
```

# Adding a New Widget

To add a new widget to a build, first use [yarn](https://yarnpkg.com/en/) to install the package from GitHub or NPM in the [elements](./elements) folder

ex:

```bash
cd elements
yarn add UCDavisLibrary/ucd-library-search
```

Next, you need to register the entry point with Webpack.  Edit the [entries.json](./entries.json) file adding to the hash a bundle name (key) and package entries point (value).  See file for example.

# Overview (watch) build

You can generate a quick build by running `npm run watch`.  This will generate *.bundle.js scripts in the [preview](./preview) folder. Edit the [index.html](./preview/index.html) script and add your bundle name to the `elementBundles` list.  and add a section element with the name of your root element.  Now serve the preview directory ([http-server](https://www.npmjs.com/package/http-server) is a convient tool).  You should see all website widgets in webcomponent compatible browsers (currently Chrome/Safari).

# Dist Build

To generate a dist build, run `npm run dist`.  This will generate *.bundle.js and *.ie-bundle.js scripts.  Both will be minified.  Again edit the dist [index.html](./dist/index.html) script and add your bundle name to the `elementBundles` list and add a section element with the name of your root element.  Now serve the dist directory with [http-server](https://www.npmjs.com/package/http-server). You should see all website widgets in all browsers (including Firefox, Edge and IE11).



