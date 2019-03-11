# slush-js

A Slush scaffolder that generates JS projects for you (clientside, serverside, both clientside and serverside, or standalone lib).

The generated project has live reloading on code changes (for both clientside and serverside, as applicable).  The live reloading has been tweaked to be very fast to maximise productivity.

The stack is chosen to use as standard, vanilla technologies as possible.  You write all your JS as normal JS (with ES6+ support).  You write all your CSS as normal CSS (with CSS4 support).  You also get all the conveniences of a modern stack with the productivity of a build system.

The stack uses npm scripts to drive the build targets using the CLI of several packages.


## Stack

- [npm script](https://docs.npmjs.com/misc/scripts) for build tasks
- [ESLint](http://eslint.org/) for linting JS
- [Stylelint](http://stylelint.io/) for linting CSS
- [Mocha](https://mochajs.org/) & [Chai](http://chaijs.com/) for testing
- Client (or standalone lib)
  - JS
    - [Webpack](https://webpack.js.org/) for bundling with [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) `require()` support and ES `import` support
    - [Babel](https://babeljs.io/) for transpiling and polyfilling ES6+
    - [Livereload](https://www.npmjs.com/package/livereload) for live reloading the UI when the code is changed on a `watch`
    - [UglifyJS](http://lisperator.net/uglifyjs/) to compress built JS
    - [React](https://facebook.github.io/react/) (optional)
  - CSS
    - [PostCSS](http://postcss.org/) to add features to CSS
    - [`postcss-import`](https://www.npmjs.com/package/postcss-import) to allow `@import`s to be bundled
    - [`postcss-url`](https://www.npmjs.com/package/postcss-url) to allow files referenced by `url()` (images, fonts, etc.)  to be bundled in CSS for performance
    - [`postcss-cssnext`](http://cssnext.io/) to allow for future CSS features (things that LESS and SASS introduced) to be used and to allow for CSS to be automatically patched to support older browsers
    - [`cssnano`](http://cssnano.co/) to compress built CSS
    - [Normalize.css](http://necolas.github.io/normalize.css/) to make the default stylesheet more consistent across browsers
    - A minimalistic base stylesheet that can be configured with CSS variables (taken from [Factoid](https://github.com/PathwayCommons/factoid/blob/master/src/styles/base.css); may make sense to make this a reusable npm module)
- Server
  - [Express](http://expressjs.com/) for a fast, modular, minimalistic server that can be used to serve pages and/or services
  - [Forever](https://www.npmjs.com/package/forever) to make the server automatically restart on crashes
  - [Nodemon](https://www.npmjs.com/package/nodemon) to bring live reloading functionality for serverside code when developing
  - [ESM](https://www.npmjs.com/package/esm) for ESM support in Node


## Notes

- Debug Mocha tests or server code with `npm run <target> -- --inspect --debug-brk`
  - `--inspect` to start the debugger UI
  - `--debug-brk` to break on the first line so you have time to open the debugger
- Do not use Webpack to `import` or `require()` your CSS from inside your JS.  Do not use Webpack to bundle CSS into your JS bundles.  If you do that, you can no longer share code between the client and the server.

## Instructions

1. Install `slush` : `npm install -g slush`
1. Install `slush-js` : `npm install -g slush-js`
1. Scaffold : `slush js`


## Scripts

The generated project uses npm scripts to drive all of the build process so that nothing needs to be installed globally with npm.  (Only `slush` has to be globally installed, and only when first generating the project.)  The targets are described in the generated README.md file.
