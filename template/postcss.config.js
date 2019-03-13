const { env } = require('process');
const isProd = env.NODE_ENV === 'production';
const isNonNil = x => x != null;

let conf = {
  plugins: [
    require('postcss-import')(),
    require('postcss-url')([ // if it's not inlined, make a symlink in /public
      {
        filter: '**/*.svg',
        url: 'inline',
        encodeType: 'encodeURIComponent',
        optimizeSvgEncode: true,
        maxSize: 20
      },
      {
        filter: '**/*.woff',
        url: 'inline',
        encodeType: 'base64',
        maxSize: Number.MAX_SAFE_INTEGER
      },
      {
        filter: '**/*.woff2',
        url: 'inline',
        encodeType: 'base64',
        maxSize: Number.MAX_SAFE_INTEGER
      }
    ]),
    require('postcss-preset-env')({
      stage: 0
    }),
    isProd ? require('cssnano')({
      safe: true
    }) : null
  ].filter( isNonNil )
};

module.exports = conf;
