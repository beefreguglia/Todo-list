# To-do

> Esse projeto é referente ao desenvolvimento de aplicação Full-Stack simples de gerenciamento de tarefas (To-Do-List).

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



`openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048`
`openssl rsa -pubout -in private_key.pem -out public_key.pem`