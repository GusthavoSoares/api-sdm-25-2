class Cidade{
#nome

constructor(nome){
    this.#nome = nome
}

retornarNome(){
    this.#nome
}

atualizarNome(novoNome){
    this.#nome = novoNome
}
}