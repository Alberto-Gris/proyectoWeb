"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventasController_1 = require("../controllers/ventasController");
class VentasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando ruta ventas'));
        //las de ventas
        this.router.get('/mostrarCarritos', ventasController_1.ventasController.mostrar_todas_ventas); //
        this.router.get('/mostrarTodosArticulos', ventasController_1.ventasController.mostrar_articulos_carrito_todos); //
        this.router.get('/mostrarUnArticulo/:idVenta', ventasController_1.ventasController.mostrar_articulos_uno); //
        this.router.get('/mostrarUnCarrito/:idUsuario', ventasController_1.ventasController.mostrar_venta_uno); //
        this.router.post('/insertarCarrito', ventasController_1.ventasController.insertarVenta); //
        this.router.post('/insertarArticulo', ventasController_1.ventasController.insertarCarrito); //
        this.router.delete('/eliminarCarrito/:idV', ventasController_1.ventasController.eliminarVenta); //
        this.router.delete('/eliminarArticulo/:idArticulo', ventasController_1.ventasController.eliminarArticulo); //
        this.router.put('/actualizarArticulo/:idArticulo', ventasController_1.ventasController.actualizarCantidadArticulo); //
        this.router.put('/actualizarTotal/:idV', ventasController_1.ventasController.actualizarTotalVenta); //
        this.router.get('/efectuarCompra/:idVenta', ventasController_1.ventasController.efectuarCompra); //
    }
}
const ventasRoutes = new VentasRoutes();
exports.default = ventasRoutes.router;
