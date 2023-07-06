// a camada de aplicação (UserService.js) com as funções correspondentes 

// Importe o módulo User da camada de domínio
const User = require('../domain/User');

// Importe o módulo de acesso ao banco de dados
const database = require('../infra/database');

class UserService {
  // Função para cadastrar um usuário
  static createUser(nome, idade, email, cep) {
    // Crie uma instância do objeto User com os dados recebidos
    const user = new User(nome, idade, email, cep);

    // Execute as validações adicionais, se necessário

    // Execute a operação de inserção no banco de dados
    const userId = database.insertUser(user);

    // Retorne o usuário cadastrado
    return { id: userId, ...user };
  }

  // Função para obter a lista de usuários
  static listUsers() {
    // Execute a consulta no banco de dados para obter todos os usuários
    const users = database.getAllUsers();

    // Retorne a lista de usuários
    return users;
  }

  // Função para editar um usuário
  static editUser(userId, nome, idade, email, cep) {
    // Verifique se o usuário existe no banco de dados
    const existingUser = database.getUserById(userId);
    if (!existingUser) {
      throw new Error('Usuário não encontrado');
    }

    // Atualize os dados do usuário existente
    existingUser.nome = nome;
    existingUser.idade = idade;
    existingUser.email = email;
    existingUser.cep = cep;

    // Execute as validações adicionais, se necessário

    // Execute a operação de atualização no banco de dados
    database.updateUser(existingUser);

    // Retorne o usuário atualizado
    return existingUser;
  }
}

// Exporte a classe UserService
module.exports = UserService;


// a camada de aplicação é responsável por implementar a lógica de negócio relacionada aos usuários.
// A classe UserService contém as funções createUser, listUsers e editUser,
// que são responsáveis por realizar as operações desejadas e interagir com o banco de dados.