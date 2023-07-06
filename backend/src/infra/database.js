const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor() {
    this.db = new sqlite3.Database('./database.db'); // Caminho para o arquivo do banco de dados SQLite
    this.createTable(); // Cria a tabela de usu�rios ao instanciar a classe
  }

  createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        idade INTEGER,
        email TEXT,
        cep TEXT
      )
    `;

    this.db.run(query);
  }

  insertUser(user) {
    const query = `
      INSERT INTO users (nome, idade, email, cep)
      VALUES (?, ?, ?, ?)
    `;

    const { nome, idade, email, cep } = user;

    this.db.run(query, [nome, idade, email, cep]);

    return this.db.lastID;
  }

  getAllUsers() {
    const query = 'SELECT * FROM users';

    return new Promise((resolve, reject) => {
      this.db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  getUserById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';

    return new Promise((resolve, reject) => {
      this.db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  updateUser(user) {
    const { id, nome, idade, email, cep } = user;
    const query = `
      UPDATE users
      SET nome = ?, idade = ?, email = ?, cep = ?
      WHERE id = ?
    `;

    this.db.run(query, [nome, idade, email, cep, id]);
  }
}

// Exporte a classe Database
module.exports = new Database();


//  A classec 'Database' � respons�vel por configurar e gerenciar a conex�o com o banco de dados SQLite.
//  Ela possui m�todos para criar a tabela de usu�rios,
//  inserir um novo usu�rio,
//  obter todos os usu�rios e atualizar um usu�rio existente.

// conex�o padr�o com ':memory:'