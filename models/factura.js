const { Schema, model } = require('mongoose');

const FacturaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    direccion_empresa: {
        type: String,
        required: [true, 'La direccion es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    valor: {
        type: Number,
        default: 0
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    descripcion: { type: String },
    total: {
        type: Number,
        default: 0
    }
});

module.exports = model('Factura', FacturaSchema);