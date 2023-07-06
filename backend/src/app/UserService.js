// a camada de aplica��o (UserService.js) com as fun��es correspondentes 

// Importe o m�dulo User da camada de dom�nio
const User = require('../domain/User');

// Importe o m�dulo de acesso ao banco de dados
const database = require('../infra/database');

class UserService {
  // Fun��o para cadastrar um usu�rio
  static createUser(nome, idade, email, cep) {
    // Crie uma inst�ncia do objeto User com os dados recebidos
    const user = new User(nome, idade, email, cep);

    // Execute as valida��es adicionais, se necess�rio

    // Execute a opera��o de inser��o no banco de dados
    const userId = database.insertUser(user);

    // Retorne o usu�rio cadastrado
    return { id: userId, ...user };
  }

  // Fun��o para obter a lista de usu�rios
  static listUsers() {
    // Execute a consulta no banco de dados para obter todos os usu�rios
    const users = database.getAllUsers();

    // Retorne a lista de usu�rios
    return users;
  }

  // Fun��o para editar um usu�rio
  static editUser(userId, nome, idade, email, cep) {
    // Verifique se o usu�rio existe no banco de dados
    const existingUser = database.getUserById(userId);
    if (!existingUser) {
      throw new Error('Usu�rio n�o encontrado');
    }

    // Atualize os dados do usu�rio existente
    existingUser.nome = nome;
    existingUser.idade = idade;
    existingUser.email = email;
    existingUser.cep = cep;

    // Execute as valida��es adicionais, se necess�rio

    // Execute a opera��o de atualiza��o no banco de dados
    database.updateUser(existingUser);

    // Retorne o usu�rio atualizado
    return existingUser;
  }
}

// Exporte a classe UserService
module.exports = UserService;


// a camada de aplica��o � respons�vel por implementar a l�gica de neg�cio relacionada aos usu�rios.
// A classe UserService cont�m as fun��es createUser, listUsers e editUser,
// que s�o respons�veis por realizar as opera��es desejadas e interagir com o banco de dados.