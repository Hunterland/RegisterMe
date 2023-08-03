// Define a entidade de usuário //

class User {
  constructor(nome, idade, email, cep) {
    this.nome = nome;
    this.idade = idade;
    this.email = email;
    this.cep = cep;
  }
}

module.exports = User;

// A classe 'User' representa a entidade de usuário.
// Ela possui um construtor que define os atributos nome, idade,
// email e cep com base nos valores passados ao criar uma instância do objeto.
