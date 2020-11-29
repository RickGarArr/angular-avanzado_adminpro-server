const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const getMedicos = async (req, res) => {
    try {
        const medicosDB = await Medico.find()
            .populate('usuario', '-_id -__v -password')
            .populate('hospital', '-_id -__v');
        res.json({
            ok: true,
            medicosDB
        });        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        });
    }
}

const postMedico = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.body.hospital);
        if (!hospital) {
            return res.status(500).json({
                ok: false,
                msg: 'El Hospital NoExiste'
            });
        }
        const usuario = req.uid;
        const medicoSchema = new Medico({usuario, ...req.body});
        const medicoDB = await medicoSchema.save(); 
        res.json({
            medicoDB
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
}

module.exports = {
    postMedico,
    getMedicos
}