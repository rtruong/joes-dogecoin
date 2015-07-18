'use strict';

angular.module('joesDogecoinApp')
  .controller('PeercoinTabController', function ($scope, RateService) {
    var vm = this;

    vm.conversions = [];
    vm.activate = activate;
    vm.toCurrency = 'PPC';

    activate();

    function activate() {
      $scope.$on('refresh', refresh);

      refresh();
    }

    function refresh() {
      RateService.getRates($scope.fromCurrency, vm.toCurrency).then(function (rates) {
        vm.conversions = _.map(rates, function (rate) {
          return _.extend({}, rate, {
            toValue: $scope.fromValue * rate.rate,
            markets: _.map(rate.markets, function (market, index, markets) {
              var prev = markets[index - 1],
                fromValue = prev ? prev.toValue : $scope.fromValue;

              return _.extend(market, {
                fromValue: fromValue,
                toValue: fromValue * market.rate
              });
            })
          });
        });
      });
    }
  });