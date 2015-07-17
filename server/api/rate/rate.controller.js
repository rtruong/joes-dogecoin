'use strict';

var _ = require('lodash'),
  RateService = require('./rate.service');

// Get list of rates
exports.index = function(req, res) {
  var params = req.params,
    fromCurrency = params.fromCurrency || '',
    toCurrency = params.toCurrency || '';

  RateService
    .getRates(fromCurrency.toUpperCase(), toCurrency.toUpperCase())
    .then(function (rates) {
      res.json(rates);
    });
};
