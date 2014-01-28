'use strict';

angular.module('bronameApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'BroMe'
      })
      .otherwise({
        redirectTo: '/'
      });
  });