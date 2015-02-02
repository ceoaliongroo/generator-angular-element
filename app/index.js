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
  prompting: {
    basic: this.askFor,
    service: this.askForBasicService
  },

  // Writing files.
  writing: {
    app: this.writeApp,
    taskFiles: this.writeTaskFiles,
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
  },{
    type: 'list',
    name: 'componentType',
    message: 'What type of component do you want to create?',
    choices: ['Module', 'Directive controller', 'Basic restful service']
  }];

  this.prompt(prompts, function (props) {
    this.name = props.name;
    this.componentType = props.componentType;

    done();
  }.bind(this));
};

AngularElementGenerator.prototype.askForBasicService = function() {
  if (this.componentType !== 'Basic restful service') {
    return;
  }

  var done = this.async();

  // Asking user preference.
  var prompts = [{
    type: 'input',
    name: 'serviceName',
    message: 'What is name of the service?'
  }];

  this.prompt(prompts, function (props) {
    this.serviceName = props.serviceName;

    done();
  }.bind(this));
};

/**
 * Write common module files.
 */
AngularElementGenerator.prototype.writeApp = function() {
  this.src.copy('_package.json', 'package.json');
  this.src.copy('_bower.json', 'bower.json');
  this.src.copy('editorconfig', '.editorconfig');
  this.src.copy('jshintrc', '.jshintrc');
};

AngularElementGenerator.prototype.writeTaskFiles = function() {
  if (this.componentType === 'Module') {
    this.src.copy('../../module/Gruntfile.js', 'Gruntfile.js');
    this.src.copy('../../module/test/karma.conf.js', 'karma.conf.js');
    this.src.copy('../../module/jshintrc', '.jshintrc');
  }
  else {
    this.src.copy('Gruntfile.js', 'Gruntfile.js');
  }
};

AngularElementGenerator.prototype.writeProjectFiles = function() {
  var module;

  // General properties.
  module = {
    module: this.name,
    name: this.name,
    serviceName: this.serviceName
  };

  // Write files of the type of component selected.
  if (this.componentType === 'Module') {
    this.template('../../module/src/element.js', 'src/' + module.name + '.js', module);
    this.template('../../module/test/spec/elementSpec.js', 'test/spec/' + module.name + 'Spec.js', module);
  }
  else if (this.componentType === 'Directive controller') {
    this.template('app/directive.js', 'app/scripts/directives/directive.js', module);
  }
  else {
    this.template('app/basic/service.js', 'app/scripts/services/service.js', module);
    this.template('app/basic/controller.js', 'app/scripts/controllers/controller.js', module);
  }
};

AngularElementGenerator.prototype.install = function() {
  this.installDependencies();
};

module.exports = AngularElementGenerator;
