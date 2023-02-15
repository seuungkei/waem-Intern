const express = require('express');

const router = express.Router();

const productController = require('../controllers/productControllers');

router.get('/', productController.getAllProduct);

module.exports = {
  router,
};
