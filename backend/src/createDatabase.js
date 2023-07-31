// Criando o Banco de dados //

const sqlite3 = require('sqlite3').verbose();

// Crie uma instância do objeto Database
const db = new sqlite3.Database('../database.db');

// Comando SQL para criar a tabela de usu�rios
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    idade INTEGER,
    email TEXT,
    cep TEXT
  )
`;

// comando SQL para criar a tabela de usuários
db.run(createTableQuery, (err) => {
  if (err) {
    console.error('Erro ao criar a tabela de usuários:', err.message);
  } else {
    console.log('Tabela de usuários criada com sucesso.');
  }

  // Fecha a conexão com o banco de dados
  db.close();
});
