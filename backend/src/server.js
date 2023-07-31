// arquivo de inicialização do servidor //

const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./presentation/UserController");
const cors = require("cors");


// cria a instância e gerencia o server e rotas.
const app = express();

// porta para escutar as requisições
const port = 3000;

// Middleware para fazer o parse do corpo das requisições em formato JSON
app.use(bodyParser.json());

// para lidar com requisições de outras origens
app.use(cors());

// Rotas para as operações de usuários
app.use("/api", userController);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
