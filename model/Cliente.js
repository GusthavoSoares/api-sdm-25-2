class Cliente {
    #nome
    #altura
    #dataNascimento

    constructor(nome, altura, dataNascimento) {
        this.#nome = nome
        this.#altura = altura
        this.#dataNascimento = dataNascimento
    }

    retornarNome() {
        this.#nome
    }

    retornarAltura() {
        this.#altura
    }

    retornarNascimento() {
        this.#dataNascimento
    }

    atualizarNome(novoNome) {
        this.#nome = novoNome
    }

    atualizarAltura(novaAltura) {
        this.#altura = novaAltura
    }

    atualizarDataNascimento(novoNascimento) {
        this.#dataNascimento = novoNascimento
    }
}