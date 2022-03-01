//const mongoose = require('mongoose');
const Sequelize = require('sequelize');


const sequelize = new Sequelize('heroku_2a1b8b7153dc704','b317d6f8e4ac24','bf58bd49',{
    host: 'us-cdbr-east-05.cleardb.net',
    dialect: 'mysql',
    port: process.env.PORT_DB
})
//mysql://b317d6f8e4ac24:bf58bd49@us-cdbr-east-05.cleardb.net/heroku_2a1b8b7153dc704?reconnect=true
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