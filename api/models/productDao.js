const { mysqlDatabase } = require('../models/dbconfig');
const { detectError } = require('../utils/detectError');

const getAllProduct = async (userId, limit, offset) => {
  try {
    return await mysqlDatabase.query(
      `
      SELECT
        p.id,
        p.thumbnail,
        p.title,
        p.price,
        r.name AS region,
        c.name AS city,
        a.name AS address
      FROM
        products p
      INNER JOIN sellers s ON s.id = p.seller_id
      INNER JOIN users u ON s.user_id = u.id
      INNER JOIN regions r ON u.region_id = r.id
      INNER JOIN cities c ON u.city_id = c.id
      INNER JOIN address a ON u.address_id = a.id
      WHERE u.id = ?
      LIMIT ${limit} OFFSET ${offset}
      `,
      [userId]
    );
  } catch (err) {
    console.error(err.stack);
    detectError('DATABASE_ERROR', 400);
  }
};

module.exports = {
  getAllProduct,
};
