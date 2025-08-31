const router = require('express').Router();

router.use('/products', require('./product.router'));
router.use('/categories', require('./category.router'));
router.use('/image', require('./image.router'));
router.use('/orders', require('./order.router'));
router.use('/mail', require('./mail.router'));
router.use('/users', require('./user.router'));
router.use('/auth', require('./auth.router'));

module.exports = router;
