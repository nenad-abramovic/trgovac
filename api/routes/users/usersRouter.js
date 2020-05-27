const express = require('express');
const router = express.Router();
const { register, registerValidation } = require('./register');
const { login, loginValidation } = require('./login');
const { updateUser, updateUserValidation } = require('./updateUser');

router.post('/login', loginValidation, login);
router.post('/', registerValidation, register);
router.put('/', updateUserValidation, updateUser);

module.exports = router;