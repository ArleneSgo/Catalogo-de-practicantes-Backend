const { response, request } = require('express');
const Practicante = require('../models/practicante');

//Mostrar todos lo practicantes dados de alta
const practicantesGet = async(req = request, res = response) => {
    /*const totalActivos = await Practicante.count({
        where: {
          "activo": 1
        }
      });*/
    await Practicante.findAll({attributes:['nombre',
                                    'apellidos',
                                    'correo',
                                    'activo']})
    .then(practicantes=>{
        res.json({
            practicantes
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
        msg: 'Practicante registrado exitosamente',
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
        msg: 'Practicante modificado exitosamente',
    })
}

const practicantesDelete = async(req, res = response)=> {
    const {id} = req.params;
    const practicante = await Practicante.findOne({where:{'id':id}})
    if(practicante.activo === 1){
        await practicante.update({'activo':0});  
        res.json({
            msg:'Se modificó practicante a estado no activo exitosamente'
        }) 
    }else{
        await practicante.update({'activo':1});
        res.json({
            msg: 'Se modificó practicante a estado activo exitosamente'
        })
    }
    
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