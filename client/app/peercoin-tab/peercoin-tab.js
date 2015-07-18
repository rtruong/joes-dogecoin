'use strict';

angular.module('joesDogecoinApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('peercoin-tab', {
        parent: 'main',
        url: 'peercoin-tab',
        templateUrl: 'app/conversion-tab/conversion-tab.html',
        controller: 'ConversionTabController',
        controllerAs: 'vm'
      });
  });
