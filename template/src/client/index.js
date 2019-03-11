import debug from './debug';
{{#react}}
import React from 'react';
import ReactDOM from 'react-dom';
{{/react}}

if( debug.enabled() ){
  debug.init();
}

// TODO client
{{#react}}
// react example
let div = document.createElement('div');
document.body.appendChild( div );

ReactDOM.render(
  <h1>Hello, world!</h1>,
  div
);
{{/react}}
