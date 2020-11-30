// /api/login /
const { Router } = require('express');
const { login, renewToken } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/usuario', [
    check('email', 'El Correo Es Obligatorio').isEmail(),
    check('password', 'El Password es obligatorio').notEmpty(),
    validarCampos
], login);

router.get('/renew', validarJWT, renewToken);

module.exports = router;