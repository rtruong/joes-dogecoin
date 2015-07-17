'use strict';

var Client = require('node-rest-client').Client,
  Conversion = require('./conversion'),
  _ = require('lodash'),
  API_URL = 'https://btc-e.com/api/3/ticker/',
  EXCHANGE_URL = 'https://btc-e.com/exchange/',

  // NOTE: rlt 20150717 - In a perfect world, this would be programatically built by inspecting the REST API.  In the
  //                      interest of saving time, this is hard-coded here for now.
  MARKET_IDS = {
    BTC: {
      LTC: 'ltc_btc',
      PPC: 'ppc_btc'
    },
    USD: {
      LTC: 'ltc_usd',
      PPC: 'ppc_usd'
    }
  },

  getRate = function (fromCurrency, toCurrency, resolve, reject) {
    var marketId = _.get(MARKET_IDS, fromCurrency + '.' + toCurrency);

    if (marketId) {
      new Client().get(API_URL + marketId, function (data, response) {
        var market = (function () {
          var ret;

          try {
            ret = _.first(_.values(JSON.parse(data.toString('utf8'))));
          } catch (e) {}

          return ret;
        })();

        if (market) {
          resolve({
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            rate: 1 / market.buy,
            exchange: EXCHANGE_URL + marketId,
            transaction: 'Buy'
          });
        } else {
          reject();
        }
      });
    } else {
      reject();
    }
  };

module.exports = {
  getConversions: function () {
    return _.reduce(MARKET_IDS, function (ret, toCurrencies, fromCurrency) {
      return ret.concat(_.chain(_.keys(toCurrencies))
        .map(function (toCurrency) {
          return new Conversion(fromCurrency, toCurrency, getRate);
        })
        .value());
    }, []);
  }
};
