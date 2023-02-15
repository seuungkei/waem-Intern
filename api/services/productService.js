const productDao = require('../models/productDao');

const getAllProduct = async (limit, offset) => {
  const result = await productDao.getAllProduct(limit, offset);
  return result;
};

module.exports = {
  getAllProduct,
};
