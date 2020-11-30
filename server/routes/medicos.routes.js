// /api/medicos
const { Router } = require('express');
const { validarJWT } =require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const {
    postMedico,
    getMedicos,
    updateMedico,
    deleteMedico
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

router.put('/update/:id', [
    validarJWT,
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('hospital', 'El Hospital es requerido').isMongoId(),
    validarCampos
], updateMedico)

router.delete('/delete/:id', validarJWT, deleteMedico);
module.exports = router;