const { Schema, model } = require('mongoose');

const hospitalSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es un campo requerido']
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    activo: {
        type: Boolean,
        required: true,
        default: true
    }
}, { collection: 'hospitales'});

hospitalSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object
});

module.exports = model('hospitales', hospitalSchema);
