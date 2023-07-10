const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./presentation/UserController');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware para fazer o parse do corpo das requisições como JSON
app.use(bodyParser.json());
app.use(cors());

 // Caminho para o arquivo do banco de dados SQLite
// const dbPath = '../database.db';


// Rotas para as opera��es de usu�rios
app.use('/api', userController);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
