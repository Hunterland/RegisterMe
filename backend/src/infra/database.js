const sqlite3 = require("sqlite3").verbose();

class Database {
  constructor() {
    this.db = new sqlite3.Database("database.db");
    this.createTable();
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

    return new Promise((resolve, reject) => {
      this.db.run(query, [nome, idade, email, cep], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  getAllUsers() {
    const query = "SELECT * FROM users";

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
    const query = "SELECT * FROM users WHERE id = ?";

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

  updateUserInDatabase(user) {
    const { id, nome, idade, email, cep } = user;
    const query = `
      UPDATE users
      SET nome = ?, idade = ?, email = ?, cep = ?
      WHERE id = ?
    `;

    this.db.run(query, [nome, idade, email, cep, id]);
  }

  deleteUser(userId) {
    const query = "DELETE FROM users WHERE id = ?";

    return new Promise((resolve, reject) => {
      this.db.run(query, [userId], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = new Database();
