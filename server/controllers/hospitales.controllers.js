const Hospital = require('../models/hospital.model');
const Usuario = require('../models/usuario.model');
const response = require('express');

const getHospitales = async (req, res = response) => {
    try {
        const hospitalesDB = await Hospital.find().populate('usuario','nombre img');
        res.json({
            ok: true,
            hospitalesDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        })
    }
}

const postHospital = async (req, res = response) => {
    try {
        const uid = req.uid;
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                msg: 'El Usuario no existe'
            });
        }
        const hospital = new Hospital({usuario: uid, ...req.body});
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospitalDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const putHospital = (req, res = response) => {
    res.json({
        ok: true, msg: 'Put Hospital'
    });
}

const deleteHospital = (req, res = response) => {
    res.json({
        ok: true, msg: 'delete Hospital'
    });
}

module.exports = {
    getHospitales,
    postHospital,
    putHospital,
    deleteHospital
}