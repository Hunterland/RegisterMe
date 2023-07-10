const sqlite3 = require('sqlite3').verbose();

// Crie uma inst‚ncia do objeto Database
const db = new sqlite3.Database('../database.db');

// Comando SQL para criar a tabela de usu·rios
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    idade INTEGER,
    email TEXT,
    cep TEXT
  )
`;

// Execute o comando SQL para criar a tabela de usu·rios
db.run(createTableQuery, (err) => {
  if (err) {
    console.error('Erro ao criar a tabela de usu·rios:', err.message);
  } else {
    console.log('Tabela de usu√°rios criada com sucesso.');
  }

  // Feche a conex„o com o banco de dados
  db.close();
});
