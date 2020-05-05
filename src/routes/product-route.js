'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

router.get('/', controller.get);
router.post('/', controller.post);
router.patch('/:id', controller.patch);
router.delete('/', controller.delete);

module.exports = router;