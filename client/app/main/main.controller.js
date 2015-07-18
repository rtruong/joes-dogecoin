'use strict';

angular.module('joesDogecoinApp')
  .controller('MainController', function ($scope, $state) {
    var vm = this;

    $scope.fromValue = 200000;
    $scope.fromCurrency = 'DOGE';
    vm.refresh = refresh;

    activate();

    function activate() {
      $state.go('peercoin-tab');
    }

    function refresh() {
      $scope.$broadcast('refresh');
    }
  });
