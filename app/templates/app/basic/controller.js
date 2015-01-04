'use strict';

angular.module('<%= name %>')
  .controller('<%= serviceName %>Ctrl', function ($scope, $http, <%= serviceName %>) {
    <%= serviceName %>.get().then(function(data) {
      $scope.data = data;
    })
  });
