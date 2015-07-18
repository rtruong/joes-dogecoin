'use strict';

angular.module('joesDogecoinApp')
  .service('RateService', function ($filter, $http, $q) {
    _.extend(this, {
      getRates: function (fromCurrency, toCurrency) {
        var deferred = $q.defer();

        $http
          .get('/api/rates/from/' + fromCurrency + '/to/' + toCurrency)
          .success(function(rates) {
            deferred.resolve($filter('orderBy')(rates, '-rate'));
          });

        return deferred.promise;
      }
    })
  });
