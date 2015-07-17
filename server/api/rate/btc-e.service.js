'use strict';

var Client = require('node-rest-client').Client,
  Promise = require('promise'),
  _ = require('lodash'),
  URL = 'https://btc-e.com/api/3/ticker/',
  MARKET_IDS = {
    BTC: {
      LTC: 'ltc_btc',
      PPC: 'ppc_btc'
    },
    USD: {
      LTC: 'ltc_usd',
      PPC: 'ppc_usd'
    }
  };

module.exports = {
  getRate: function (fromCurrency, toCurrency) {
    return new Promise(function (resolve, reject) {
      var marketId = _.get(MARKET_IDS, fromCurrency + '.' + toCurrency);

      if (marketId) {
        new Client().get(URL + marketId, function (data, response) {
          var market = (function () {
            var ret;

            try {
              ret = _.first(_.values(JSON.parse(data.toString('utf8'))));
            } catch (e) {}

            return ret;
          })();

          if (market) {
            resolve(market.buy);
          } else {
            reject();
          }
        });
      } else {
        reject();
      }
    });
  }
};
