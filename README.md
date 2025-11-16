# Testes Automatizados de API no [Serverest](https://serverest.dev/) 
Suite de testes automatizados de API desenvolvida em Cypress, validando cenários de autenticação, usuários, produtos e carrinhos de compra.

## Instalação das dependências
Antes de iniciar, certifique-se de ter o **Node.js** com o **npm** instalado.

1. Clone o repositório:

```git clone https://github.com/Marianaap/desafio-api-QA.git```

2. Acesse a pasta do projeto:

```cd desafio-api-QA```

2. Instale as dependências:

```npm install```

## Execução dos testes
Modo headless (execução em terminal) - ```Recomendado```

```npx cypress run```

Modo interativo (Dashboard do Cypress)

```npx cypress open```


## Cenários Automatizados
#### Autenticação
- Cenário 1 - Fazer o login ao usar um usuário cadastrado valido: Verifica se um usuário já cadastrado consegue fazer login com sucesso, recebendo a mensagem de confirmação e o token de autorização da API.
      
- Cenário 2 - Login com dados inválidos: Garante que a API não permita o login quando o usuário informa email ou senha incorretos, retornando a mensagem de erro apropriada.
   

#### Usuários
- Cenário 1 - Listar usuários cadastrados: Verifica se o sistema consegue mostrar todos os usuários existentes e retorna as informações corretamente.

- Cenário 2 - Buscar dados de um usuário específico: Verifica se o sistema encontra um usuário pelo ID e mostra os dados certos (nome e e-mail).

#### Produtos
- Cenário 1  - Cadastrar um produto (admin logado): Testa se um administrador consegue criar um novo produto com sucesso.

- Cenário 2 - Impedir cadastro duplicado (admin logado): Testa se o sistema bloqueia o cadastro de um produto com nome já existente.

- Cenário 3 - Listar produtos (sem login): Testa se qualquer pessoa consegue visualizar a lista de produtos cadastrados.

#### Carrinhos
- Cenário 1  - Criar um carrinho com produtos (admin logado): Testa se o administrador consegue montar um carrinho com alguns produtos disponíveis.

- Cenário 2 - Cancelar um carrinho criado (admin logado): Testa se o administrador consegue excluir um carrinho e devolver os itens ao estoque.

- Cenário 3 - Listar carrinhos cadastrados (sem login): Testa se qualquer pessoa consegue ver a lista de carrinhos existentes no sistema.