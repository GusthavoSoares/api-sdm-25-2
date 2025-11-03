export default class Cliente {
    #nome
    #altura
    #nascimento
    #cidadeId
    constructor(nome, altura, nascimento, cidadeId = null) {
        this.#nome = nome
        this.#altura = altura
        this.#nascimento = nascimento
        this.#cidadeId = cidadeId
    }

    retornarNome() {
        return this.#nome
    }

    retornarAltura() {
        return this.#altura
    }

    retornarNascimento() {
        return this.#nascimento
    }

    retornarCidadeId() {
        return this.#cidadeId
    }

    atualizarNome(novoNome) {
        this.#nome = novoNome
    }

    atualizarAltura(novaAltura) {
        this.#altura = novaAltura
    }

    atualizarNascimento(novoNascimento) {
        this.#nascimento = novoNascimento
    }

    atualizarCidadeId(novoIdCidade) {
        this.#cidadeId = novoIdCidade
    }
}