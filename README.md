# ucd-lib-elements

Create Polymer v3 widget bundles for the website.  Under current development practices, each Polymer widget (group of elements) is created as a standalone component in a folder (example [search widget](./widgets/search)).  If you were to just add each widget, individually bundled, to the website there would be problems.  First, bundles would contain duplicate libraries and code (bad for size).  Second, duplicate custom elements (dom-module, iron-pages, etc) would throw errors when they are registered more than once (as each bundle attempts to register w/o knowledge of the other).

To solve this we are using [Webpack](https://webpack.js.org/) to compile all bundles at once and leveraging code splitting to generate bundles for defined entry points as well as a common vender bundle for all shared code.  Finally, the `dist` build will generate a *.ie-bundle.js which is passed through [Babel](https://babeljs.io/) as well to generate ES5 code allows for IE11 compatibility.

# Init Repo

To use this repo you need to install the NPM (build) dependencies as well as the Yarn (client) dependencies.

```bash
npm install
cd widgets
yarn install
```

# Adding a New Widget

 - To add a new widget create a new folder in ./widgets 
 - Add all widget (yarn or npm) modules to the root ./widgets
 - Edit [webpack-widgets.js](./webpack-widgets.js) and add a pointer to the widgets entry point

# Overview (watch) build

You can generate a quick build by running `npm run watch`.  This will generate *.bundle.js scripts in the [preview/lib](./preview/lib) folder. Edit the [index.html](./preview/index.html) script and add your bundle name to the `elementBundles` list (or you can create a new html file as well in /preview) and add a section element with the name of your root element.  Now serve the preview directory ([http-server](https://www.npmjs.com/package/http-server) is a convient tool).  You should see all website widgets in webcomponent compatible browsers (currently Chrome/Safari).

If you want to quickly test IE, there is a hard coded flag in webpack-watch.config.js to include the IE build in the watch script.  Note, this will slow down build times.

# Dist Build

Important! update the version number in [/lib/element-bundle-loader.js](./lib/element-bundle-loader.js).  This will ensure that when elements are deployed to the website, the cache is blown away.

To generate a dist build, run `npm run dist` after editing the element-bundler-loader script.  This will generate *.bundle.js and *.ie-bundle.js scripts.  Both will be minified.  Serve the dist directory with [http-server](https://www.npmjs.com/package/http-server). You should see all website widgets in all browsers (including Firefox, Edge and IE11).

Finally, copy over the [/dist/lib](./dist/lib) folder to the websites wp-content/themes/ucd-lib/html/dist folder (you can wipe and replace).  Now test on the website.

# Using elements with the library website.

First, define the bundles you want to use in the page and add the element loader in the twig file.  The element loader will first pull in the WebComponent polyfills if required, then it will pull in required bundles.

```twig
<script>var elementBundles = ['search', 'hours-week'];</script>
{% include 'includes/element-loader.twig' %}
```

Now simply add the element to the page.

```html
<ucd-library-search section="databases" style="margin: auto"></ucd-library-search>
```