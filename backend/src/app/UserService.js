const User = require("../domain/User");
const database = require("../infra/database");

class UserService {
  static async createUser(nome, idade, email, cep) {
    const user = new User(nome, idade, email, cep);

    const userId = await database.insertUser(user);

    return { id: userId, ...user };
  }

  static async listUsers() {
    const users = await database.getAllUsers();

    return users;
  }

  static async editUser(userId, nome, idade, email, cep) {
    const existingUser = await database.getUserById(userId);
    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }

    existingUser.nome = nome;
    existingUser.idade = idade;
    existingUser.email = email;
    existingUser.cep = cep;

    await database.updateUserInDatabase(existingUser);

    return existingUser;
  }

  static async deleteUser(userId) {
    const existingUser = await database.getUserById(userId);
    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }

    await database.deleteUser(userId);
  }
}

module.exports = UserService;
