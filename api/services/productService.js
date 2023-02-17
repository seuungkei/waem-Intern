const productDao = require('../models/productDao');

const getAllProduct = async (limit, offset) => {
  const result = await productDao.getAllProduct(limit, offset);
  return result;
};

const getDetailProduct = async (productId) => {
  const result = await productDao.getDetailProduct(productId);
  return result;
};

module.exports = {
  getAllProduct,
  getDetailProduct,
};
