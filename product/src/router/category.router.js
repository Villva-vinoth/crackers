const router = require('express').Router();
const { getAllCategorys, getOneCategory, updateCategory, deleteCategory, createCategory } = require('../controller/category.controller');

router.get('/list', getAllCategorys);
router.get('/show/:id', getOneCategory);
router.patch('/edit/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);
router.post('/create', createCategory);

module.exports = router;