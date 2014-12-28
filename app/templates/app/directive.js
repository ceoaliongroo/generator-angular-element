'use strict';

angular.module('elementModule')
  .directive('directiveName', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this a AngularJS Element the directive');
      }
    };
  });
