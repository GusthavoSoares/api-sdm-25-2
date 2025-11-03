import express from 'express'
import { ClienteController } from '../controller/ClienteController.js'

const roteador = express.Router()
const clienteController = new ClienteController()

roteador.get("/", clienteController.get)
roteador.get("/:idCliente", clienteController.getById);
roteador.post("/", clienteController.post);
roteador.put("/:idCliente", clienteController.put);
roteador.patch("/:idCliente", clienteController.patch);
roteador.delete("/:idCliente", clienteController.delete);

export default roteador