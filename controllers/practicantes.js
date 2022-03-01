const { response, request } = require('express');
const Practicante = require('../models/practicante');

const practicantesGet = async(req = request, res = response) => {
    const totalActivos = await Practicante.count({
        where: {
          "activo": 1
        }
      });
    await Practicante.findAll({attributes:['nombre',
                                    'apellidos',
                                    'genero',
                                    'correo',
                                    'telefono',
                                    'clabeInterbancaria',
                                    'horario',
                                    'activo'],
                                where: {
                                    'activo': 1
                                    }})
    .then(practicantes=>{
        //const resultados = JSON.stringify(practicantes)
        res.json({
            practicantes,
            totalActivos
        })
    })
    .catch(error=>{
        console.log(error)
    })
};
const practicantesPut = async(req, res = response)=> {
    const { id }  = req.params;
    const{_id,...resto}=req.body;
    const practicante = await Practicante.findOne({ where:{'id': id}})
    await practicante.update(resto)
    res.json({
        msg: 'put API- controlador',
        practicante
    })
}
const practicantesPost = async(req, res = response)=> {
    const {nombre,apellidos,genero,correo,telefono,clabeInterbancaria,horario} = req.body;
    const practicante =await Practicante.create({
                                                nombre: nombre,
                                                apellidos: apellidos,
                                                genero: genero,
                                                correo: correo,
                                                telefono: telefono,
                                                clabeInterbancaria: clabeInterbancaria,
                                                horario: horario});
   
    res.json({
        msg: 'post API-controlador',
        practicante
    })
}

const practicantesDelete = async(req, res = response)=> {
    const {id} = req.params;
    const practicante = await Practicante.findOne({where:{'id':id}})
    await practicante.update({'activo':0})
    res.json({
        msg: 'delete API-controlador',
        practicante
    })
}
const practicantesIdGet = async(req, res = response)=> {
    const {id} = req.params;
    const practicante = await Practicante.findOne({where:{'id':id}})
    res.json({
        msg: 'Get API-controlador',
        practicante
    })
}

module.exports = {
    practicantesGet,
    practicantesIdGet,
    practicantesPut,
    practicantesPost,
    practicantesDelete
}