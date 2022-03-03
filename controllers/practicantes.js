const { response, request } = require('express');
const Practicante = require('../models/practicante');
const sequelize = require('sequelize')

//Mostrar todos lo practicantes dados de alta
const practicantesGet = async(req = request, res = response) => {
    /*const totalActivos = await Practicante.count({
        where: {
          "activo": 1
        }
      });*/
    await Practicante.findAll({attributes:['id','nombre',
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
        msg: 'Practicante modificado exitosamente',
    })
}
const practicantesPost = async(req, res = response)=> {
    const {nombre,apellidos,genero,correo,telefono,clabeInterbancaria,horario,fechaNacimiento} = req.body;
    const practicante =await Practicante.create({
                                                nombre: nombre,
                                                apellidos: apellidos,
                                                genero: genero,
                                                correo: correo,
                                                telefono: telefono,
                                                clabeInterbancaria: clabeInterbancaria,
                                                horario: horario,
                                                fechaNacimiento:fechaNacimiento});
   
    res.json({
        msg: 'Practicante registrado exitosamente',
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
    const practicante = await Practicante.findOne({
                                                    attributes:[
                                                        'id',
                                                        'nombre',
                                                        'apellidos',
                                                        'genero',
                                                        'correo',
                                                        'telefono',
                                                        'clabeInterbancaria',
                                                        'horario',
                                                        'activo',
                                                        [
                                                            sequelize.fn
                                                            (
                                                              "DATE_FORMAT", 
                                                              sequelize.col("fechaNacimiento"), 
                                                              "%d-%m-%Y"
                                                            ),
                                                            "fechaNacimiento",
                                                        ],
                                                    ],
                                                    where:{'id':id}})
   // var fecha_utc = new Date(practicante.fechaNacimiento.getUTCFullYear(), practicante.fechaNacimiento.getUTCMonth(), practicante.fechaNacimiento.getUTCDate());
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