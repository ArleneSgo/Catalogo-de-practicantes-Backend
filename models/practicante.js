const Sequelize = require('sequelize')
const { sequelize } = require('../database/config');
const practicanteModel= sequelize.define('practicantes',{
    "id": {
            type:Sequelize.INTEGER, 
            primaryKey:true,
            autoIncrement: true,
            allowNull: false},
    "nombre": {
                type: Sequelize.STRING(45),
                },
    "apellidos": {
                   type: Sequelize.STRING(45),
                    },
    "genero": {
                type: Sequelize.STRING(45),
                emun: ['Femenino','Masculino']
                },
    "correo": {
                type: Sequelize.STRING(45),
                validate:{
                    isEmail: true,  
                
                }},
    "telefono": {
                   type: Sequelize.STRING(45),
                    },
    "clabeInterbancaria": {
                            type: Sequelize.STRING(45),
                            },
    "horario": { type: Sequelize.INTEGER,
                },
    "activo": {
                type: Sequelize.TINYINT(1),
                defaultValue: 1
                },
    "fechaNacimiento":{
                type: Sequelize.DATE,
                /*get: function() { // or use get(){ }
                    return this.getDataValue('fechaNacimiento')
                      .toLocaleString('en-GB', { timeZone: 'UTC' });
                  }*/
    }
})
module.exports = practicanteModel