'use strict';

var express = require('express');
var controller = require('./rate.controller');

var router = express.Router();

router.get('/from/:fromCurrency/to/:toCurrency', controller.index);

module.exports = router;
