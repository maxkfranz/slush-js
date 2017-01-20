# slush-js

A Slush scaffolder that generates JS projects for you (clientside, serverside, both clientside and serverside, or standalone lib).

The generated project has live reloading on code changes (for both clientside and serverside, as applicable).  The live reloading has been tweaked to be very fast to maximise productivity.

The stack is chosen to use as standard, vanilla technologies as possible.  You write all your JS as normal JS (with ES2015/ES6 support).  You write all your CSS as normal CSS (with CSS4 support).  You also get all the niceties of a modern stack with the productivity of a build system.

The stack is also very modular, thanks to Gulp and Browserify.  So you can easily add features; the build process can grow and change as your project grows and changes.


## Stack

- [Gulp](http://gulpjs.com/) for build tasks
- [ESLint](http://eslint.org/) for linting JS
- [Stylelint](http://stylelint.io/) for linting CSS
- [Mocha](https://mochajs.org/) & [Chai](http://chaijs.com/) for testing
- Client (or standalone lib)
 - JS
  - [Browserify](http://browserify.org/) for bundling with [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) `require()` support
  - [Babel](https://babeljs.io/) for transpiling and polyfilling ES2015 (you can update `.babelrc` to use a newer ES20XX if you like)
  - [Livereload](https://www.npmjs.com/package/gulp-livereload) to bring live reloading functionality for clientside/bundled code when developing
  - [UglifyJS](https://github.com/mishoo/UglifyJS) to compress built JS
 - CSS
  - [PostCSS](http://postcss.org/) to add features to CSS
   - [`postcss-import`](https://www.npmjs.com/package/postcss-import) to allow `@import`s to be bundled
   - [`postcss-cssnext`](http://cssnext.io/) to allow for future CSS features (things that LESS and SASS introduced) to be used and to allow for CSS to be automatically patched to support older browsers
   - [`cssnano`](http://cssnano.co/) to compress built CSS
  - [Normalize.css](http://necolas.github.io/normalize.css/) to make the default stylesheet more consistent across browsers
  - [Skeleton](http://getskeleton.com/) for (very minimal) basic default widgets styling etc. (you can just delete this if you like)
- Server
 - [Express](http://expressjs.com/) for a fast, modular, minimalistic server that can be used to serve pages and/or services
 - [EJS](http://www.embeddedjs.com/) plain JS templates for basic serverside templating (you would only really use this for printing serverside error messages, enabling debug mode on client code, etc.)
 - [Forever](https://www.npmjs.com/package/forever) to make the server automatically restart on crashes
 - [Nodemon](https://www.npmjs.com/package/nodemon) to bring live reloading functionality for serverside code when developing


## Instructions

1. Install `slush` : `npm install -g slush`
1. Install `slush-js` : `npm install -g slush-js`
1. Scaffold : `slush js`


## Scripts

The generated project uses npm scripts to drive all of the build process so that nothing needs to be installed globally with npm.  (Only `slush` has to be globally installed, and only when first generating the project.)  The targets are described in the generated README.md file.



## Can't I just use Webpack?

[Webpack](https://webpack.js.org/) is a useful bundler.  However, it has several limitations:

1. It's just a bundler, like Browserify.  It won't replace your entire build system, except for simple projects of a specific type:
 1. A standalone lib that
  1. does not need to provide CSS with it,
  1. or the CSS is simple enough to build with a simple npm script --- and you are OK with not having live reloading for CSS.
 1. A clientside-only app.  That is, the app is just clientside JS/HTML/CSS deployed behind something like Apache httpd or nginx.  If your app doesn't have a server or it just uses external webservices, then Webpack is enough.
1. Webpack isn't very modular and it can't have its output piped.  If Webpack doesn't support your usecase out of the box, you're out of luck.  Browserify supports piping in the CLI and streams in its API --- and Gulp is just a few helper functions for streams --- so you can do pretty much whatever you want with Gulp and Browserify.
1. Webpack promotes nonstandard and problematic patterns, like overloading `require()` for CSS files.  You can't share your code with the serverside if you do things like this.
1. Webpack doesn't support a lot of packages on npm, because it doesn't polyfill relevant Node APIs like Browserify does.  If you want to maximise code re-use by using packages on npm, Browserify is better.
