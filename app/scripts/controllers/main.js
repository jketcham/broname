'use strict';

angular.module('bronameApp')
  .controller('BroMe', function ($scope) {
    var broNames = [
      'Brohammad',
      'Broback Brobamma',
      'Broheim',
      'Broski',
      'Bromo',
      'Brotien',
      'Brodeo',
      'Brohan',
      'Brosicle',
    ];
    
    $scope.broName = broNames[Math.floor(Math.random() * broNames.length)];
  });