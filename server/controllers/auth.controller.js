const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt.helper');

const login = async (req, res) => {

    const { email, password } = req.body;
    
    try {
        // Verificar Email
        const usuarioDB = await Usuario.findOne({email: email});
        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                msg: 'El {email} y contraseñas no coinciden'
            });
        }
        // Verificar Contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(500).json({
                ok: false,
                msg: 'El email y {contraseñas} no coinciden'
            });
        }
        // Generar Token
        const jwt = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            jwt
        });

    } catch (error) {
        console.log(erro);
        return res.status(500).json({
            ok: false,
            msg: 'Pongse en cotacto con el administrador'
        });
    }
}

module.exports = {
    login
}