const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(500).json({
            ok: false,
            msg: 'JWT required'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'invalid JWT'
        });
    }

}

module.exports = {
    validarJWT
}