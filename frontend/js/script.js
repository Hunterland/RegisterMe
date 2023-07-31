// Função para abrir o modal de edição //

function openEditModal(user) {
  var modal = document.getElementById("editModal");
  var newNameInput = document.getElementById("newName");
  var newIdadeInput = document.getElementById("newIdade");
  var newEmailInput = document.getElementById("newEmail");
  var newCepInput = document.getElementById("newCep");

  // Preenche os campos de input com os dados atuais do usuário
  newNameInput.value = user.nome;
  newIdadeInput.value = user.idade;
  newEmailInput.value = user.email;
  newCepInput.value = user.cep;

  // Adiciona um evento de envio ao formulário dentro do modal
  document
    .getElementById("editForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      // Evita o recarregamento da página ao enviar o formulário

      var newName = newNameInput.value;
      var newIdade = parseInt(newIdadeInput.value);
      var newEmail = newEmailInput.value;
      var newCep = newCepInput.value;

      if (newName && newIdade && newEmail && newCep) {
        
        // Atualiza os dados do usuário
        user.nome = newName;
        user.idade = newIdade;
        user.email = newEmail;
        user.cep = newCep;

        // Atualiza os dados do usuário no banco de dados
        updateUserInDatabase(user);

        // // Encontra a linha correspondente ao usuário na tabela e atualiza as células
        // var rows = document.querySelectorAll("#userTable tbody tr");

        // for (var i = 0; i < rows.length; i++) {
        //   var nameCell = rows[i].querySelector("td:first-child");
        //   if (nameCell.textContent === user.nome) {
        //     var idadeCell = rows[i].querySelector("td:nth-child(2)");
        //     var emailCell = rows[i].querySelector("td:nth-child(3)");
        //     var cepCell = rows[i].querySelector("td:nth-child(4)");

        //     nameCell.textContent = newName;
        //     idadeCell.textContent = newIdade;
        //     emailCell.textContent = newEmail;
        //     cepCell.textContent = newCep;
        //     break;
        //   }
        // }

        // Fecha o modal
        modal.style.display = "none";
      }
    });

  // Adiciona um evento de clique no botão de cancelar
  var cancelButton = modal.querySelector(".cancelButton");
  cancelButton.addEventListener("click", function () {
    // Fecha o modal sem fazer alterações
    modal.style.display = "none";
  });

  // Exibe o modal
  modal.style.display = "block";
}

// Função para atualizar um usuário no banco de dados
function updateUserInDatabase(user) {
  fetch(`http://localhost:3000/api/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Usuário atualizado com sucesso:", data);
    })
    .catch((error) => {
      console.error("Erro ao atualizar usuário:", error);
    });
}

// Função para remover um usuário
function removeUser(user) {
  // Armazena o usuário a ser removido
  var userToRemove = user;

  // Exibe o modal de confirmação
  var confirmationModal = document.getElementById("confirmationModal");
  confirmationModal.style.display = "block";

  // Captura os botões do modal
  var confirmButton = confirmationModal.querySelector(".confirmButton");
  var cancelButton = confirmationModal.querySelector(".cancelButton");

  // Adiciona um evento de clique no botão de confirmar
  confirmButton.addEventListener("click", function () {
    // Remove o usuário da lista
    deleteUserFromList(userToRemove);

    // Remove o usuário do banco de dados
    deleteUserFromDatabase(userToRemove);

    // Fecha o modal de confirmação
    confirmationModal.style.display = "none";
  });

  // Adiciona um evento de clique no botão de cancelar
  cancelButton.addEventListener("click", function () {
    // Fecha o modal de confirmação
    confirmationModal.style.display = "none";
  });
}

/// Função para remover um usuário
function deleteUserFromList(user) {
  // Encontrar a linha correspondente ao usuário na tabela para a remoção
  var table = document.getElementById("userTable");
  var rows = table.getElementsByTagName("tr");

  for (var i = 1; i < rows.length; i++) {
    var nameCell = rows[i].getElementsByTagName("td")[0];
    if (nameCell.textContent === user.nome) {
      table.deleteRow(i);
      break;
    }
  }
}

// Função para Deletar o usuário do banco de dados //

function deleteUserFromDatabase(user) {
  // Chama a rota DELETE do backend para remover o usuário do banco de dados
  fetch(`http://localhost:3000/api/users/${user.id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Usuário removido do banco de dados:", data);
    })
    .catch((error) => {
      console.error("Erro ao remover usuário do banco de dados:", error);
    });
}

// Função para adicionar um usuário à lista
function addUserToList(user) {
  var table = document.getElementById("userTable");

  // Cria uma nova linha na tabela
  var row = table.insertRow();

  // Insere as células da linha com os dados do usuário
  var nameCell = row.insertCell();
  nameCell.textContent = user.nome;

  var idadeCell = row.insertCell();
  idadeCell.textContent = user.idade;

  var emailCell = row.insertCell();
  emailCell.textContent = user.email;

  var cepCell = row.insertCell();
  cepCell.textContent = user.cep;

  var actionsCell = row.insertCell();
  actionsCell.innerHTML =
    '<button class="editButton">Editar</button> <button class="removeButton">Remover</button>';

  // Adiciona um evento de clique no botão de editar
  var editButton = actionsCell.querySelector(".editButton");
  editButton.addEventListener("click", function () {
    // Chama a função de edição do usuário
    openEditModal(user);
  });

  // Adiciona um evento de clique no botão de remover
  var removeButton = actionsCell.querySelector(".removeButton");
  removeButton.addEventListener("click", function () {
    // Chama a função de remoção do usuário
    removeUser(user);
  });
}

// Função para listar os usuários //

function listUsers() {
  fetch("http://localhost:3000/api/users")
    .then((response) => response.json())
    .then((data) => {
      // Limpar a tabela antes de adicionar os usuários
      var tableBody = document.getElementById("userTableBody");
      tableBody.innerHTML = "";

      // Adicionar cada usuário à tabela
      data.forEach((user) => {
        addUserToList(user);
      });
    })
    .catch((error) => {
      console.error("Erro ao obter a lista de usuários:", error);
    });
}

// Adicionar um evento de envio ao formulário de cadastro
document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que o formulário seja enviado normalmente

    // Capturar os valores dos campos do formulário
    var nome = document.getElementById("name").value;
    var idade = parseInt(document.getElementById("idade").value);
    var email = document.getElementById("email").value;
    var cep = document.getElementById("cep").value;

    // Criar o objeto de usuário com os valores capturados
    var user = {
      nome: nome,
      idade: idade,
      email: email,
      cep: cep,
    };

    // Enviar a requisição para cadastrar o usuário
    fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if ("error" in data) {
          alert(data.error);
          return;
        }

        alert("Usuário cadastrado com sucesso!");

        // Adicionar o usuário à lista
        addUserToList(data);

        // Limpar os campos do formulário
        document.getElementById("name").value = "";
        document.getElementById("idade").value = "";
        document.getElementById("email").value = "";
        document.getElementById("cep").value = "";
      })
      .catch((error) => {
        console.error("Erro ao cadastrar usuário:", error);
      });
  });

// Chamar a função para listar os usuários ao carregar a página
listUsers();
