// Importe o Express e crie um objeto Router
const express = require('express');
const router = express.Router();

// Importe o UserService da camada de aplica��o
const UserService = require('../app/UserService.js');

// Rota para cadastrar usu�rio
router.post('http://localhost:3000/api/users', (req, res) => {
  try {
    const { nome, idade, email, cep } = req.body;

    // Verifique se o CEP � do estado do Amazonas
    if (!cep.startsWith('690')) {
      return res.status(400).json({ error: 'O CEP deve ser do estado do Amazonas' });
    }

    // Verifique se o usu�rio tem mais de 18 anos
    if (idade < 18) {
      return res.status(400).json({ error: 'Usu�rio deve ter mais de 18 anos' });
    }

    // Chame a fun��o createUser do UserService para cadastrar o usu�rio
    const user = UserService.createUser(nome, idade, email, cep);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o usu�rio' });
  }
});

// Rota para listar usu�rios
router.get('http://localhost:3000/api/users', (req, res) => {
  try {
    // Chame a fun��o listUsers do UserService para obter a lista de usu�rios
    const users = UserService.listUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Ocorreu um erro ao listar os usu�rios' });
  }
});

// Rota para editar usu�rio
router.put('http://localhost:3000/api/users:id', (req, res) => {
  try {
    const userId = req.params.id;
    const { nome, idade, email, cep } = req.body;

    // Verifique se o CEP � do estado do Amazonas
    if (!cep.startsWith('690')) {
      return res.status(400).json({ error: 'O CEP deve ser do estado do Amazonas' });
    }

    // Verifique se o usu�rio tem mais de 18 anos
    if (idade < 18) {
      return res.status(400).json({ error: 'Usu�rio deve ter mais de 18 anos' });
    }

    // Chame a fun��o editUser do UserService para editar o usu�rio
    const user = UserService.editUser(userId, nome, idade, email, cep);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Ocorreu um erro ao editar o usu�rio' });
  }
});

// Exporte o objeto Router
module.exports = router;
