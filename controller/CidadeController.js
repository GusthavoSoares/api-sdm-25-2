import conexao from "../model/Conexao.js";
import errors from 'http-errors'
import Cidade from "../model/Cidade.js"
export class CidadeController {
    constructor() {
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.delete = this.delete.bind(this);
        this.patch = this.patch.bind(this);
    }

    async get(req, res, next) {
        try {
            const cidades = await conexao("cidades").select("*").orderBy("nome");

            return res.status(200).json(cidades)

        } catch (erro) {
            return next(erro)
        }
    }

    async getById(req, res, next) {
        try {
            const idCidade = req.params.idCidade

            const cidades = await conexao("cidades")
                .select("cidades.*")
                .where("cidades.id", idCidade)
                .first()

            if (!cidades) {
                return next(errors(404, "Nenhuma cidade encontrada!"));
            }

            return res.status(200).json(cidades)

        } catch (erro) {
            return next(erro);
        }
    }

    async post(req, res, next) {
        try {

            const { nome } = req.body

            if (!nome || typeof nome !== "string" || !nome.trim()) {
                return next(errors(400, "O nome é obrigatório"))
            }

            const cidade = new Cidade(nome.trim())

            const cidades = await conexao("cidades").insert({
                nome: cidade.retornarNome(),
            });

            if (!cidades || !cidades[0]) {
                return next(errors(500, "Erro ao adicionar a cidade!"))
            }

            return res.status(201).json({
                resposta: "Cidade inserida!",
                id: cidades[0],
            });
        } catch (erro) {
            return next(erro);
        }
    }

    async put(req, res, next) {
        try {
            const idCidade = req.params.idCidade;
            const { nome } = req.body;

            if (!nome || typeof nome !== "string" || !nome.trim()) {
                return next(errors(400, "O nome é obrigatório para atualizar a cidade!"));
            }

            const cidade = await conexao("cidades")
                .where("id", idCidade)
                .update({ nome: nome.trim() });

            if (!cidade) {
                return next(errors(404, "A cidade não existe!"));
            }

            const cidadeAtualizada = await conexao("cidades").where("id", idCidade).first();

            return res.status(200).json({
                resposta: "Cidade atualizada",
                cidade: cidadeAtualizada,
            });
        } catch (erro) {
            return next(erro);
        }
    }

    async patch(req, res, next) {
        try {
            const idCidade = req.params.idCidade;

            const cidade = {};

            if (req.body.nome !== undefined) {
                if (typeof req.body.nome !== "string" || !req.body.nome.trim()) {
                    return next(errors(400, "O nome é inválido"));
                }
                cidade.nome = req.body.nome.trim();
            }

            if (Object.keys(cidade).length === 0) {
                return next(errors(400, "A cidade não existe!"));
            }

            const cidadeAtualizada = await conexao("cidades")
                .where("id", idCidade)
                .update(cidade);

            if (!cidadeAtualizada) {
                return next(errors(404, "A cidade não existe"));
            }

            const cidadeFinal = await conexao("cidades").where("id", idCidade).first();

            return res.status(200).json({
                resposta: "Cidade atualizada!",
                cidade: cidadeFinal,
            });
        } catch (erro) {
            return next(erro);
        }
    }

    async delete(req, res, next) {
        try {
            const idCidade = req.params.idCidade;

            await conexao.transaction(async (trx) => {

                const clientes = await trx("clientes").where("cidade_id", idCidade).select("id");
                const clienteIds = clientes.map(c => c.id);

                if (clienteIds.length > 0) {
                    const pedidos = await trx("pedidos").whereIn("cliente_id", clienteIds).select("id");

                    const pedidoIds = pedidos.map(p => p.id);

                    if (pedidoIds.length > 0) {
                        await trx("pedidos_produtos").whereIn("pedido_id", pedidoIds).del();
                    }

                    await trx("pedidos").whereIn("cliente_id", clienteIds).del();
                    await trx("clientes").whereIn("id", clienteIds).del();
                }

                const cidadeExcluida = await trx("cidades").where("id", idCidade).del();

                if (!cidadeExcluida) throw errors(404, "A cidade não existe!");
            });

            return res.status(204).send();
        } catch (erro) {
            return next(erro);
        }
    }

}