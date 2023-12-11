"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
const productosController_1 = require("../controllers/productosController");
const ventasController_1 = require("../controllers/ventasController");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando ruta'));
        //Las de usuarios
        this.router.post('/crearUsuario', usuariosController_1.usuariosController.createUsuario);
        this.router.get('/mostrarUsuarios', usuariosController_1.usuariosController.mostrar_todos_usuarios);
        this.router.post('/iniciarSesion', usuariosController_1.usuariosController.iniciarSecion);
        this.router.put('/actualizarUsuario/:idU', usuariosController_1.usuariosController.actualizarUsuario);
        this.router.delete('/eliminarUsuario/:idU', usuariosController_1.usuariosController.eliminarUsuario);
        //Las de productos
        this.router.get('/mostrarProductos/:categoriaP', productosController_1.productosController.mostrar_todos_productos);
        this.router.post('/insertarProducto', productosController_1.productosController.insertarProducto);
        this.router.put('/actualizarProducto/:idP', productosController_1.productosController.actualizarProducto);
        this.router.delete('/eliminarProducto', productosController_1.productosController.eliminarProducto);
        //las de ventas
        this.router.get('/mostrarVentas', ventasController_1.ventasController.mostrar_todas_ventas);
        //this.router.get('/mostrarTodosCarritos',ventasController.mostrar_articulos_carrito);
        this.router.post('/insertarVenta', ventasController_1.ventasController.insertarVenta);
        this.router.post('/insertarArticulo', ventasController_1.ventasController.insertarCarrito);
        this.router.delete('/eliminarVenta/:idV', ventasController_1.ventasController.eliminarVenta);
        this.router.delete('/eliminarArticulo/:idArticulo', ventasController_1.ventasController.eliminarArticulo);
        this.router.put('/actualizarArticulo/:idArticulo', ventasController_1.ventasController.actualizarCantidadArticulo);
        this.router.put('/actualizarTotal/:idV', ventasController_1.ventasController.actualizarTotalVenta);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
