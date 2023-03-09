const { request, response, json} = require('express');
const Factura = require('../models/factura');

const getFacturas = async(req = request, res = response) => {
    const query = {estado: true};

    const listaFacturas = await Promise.all([
        Factura.countDocuments(query),
        Factura.find(query).populate('usuario', 'correo').populate('producto', 'nombre')
    ]);

    res.json({
        msg: 'Get Factura',
        listaFacturas
    });
}

const getFacturaPorId = async(req = request, res = response) => {
    const {id} = req.params;

    const facturaById = await Factura.findById(id).populate('usuario', 'nombre').populate('producto', 'nombre');

    res.status(201).json(facturaById);
}

const postFactura = async(req = request, res = response) => {
    const {estado, usuario, ...body} = req.body;

    const facturaDB = await Factura.findOne({nombre: body.nombre});

    if (facturaDB) {
        return res.status(400).json({
            msg: `La factura ${facturaDB.nombre}, ya existe`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const factura = await Factura(data);

    await factura.save();

    res.status(201).json(producto);
}

const putFactura = async(req = request, res = response) => {
    const {id} = req.params;
    const {estado, usuario, ...restoDatos} = req.body;

    if (restoDatos.nombre) {
        restoDatos.nombre = restoDatos.nombre.toUpperCase();
        restoDatos.usuario = req.usuario._id;
    }

    const facturaEditada = await Factura.findByIdAndUpdate(id, restoDatos, {new: true});

    res.status(201).json({
        msg: 'Put Factura',
        facturaEditada
    })
}

const deleteFactura = async(req = request, res = response) => {
    const {id} = req.params;

    const facturaBorrada = await Factura.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.status(201).json({
        msg: 'DELETE',
        facturaBorrada
    });
}

module.exports = {
    getFacturas,
    getFacturaPorId,
    postFactura,
    putFactura,
    deleteFactura
}