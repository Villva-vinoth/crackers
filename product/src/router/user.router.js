const router = require('express').Router();
const { getAllUsers, getOneUser, updateUser, deleteUser, createUser } = require('../controller/user.controller');

router.get('/list', getAllUsers);
router.get('/show/:id', getOneUser);
router.patch('/edit/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.post('/create', createUser);

module.exports = router;