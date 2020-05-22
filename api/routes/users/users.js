const express = require('express');
const router = express.Router();
const { register, registerValidation } = require('./register');
const login = require('./login');
const { updateUser, updateUserValidation } = require('./updateUser');

router.post('/login', login);
router.post('/', registerValidation, register);
router.put('/', updateUserValidation, updateUser);

module.exports = router;