const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product_controller');

router.get('/', productController.products);
router.post('/create', productController.create);
router.post('/update', productController.update);
router.post('/delete', productController.delete);
router.get('/:id', productController.getProductDtls);

module.exports = router;