const { detectError } = require('./detectError');

const pwValidation = async (password) => {
  const regex = new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})');

  if (!regex.test(password)) {
    detectError('PASSWORD_FORMAT_IS_NOT_CORRECT', 409);
  }
};

const emailValidation = async (email) => {
  const regex = new RegExp('^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(.[0-9a-zA-Z_-]+){1,2}$');

  if (!regex.test(email)) {
    detectError('EMAIL_FORMAT_IS_NOT_CORRECT', 409);
  }
};

const pwCheck = async (password, passwordCheck) => {
  if (password !== passwordCheck) {
    detectError('PASSWORD_DO_NOT_MATCH', 409);
  }
};

module.exports = {
  pwValidation,
  emailValidation,
  pwCheck,
};
