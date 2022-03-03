//const mongoose = require('mongoose');
const Sequelize = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE,process.env.USER,process.env.PASSWORD,{
    host: process.env.HOST,
    dialect: 'mysql',
    port: process.env.PORT_DB
})
const dbConection = async() => {
    await sequelize.authenticate()
    await sequelize.sync()
    .then(()=>{
        console.log('Conexion a la base de datos ok')
    })
    .catch(error=>{
        console.log('el error de conexion es:'+error)
    })
}

module.exports = {
    dbConection,
    sequelize
}