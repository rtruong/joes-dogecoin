'use strict';

angular.module('joesDogecoinApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('litecoin-tab', {
        parent: 'main',
        url: 'litecoin-tab',
        templateUrl: 'app/conversion-tab/conversion-tab.html',
        controller: 'ConversionTabController',
        controllerAs: 'vm',
        data: {
          toCurrency: 'LTC'
        }
      });
  });
