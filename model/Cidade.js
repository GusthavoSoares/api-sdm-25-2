export default class Cidade{
#nome

constructor(nome){
    this.#nome = nome
}

retornarNome(){
    return this.#nome
}

atualizarNome(novoNome){
    this.#nome = novoNome
}
}