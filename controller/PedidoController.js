import conexao from "../model/Conexao.js";
import errors from 'http-errors'
import Pedido from "../model/Pedido.js";
export class PedidoController {

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
            const pedidos = await conexao("pedidos")
                .leftJoin("clientes", "clientes.id", "=", "pedidos.cliente_id")
                .leftJoin("cidades", "cidades.id", "=", "clientes.cidade_id")
                .select("pedidos.id", "pedidos.horario", "pedidos.endereco", "clientes.nome", "clientes.altura", "clientes.nascimento", "cidades.nome AS cidade")
                .orderBy("pedidos.id", "asc")

            return res.status(200).json(pedidos)
        } catch (erro) {
            return next(erro)
        }
    }

    async getById(req, res, next) {
        try {
            const idPedido = req.params.idPedido

            const pedido = await conexao("pedidos")
                .leftJoin("clientes", "clientes.id", "=", "pedidos.cliente_id")
                .leftJoin("cidades", "cidades.id", "=", "clientes.cidade_id")
                .select("pedidos.id", "pedidos.horario", "pedidos.endereco", "clientes.nome", "clientes.altura", "clientes.nascimento", "cidades.nome AS cidade")
                .where("pedidos.id", idPedido)
                .orderBy("pedidos.id", "asc")
                .first()

            if (!pedido) {
                return next(errors(404, "Nenhum pedido encontrado!"))
            }

            return res.status(200).json(pedido)
        } catch (erro) {
            return next(erro)
        }
    }

    async post(req, res, next) {
        try {
            const { horario, endereco, cliente_id } = req.body

            if (!horario) {
                return next(errors(400, "O horário é obrigatório!"))
            }

            if (!endereco) {
                return next(errors(400, "O endereço é obrigatório!"))
            }

            if (!cliente_id) {
                return next(errors(400, "O id do cliente é obrigatório!"))
            }

            const pedido = new Pedido(horario, endereco, cliente_id)

            const pedidoInserido = await conexao("pedidos").insert({
                horario: pedido.retornarHorario(),
                endereco: pedido.retornarEndereco(),
                cliente_id: pedido.retornarClienteId(),
            })

            if (!pedidoInserido || !pedidoInserido[0]) {
                return next(errors(500, "Erro ao adicionar o pedido!"))
            }

            return res.status(201).json({
                resposta: "Pedido inserido!",
                id: pedidoInserido[0],
            });
        } catch (erro) {
            return next(erro)
        }
    }

    async put(req, res, next) {
        try {
            const idPedido = req.params.idPedido;
            const { horario, endereco, clienteId } = req.body

            const atualizado = await conexao("pedidos")
                .where("id", idPedido)
                .update({
                    horario: horario,
                    endereco,
                    clienteId
                });

            if (!atualizado) {
                return next(errors(404, "O pedido não existe!"))
            }

            const pedidoAtualizado = await conexao("pedidos")
                .where("id", idPedido)
                .first()

            return res.status(200).json({
                resposta: "Pedido atualizado!",
                cliente: pedidoAtualizado,
            });
        } catch (erro) {
            return next(erro)
        }
    }

    async patch(req, res, next) {
        try {
            const idPedido = req.params.idPedido
            const pedido = {}

            if (req.body.horario !== undefined) {
                pedido.horario = req.body.horario
            }

            if (req.body.endereco !== undefined) {
                pedido.endereco = req.body.endereco
            }
            if (req.body.cliente_id !== undefined) {
                pedido.cliente_id = req.body.cliente_id
            }


            if (Object.keys(pedido).length === 0) {
                return next(errors(400, "Nenhum campo válido informado!"));
            }

            const atualizado = await conexao("pedidos")
                .where("id", idPedido)
                .update(pedido)

            if (!atualizado) {
                return next(errors(404, "O pedido não existe!"))
            }

            const pedidoFinal = await conexao("pedidos")
                .where("id", idPedido)
                .first()

            return res.status(200).json({
                resposta: "Pedido atualizado!",
                cliente: pedidoFinal,
            });
        } catch (erro) {
            return next(erro);
        }
    }

    async delete(req, res, next) {
        try {
            const idPedido = req.params.idPedido


            await conexao.transaction(async (trx) => {
                await trx("pedidos_produtos")
                    .where("pedido_id", idPedido)
                    .del();

                const pedidoDeletado = await trx("pedidos")
                    .where("id", idPedido)
                    .del();

                if (!pedidoDeletado) {
                    return next(errors(404, "O Pedido não existe!"))
                }
            })



            return res.status(204).send()
        } catch (erro) {
            return next(erro)
        }
    }
}