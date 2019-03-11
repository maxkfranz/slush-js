const process = require('process');
const _ = require('lodash');

let defaults = {
  PORT: 3000,
  LOG_LEVEL: 'info'
};

let envVars = _.pick( process.env, Object.keys( defaults ) );

let conf = Object.assign( {}, defaults, envVars );

Object.freeze( conf );

module.exports = conf;
