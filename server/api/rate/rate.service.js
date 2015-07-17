'use strict';

var BtcE = require('./btc-e.service'),
  Cryptsy = require('./cryptsy.service'),
  Promise = require('promise'),
  _ = require('lodash'),
  CONVERSIONS = BtcE.getConversions().concat(Cryptsy.getConversions()),

  recursiveDfs = function (fromCurrency, toCurrency, ret, previous) {
    if (fromCurrency === toCurrency) {
      ret.push(previous);
    } else {
      _.chain(CONVERSIONS)
        .where({ fromCurrency: fromCurrency })
        .forEach(function (conversion) {
          recursiveDfs(conversion.toCurrency, toCurrency, ret, (previous || []).concat(conversion));
        })
        .value();
    }
  },

  getConversions = _.memoize(function (fromCurrency, toCurrency) {
    var ret = [];

    recursiveDfs(fromCurrency, toCurrency, ret);

    return ret;
  }, function () {
    return JSON.stringify(_.toArray(arguments));
  }),

  resolveRates = function (conversions) {
    return Promise.all(
      _.chain(conversions)
        .map(function (_conversions) {
          return Promise.all(_.map(_conversions, function (conversion) {
            return conversion.getRate();
          }));
        })
        .value()
    );
  };

module.exports = {
  getRates: function (fromCurrency, toCurrency) {
    return new Promise(function (resolve, reject) {
      var conversions = getConversions(fromCurrency, toCurrency);

      if (conversions.length) {
        resolveRates(conversions).then(function (rates) {
          resolve(rates);
        });
      } else {
        resolve(ret);
      }
    });
  }
};
