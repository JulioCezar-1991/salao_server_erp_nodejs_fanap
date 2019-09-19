'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

router.post('/post/cliente/', controller.postLogin);
router.post('/post/cliente/create/', controller.postCreateLogin);
router.put('/put/cliente/:id', controller.put);
router.patch('/patch/cliente/:id', controller.patch);  
router.delete('/delete/cliente/:id', controller.delete);

module.exports = router;
