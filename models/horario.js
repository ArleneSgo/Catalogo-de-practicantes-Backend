const Sequelize = require('sequelize')
const { sequelize } = require('../database/config');
const horarioModel= sequelize.define('horarios',{
    "id": {
            type:Sequelize.INTEGER, 
            primaryKey:true,
            autoIncrement: true,
            allowNull: false},
    "horario": {
                type: Sequelize.STRING(45),
                },
    
})
module.exports = horarioModel