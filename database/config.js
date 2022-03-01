//const mongoose = require('mongoose');
const Sequelize = require('sequelize');


const sequelize = new Sequelize('practicantes_database',process.env.USER,process.env.PASSWORD,{
    host: 'localhost',
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
/*const dbConection = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify:false
        });
        console.log('base de datos online');
    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}*/

module.exports = {
    dbConection,
    sequelize
}