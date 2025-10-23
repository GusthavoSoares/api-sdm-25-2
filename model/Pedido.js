class Pedido {
    #horario
    #endereco

    constructor(horario, endereco) {
        this.#horario = horario
        this.#endereco = endereco
    }

    retornarHorario() {
        return this.#horario
    }

    retornarEndereco() {
        return this.#endereco
    }

    atualizarHorario(novoHorario) {
        this.#endereco = novoHorario
    }

    atualizarEndereco(novoEndereco) {
        this.#endereco = novoEndereco
    }
}