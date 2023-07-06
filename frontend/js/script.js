// funçã£o para saber se o usuário jÃ¡ foi cadastrado.
function isUserAlreadyRegistered(user) {
  var table = document.getElementById("userTableBody");
  var rows = table.getElementsByTagName("tr");

  for (var i = 1; i < rows.length; i++) {
    var nameCell = rows[i].getElementsByTagName("td")[0];
    var ageCell = rows[i].getElementsByTagName("td")[1];
    var emailCell = rows[i].getElementsByTagName("td")[2];
    var cepCell = rows[i].getElementsByTagName("td")[3];

    var registeredName = nameCell.textContent;
    var registeredAge = parseInt(ageCell.textContent);
    var registeredEmail = emailCell.textContent;
    var registeredCep = cepCell.textContent;

    if (
      registeredName === user.name &&
      registeredAge === user.age &&
      registeredEmail === user.email &&
      registeredCep === user.cep
    ) {
      return true;
    }
  }

  return false;
}

document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o recarregamento da pÃ¡gina ao enviar o formulÃ¡rio

    // Captura os valores dos campos
    var name = document.getElementById("name").value;
    var idade = parseInt(document.getElementById("idade").value);
    var email = document.getElementById("email").value;
    var cep = document.getElementById("cep").value;

    // Validação do CEP e estado usando a API do ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        var state = data.uf;

        // Verifica se o CEP pertence ao estado do Amazonas
        if (state !== "AM") {
          alert("Desculpe, apenas residentes do Amazonas podem se cadastrar.");
          return;
        }

        // Verifica se o usuÃ¡rio tem mais de 18 anos
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var userBirthYear = currentYear - idade;

        if (userBirthYear >= currentYear - 18) {
          alert("Desculpe, apenas maiores de 18 anos podem se cadastrar.");
          return;
        }

        // Cria uma representaÃ§Ã£o do usuÃ¡rio com os dados fornecidos
        var user = {
          name: name,
          idade: idade,
          email: email,
          cep: cep,
        };

        // verifica se o usuÃ¡rio jÃ¡ estÃ¡ cadastrado.
        if (isUserAlreadyRegistered(user)) {
          alert("Desculpe, esse usuÃ¡rio jÃ¡ estÃ¡ cadastrado.");
          return;
        }

        // Adiciona o usuÃ¡rio na lista de usuÃ¡rios
        addUserToList(user);

        // Limpa os campos do formulário
        document.getElementById("name").value = "";
        document.getElementById("idade").value = "";
        document.getElementById("email").value = "";
        document.getElementById("cep").value = "";
      })
      .catch((error) => {
        console.error("Erro na API do ViaCEP:", error);
      });
  });

// função que adiciona o usuário na lista
function addUserToList(user) {
  var table = document.getElementById("userTable");

  // Cria uma nova linha na tabela
  var row = table.insertRow();

  // Insere as células da linha com os dados do usuário
  var nameCell = row.insertCell();
  nameCell.textContent = user.name;

  var ageCell = row.insertCell();
  ageCell.textContent = user.age;

  var emailCell = row.insertCell();
  emailCell.textContent = user.email;

  var cepCell = row.insertCell();
  cepCell.textContent = user.cep;

  var actionsCell = row.insertCell();
  actionsCell.innerHTML = '<button class="editButton">Editar</button>';

  // Adiciona um evento de clique no botão de editar
  var editButton = actionsCell.querySelector(".editButton");
  editButton.addEventListener("click", function () {
    // Chama a funÃ§Ã£o de ediÃ§Ã£o do usuário
    openEditModal(user);
  });

  // Adiciona um evento de clique no botão de remover
  var removeButton = document.createElement("button");
  removeButton.classList.add("removeButton");
  removeButton.textContent = "Remover";
  removeButton.addEventListener("click", function () {
    removeUser(user);
  });

  actionsCell.appendChild(removeButton);
}

// função para abrir o modal
function openEditModal(user) {
  var modal = document.getElementById("editModal");
  var newNameInput = document.getElementById("newName");
  var newIdadeInput = document.getElementById("newIdade");
  var newEmailInput = document.getElementById("newEmail");
  var newCepInput = document.getElementById("newCep");

  // Preenche os campos de input com os dados atuais do usuário
  newNameInput.value = user.name;
  newIdadeInput.value = user.idade;
  newEmailInput.value = user.email;
  newCepInput.value = user.cep;

  // Adiciona um evento de envio ao formulário dentro do modal
  document
    .getElementById("editForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Evita o recarregamento da página ao enviar o formulário

      var newName = newNameInput.value;
      var newIdade = parseInt(newIdadeInput.value);
      var newEmail = newEmailInput.value;
      var newCep = newCepInput.value;

      if (newName && newIdade && newEmail && newCep) {
        // Atualiza os dados do usuário
        user.name = newName;
        user.Idade = newIdade;
        user.email = newEmail;
        user.cep = newCep;

        // Encontra a linha correspondente ao usuário na tabela e atualiza as células
        var table = document.getElementById("userTable");
        var rows = table.getElementsByTagName("tr");

        for (var i = 1; i < rows.length; i++) {
          var nameCell = rows[i].getElementsByTagName("td")[0];
          if (nameCell.textContent === user.name) {
            var IdadeCell = rows[i].getElementsByTagName("td")[1];
            var emailCell = rows[i].getElementsByTagName("td")[2];
            var cepCell = rows[i].getElementsByTagName("td")[3];

            nameCell.textContent = newName;
            IdadeCell.textContent = newAge;
            emailCell.textContent = newEmail;
            cepCell.textContent = newCep;
            break;
          }
        }

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

    // Fecha o modal de confirmação
    confirmationModal.style.display = "none";
  });

  // Adiciona um evento de clique no botão de cancelar
  cancelButton.addEventListener("click", function () {
    // Fecha o modal de confirmação
    confirmationModal.style.display = "none";
  });
}

function deleteUserFromList(user) {
  // Encontre a linha correspondente ao usuário na tabela e remova-a
  var table = document.getElementById("userTable");
  var rows = table.getElementsByTagName("tr");

  for (var i = 1; i < rows.length; i++) {
    var nameCell = rows[i].getElementsByTagName("td")[0];
    if (nameCell.textContent === user.name) {
      table.deleteRow(i);
      break;
    }
  }
}

// script.js
document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que o formulário seja enviado normalmente

    // Captura os valores dos campos do formulário
    const nome = document.getElementById("name").value;
    const idade = parseInt(document.getElementById("idade").value);
    const email = document.getElementById("email").value;
    const cep = document.getElementById("cep").value;

    // Cria o objeto de usuário com os valores capturados
    const user = {
      nome,
      idade,
      email,
      cep,
    };

    fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        // Manipule os dados da resposta aqui
        console.log("Usuário cadastrado com sucesso:", data);
      })
      .catch((error) => {
        console.error("Erro ao cadastrar usuário:", error);
      });
  });

// // Função para realizar uma requisição GET para obter a lista de usuários do backend
// function getUsers() {
//   fetch("http://localhost:3000/api/users")
//     .then((response) => response.json())
//     .then((data) => {
//       // Manipule os dados da resposta aqui
//       // Por exemplo, você pode adicionar os usuários à tabela na página HTML

//       const userTableBody = document.getElementById("userTableBody");

//       // Limpar a tabela antes de adicionar os usuários
//       userTableBody.innerHTML = "";

//       data.forEach((user) => {
//         const row = document.createElement("tr");

//         const nomeCell = document.createElement("td");
//         nomeCell.textContent = user.nome;
//         row.appendChild(nomeCell);

//         const idadeCell = document.createElement("td");
//         idadeCell.textContent = user.idade;
//         row.appendChild(idadeCell);

//         const emailCell = document.createElement("td");
//         emailCell.textContent = user.email;
//         row.appendChild(emailCell);

//         const cepCell = document.createElement("td");
//         cepCell.textContent = user.cep;
//         row.appendChild(cepCell);

//         const actionsCell = document.createElement("td");
//         // Adicione os botões de ação (editar, excluir, etc.) conforme necessário
//         actionsCell.innerHTML = "<button>Edit</button> <button>Delete</button>";
//         row.appendChild(actionsCell);

//         userTableBody.appendChild(row);
//       });
//     })
//     .catch((error) => {
//       console.error("Erro ao obter a lista de usuários:", error);
//     });
// }

// // Chamada da função para obter os usuários ao carregar a página
// document.addEventListener("DOMContentLoaded", getUsers);
''