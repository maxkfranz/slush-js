let gulp = require('gulp');
let install = require('gulp-install');
let conflict = require('gulp-conflict');
let inquirer = require('inquirer');
let mustache = require('gulp-mustache');
let rename = require('gulp-rename');
let path = require('path');
let fs = require('fs');

let paths = {
  common: [
    'test/**',
    '.babelrc',
    '.eslintignore',
    '.eslintrc.json',
    '.gitignore',
    '.npmignore',
    '.uglify.json',
    'gulpfile.js',
    'package.json',
    'README.md'
  ],
  buildJs: [
    'build/bundle.js'
  ],
  buildDeps: [
    'build/deps.js'
  ],
  buildCss: [
    'build/bundle.css',
    '.cssnext.json',
    '.cssnano.json',
    '.stylelintrc.json'
  ],
  lib: [
    'src/index.js',
    'src/demo.html'
  ],
  libAndCss: [
    'src/styles/index.css'
  ],
  server: [
    'private/**',
    'public/**',
    'src/server/**',
    'src/views/**',
    'nodemon.json'
  ],
  client: [
    'src/client/**'
  ],
  clientOrServer: [
    'src/styles/**',
    'src/model/**'
  ],
  clientOnly: ['index.html'],
  mit: ['LICENSE']
};

let includes = ( arr, val ) => arr == null ? false : arr.includes( val );
let whenUsingGithub = answers => answers.useGithub === true;
let whenServer = answers => includes(answers.type, 'server');
let whenLib = answers => answers.lib === true;
let whenNotLib = answers => answers.lib === false;
let whenClient = answers => includes(answers.type, 'client');

gulp.task('default', function( next ){
  console.log('\nAnswer the following questions to scaffold your JS project.\n');

  inquirer.prompt([
    {
      type: 'list',
      name: 'lib',
      message: 'Is the project a library or an app',
      choices: [
        { name: 'App', value: false },
        { name: 'Library', value: true }
      ],
      default: true
    },

    {
      type: 'confirm',
      name: 'css',
      message: 'Does the lib need to build CSS',
      default: false,
      when: whenLib
    },

    {
      type: 'checkbox',
      name: 'type',
      message: 'App type',
      choices: [
        { name: 'Clientside', value: 'client', checked: true },
        { name: 'Serverside', value: 'server', checked: true }
      ],
      when: whenNotLib
    },

    {
      type: 'confirm',
      name: 'react',
      message: 'Use React',
      default: false,
      when: whenClient
    },

    {
      type: 'input',
      name: 'name',
      message: 'Lowercase project name (e.g. foo-bar)\n>'
    },

    {
      type: 'input',
      name: 'author',
      message: 'Author/organisation name (e.g. John Doe)\n>'
    },

    {
      type: 'input',
      name: 'description',
      message: 'One-line project description\n>'
    },

    {
      type: 'confirm',
      name: 'useGithub',
      message: 'Use Github?'
    },

    {
      type: 'input',
      name: 'githubProj',
      message: 'Github project name (e.g. org/foo-bar)\n>',
      when: whenUsingGithub
    },

    {
      type: 'confirm',
      name: 'mit',
      message: 'Use MIT license?'
    },

    {
      type: 'confirm',
      name: 'moveon',
      message: 'Create project with above options?'
    }
  ],
  function( answers ){
    if( !answers.moveon ){
      return next();
    }

    answers.common = true;
    answers.client = includes(answers.type, 'client');
    answers.server = includes(answers.type, 'server');

    if( !answers.lib && !answers.server && !answers.client ){
      console.log('Can not build project without both clientside and serverside in app; aborting...');
      return next();
    }

    answers.clientOnly = answers.client && !answers.server;
    answers.serverOnly = answers.server && !answers.client;
    answers.clientAndServer = answers.client && answers.server;
    answers.clientOrServer = answers.client || answers.server;
    answers.buildJs = answers.client || answers.lib;
    answers.dontBuildJs = !answers.buildJs;
    answers.buildDeps = answers.client;
    answers.dontBuildDeps = !answers.buildDeps;
    answers.buildCss = answers.clientOrServer || answers.css;
    answers.dontBuildCss = !answers.buildCss;
    answers.libAndCss = answers.buildCss && answers.lib;

    let pathsIf = conditionName => answers[ conditionName ] ? paths[ conditionName ] : [];
    let addPathsForConditionName = ( list, name ) => list.concat( answers[ name ] ? paths[ name ] : [] );
    let eachPathsIf = conditionNames => conditionNames.reduce( addPathsForConditionName, [] );
    let relDir = p => path.join( __dirname, 'template', p ); // Note use of __dirname to be relative to generator

    gulp.src(
      eachPathsIf( Object.keys( paths ) ).map( relDir ),

      { base: path.join( __dirname, 'template' ) }
    )
      .pipe( mustache(answers) )             // Mustache template support
      .pipe( conflict('./') )                // Confirms overwrites on file conflicts
      .pipe( gulp.dest('./') )               // Without __dirname here = relative to cwd
      .pipe( install() )                     // Run `npm install` if necessary
      .on('finish', function(){

        if( answers.server ){
          try {
            fs.symlinkSync( '../build/bundle.css', './public/bundle.css' );
            fs.symlinkSync( '../build/bundle.js', './public/bundle.js' );
            fs.symlinkSync( '../build/deps.js', './public/deps.js' );
          } catch( err ){} // try/catch for convenience in testing onverwrites
        }

        var pkg = JSON.parse( fs.readFileSync('./package.json') );

        // nop is a dummy package so templating works; so just remove it from package.json

        delete pkg.dependencies.nop;

        if( pkg.bundledDependencies ){
          pkg.bundledDependencies = pkg.bundledDependencies.filter(function( dep ){
            return dep != 'nop';
          });
        }

        fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2))

        next();
      })
    ;
  });
});
