const express = require('express');

const router = express.Router();

const productController = require('../controllers/productControllers');
const { upload } = require('../utils/upload');
const validationToken = require('../utils/auth');

router.get('/', productController.getAllProduct);
router.get('/myPage', productController.userProductList);
router.get('/:productId', productController.getDetailProduct);
router.post('/registration', validationToken, upload, productController.registerProduct);
router.delete('/', productController.deleteProduct);

module.exports = {
  router,
};
