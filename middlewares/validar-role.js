const { request, response } = require('express');

const esAdminRole = (req = request, res = response, next) => {
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Verificar el role sin validar el token primero'
        });
    }

    const {rol, nombre} = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(500).json({
            msg: `${ nombre } no es Administrador - Sin acceso a esta función`
        });
    }

    next();
}

const esClientRole = (req = request, res = response, next) => {
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Verificar el role sin validar el token primero'
        });
    }

    const {rol, nombre} = req.usuario;

    if (rol !== 'CLIENT_ROLE') {
        return res.status(500).json({
            msg: `${ nombre } no es Cliente - Sin acceso a esta función`
        });
    }

    next();
}

const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            })
        }

        next();
    }
}

module.exports = {
    tieneRole,
    esAdminRole,
    esClientRole
}