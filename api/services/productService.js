const productDao = require('../models/productDao');

const getAllProduct = async (limit, offset) => {
  const result = await productDao.getAllProduct(limit, offset);
  return result;
};

const getDetailProduct = async (productId) => {
  const result = await productDao.getDetailProduct(productId);
  return result;
};

const registerProduct = async (title, price, content, categoryId, userId, images, regionId, cityId, addressId) => {
  return await productDao.registerProduct(title, price, content, categoryId, userId, images, regionId, cityId, addressId);
};

module.exports = {
  getAllProduct,
  getDetailProduct,
  registerProduct,
};
