# Kanban Board Next.js 13

## Visão Geral

Esta aplicação é um Kanban Board desenvolvido em Next.js 13, com o uso de Node.js 21.1.0 e estilização feita com Tailwind CSS. A aplicação é um monolito que inclui tanto o frontend quanto o backend. Os testes end-to-end (E2E) foram implementados utilizando o Cypress.

## Funcionalidades

- Visualização e organização de tarefas em um estilo Kanban.
- Drag and drop com a lib react-beautiful-dnd.
- Criação, edição e exclusão de tarefas.
- Arrastar e soltar para mover tarefas entre as colunas (To-Do, In Progress, Done).
- Testes end-to-end com Cypress para garantir a integridade das funcionalidades.

## Pré-requisitos

- Node.js 21.1.0
- Yarn (ou npm)
- Docker e Docker Compose (para o banco de dados)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/pedrohmorais/kanban-board
cd kanban-board
```

3. Utilize a versão do node especificada no arquivo '.nvmrc':
```bash
nvm use
```

3. Instale as dependências:

```bash
yarn install
```

4. Inicie o banco de dados com Docker Compose:
```bash
docker-compose up
```

5. Inicie a aplicação em modo desenvolvimento:
```bash
yarn dev
```

6. ou faça um build:
```bash
yarn build
yarn start
```

7. Testes e2e com cypress
```bash
yarn test
```