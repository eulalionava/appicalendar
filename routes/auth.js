/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check, oneOf } = require('express-validator');
const { crearUsuario,loginUsuario,revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlaweres/validar-campos');


router.post(
    '/new',
    [
        check('name','El nombre el obligatorio').not().isEmpty(),
        check('email','El email el obligatorio').isEmail(),
        check('password','El password debe ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario
);

router.post(
    '/',
    [
        check('email','El email es abigatorio').isEmail(),
        check('password','El password debe ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario
);

router.get('/renew',revalidarToken);

module.exports = router;