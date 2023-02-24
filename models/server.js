const express = require('express');
const cors = require('cors');
const {dbConection} = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }


        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB(){
        await dbConection();
    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categoria'));
        this.app.use(this.paths.productos, require('../routes/producto'));
        this.app.use(this.paths.usuarios,require('../routes/usuario'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en ', this.port);
        })
    }
}

module.exports = Server;