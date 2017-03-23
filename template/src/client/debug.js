let domReady = require('fready');
let livereload = require('./livereload');

let debug = window.dbg = {
  enabled: function( on ){
    if( arguments.length === 0 ){
      if( this._enabled != null ){
        return this._enabled;
      } else {
        return window.DEBUG || process.env.NODE_ENV !== 'production';
      }
    } else {
      this._enabled = !!on;
    }
  },

  init: function(){
    domReady( livereload );
  }
};

module.exports = debug;
