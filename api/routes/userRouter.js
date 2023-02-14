const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.post('/signup', userController.signUp);
router.get('/signup', userController.getUserAddress);
router.post('/emailCheck', userController.emailCheck);

router.post('/signin', userController.signIn);

module.exports = {
  router,
};
