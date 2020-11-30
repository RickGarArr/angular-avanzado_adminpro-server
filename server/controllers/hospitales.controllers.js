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

const updateHospital = async (req, res = response) => {
    try {
        const id = req.params.id;
        const uid = req.uid;
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            res.status(500).json({
                msg: 'No existe el hospital'
            });    
        }
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true});
        res.json({
            ok: true,
            hospital: hospitalActualizado
        }); 
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Hable con el administrador'
        });
    }
}

const deleteHospital = async (req, res = response) => {
    try {
        const id = req.params.id;
        const hospitalDB = await Hospital.findByIdAndUpdate(id, {activo: false}, {new: true});
        if (!hospitalDB) {
            res.status(500).json({
                ok: false,
                msg: 'No existe el hospital'
            });    
        }
        res.json({
            ok: true,
            hospitalDB
        });
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getHospitales,
    postHospital,
    updateHospital,
    deleteHospital
}