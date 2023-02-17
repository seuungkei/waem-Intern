const productService = require('../services/productService');

const { catchAsync } = require('../middlewares/error');

const getAllProduct = catchAsync(async (req, res) => {
  const { limit, offset } = req.query;

  const result = await productService.getAllProduct(limit, offset);
  return res.status(200).json(result);
});

const getDetailProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await productService.getDetailProduct(productId);
  return res.status(200).json(result);
});

const registerProduct = catchAsync(async (req, res) => {
  const { title, price, content, categoryId, regionId, cityId, addressId } = req.body;
  const userId = req.userId;
  const images = req.files.map(({ location }) => location);

  if (!title || !price || !content || !categoryId || !regionId || !cityId || !addressId) {
    detectError('REGISTER_KEY_ERROR');
  }

  await productService.registerProduct(title, price, content, categoryId, userId, images, regionId, cityId, addressId);
  return res.status(201).json({ message: 'PRODUCT_REGISTER_SUCCESS' });
});

module.exports = {
  getAllProduct,
  getDetailProduct,
  registerProduct,
};
