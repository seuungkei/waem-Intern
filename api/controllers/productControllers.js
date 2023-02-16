const productService = require('../services/productService');

const { catchAsync } = require('../middlewares/error');

const getAllProduct = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const { limit, offset } = req.query;

  const result = await productService.getAllProduct(userId, limit, offset);
  return res.status(200).json(result);
});

const getDetailProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await productService.getDetailProduct(productId);
  return res.status(200).json(result);
});

module.exports = {
  getAllProduct,
  getDetailProduct,
};
