const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarios = async(req = request, res = response) => {
    const query = {estado: true};

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'Get Usuario',
        listaUsuarios
    });
}

const postUsuario = async(req = request, res = response) => {
    const {nombre, correo, password, rol} = req.body;
    const usuarioGuardado = new Usuario({nombre, correo, password, rol});

    const salt = bcrypt.genSaltSync();
    usuarioGuardado.password = bcrypt.hashSync(password, salt);

    await usuarioGuardado.save();

    res.json({
        msg: 'Post Usuario',
        usuarioGuardado
    });
}

const putUsuario = async(req = request, res = response) => {
    const {id} = req.params;
    const {_id, img, estado, google, ...resto} = req.body;

    if (resto.password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Put Usuario',
        usuarioEditado
    });
}

const deleteUsuario = async(req = request, res = response) => {
    const {id} = req.params;

    const usuarioEliminado = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        msg: 'Delete Usuario',
        usuarioEliminado
    });
}

module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}