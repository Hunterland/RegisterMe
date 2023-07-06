// Importe o Express e crie um objeto Router
const express = require('express');
const router = express.Router();

// Importe o UserService da camada de aplicação
const UserService = require('../app/UserService.js');

// Rota para cadastrar usuário
router.post('http://localhost:3000/api/users', (req, res) => {
  try {
    const { nome, idade, email, cep } = req.body;

    // Verifique se o CEP é do estado do Amazonas
    if (!cep.startsWith('690')) {
      return res.status(400).json({ error: 'O CEP deve ser do estado do Amazonas' });
    }

    // Verifique se o usuário tem mais de 18 anos
    if (idade < 18) {
      return res.status(400).json({ error: 'Usuário deve ter mais de 18 anos' });
    }

    // Chame a função createUser do UserService para cadastrar o usuário
    const user = UserService.createUser(nome, idade, email, cep);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o usuário' });
  }
});

// Rota para listar usuários
router.get('http://localhost:3000/api/users', (req, res) => {
  try {
    // Chame a função listUsers do UserService para obter a lista de usuários
    const users = UserService.listUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Ocorreu um erro ao listar os usuários' });
  }
});

// Rota para editar usuário
router.put('http://localhost:3000/api/users:id', (req, res) => {
  try {
    const userId = req.params.id;
    const { nome, idade, email, cep } = req.body;

    // Verifique se o CEP é do estado do Amazonas
    if (!cep.startsWith('690')) {
      return res.status(400).json({ error: 'O CEP deve ser do estado do Amazonas' });
    }

    // Verifique se o usuário tem mais de 18 anos
    if (idade < 18) {
      return res.status(400).json({ error: 'Usuário deve ter mais de 18 anos' });
    }

    // Chame a função editUser do UserService para editar o usuário
    const user = UserService.editUser(userId, nome, idade, email, cep);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Ocorreu um erro ao editar o usuário' });
  }
});

// Exporte o objeto Router
module.exports = router;
