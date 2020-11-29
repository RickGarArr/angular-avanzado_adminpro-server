// getTodo
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');

const getTodo = async (req, res) => {
    const parametro = req.params.parametro;
    const regexp = new RegExp(parametro, 'i');
    
    const [ usuarios, hospitales, medicos ] = await Promise.all([
        Usuario.find({ nombre: regexp}),
        Hospital.find({ nombre: regexp }),
        Medico.find({ nombre: regexp })
    ]);

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    });
}

const getCollectionsDoc = async (req, res) => {
    const collection = req.params.coleccion;
    const parametro = req.params.parametro;
    const regexp = new RegExp(parametro, 'i');

    let respuesta;
    switch (collection) {
        case 'medicos':
            respuesta = await Medico.find({nombre: regexp});
            break;
        case 'usuarios':
            respuesta = await Usuario.find({nombre: regexp});
            break;
        case 'hospitales':
            respuesta = await Hospital.find({nombre: regexp});
            break;
        default: 
            return res.status(400).json({
                ok: false,
                msg: 'La coleccion no existe'
            });
    }

    res.json({
        ok: true,
        respuesta
    });

}

module.exports = {
    getTodo,
    getCollectionsDoc
}