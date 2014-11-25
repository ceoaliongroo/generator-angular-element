'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var AngularElementGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: this.askFor,

  writing: {
    app: this.writeApp,
    projectFiles: this.writeProjectFiles
  },

  end: {
    install: this.install
  }
});

AngularElementGenerator.prototype.askFor = function() {
  var done = this.async();

  // Have Yeoman greet the user.
  this.log(yosay(
    'Welcome to the Angular Element generator!'
  ));

  var prompts = [{
    type: 'confirm',
    name: 'installAngular',
    message: 'Would you like to install angular application?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.installAngular = props.installAngular;

    done();
  }.bind(this));
};

AngularElementGenerator.prototype.writeApp = function() {
  this.dest.mkdir('app');
  this.dest.mkdir('app/templates');

  this.src.copy('_package.json', 'package.json');
  this.src.copy('_bower.json', 'bower.json');
};

AngularElementGenerator.prototype.writeProjectFiles = function() {
  this.src.copy('editorconfig', '.editorconfig');
  this.src.copy('jshintrc', '.jshintrc');
};

AngularElementGenerator.prototype.install = function() {
  this.installDependencies();
};

module.exports = AngularElementGenerator;
