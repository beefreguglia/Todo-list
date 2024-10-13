# To-do

> Esse projeto é referente ao desenvolvimento de aplicação Full-Stack simples de gerenciamento de tarefas (To-Do-List).

## ⚙️ Como rodar o projeto
  - Primeiro: Utilize o comando pnpm install na raiz do projeto
    Como foi utilizado o pnpm workspaces para fazer a estrutura de monorepo
    (Link para instalação: https://pnpm.io/installation)

  - Segundo: Utilize o comando docker-compose up -d para preparar o banco de dados utilizando docker
  - Terceiro: Popule o arquivo .env na raiz do projeto com as informações do .env.example
  - Quarto: Acesse a pasta da API localizada em ./apps/api
  - Quinto: Utilize o comando pnpm run db:migrate para criar as migrations no seu banco de dados
  - Volte para raiz e utilize o comando pnpm run dev para rodar o projeto
  
## ⚙️ Comando testes
  - Backend: 
  - Acesse a pasta da API localizada em ./apps/api
  - Rode pnpm run tests ou pnpm run tests:e2e
  - Frontend:
  - pnpm playwright test --ui

## 💻 Tecnologias

- Node.Js
- Typescript
- Eslint
- Prettier
- @t3-oss/env-nextjs
- Turbo
- Zod
- Nest
- Prisma
- Dotenv-cli
- Vitest
- SWC
- React
- Next
- React Hook Form
- Tailwind
- Axios
- Phosphor-icons
- @tanstack/react-query
- Nookies
- Playwright

## Requisitos funcionais

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível criar uma nova tarefa;
- [x] Deve ser possível ver todas as tarefas do próprio usuário;
- [x] Deve ser possível editar uma tarefa;
- [x] Deve ser possível deletar uma tarefa;

## Regras de negócio

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;

## Regras não-funcionais

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [x] o usuário deve ser identificado por um JWT (JSON Web Token) ;
- [x] Devemos utilizar Nest junto do Prisma ORM para o back-end;
- [x] Devemos utilizar Next para o front-end utilizando SSG ou SSR;

