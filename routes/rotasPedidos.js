import express from 'express'
import { PedidoController } from '../controller/PedidoController.js'

const roteador = express.Router()
const pedidoController = new PedidoController()

roteador.get("/", pedidoController.get)
roteador.get("/:idPedido", pedidoController.getById);
roteador.post("/", pedidoController.post);
roteador.put("/:idPedido", pedidoController.put);
roteador.patch("/:idPedido", pedidoController.patch);
roteador.delete("/:idPedido", pedidoController.delete);

export default roteador