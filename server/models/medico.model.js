const { Schema, model } = require('mongoose');

const medicoSchema= new Schema({
    nombre: { type: String, required: true},
    img: { type: String },
    usuario: { type: Schema.Types.ObjectId, ref: 'usuarios', required: true },
    hospital: { type: Schema.Types.ObjectId, ref: 'hospitales', required: true },
    activo: { type: Boolean, required: true, default: true }
});

medicoSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object
}, { collection: 'medicos'});

module.exports = model('medicos', medicoSchema);