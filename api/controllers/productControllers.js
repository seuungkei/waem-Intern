const productService = require('../services/productService');

const { catchAsync } = require('../middlewares/error');

const getAllProduct = catchAsync(async (req, res) => {
  const { limit, offset } = req.query;

  const result = await productService.getAllProduct(limit, offset);
  return res.status(200).json(result);
});

module.exports = {
  getAllProduct,
};
