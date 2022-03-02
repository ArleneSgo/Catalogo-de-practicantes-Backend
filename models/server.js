const express = require('express')
const cors = require('cors')
const { dbConection } = require('../database/config');
class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.practicantesPath = '/api/practicantes';
        // Conectar a base de datos
        this.conectarDb();
        //middlewares
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();
    }
    async conectarDb(){
        await dbConection();
    }
    middlewares(){
        //cors
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.practicantesPath, require('../routes/practicantes'));
    }
    listen(){
        this.app.listen(this.port,() => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
}

module.exports = Server;