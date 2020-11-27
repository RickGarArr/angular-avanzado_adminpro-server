// /api/login /
const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

router.post('/usuario', [
    check('email', 'El Correo Es Obligatorio').isEmail(),
    check('password', 'El Password es obligatorio').notEmpty(),
    validarCampos
], login);

module.exports = router;