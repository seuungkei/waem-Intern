const express = require('express');

const router = express.Router();

const productController = require('../controllers/productControllers');
const upload = require('../utils/upload');
const validationToken = require('../utils/auth');

router.get('/', productController.getAllProduct);
router.get('/:productId', productController.getDetailProduct);
router.post('/registration', validationToken, upload, productController.registerProduct);

module.exports = {
  router,
};
