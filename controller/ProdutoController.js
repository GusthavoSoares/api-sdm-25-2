import conexao from "../model/Conexao.js";
import errors from 'http-errors'
import Produto from "../model/Produto.js";
export class ProdutoController {

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
            const produtos = await conexao("produtos")
                .leftJoin("categorias", "categorias.id", "=", "produtos.categoria_id")
                .select("produtos.*", "categorias.nome AS categoria")
                .orderBy("produtos.id", "asc")

            return res.status(200).json(produtos)
        } catch (erro) {
            return next(erro)
        }
    }

    async getById(req, res, next) {
        try {
            const idProduto = req.params.idProduto

            const produto = await conexao("produtos")
                .leftJoin("categorias", "categorias.id", "=", "produtos.categoria_id")
                .select("produtos.*", "categorias.nome AS categoria")
                .where("produtos.id", idProduto)
                .orderBy("produtos.id", "asc")
                .first()

            if (!produto) {
                return next(errors(404, "Nenhum produto encontrado!"))
            }

            return res.status(200).json(produto)
        } catch (erro) {
            return next(erro)
        }
    }

    async post(req, res, next) {
        try {
            const { nome, preco, quantidade, categoria_id } = req.body

            if (!nome) {
                return next(errors(400, "O nome é obrigatório!"))
            }

            if (!preco) {
                return next(errors(400, "O preço é obrigatório!"))
            }

            if (!quantidade) {
                return next(errors(400, "A quantidade é obrigatória"))
            }
            if (!categoria_id) {
                return next(errors(400, "O id da categoria é obrigatório!"))
            }

            const produto = new Produto(nome, preco, quantidade, categoria_id)

            const produtoInserido = await conexao("produtos").insert({
                nome: produto.retornarNome(),
                preco: produto.retornarPreco(),
                quantidade: produto.retornarQuantidade(),
                categoria_id: produto.retornarCategoriaId(),
            })

            if (!produtoInserido || !produtoInserido[0]) {
                return next(errors(500, "Erro ao adicionar o produto!"))
            }

            return res.status(201).json({
                resposta: "Produto inserido!",
                id: produtoInserido[0],
            });
        } catch (erro) {
            return next(erro)
        }
    }

    async put(req, res, next) {
        try {
            const idProduto = req.params.idProduto;

            const { nome, preco, quantidade, categoriaId } = req.body

            const atualizado = await conexao("produtos")
                .where("id", idProduto)
                .update({
                    nome,
                    preco,
                    quantidade,
                    categoriaId
                });

            if (!atualizado) {
                return next(errors(404, "O pedido não existe!"))
            }

            const produtoAtualizado = await conexao("produtos")
                .where("id", idProduto)
                .first()

            return res.status(200).json({
                resposta: "Produto atualizado!",
                cliente: produtoAtualizado,
            });
        } catch (erro) {
            return next(erro)
        }
    }

    async patch(req, res, next) {
        try {
            const idProduto = req.params.idProduto
            const produto = {}

            if (req.body.nome !== undefined) {
                produto.nome = req.body.nome
            }

            if (req.body.preco !== undefined) {
                produto.preco = req.body.preco
            }

            if (req.body.quantidade !== undefined) {
                produto.quantidade = req.body.quantidade
            }

            if (req.body.categoria_id !== undefined) {
                produto.categoria_id = req.body.categoria_id
            }


            if (Object.keys(produto).length === 0) {
                return next(errors(400, "Nenhum campo válido informado!"));
            }

            const produtoAtualizado = await conexao("produtos")
                .where("id", idProduto)
                .update(produto)

            if (!produtoAtualizado) {
                return next(errors(404, "O produto não existe!"))
            }

            const produtoFinal = await conexao("produtos")
                .where("id", idProduto)
                .first()

            return res.status(200).json({
                resposta: "Produto atualizado!",
                cliente: produtoFinal,
            });
        } catch (erro) {
            return next(erro);
        }
    }
    async delete(req, res, next) {
        try {
            const idProduto = req.params.idProduto;

            await conexao.transaction(async (trx) => {
                await trx("pedidos_produtos").where("produto_id", idProduto).del();

                const produtoExcluido = await trx("produtos").where("id", idProduto).del();
                if (!produtoExcluido) throw errors(404, "O produto não existe!");
            });

            return res.status(204).send();
        } catch (erro) {
            return next(erro);
        }
    }
}