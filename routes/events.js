/*
    route: /api/events
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlaweres/validar-campos');
const { isDate } = require('../helpers/isDate');
const { validarJWT } = require('../middlaweres/validar-jwt')
const { getEventos,crearEvento,actualizarEvento,eliminarEvento } = require('../controllers/eventos');

router.use(validarJWT);

//Obtener eventos
router.get('/', getEventos );

//Crear un nuevo evento
router.post('/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatorio').custom(isDate),
        check('end','Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
);

//Actualizar evento
router.put('/:id', actualizarEvento );

//Eliminar evento
router.delete('/:id', eliminarEvento );


module.exports = router;