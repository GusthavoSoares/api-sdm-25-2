import express from 'express'
import { ProdutoController } from '../controller/ProdutoController.js'

const roteador = express.Router()
const produtoController = new ProdutoController()

roteador.get("/", produtoController.get)
roteador.get("/:idProduto", produtoController.getById);
roteador.post("/", produtoController.post);
roteador.put("/:idProduto", produtoController.put);
roteador.patch("/:idProduto", produtoController.patch);
roteador.delete("/:idProduto", produtoController.delete);

export default roteador