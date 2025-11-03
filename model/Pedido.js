export default class Pedido {
    #horario
    #endereco
    #clienteId

    constructor(horario, endereco, clienteId = null) {
        this.#horario = horario
        this.#endereco = endereco
        this.#clienteId = clienteId
    }

    retornarHorario() {
        return this.#horario
    }

    retornarEndereco() {
        return this.#endereco
    }
    retornarClienteId() {
        return this.#clienteId
    }

    atualizarHorario(novoHorario) {
        this.#endereco = novoHorario
    }

    atualizarEndereco(novoEndereco) {
        this.#endereco = novoEndereco
    }

    atualizarClienteId(novoClienteId) {
        this.#clienteId = novoClienteId
    }
}