import errors from 'http-errors'
import express from "express"

import rotasCategorias from "./routes/rotasCategorias.js"
import rotasCidades from "./routes/rotasCidades.js"
import rotasClientes from "./routes/rotasClientes.js"
import rotasPedidos from "./routes/rotasPedidos.js"
import rotasProdutos from "./routes/rotasProdutos.js"

const porta = 8001
const hostname = "localhost"

const app = express()

//Config para utilizar JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Rotas
app.get("/", (req, res, next) => {
    res.json({ resposta: "Seja bem-vindo(a) à API de pedidos!" })
})
app.use("/categorias", rotasCategorias)
app.use("/cidades", rotasCidades)
app.use("/clientes", rotasClientes)
app.use("/pedidos", rotasPedidos)
app.use("/produtos", rotasProdutos)

app.use((req, res, next) => next(errors(404)))

app.use((erro, req, res, next) => {
    console.error(erro)
    res.status(erro.status || 500).json({ erro: erro.message || "Erro no servidor" })
})

app.listen(porta, () => {
    console.log(`API de pedidos executando em http://${hostname}:${porta}`)
})

