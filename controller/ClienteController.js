import Cliente from "../model/Cliente.js"
import conexao from "../model/Conexao.js"
import errors from "http-errors"

export class ClienteController {
    constructor() {
        this.get = this.get.bind(this)
        this.getById = this.getById.bind(this)
        this.post = this.post.bind(this)
        this.put = this.put.bind(this)
        this.delete = this.delete.bind(this)
        this.patch = this.patch.bind(this)
    }

    async get(req, res, next) {
        try {
            const clientes = await conexao("clientes")
                .leftJoin("cidades", "cidades.id", "=", "clientes.cidade_id")
                .select("clientes.*", "cidades.nome AS cidade")
                .orderBy("clientes.nome", "asc")

            return res.status(200).json(clientes)
        } catch (erro) {
            return next(erro)
        }
    }

    async getById(req, res, next) {
        try {
            const idCliente = req.params.idCliente

            const cliente = await conexao("clientes")
                .leftJoin("cidades", "cidades.id", "=", "clientes.cidade_id")
                .select("clientes.*", "cidades.nome AS cidade")
                .where("clientes.id", idCliente)
                .orderBy("clientes.nome", "asc")
                .first()

            if (!cliente) {
                return next(errors(404, "Nenhum cliente encontrado!"))
            }

            return res.status(200).json(cliente)
        } catch (erro) {
            return next(erro)
        }
    }

    async post(req, res, next) {
        try {
            const { nome, altura, nascimento, cidade_id } = req.body

            if (!nome) {
                return next(errors(400, "O nome é obrigatório!"))
            }

            if (!altura) {
                return next(errors(400, "A altura é obrigatória!"))

            }

            if (!nascimento) {
                return next(errors(400, "O nascimento é obrigatório!"))
            }

            if (!cidade_id) {
                return next(errors(400, "O id da cidade é obrigatório!"))
            }

            const cliente = new Cliente(nome.trim(), altura, nascimento, cidade_id)

            const clienteInserido = await conexao("clientes").insert({
                nome: cliente.retornarNome(),
                altura: cliente.retornarAltura(),
                nascimento: cliente.retornarNascimento(),
                cidade_id: cliente.retornarCidadeId(),
            })

            if (!clienteInserido || !clienteInserido[0]) {
                return next(errors(500, "Erro ao adicionar o cliente!"))
            }

            return res.status(201).json({
                resposta: "Cliente inserido!",
                id: clienteInserido[0],
            });
        } catch (erro) {
            return next(erro)
        }
    }

    async put(req, res, next) {
        try {
            const idCliente = req.params.idCliente;
            const { nome, altura, nascimento, cidade_id } = req.body

            const atualizado = await conexao("clientes")
                .where("id", idCliente)
                .update({
                    nome: nome.trim(),
                    altura,
                    nascimento,
                    cidade_id,
                });

            if (!atualizado) {
                return next(errors(404, "O cliente não existe!"))
            }

            const clienteAtualizado = await conexao("clientes")
                .where("id", idCliente)
                .first()

            return res.status(200).json({
                resposta: "Cliente atualizado!",
                cliente: clienteAtualizado,
            });
        } catch (erro) {
            return next(erro)
        }
    }

    async patch(req, res, next) {
        try {
            const idCliente = req.params.idCliente
            const cliente = {}

            if (req.body.nome !== undefined) {
                if (typeof req.body.nome !== "string" || !req.body.nome.trim()) {
                    return next(errors(400, "O nome é inválido"))
                }
                cliente.nome = req.body.nome.trim()
            }

            if (req.body.altura !== undefined) {
                cliente.altura = req.body.altura
            }
            if (req.body.nascimento !== undefined) {
                cliente.nascimento = req.body.nascimento
            }

            if (req.body.cidade_id !== undefined) cliente.cidade_id = req.body.cidade_id;

            if (Object.keys(cliente).length === 0) {
                return next(errors(400, "Nenhum campo válido informado!"));
            }

            const atualizado = await conexao("clientes")
                .where("id", idCliente)
                .update(cliente)

            if (!atualizado) {
                return next(errors(404, "O cliente não existe!"))
            }

            const clienteFinal = await conexao("clientes")
                .where("id", idCliente)
                .first()

            return res.status(200).json({
                resposta: "Cliente atualizado!",
                cliente: clienteFinal,
            });
        } catch (erro) {
            return next(erro);
        }
    }

    async delete(req, res, next) {
        try {
            const idCliente = req.params.idCliente

            await conexao.transaction(async (trx) => {
                const pedidos = await trx("pedidos").where("cliente_id", idCliente).select("id")

                const pedidoIds = pedidos.map(p => p.id)

                if (pedidoIds.length > 0) {
                    await trx("pedidos_produtos").whereIn("pedido_id", pedidoIds).del()
                }

                await trx("pedidos").where("cliente_id", idCliente).del()

                const clienteExcluido = await trx("clientes").where("id", idCliente).del()

                if (!clienteExcluido) throw errors(404, "O cliente não existe!")
            })

            return res.status(204).send()
        } catch (erro) {
            return next(erro)
        }
    }
}
