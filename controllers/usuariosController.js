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
exports.usuariosController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class UsuariosController {
    mostrar_todos_usuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log("YA ESTAMOS AQUI");
            const respuesta = yield database_1.default.query('SELECT * FROM usuarios');
            res.json(respuesta);
        });
    } /*
public async listOne(req: Request, res: Response): Promise <void>{
const {id} = req.params;
const respuesta = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
if(respuesta.length>0){
    res.json(respuesta[0]);
    return ;
}
res.status(404).json({'mensaje': 'Usuario no encontrado'});
}*/
    //aqui va el crud
    createUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body)
            const { nombreU } = req.body;
            const prueba = yield database_1.default.query("SELECT idU FROM usuarios WHERE nombreU= ?", [nombreU]);
            //console.log(prueba)
            if (prueba == "") {
                const resp = yield database_1.default.query("INSERT INTO usuarios set ?", [req.body]);
                //res.json(resp);
                if (resp.affectedRows == 1) { //devuelve true o false
                    res.json(true);
                }
                else {
                    res.json(false);
                }
            }
            else {
                res.json(false);
            }
            //res.json(null);
        });
    }
    iniciarSecion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombreU, contrasenaU } = req.body;
            //console.log(req.params);
            //console.log(nombreU);
            //console.log(contrasenaU);
            const resp = yield database_1.default.query("SELECT nombreU,contrasenaU FROM usuarios WHERE nombreU = ? AND contrasenaU = ?", [nombreU, contrasenaU]);
            if (resp == "") {
                res.json(false);
            }
            else {
                res.json(true);
            }
            //res.json(null);
        });
    }
    actualizarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            //console.log(req.params);
            //console.log(req.body);
            const resp = yield database_1.default.query("UPDATE usuarios set ? WHERE idU = ?", [req.body, idU]);
            if (resp.affectedRows > 0) {
                res.json(true);
            }
            else {
                res.json(false);
            }
            //res.json(resp);
            //res.json(null);
        });
    }
    eliminarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM usuarios WHERE idU = ${idU}`);
            res.json(resp);
        });
    }
}
exports.usuariosController = new UsuariosController();
