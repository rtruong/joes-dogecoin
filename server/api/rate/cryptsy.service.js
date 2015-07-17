'use strict';

var Client = require('node-rest-client').Client,
  Promise = require('promise'),
  _ = require('lodash'),
  URL = 'http://pubapi2.cryptsy.com/api.php?method=singlemarketdata&marketid=',
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
        marketId: 155,
        type: 'Buy'
      },
      PPC: {
        marketId: 28,
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
  };

module.exports = {
  getRate: function (fromCurrency, toCurrency) {
    return new Promise(function (resolve, reject) {
      var config = _.get(CONFIG, fromCurrency + '.' + toCurrency);

      if (config) {
        new Client().get(URL + config.marketId, function (data, response) {
          var recentTrades = _.get(_.first(_.values(_.get(data, 'return.markets'))), 'recenttrades'),
            lastTrade = _.chain(recentTrades)
              .where({ type: config.type })
              .first()
              .value();

          if (lastTrade) {
            resolve(+lastTrade.price);
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
