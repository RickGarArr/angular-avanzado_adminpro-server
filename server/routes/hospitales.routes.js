// api/hospitales
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getHospitales,
    postHospital,
    updateHospital,
    deleteHospital
} = require('../controllers/hospitales.controllers');

const router = Router();

router.get('/get',[
    validarJWT  
], getHospitales);

router.post('/create', [
    validarJWT,
    check('nombre', 'El Nombre del hospital es Necesario').notEmpty(),
    validarCampos
], postHospital);

router.put('/update/:id', [
    validarJWT,
    check('nombre','El Nombre del hospital es Necesario').notEmpty(),
    validarCampos
], updateHospital);

router.delete('/delete/:id', validarJWT, deleteHospital);


module.exports = router;

