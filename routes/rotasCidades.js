import express from 'express'
import { CidadeController } from '../controller/CidadeController.js'

const roteador = express.Router()
const cidadeController = new CidadeController()

roteador.get("/", cidadeController.get)
roteador.get("/:idCidade", cidadeController.getById);
roteador.post("/", cidadeController.post);
roteador.put("/:idCidade", cidadeController.put);
roteador.patch("/:idCidade", cidadeController.patch);
roteador.delete("/:idCidade", cidadeController.delete);

export default roteador