const express = require('express');

const router = express.Router();

const userRouter = require('../routes/userRouter');
const productRouter = require('../routes/productRouter');

router.use('/user', userRouter.router);
router.use('/product', productRouter.router);

module.exports = router;
