//  camada de dom�nio (User.js) que define a entidade de usu�rio.

class User {
    constructor(nome, idade, email, cep) {
      this.nome = nome;
      this.idade = idade;
      this.email = email;
      this.cep = cep;
    }
  }
  
  // Exporta a classe User
  module.exports = User;
  

// A classe 'User' representa a entidade de usu�rio.
// Ela possui um construtor que define os atributos nome, idade,
// email e cep com base nos valores passados ao criar uma inst�ncia do objeto.