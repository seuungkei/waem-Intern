const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { detectError } = require('../utils/detectError');
const { pwValidation, emailValidation, pwCheck } = require('../utils/validation-check');
const userDao = require('../models/userDao');

const signUp = async (name, nickname, email, password, passwordCheck, regionId, cityId, addressId) => {
  await pwValidation(password);
  await emailValidation(email);
  await pwCheck(password, passwordCheck);

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createUser = await userDao.createUser(name, nickname, email, hashedPassword, regionId, cityId, addressId);

  return createUser;
};

const emailCheck = async (email) => {
  await emailValidation(email);

  const { mailCheck } = await userDao.emailCheck(email);

  if (mailCheck == '1') {
    detectError('EMAIL_ALREADY_EXISTS', 409);
  }

  return mailCheck;
};

const signIn = async (email, password) => {
  const userData = await userDao.getUserInfo(email);

  if (!userData) {
    detectError('PLEASE_CHECK_YOUR_EMAIL', 401);
  }
  const compare = await bcrypt.compare(password, userData.hashedPassword);

  if (!compare) {
    detectError('PLEASE_CHECK_YOUR_PASSWORD', 401);
  }

  const jwtToken = jwt.sign(userData.id, process.env.JWT_SECRET_KEY);

  return jwtToken;
};

const getUserAddress = async () => {
  const result = await userDao.getUserAddress();
  return result;
};

module.exports = {
  signUp,
  signIn,
  getUserAddress,
  emailCheck,
};
