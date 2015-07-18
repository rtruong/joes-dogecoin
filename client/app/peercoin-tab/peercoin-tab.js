'use strict';

angular.module('joesDogecoinApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('peercoin-tab', {
        parent: 'main',
        url: 'peercoin-tab',
        templateUrl: 'app/peercoin-tab/peercoin-tab.html',
        controller: 'PeercoinTabController',
        controllerAs: 'vm'
      });
  });
