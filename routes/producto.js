const { Router } = require('express');
const { check } = require('express-validator');
const { getProductos, getProductoPorId, postProducto, putProducto, deleteProducto } = require('../controllers/producto');
const { existeProductoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-role');

const router = Router();

router.get('/', getProductos);

router.get('/:id', [
    check('id', 'No es ID Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], getProductoPorId);

router.post('/agregar', [
    validarJWT,
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    validarCampos
], postProducto);

router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es ID Mongo válido').isMongoId(),
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeProductoPorId),
    validarCampos
], putProducto);

router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es ID Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], deleteProducto);

module.exports = router;