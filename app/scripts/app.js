'use strict';

angular.module('bronameApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngFitText',
  'bronameApp.filters',
  'bronameApp.directives'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'broname'
      })
      .otherwise({
        redirectTo: '/'
      });
  });