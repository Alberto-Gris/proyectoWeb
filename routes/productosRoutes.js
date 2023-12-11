"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productosController_1 = require("../controllers/productosController");
class ProductosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando ruta productos'));
        //Las de productos
        this.router.get('/mostrarProductos/:categoriaP', productosController_1.productosController.mostrar_todos_productos);
        this.router.post('/insertarProducto', productosController_1.productosController.insertarProducto);
        this.router.put('/actualizarProducto/:idP', productosController_1.productosController.actualizarProducto);
        this.router.delete('/eliminarProducto', productosController_1.productosController.eliminarProducto);
    }
}
const productosRoutes = new ProductosRoutes();
exports.default = productosRoutes.router;
