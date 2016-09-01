# Factoid



## Dependencies

- [Node.js](https://nodejs.org/en/) >=6.3.0
- [RethinkDB](http://rethinkdb.com/) ^2.3.0



## Configuration

The following environment variables can be used to configure the server:

- `NODE_ENV` : the environment mode, either `production` or `development` (default)
- `PORT` : the port on which the server runs (default 3000)



## Run targets

- `npm start` : start the server
- `npm stop` : stop the server
- `npm test` or `gulp test` : run tests
- `npm run build` or `gulp build` : build the clientside
- `npm run clean` : clean the clientside
- `npm run watch`, `gulp watch`, or `gulp` : watch mode (debug mode enabled, auto rebuild, livereload)



## Adding dependencies

Serverside only:

```
npm install --save pkg-name

#or
npm i -S pkg-name
```

Clientside (or both clientside and serverside):

```
npm install --save --save-bundled pkg-name

# or
npm i -SB pkg-name
```

N.B.: Only modules that specify `--save-bundled` can be `require()`d on the clientside.  In order to keep debug watch fast, it's necessary to maintain the client dependencies in `bundledDependencies` in `package.json`.  This also allows for shipping updates to the app without busting the cache for the dependencies on clients.

(Using the `bundledDependencies` field in `package.json` in this way isn't strictly how it's intended to be used, but it should be fine since `factoid` will never be published to npm and no one would `require('factoid')`.  (Mis)using `bundledDependencies` in this way lets us just use `npm` commands without editing `package.json` manually, while keeping common dependencies on the same version on the client and the server.)



## Adding tests

All files `/test` will be run by Mocha.  You can `npm test` to run all tests, or you can run `mocha -g specific-test-name` (prerequisite: `npm install -g mocha`) to run specific tests.