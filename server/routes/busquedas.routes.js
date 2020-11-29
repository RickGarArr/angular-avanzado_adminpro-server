// api/todo/:parametro
const { Router } = require('express');
const {
    getCollectionsDoc,
    getTodo } = require('../controllers/busqueda.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
let router = Router();

router.get('/:parametro', [
    validarJWT
], getTodo);

router.get('/:coleccion/:parametro', [validarJWT], getCollectionsDoc);

module.exports = router; 