const webpack = require('webpack');
const { env } = require('process');
const isProd = env.NODE_ENV === 'production';
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const isNonNil = x => x != null;
{{#client}}const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isProfile = env.PROFILE == 'true';{{/client}}
const minify = env.MINIFY == 'true'{{#clientOrServer}} || isProd{{/clientOrServer}};
const pkg = require('./package.json');
{{#lib}}const camelcase = require('camelcase');{{/lib}}

let conf = {
  devtool: isProd ? false : 'inline-source-map',

  entry: {{#lib}}'./src/index.js'{{/lib}}{{#client}}'./src/client/index.js'{{/client}},

  output: {
    filename: './build/bundle.js'{{#lib}},
    library: camelcase( pkg.name ),
    libraryTarget: 'umd'
    {{/lib}}
  },

  {{#lib}}
  externals: isProd ? Object.keys( pkg.dependencies || {} ) : [],
  {{/lib}}

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),

    {{#client}}new webpack.optimize.CommonsChunkPlugin({
      name: 'deps',
      filename: './build/deps.js',
      minChunks( module ){
        let context = module.context || '';

        return context.indexOf('node_modules') >= 0;
      }
    }),

    isProfile ? new BundleAnalyzerPlugin() : null,

    {{/client}}
    minify ? new UglifyJSPlugin() : null
  ].filter( isNonNil )
};

module.exports = conf;
