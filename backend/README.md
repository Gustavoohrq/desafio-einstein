
# Backend

Esta é uma aplicação backend construida com NestJs, Prisma e MySql

## Configuração do Ambiente

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- Docker
- Node.js
- npm (ou yarn)

### Configuração do Banco de Dados

1. Clone este repositório:
   ```bash
   git clone https://github.com/Gustavoohrq/desafio-einstein.git
   cd backend
   ```

2. Inicie o MySQL usando Docker Compose:
   ```bash
   docker-compose up -d
   ```
   Isso iniciará o MySQL no Docker Compose conforme configurado no arquivo `docker-compose.yml`.

3. Configure as variáveis de ambiente para a conexão com o banco de dados MySQL no arquivo `.env`:
   ```
   DATABASE_URL=mysql://usuario:senha@localhost:3306/nome_do_banco
   ```
   Substitua `usuario`, `senha`, `localhost`, `3306` e `nome_do_banco` pelos valores apropriados de acordo com sua configuração do Docker Compose e do MySQL.
4. Iniciar prisma
   ```bash
   npx prisma db push
   ```
3. **Configure as variáveis de ambiente**: Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:
   ```env
   DATABASE_URL=
   ```
## Instalação

Instale as dependências do projeto:

```bash
npm install
# ou
yarn install
```

## Uso

Para iniciar o servidor Nest.js:

```bash
npm run start
# ou
yarn start
```

## Rotas da API

### Agendamentos

#### Criar Agendamento

Cria um novo agendamento.

- **Path:** `/scheduling`
- **Tipo:** POST

#### Listar Agendamentos

Lista todos os agendamentos existentes.

- **Path:** `/scheduling`
- **Tipo:** GET

#### Confirmar Agendamento

Confirma um agendamento existente.

- **Path:** `/scheduling/confirmation/{id}`
- **Tipo:** PATCH

#### Cancelar Agendamento

Cancela um agendamento existente.

- **Path:** `/scheduling/cancel/{id}`
- **Tipo:** PATCH

### Slots

#### Listar Slots Disponíveis

Lista todos os slots disponíveis para agendamento.

- **Path:** `/slots`
- **Tipo:** GET

