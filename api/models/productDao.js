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
        r.name AS region,
        c.name AS city,
        a.name AS address
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

const getDetailProduct = async (productId) => {
  return await mysqlDatabase.query(
    `
    SELECT
      p.id,
      p.title,
      p.price,
      p.content,
      cg.name as category,
      u.nickname,
      r.name AS region,
      c.name AS city,
      a.name AS address,
      JSON_ARRAYAGG(
        pi.image_url
      ) as product_image
    FROM
      products p
    INNER JOIN sellers s ON s.id = p.seller_id
    INNER JOIN users u ON s.user_id = u.id
    INNER JOIN regions r ON u.region_id = r.id
    INNER JOIN cities c ON u.city_id = c.id
    INNER JOIN address a ON u.address_id = a.id
    INNER JOIN categories cg ON p.category_id = cg.id
    LEFT JOIN product_images pi ON pi.product_id = p.id
    WHERE p.id = ?
    `,
    [productId]
  );
};

const productStatusEnum = Object.freeze({
  판매중: 1,
  거래중: 2,
  판매완료: 3,
});

const registerProduct = async (title, price, content, categoryId, userId, images, regionId, cityId, addressId) => {
  try {
    const queryRunner = mysqlDatabase.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const [sellerUser] = await queryRunner.query(
      `
      SELECT
        s.id
      FROM
        sellers s
      WHERE s.user_id = ?
      `,
      [userId]
    );

    let sellerUserId = sellerUser?.id;

    if (!sellerUserId) {
      const createSeller = await queryRunner.query(
        `
        INSERT INTO sellers (
          user_id
        ) VALUES (?)
        `,
        [userId]
      );
      sellerUserId = createSeller.insertId;
    }

    const product = await queryRunner.query(
      `
      INSERT INTO products (
        title,
        price,
        content,
        category_id,
        seller_id,
        thumbnail,
        product_status_id,
        region_id,
        city_id,
        address_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [title, price, content, categoryId, sellerUserId, images[0], productStatusEnum.판매중, regionId, cityId, addressId]
    );

    const bulkImage = images.map((imageUrl) => {
      return [imageUrl, product.insertId];
    });

    await queryRunner.query(
      `
      INSERT INTO product_images (
        image_url,
        product_id
    ) VALUES ?
      `,
      [bulkImage]
    );

    await queryRunner.commitTransaction();
    await queryRunner.release();
  } catch (err) {
    console.error(err.stack);
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    detectError('DATABASE_ERROR', 400);
  }
};

module.exports = {
  getAllProduct,
  getDetailProduct,
  registerProduct,
};
