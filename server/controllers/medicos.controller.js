const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const getMedicos = async (req, res) => {
    try {
        const medicosDB = await Medico.find();
            // .populate('usuario', '-_id -__v -password')
            // .populate('hospital', '-_id -__v');
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

const updateMedico = async (req, res) => {
    try {
        const idMedico = req.params.id;
        const uid = req.uid;
        const idHospital = req.body.hospital;
        const nombre = req.body.nombre;
    
        const hospitalDB = await Hospital.findById(idHospital);
        if (!hospitalDB) {
            return res.json({
                ok: false,
                msg: 'el hospital no existe'
            });
        }
        const medicoDB = await Medico.findByIdAndUpdate(idMedico, {hospital: idHospital, nombre: nombre, usuario: uid}, {new: true});
        if (!medicoDB) {
            return res.json({
                ok: false,
                msg: 'el medico no existe'
            });
        }
        res.json({
            ok: true,
            msg: medicoDB
        });
    } catch (error) {
        console.log(error);
    }
}

const deleteMedico = async (req, res) => {
    try {
        const id = req.params.id;
        const medicoDB = await Medico.findByIdAndUpdate(id, {activo: false}, {new: true});
        if (!medicoDB) {
            res.status(500).json({
                ok: false,
                msg: 'No existe el medico'
            });    
        }
        res.json({
            ok: true,
            medicoDB
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    postMedico,
    getMedicos,
    updateMedico,
    deleteMedico
}