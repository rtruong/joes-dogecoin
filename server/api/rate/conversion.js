'use strict';

var _ = require('lodash'),
  Promise = require('promise'),
  Conversion = function (fromCurrency, toCurrency, getRateCallback) {
    _.extend(this, {
      fromCurrency: fromCurrency,
      toCurrency: toCurrency,

      getRate: function () {
        return new Promise(function (resolve, reject) {
          getRateCallback(fromCurrency, toCurrency, resolve, reject);
        });
      }
    });
  };

module.exports = Conversion;
