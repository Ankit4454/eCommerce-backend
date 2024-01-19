const express = require('express');

const router = express.Router();

router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/addresses', require('./addresses'));
router.use('/orders', require('./orders'));
router.use('/ratings', require('./ratings'));

module.exports = router;