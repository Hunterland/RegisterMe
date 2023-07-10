const express = require("express");
const router = express.Router();
const UserService = require("../app/UserService");

router.post("/users", async (req, res) => {
  try {
    const { nome, idade, email, cep } = req.body;

    if (!cep.startsWith("690")) {
      return res
        .status(400)
        .json({ error: "O CEP deve ser do estado do Amazonas" });
    }

    if (idade <= 18) {
      return res
        .status(400)
        .json({ error: "Usuário deve ter mais de 18 anos" });
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

    if (idade <= 18) {
      return res
        .status(400)
        .json({ error: "Usuário deve ter mais de 18 anos" });
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
