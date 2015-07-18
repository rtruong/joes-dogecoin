'use strict';

angular.module('joesDogecoinApp')
  .controller('MainController', function ($scope) {
    var vm = this;

    $scope.fromValue = 200000;
    $scope.fromCurrency = 'DOGE';
    vm.refresh = refresh;

    function refresh() {
      $scope.$broadcast('refresh');
    }
  });
