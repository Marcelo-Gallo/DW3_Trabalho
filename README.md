# Projeto DW3 - Módulo Financeiro ERP

Este projeto é o trabalho da disciplina de Desenvolvimento Web III (DW3).

Nele vamos criar uma aplicação web completa na arquitetura cliente-Servidor, composta por
uma API Back-End e um Front-End para um módulo financeiro de ERP.

## Grupo

* Marcelo Augusto Godoi Gallo
* Fernando Yudi Tarzia
* Pedro Henrique Bertolli Garcia


## Tema do Módulo Financeiro

O projeto implementará um CRUD para **Clientes** e suas respectivas **Contas a Receber**. A lógica do sistema é do ponto de vista da empresa que utiliza o software:

* **Clientes:** São os devedores da empresa.
* **Contas a Receber:** São as dívidas que os clientes têm com a empresa.

## Estrutura do Banco de Dados

### Tabela 1: `CLIENTES`
* **ID**: Numérico (Chave Primária)
* **Nome**: Texto (Obrigatório)
* **CNPJ**: Texto (Opcional)
* **DataCadastro**: Data (Obrigatório)
* **LimiteCredito**: Decimal (Obrigatório)
* **Removido**: Booleano (Valor padrão: `falso`)

### Tabela 2: `CONTAS_RECEBER`
* **ID**: Numérico (Chave Primária)
* **Descricao**: Texto (Obrigatório)
* **Valor**: Decimal (Obrigatório)
* **DataVencimento**: Data (Obrigatório)
* **Removido**: Booleano (Valor padrão: `falso`)
* **ID_Cliente**: Numérico (Chave Estrangeira - se conecta com o ID da tabela `CLIENTES`)

**Relacionamento:** Um registro na tabela `CLIENTES` pode estar associado a vários registros na tabela `CONTAS_RECEBER` (Relacionamento 1:N).

## Arquitetura e Tecnologias

* **Back-End:** Node.js, com APIs REST e segurança JWT.
* **Front-End:** Node.js com Express e Nunjucks como template engine (motor de vizualização).
* **SGBD:** PostgreSQL.

---

## Estrutura de Arquivos e Pastas
/
├── .gitignore              # Ignora node_modules, .env, etc.
├── README.md               # Documentação principal
├── docker-compose.yml      # "Maestro" do Docker
├── backend/                # Servidor Back-End (API)
│   ├── Dockerfile          # Receita Docker do Back-End
│   ├── package.json        # Dependências do Back-End
│   ├── app.js              # Ponto de entrada do Back-End
│   ├── databaseConfig.sql  # Script de criação das tabelas
│   ├── app/                # Lógica da aplicação
│   │   ├── controllers/    # Controladores (regras de negócio)
│   │   ├── models/         # Modelos (interação com o BD)
│   │   └── utils/          # Funções (conexão BD, auth)
│   ├── routes/             # Definição das rotas da API
│   └── .env                # Variáveis de ambiente (senhas)
│
└── frontend/               # Servidor Front-End (Interface)
    ├── Dockerfile          # Receita Docker do Front-End
    ├── package.json        # Dependências do Front-End
    ├── app.js              # Ponto de entrada do Front-End
    ├── public/             # Arquivos estáticos (CSS, JS, Imagens)
    │   ├── stylesheets/
    │   ├── javascripts/
    │   └── images/
    ├── routes/             # Rotas que renderizam páginas
    ├── controllers/        # Controladores (lógica das páginas)
    ├── views/              # Arquivos de template (.njk)
    │   ├── clientes/       # Views de Clientes
    │   └── contasReceber/  # Views de Contas a Receber
    └── .env                # Variáveis de ambiente (URL da API)
