'use strict';

angular.module('<%= module %>')
  .service('<%= name %>', function <%= name %>Service() {
    // Test method.
    this.plus = function(a, b) {
      return a+b;
    }
  });
