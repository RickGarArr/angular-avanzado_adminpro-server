const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    sendImg,
    fileUpload } = require('../controllers/uploads.controller');
const expressFileUpload = require('express-fileupload');

let router = Router();
router.use(expressFileUpload());

router.put('/:tipo/:id', [validarJWT], fileUpload);

router.get('/:tipo/:img', sendImg);

module.exports = router;