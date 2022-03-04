const { response, request } = require('express');
const Horario = require('../models/horario')
const sequelize = require('sequelize')


//mostrar horarios disponibles
const horariosGet = async(req = request, res = response) => {
    await Horario.findAll({attributes:['id','horario']})
    .then(horarios=>{
        res.json({
            horarios
        })
    })
    .catch(error=>{
        console.log(error)
    })
};
//Proponer Horario
const horariosPut = async(req, res = response)=> {
    const {id} = req.params;
    const {...horario}=req.body;
    const h = await Horario.findOne({where:{'id':id}})
    await h.update(horario)
    res.json({
        msg: 'Horario modificado exitosamente',
    })
}
module.exports = {
    horariosGet,
    horariosPut
}