const {Router} = require('express');
const {check} = require('express-validator');
const { horariosGet,
        horariosPut} = require('../controllers/horarios');
const { validarCampos } = require('../middlewares/validar-campos');

const  router = Router();
router.get('/',horariosGet);
router.put('/:id',[
    check('horario','El horario es obligatorio').not().isEmpty(),
    validarCampos
],horariosPut);

module.exports = router;
