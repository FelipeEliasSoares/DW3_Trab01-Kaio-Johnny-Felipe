# Módulo Financeiro do ERP - Sistema de Controle de Cooperativas

Este projeto é a implementação de um módulo financeiro de um sistema ERP voltado para cooperativas. Ele envolve a criação e manipulação de tabelas no banco de dados PostgreSQL, com foco na tabela de **conta** e no desenvolvimento de APIs e interface gráfica para o CRUD dessas tabelas.

## Configuração do Banco de Dados

Para configurar o banco de dados PostgreSQL com as tabelas necessárias, siga as instruções abaixo.

### 1. Habilitar a Extensão `pgcrypto`

Para permitir a geração de UUIDs de forma segura, é necessário habilitar a extensão `pgcrypto` no banco de dados:

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

2. Criação da Tabela usuario

A tabela usuario armazena informações de usuários do sistema com senhas criptografadas.

CREATE TABLE usuario (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    login VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL
    removido BOOLEAN DEFAULT FALSE
);

    Inserção de dados de exemplo na tabela usuario: A senha é criptografada usando o algoritmo bcrypt.

INSERT INTO usuario (email, login, senha)
VALUES 
    ('admin@example.com', 'admin', crypt('admin', gen_salt('bf')))
ON CONFLICT DO NOTHING;

3. Criação da Tabela conta

A tabela conta armazena informações das contas financeiras, associadas a um usuário.

CREATE TABLE conta (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    data DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    forma_pagamento VARCHAR(50) NOT NULL,
    usuario_id UUID NOT NULL,
    removido BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);
```
Estudo de Caso

O objetivo é desenvolver APIs para executar operações de CRUD na tabela conta. Além disso, será criada uma interface gráfica no front-end para interagir com essas APIs.
1. Regras de Negócio

As operações de CRUD que devem ser implementadas são:

    GetAllContas: Retorna todos os registros da tabela conta que não foram removidos (campo removido = false).
    GetContaByID: Retorna um registro específico da tabela conta de acordo com o ID informado, desde que não tenha sido removido (removido = false).
    InsertConta: Insere um novo registro na tabela conta.
    UpdateConta: Atualiza um registro na tabela conta com base no ID informado.
    DeleteConta: Realiza um soft delete no registro da tabela conta, marcando o campo removido como true, sem remover o registro fisicamente.

Implementação das APIs
Endpoints

    GET /contas: Retorna todas as contas que não foram removidas.
    GET /contas/{id}: Retorna uma conta específica com base no ID fornecido, desde que não tenha sido removida.
    POST /contas: Insere uma nova conta no banco de dados.
    PUT /contas/{id}: Atualiza as informações de uma conta existente com base no ID.
    DELETE /contas/{id}: Realiza um soft delete na conta, marcando o campo removido como true.

Front-end

    O front-end deve incluir funções para cada API mencionada acima, permitindo a interação com o back-end.
    Deve haver controle de sessão de usuário logado, garantindo que apenas usuários autenticados possam acessar as funcionalidades.

Funcionalidades de Sessão

    Autenticação do usuário com verificação de login e senha.
    Manutenção da sessão para permitir acesso seguro às operações do módulo financeiro.

Tecnologias Utilizadas

    Back-end: PostgreSQL, APIs REST
    Segurança: Criptografia de senha usando bcrypt
    Front-end: Interface gráfica com chamadas às APIs

Como Executar

    Configure o banco de dados PostgreSQL conforme descrito acima.
    Implemente as APIs seguindo as regras de negócio descritas.
    Desenvolva o front-end para interagir com as APIs.
    Certifique-se de que o controle de sessão de usuário esteja implementado corretamente.

Este projeto é um exemplo de como gerenciar contas financeiras no módulo financeiro de um sistema ERP, garantindo segurança e eficiência no acesso e na manipulação dos dados.
