"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando ruta usuarios'));
        //Las de usuarios
        this.router.post('/crearUsuario', usuariosController_1.usuariosController.createUsuario);
        this.router.get('/mostrarUsuarios', usuariosController_1.usuariosController.mostrar_todos_usuarios);
        this.router.post('/iniciarSesion', usuariosController_1.usuariosController.iniciarSecion);
        this.router.put('/actualizarUsuario/:idU', usuariosController_1.usuariosController.actualizarUsuario);
        this.router.delete('/eliminarUsuario/:idU', usuariosController_1.usuariosController.eliminarUsuario);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
