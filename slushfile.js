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
    'build/**',
    'src/styles/**',
    'src/model/**',
    'src/util/**',
    'test/**',
    '.eslintignore',
    '.eslintrc.json',
    '.gitignore',
    'gulpfile.js',
    'package.json',
    'README.md'
  ],
  server: ['private/**', 'public/**', 'src/server/**', 'src/views/**', 'nodemon.json'],
  client: ['src/client/**'],
  clientOnly: ['index.html'],
  mit: ['LICENSE']
};

let whenUsingGithub = answers => answers.useGithub;
let whenServer = answers => answers.type.server;

gulp.task('default', function( next ){
  inquirer.prompt([
    {
      type: 'checkbox',
      name: 'type',
      message: 'Project type',
      choices: [
        { name: 'Clientside', value: 'client', checked: true },
        { name: 'Serverside', value: 'server', checked: true }
      ]
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
    answers.client = answers.type.includes('client');
    answers.server = answers.type.includes('server');

    if( !answers.server && !answers.client ){
      console.log('Can not build project without both clientside and serverside; aborting...');
      return next();
    }

    answers.clientOnly = answers.client && !answers.server;
    answers.serverOnly = answers.server && !answers.client;

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
          fs.symlinkSync( '../build/build.js', './public/build.js' );
          fs.symlinkSync( '../build/deps.js', './public/deps.js' );
          fs.symlinkSync( '../build/build.css', './public/build.css' );
        }

        next();
      })
    ;
  });
});
