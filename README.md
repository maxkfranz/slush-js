# slush-js

A Slush scaffolder that generates JS projects for you (clientside, serverside, or both)

The generated project has live reloading on code changes for both clientside and serverside.  The live reloading has been tweaked to be very fast to maximise productivity.


## Stack

- Gulp for building
- ESLint for linting
- Mocha & Chai for testing
- Client
 - Browserify
 - Livereload
 - LESS
 - Normalize.css
 - Skeleton
- Server
 - Express
  - EJS templates
 - Forever
 - Nodemon


## Instructions

1. Install `slush` : `npm install -g slush`
1. Install `slush-jsproj` : `npm install -g slush-jsproj`
1. Scaffold : `slush jsproj`


## Scripts

The generated project uses npm scripts to drive all of the build process so that nothing needs to be installed globally with npm.  (Only `slush` has to be globally installed, and only when first generating the project.)  The targets include:

- `npm start` : Starts the server via Forever (or just `node ./src/server` to run manually); just builds for clientside-only projects
- `npm stop` : Stops the server via Forever
- `npm test` : Runs the Mocha tests
- `npm run build` : Builds clientside code
- `npm run clean` : Cleans clienside code
- `npm run watch` : Reload the serverside code on changes; rebuild and reload clientside code on changes
- `npm run lint` : Lints the code with ESLint
