const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./presentation/UserController');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware para fazer o parse do corpo das requisições como JSON
app.use(bodyParser.json());
app.use(cors());

// // Defina uma rota POST para cadastrar um usu�rio
// app.post('/api/users', (req, res) => {
//   // Acesse os dados enviados pelo frontend
//   const user = req.body;

//   // L�gica para armazenar os dados no banco de dados
  
//   // Exemplo: use um ORM, como Sequelize, ou fa�a uma consulta direta ao banco de dados

//   // Retorne uma resposta ao frontend
//   res.json(user);
// });

// Configuração do caminho para o arquivo de banco de dados
const dbPath = '../database.db'; // Caminho para o arquivo do banco de dados SQLite

// Rotas para as operações de usuário
app.use('/api', userController);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
