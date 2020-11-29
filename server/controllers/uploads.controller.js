const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const path = require('path');
const fs = require('fs');

const fileUpload = ( req, res ) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['medicos', 'hospitales', 'usuarios'];

    if (!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: `La collecion ${tipo} no existe`
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }

    file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const ext = nombreCortado[nombreCortado.length - 1];
    // validar extencion
    const extValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extValidas.includes(ext)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un archivo valido'
        });
    }
    // cambiar nombre de archivo
    const nombreArchivo = `${uuidv4()}.${ext}`;
    // crear el path
    const path = `./server/uploads/${tipo}/${nombreArchivo}`;
    // mover archivo al path
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                err
            });
        }

        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg : 'archivo guardado exitosamente',
            nombreArchivo
        });
    });

}

const sendImg = (req, res) => {
    const { tipo, img } = req.params;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${img}`);
    if (!fs.existsSync(pathImg)){
        return res.json({
            ok: false,
            msg: 'La imagen no existe'
        });
    }
    res.sendFile(pathImg);
}

module.exports = {
    fileUpload,
    sendImg
}