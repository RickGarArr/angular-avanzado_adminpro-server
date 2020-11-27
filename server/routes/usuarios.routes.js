const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');
const {
    getUsuarios,
    crearUsuario,
    editarUsuario,
    borrarUsuario
} = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

// ruta: /api/usuarios

router.get('/', validarJWT ,getUsuarios );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], crearUsuario );

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos
], editarUsuario );

router.delete('/:id', validarJWT,borrarUsuario)

module.exports = router;