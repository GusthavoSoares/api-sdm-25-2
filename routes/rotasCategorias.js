import express from "express";
import { CategoriaController } from "../controller/CategoriaController.js";

const roteador = express.Router();
const categoriaController = new CategoriaController();

roteador.get("/", categoriaController.get);
roteador.get("/:idCategoria", categoriaController.getById);
roteador.post("/", categoriaController.post);
roteador.put("/:idCategoria", categoriaController.put);
roteador.patch("/:idCategoria", categoriaController.patch);
roteador.delete("/:idCategoria", categoriaController.delete);

export default roteador;
