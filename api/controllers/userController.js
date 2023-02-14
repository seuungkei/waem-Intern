const userService = require('../services/userService');

const { catchAsync } = require('../middlewares/error');
const { detectError } = require('../utils/detectError');

const signUp = catchAsync(async (req, res) => {
  const { name, nickname, email, password, passwordCheck, regionId, cityId, addressId } = req.body;

  if (!name || !nickname || !email || !password || !passwordCheck || !regionId || !cityId || !addressId) {
    detectError('KEY_ERROR', 400);
  }

  await userService.signUp(name, nickname, email, password, passwordCheck, regionId, cityId, addressId);
  return res.status(201).json({ message: 'SIGNUP_SUCCESS' });
});

const emailCheck = catchAsync(async (req, res) => {
  const { email } = req.body;

  await userService.emailCheck(email);
  return res.status(200).json({ message: 'EMAIL_IS_AVAILABLE' });
});

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    detectError('KEY_ERROR', 400);
  }

  const jwtToken = await userService.signIn(email, password);

  return res.status(201).json({ accessToken: jwtToken });
});

const getUserAddress = catchAsync(async (req, res) => {
  const result = await userService.getUserAddress();
  return res.status(200).json(result);
});

module.exports = {
  signUp,
  signIn,
  getUserAddress,
  emailCheck,
};
