const {Router} = require('express');
const {check} = require('express-validator');
const { practicantesGet,
        practicantesIdGet,
        practicantesPut, 
        practicantesPost, 
        practicantesDelete} = require('../controllers/practicantes');
const {existePracticantePorId} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const  router = Router();
router.get('/',practicantesGet);
router.get('/:id',[
        check('id').custom(existePracticantePorId),
        validarCampos
],practicantesIdGet);
router.put('/:id',[
        check('id').custom(existePracticantePorId),
        check('correo','El correo no es válido').isEmail(),
        check('genero','No es un género válido').isIn(['Femenino','Masculino']),
        validarCampos
], practicantesPut);
router.post('/',[
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('apellidos','Los apellidos son obligatorios').not().isEmpty(),
        check('genero','El genero es obligatorio').not().isEmpty(),
        check('genero','No es un género válido').isIn(['Femenino','Masculino']),
        check('correo','El correo es obligatorio').not().isEmpty(),
        check('telefono','El telefono es obligatorio').not().isEmpty(),
        check('clabeInterbancaria','La clabe es obligatoria').not().isEmpty(),
        check('horario','El horario es obligatorio').not().isEmpty(),
        check('correo','El correo no es válido').isEmail(),
        validarCampos
], practicantesPost);
router.delete('/:id',[
        check('id').custom(existePracticantePorId),
        validarCampos
], practicantesDelete);

module.exports = router;
