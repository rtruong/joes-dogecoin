'use strict';

angular.module('joesDogecoinApp')
  .controller('ConversionTabController', function ($scope, $state, RateService) {
    var vm = this;

    vm.activate = activate;
    vm.conversions = [];
    vm.promise = null;
    vm.toCurrency = $state.current.data.toCurrency;

    activate();

    function activate() {
      $scope.$on('refresh', refresh);

      refresh();
    }

    function refresh() {
      var promise = vm.promise = RateService.getRates($scope.fromCurrency, vm.toCurrency);

      promise.then(function (rates) {
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
