# {{name}}



## Required software

- [Node.js](https://nodejs.org/en/) >=6.3.0



## Configuration

The following environment variables can be used to configure the server:

- `NODE_ENV` : the environment mode, either `production` or `development` (default)
- `PORT` : the port on which the server runs (default 3000)



## Run targets

- `npm start` : start the server
- `npm stop` : stop the server
- `npm run build` : build project
- `npm run build-prod` : build the project for production
- `npm run clean` : clean the project
- `npm run watch` : watch mode (debug mode enabled, auto rebuild, livereload)
- `npm test` : run tests
- `npm run lint` : lint the project



{{#clientAndServer}}
## Adding npm dependencies

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

(Using the `bundledDependencies` field in `package.json` in this way isn't strictly how it's intended to be used, but it should be fine since `{{name}}` will never be published to npm and no one would `require('{{name}}')`.  (Mis)using `bundledDependencies` in this way lets us just use `npm` commands without editing `package.json` manually, while keeping common dependencies on the same version on the client and the server.)
{{/clientAndServer}}


## Testing

All files `/test` will be run by [Mocha](https://mochajs.org/).  You can `npm test` to run all tests, or you can run `mocha -g specific-test-name` (prerequisite: `npm install -g mocha`) to run specific tests.

[Chai](http://chaijs.com/) is included to make the tests easier to read and write.
