const router = require('express').Router();
const {getAllProducts, getOneProduct, updateProduct, deleteProduct, createProduct} = require('../controller/product.controller');

router.get('/list',getAllProducts);
router.get('show/:id',getOneProduct);
router.patch('/edit/:id',updateProduct);
router.delete('/delete/:id',deleteProduct);
router.post('/create',createProduct);

module.exports = router;