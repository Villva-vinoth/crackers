const router = require('express').Router();
const {getAllOrders, getOneOrder, updateOrder, createOrder} = require('../controller/order.controller');

router.get('/list',getAllOrders);
router.get('show/:id',getOneOrder);
router.patch('/edit/:id',updateOrder);
router.post('/create',createOrder);

module.exports = router;