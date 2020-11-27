const Usuario = require('../models/usuario.model');
const { response } = require('express');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/jwt.helper');

const getUsuarios =  async (req, res) => {
    const usuarios =  await Usuario.find({}, 'nombre email role google');
    const uid = req.uid;
    res.json({
        ok: true,
        usuarios,
        uid
    });
}
const crearUsuario = async (req, res = response) => {
    const {email, password, nombre } = req.body; 
    try {
        const existeEmail = await Usuario.findOne({email: email});
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }
        const usuario = new Usuario({
            nombre,
            email,
            password
        });
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        
        await usuario.save();

        const jwt = await generarJWT(usuario.id);
    
        res.json({
            usuario,
            jwt
        });

    } catch (err) {

        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}
const editarUsuario = async (req, res) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                msg: 'El Usuario No Existe'
            });
        }

        const {password, google, email, ...campos} = req.body;
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({email: email});
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El email ya esta registrado'
                });
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true} );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
}
const borrarUsuario = async (req, res) => {
    let id = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(id);

        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                msg: 'Error, el Usuario no existe'
            });
        }

        await Usuario.findByIdAndDelete( id );
        
        res.json({
            ok: true,
            usuarioDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }
}


module.exports = {
    getUsuarios,
    crearUsuario,
    editarUsuario,
    borrarUsuario
}