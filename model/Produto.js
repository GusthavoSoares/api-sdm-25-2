export default class Produto {
    #nome
    #preco
    #quantidade
    #categoriaId

    constructor(nome, preco, quantidade, categoriaId) {
        this.#nome = nome
        this.#preco = preco
        this.#quantidade = quantidade
        this.#categoriaId = categoriaId
    }

    retornarNome() {
        return this.#nome
    }

    retornarPreco() {
        return this.#preco
    }

    retornarQuantidade() {
        return this.#quantidade
    }

    retornarCategoriaId() {
        return this.#categoriaId
    }

    atualizarNome(novoNome) {
        this.#nome = novoNome
    }
    atualizarPreco(novoPreco) {
        this.#preco = novoPreco
    }

    atualizarQuantidade(novaQuantidade) {
        this.#quantidade = novaQuantidade
    }

    atualizarCategoriaId(novaCategoriaId) {
        this.#categoriaId = novaCategoriaId
    }
}