class Produto {
    #nome
    #preco
    #quantidade

    constructor(nome, preco, quantidade) {
        this.#nome = nome
        this.#preco = preco
        this.#quantidade = quantidade
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

    atualizarNome(novoNome) {
        this.#nome = novoNome
    }
    atualizarPreco(novoPreco) {
        this.#preco = novoPreco
    }

    atualizarQuantidade(novaQuantidade) {
        this.#quantidade = novaQuantidade
    }
}