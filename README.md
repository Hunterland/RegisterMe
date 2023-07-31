
## Setup para Execução do Projeto

Aqui estão as informações relevantes para configurar e executar o projeto:

### Pré-requisitos

-   Node.js instalado (versão 10 ou superior)
-   SQLite (opcionalmente você pode usar outro banco de dados, mas o projeto está configurado para usar o SQLite por padrão)

### Passos

1.  Clone o repositório do projeto para o seu ambiente local:
    
    `git clone https://github.com/Hunterland/RegisterMe.git` 
    
2.  Acesse o diretório do projeto:
    
    `cd RegisterMe` 
    
3.  Instale as dependências do projeto utilizando o npm:
    
    `npm install` 
    
4.  Execute o comando para criar o banco de dados e a tabela (caso ainda não tenha sido criado):
    
    `node createdatabase.js` 
    
5.  Inicie o servidor da aplicação:
    
    `node app/server.js` 
    
6.  O servidor será iniciado na porta 3000. Você pode acessar a aplicação no seu navegador, digitando o seguinte endereço:
    
    `http://localhost:3000` 
    
7.  Agora você poderá interagir com a aplicação de cadastro de usuários.
    

### Configurações Adicionais

-   Banco de Dados: Por padrão, o projeto está configurado para usar o banco de dados SQLite com um arquivo `database.db` localizado na raiz do projeto.
    Caso deseje utilizar outro banco de dados, será necessário ajustar a configuração no arquivo `infra/database.js`.
    
-   Configuração do Servidor: O servidor está configurado para escutar na porta 3000 por padrão. Caso seja necessário utilizar outra porta,
    você pode modificar o valor no arquivo `app/server.js`.
    
-   URL da API: O frontend faz requisições à API utilizando a URL `http://localhost:3000/api`. Caso o servidor esteja sendo executado em uma URL diferente,
    você pode ajustar a variável `baseURL` no arquivo `frontend/js/script.js`.

- Visão Arquitetural e Design de Solução

  https://miro.com/app/board/uXjVMOt6JGI=/?share_link_id=995491413216
