"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ventasController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class VentasController {
    mostrar_todas_ventas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM venta');
            res.json(respuesta);
        });
    }
    mostrar_venta_uno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM venta WHERE idUsuario=?', [idUsuario]);
            res.json(respuesta);
        });
    }
    //aqui va el crud
    insertarVenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const inserventa = yield database_1.default.query("INSERT INTO venta set ?", [req.body]);
            res.json(inserventa.insertId);
            //res.json(null);
        });
    }
    insertarCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertarCompra = yield database_1.default.query("INSERT INTO carritoCompra set ?", [req.body]);
            //res.json(insertarCompra)
            if (insertarCompra.affectedRows > 0) {
                res.json(true);
            }
            else {
                res.json(false);
            }
        });
    }
    mostrar_articulos_carrito_todos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM carritocompra');
            res.json(respuesta);
        });
    }
    mostrar_articulos_uno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idVenta } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM carritocompra where idVenta=?', [idVenta]);
            res.json(respuesta);
        });
    }
    actualizarTotalVenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idV } = req.params;
            const total = yield database_1.default.query("SELECT SUM(p.precioP * c.cantidadP) AS precioTotal FROM carritocompra c JOIN productos p ON c.idProducto = p.idP AND c.idVenta=? GROUP BY c.idVenta", [idV]);
            //console.log(total);
            const resp = yield database_1.default.query("UPDATE venta set total=? WHERE idV = ?", [total[0].precioTotal, idV]); //Actualizar el total
            if (resp.affectedRows > 0) {
                res.json(true);
            }
            else {
                res.json(false);
            }
            //res.json(null);
        });
    }
    actualizarCantidadArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArticulo } = req.params;
            //console.log(req.params);
            //console.log(idP);
            const resp = yield database_1.default.query("UPDATE carritocompra set ? WHERE idArticulo = ?", [req.body, idArticulo]);
            if (resp.affectedRows > 0) {
                res.json(true);
            }
            else {
                res.json(false);
            }
            //res.json(null);
        });
    }
    eliminarVenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idV } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM venta WHERE idV = ${idV}`);
            if (resp.affectedRows > 0) {
                const respuesta = yield database_1.default.query(`DELETE FROM carritocompra WHERE idVenta = ${idV}`);
                if (respuesta.affectedRows > 0) {
                    res.json(true);
                }
                else {
                    res.json(0);
                }
            }
            else {
                res.json(false);
            }
            //res.json(resp);
        });
    }
    eliminarArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArticulo } = req.params;
            const respuesta = yield database_1.default.query(`DELETE FROM carritocompra WHERE idArticulo = ${idArticulo}`);
            if (respuesta.affectedRows > 0) {
                res.json(true);
            }
            else {
                res.json(false);
            }
            //res.json(resp);
        });
    }
    efectuarCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idVenta } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM carritocompra where idVenta = ?', [idVenta]); //Obtiene datos de los articulos en el carrito
            //console.log(respuesta.idArticulo);
            let x;
            for (x of respuesta) {
                const cantidadP = yield database_1.default.query('UPDATE productos SET cantidadP=cantidadP-? WHERE idP=?', [x.cantidadP, x.idProducto]); //Actualiza las existencias de esos productos
            }
            const eliminarA = yield database_1.default.query(`DELETE FROM carritocompra WHERE idVenta = ${idVenta}`); //elimina todos los articulos del carrito
            const ganancia = yield database_1.default.query("SELECT total,idUsuario FROM venta WHERE ?", [idVenta]); //Selecciona el total de la venta
            const subir = yield database_1.default.query("INSERT INTO ganancias set ?", [ganancia[0]]);
            const eliminarV = yield database_1.default.query(`DELETE FROM venta WHERE idV = ${idVenta}`);
            res.json(true);
        });
    }
}
exports.ventasController = new VentasController();
