'use strict';

var Client = require('node-rest-client').Client,
  Conversion = require('./conversion'),
  _ = require('lodash'),
  API_URL = 'http://pubapi2.cryptsy.com/api.php?method=singlemarketdata&marketid=',
  EXCHANGE_URL = 'https://www.cryptsy.com/markets/view/',
  CONFIG = {
    BTC: {
      DASH: {
        marketId: 155,
        type: 'Buy'
      },
      PPC: {
        marketId: 28,
        type: 'Buy'
      }
    },
    DOGE: {
      BTC: {
        marketId: 132,
        type: 'Sell'
      },
      LTC: {
        marketId: 135,
        type: 'Sell'
      },
      USD: {
        marketId: 182,
        type: 'Sell'
      },
      XRP: {
        marketId: 311,
        type: 'Sell'
      }
    },
    LTC: {
      DASH: {
        marketId: 214,
        type: 'Buy'
      },
      PPC: {
        marketId: 125,
        type: 'Buy'
      }

    },
    USD: {
      DASH: {
        marketId: 213,
        type: 'Buy'
      },
      PPC: {
        marketId: 305,
        type: 'Buy'
      }
    },
    XRP: {
      DASH: {
        marketId: 313,
        type: 'Buy'
      },
      PPC: {
        marketId: 322,
        type: 'Buy'
      }
    }
  },

  getRate = function (fromCurrency, toCurrency, resolve, reject) {
    var config = _.get(CONFIG, fromCurrency + '.' + toCurrency);

    if (config) {
      new Client().get(API_URL + config.marketId, function (data, response) {
        var market = _.first(_.values(_.get(data, 'return.markets'))),
          recentTrades = _.get(market, 'recenttrades'),
          type = config.type,
          lastTrade = _.chain(recentTrades)
            .where({ type: type })
            .first()
            .value(),
          price;

        if (lastTrade) {
          price = +lastTrade.price;

          resolve({
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            rate: type === 'Buy' ? (1 / price) : price,
            exchange: EXCHANGE_URL + market.label.replace('\/', '_'),
            transaction: type
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
    return _.reduce(CONFIG, function (ret, toCurrencies, fromCurrency) {
      return ret.concat(_.chain(_.keys(toCurrencies))
        .map(function (toCurrency) {
          return new Conversion(fromCurrency, toCurrency, getRate);
        })
        .value());
    }, []);
  }
};
