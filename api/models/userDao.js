const { mysqlDatabase } = require('../models/dbconfig');
const { detectError } = require('../utils/detectError');

const emailCheck = async (email) => {
  try {
    const [result] = await mysqlDatabase.query(
      `
      SELECT EXISTS (
        SELECT
          u.email
        FROM
          users u
        WHERE u.email = ?
      ) as mailCheck
      `,
      [email]
    );
    return result;
  } catch (err) {
    console.error(err.stack);
    detectError('DATABASE_ERROR', 400);
  }
};

const createUser = async (name, nickname, email, hashedPassword, regionId, cityId, addressId) => {
  try {
    return await mysqlDatabase.query(
      `
      INSERT INTO users (
        name,
        nickname,
        email,
        password,
        region_id,
        city_id,
        address_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [name, nickname, email, hashedPassword, regionId, cityId, addressId]
    );
  } catch (err) {
    console.error(err.stack);
    detectError('DATABASE_ERROR', 400);
  }
};

const getUserInfo = async (email) => {
  try {
    const [userData] = await mysqlDatabase.query(
      `
      SELECT
        id,
        email,
        password AS hashedPassword
      FROM
        users
      WHERE email = ?
      `,
      [email]
    );
    return userData;
  } catch (err) {
    console.error(err.stack);
    detectError('DATABASE_ERROR', 400);
  }
};

const getUserAddress = async () => {
  try {
    const city = await mysqlDatabase.query(
      `
      SELECT
        id,
        name,
        region_id
      FROM
        cities
      `
    );

    const address = await mysqlDatabase.query(
      `
      SELECT
        id,
        name,
        city_id
      FROM
        address
      `
    );
    return { city, address };
  } catch (err) {
    console.error(err.stack);
    detectError('DATABASE_ERROR', 400);
  }
};

module.exports = {
  emailCheck,
  createUser,
  getUserInfo,
  getUserAddress,
};
