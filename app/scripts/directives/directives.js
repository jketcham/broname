'use strict';

angular.module('bronameApp.directives', []).
  directive('focus', function() {
    return function(scope, elm) {
      elm[0].focus();
    };
  });