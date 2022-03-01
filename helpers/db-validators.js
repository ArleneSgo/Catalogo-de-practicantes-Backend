const Practicante = require('../models/practicante');

const existePracticantePorId = async(id) => {
    //verificar si existe usuario
    const existePracticante = await Practicante.findByPk(id);
    if(!existePracticante){
        throw new Error(`El id no existe: ${id}`);
    }
}
module.exports = {
    existePracticantePorId
}
