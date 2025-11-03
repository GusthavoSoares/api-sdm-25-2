import conexao from "../model/Conexao.js";
import errors from "http-errors";
import Categoria from "../model/Categoria.js";

export class CategoriaController {
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
            const dados = await conexao("categorias").select("*").orderBy("nome");

            return res.status(200).json(dados)

        } catch (erro) {
            return next(erro)
        }
    }

    async getById(req, res, next) {
        try {
            const idCategoria = req.params.idCategoria

            const dados = await conexao("categorias")
                .select("categorias.*")
                .where("categorias.id", idCategoria)
                .first()

            if (!dados) {
                return next(errors(404, "Nenhuma categoria encontrada!"));
            }

            return res.status(200).json(dados)

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

            const categoria = new Categoria(nome.trim())

            const dados = await conexao("categorias").insert({
                nome: categoria.retornarNome(),
            });

            if (!dados || !dados[0]) {
                return next(errors(500, "Erro ao adicionar a categoria"))
            }

            return res.status(201).json({
                resposta: "Categoria inserida!",
                id: dados[0],
            });
        } catch (erro) {
            return next(erro);
        }
    }

    async put(req, res, next) {
        try {
            const idCategoria = req.params.idCategoria;
            const { nome } = req.body;

            if (!nome || typeof nome !== "string" || !nome.trim()) {
                return next(errors(400, "O nome é obrigatório para atualizar a categoria!"));
            }

            const categoria = await conexao("categorias")
                .where("id", idCategoria)
                .update({ nome: nome.trim() });

            if (!categoria) {
                return next(errors(404, "A categoria não existe!"));
            }

            const categoriaAtualizada = await conexao("categorias").where("id", idCategoria).first();

            return res.status(200).json({
                resposta: "Categoria atualizada",
                categoria: categoriaAtualizada,
            });
        } catch (erro) {
            return next(erro);
        }
    }

    async patch(req, res, next) {
        try {
            const idCategoria = req.params.idCategoria;

            const categoria = {};

            if (req.body.nome !== undefined) {
                if (typeof req.body.nome !== "string" || !req.body.nome.trim()) {
                    return next(errors(400, "O nome é inválido"));
                }
                categoria.nome = req.body.nome.trim();
            }

            if (Object.keys(categoria).length === 0) {
                return next(errors(400, "A categoria não existe!"));
            }

            const categoriaAtualizada = await conexao("categorias")
                .where("id", idCategoria)
                .update(categoria);

            if (!categoriaAtualizada) {
                return next(errors(404, "A categoria não existe"));
            }

            const categoriaFinal = await conexao("categorias").where("id", idCategoria).first();

            return res.status(200).json({
                resposta: "Categoria atualizada!",
                categoria: categoriaFinal,
            });
        } catch (erro) {
            return next(erro);
        }
    }

    async delete(req, res, next) {
        try {
            const idCategoria = req.params.idCategoria

            await conexao.transaction(async (trx) => {
                const produtos = await trx("produtos").where("categoria_id", idCategoria).select("id")
                const produtoIds = produtos.map(p => p.id)

                if (produtoIds.length > 0) {
                    await trx("pedidos_produtos").whereIn("produto_id", produtoIds).del()
                    await trx("produtos").whereIn("id", produtoIds).del()
                }

                const categoriaExcluida = await trx("categorias").where("id", idCategoria).del()

                if (!categoriaExcluida) throw errors(404, "A categoria não existe!")
            })

            return res.status(204).send()
        } catch (erro) {
            return next(erro)
        }
    }
}
