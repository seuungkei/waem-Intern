const { mysqlDatabase } = require('../models/dbconfig');
const { detectError } = require('../utils/detectError');

const getAllProduct = async (limit, offset) => {
  try {
    return await mysqlDatabase.query(
      `
      SELECT
        p.id,
        p.thumbnail,
        p.title,
        p.price,
        r.name as region,
        c.name as city,
        a.name as address
      FROM
        products p
      INNER JOIN sellers s ON s.id = p.seller_id
      INNER JOIN users u ON s.user_id = u.id
      INNER JOIN regions r ON p.region_id = r.id
      INNER JOIN cities c ON p.city_id = c.id
      INNER JOIN address a ON p.address_id = a.id
      LIMIT ${limit} OFFSET ${offset}
      `
    );
  } catch (err) {
    console.error(err.stack);
    detectError('DATABASE_ERROR', 400);
  }
};

module.exports = {
  getAllProduct,
};
