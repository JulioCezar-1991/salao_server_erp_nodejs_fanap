'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

router.post('/service/create/', controller.postCreateService);

module.exports = router;
