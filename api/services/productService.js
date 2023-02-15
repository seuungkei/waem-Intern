const productDao = require('../models/productDao');

const getAllProduct = async (userId, limit, offset) => {
  const result = await productDao.getAllProduct(userId, limit, offset);
  return result;
};

module.exports = {
  getAllProduct,
};
