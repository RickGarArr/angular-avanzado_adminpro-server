// /api/medicos
const { Router } = require('express');
const { validarJWT } =require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const {
    postMedico,
    getMedicos
} = require('../controllers/medicos.controller');

let router = Router();

router.post('/create', [
    validarJWT,
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('hospital', 'El id hospital es requerido').isMongoId(),
    validarCampos
], postMedico);

router.get('/get', [
    validarJWT
], getMedicos);

module.exports = router;