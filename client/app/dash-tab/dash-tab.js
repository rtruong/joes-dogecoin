'use strict';

angular.module('joesDogecoinApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dash-tab', {
        parent: 'main',
        url: 'dash-tab',
        templateUrl: 'app/conversion-tab/conversion-tab.html',
        controller: 'ConversionTabController',
        controllerAs: 'vm',
        data: {
          toCurrency: 'DASH'
        }
      });
  });
