'use strict';

var BtcE = require('./btc-e.service'),
  Cryptsy = require('./cryptsy.service'),
  Promise = require('promise'),
  _ = require('lodash'),

  // NOTE: rlt 20150717 - In a perfect world, this would be allowed to be a cyclic graph, but to simplify the
  //                      path-finding algorithm in the interest of saving time, it is only directed acyclic graph.
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
          resolve(_.map(rates, function (_rates) {
            return {
              markets: _rates,

              rate: _.reduce(_.pluck(_rates, 'rate'), function (rate, _rate) {
                return rate * _rate
              }, 1)
            };
          }));
        });
      } else {
        resolve(ret);
      }
    });
  }
};
