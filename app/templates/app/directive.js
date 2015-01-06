'use strict';

angular.module('<%= name %>')
  .directive('directive<%= name %>', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this a AngularJS Element <%= name %> the directive');
      }
    };
  });
