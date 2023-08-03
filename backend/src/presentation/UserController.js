// Definindo as rotas do usuário //

const express = require("express");
const router = express.Router();
const UserService = require("../app/UserService");

//função que verifica se uma determinada string contém apenas caracteres numéricos. 
function isNumeric(str) {
  var er = /^[0-9]+$/;
  return er.test(str);kom
}

router.post("/users", async (req, res) => {
  try {
    const { nome, idade, email, cep } = req.body;

    // Verifica se a formatação do CEP está correta
    if (cep.length !== 8 || !isNumeric(cep)) {
      return res.status(400).json({ error: "CEP inválido" });
    }

    // Realiza a requisição para a API do VIACEP
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    // Transforma o JSON da resposta da API para um objeto JS
    const data = await response.json();

    // Verifica se o CEP é inválido, baseado no retorno da API
    if ("error" in data) {
      return res.status(400).json({ error: "CEP inválido" });
    }

    // Verifica se o CEP é do Amazonas, baseado no retorno da API
    if (data.uf !== "AM") {
      return res
        .status(400)
        .json({ error: "O CEP deve ser do estado do Amazonas" });
    }

    if (idade < 18) {
      return res
        .status(400)
        .json({ error: "Usuário deve ter pelo menos 18 anos" });
    }

    const user = await UserService.createUser(nome, idade, email, cep);

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Ocorreu um erro ao cadastrar o usuário" });
  }
});


// listando os usuários
router.get("/users", async (req, res) => {
  try {
    const users = await UserService.listUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Ocorreu um erro ao listar os usuários" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { nome, idade, email, cep } = req.body;

    if (!cep.startsWith("690")) {
      return res
        .status(400)
        .json({ error: "O CEP deve ser do estado do Amazonas" });
    }

    if (idade < 18) {
      return res
        .status(400)
        .json({ error: "Usuário deve ter pelo menos 18 anos" });
    }

    const user = await UserService.editUser(userId, nome, idade, email, cep);

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Ocorreu um erro ao editar o usuário" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    await UserService.deleteUser(userId);

    return res.status(200).json({ message: "Usuário removido com sucesso" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Ocorreu um erro ao remover o usuário" });
  }
});

module.exports = router;