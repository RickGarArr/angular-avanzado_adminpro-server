const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es un campo requerido']
    },
    email: {
        type: String,
        required: [true, 'El email es un campo requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es un campo requerido']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'El role es un campo requerido'],
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object
});

module.exports = model('Usuarios', usuarioSchema);
