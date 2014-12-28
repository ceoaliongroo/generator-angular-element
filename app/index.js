'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var AngularElementGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  // Ask for options.
  prompting: this.askFor,

  // Writing files.
  writing: {
    app: this.writeApp,
    projectFiles: this.writeProjectFiles
  },

  // Install dependencies.
  end: {
    install: this.install
  }
});

AngularElementGenerator.prototype.askFor = function() {
  var done = this.async();

  // Get folder name as application name.
  this.appname = path.basename(process.cwd());

  // Have Yeoman greet the user.
  this.log(yosay(
    'Welcome to the Angular Element a Component Generator!'
  ));

  // Asking user preference.
  var prompts = [{
    type: 'input',
    name: 'name',
    message: 'What is the name of the component?',
    default: this.appname || 'component'
  }];

  this.prompt(prompts, function (props) {
    this.name = props.name;

    done();
  }.bind(this));
};

AngularElementGenerator.prototype.writeApp = function() {
  this.src.copy('_package.json', 'package.json');
  this.src.copy('_bower.json', 'bower.json');
  this.src.copy('Gruntfile.js', 'Gruntfile.js');
};

AngularElementGenerator.prototype.writeProjectFiles = function() {
  this.src.copy('editorconfig', '.editorconfig');
  this.src.copy('jshintrc', '.jshintrc');
};

AngularElementGenerator.prototype.install = function() {
  this.installDependencies();
};

module.exports = AngularElementGenerator;
