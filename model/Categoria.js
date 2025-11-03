export default class Categoria {
    #nome

    constructor(nome) {
        this.#nome = nome
    }

    retornarNome() {
        return this.#nome
    }

    atualizarNome(novoNome) {
        this.#nome = novoNome
    }
}