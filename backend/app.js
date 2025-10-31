// Ponto de entrada do servidor Back-End (API RESTful).

require('dotenv').config(); // Carrega variáveis de ambiente

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importa módulos de rota
const indexRouter = require('./routes/index'); // Exemplo de rota padrão
const authRouter = require('./routes/auth'); // Rotas de autenticação
const clientesRouter = require('./routes/clientes'); // Rotas para CRUD de clientes
const contasReceberRouter = require('./routes/contasReceber'); // Rotas para CRUD de contas a receber

const app = express();

// Middlewares
app.use(cors()); // Habilita CORS
app.use(bodyParser.json()); // Parsing de JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parsing de URL-encoded

// Definição das rotas
app.use('/', indexRouter); // Rota raiz
app.use('/api/auth', authRouter); // Rotas de autenticação (login, registro)
app.use('/api/clientes', clientesRouter); // Rotas para CRUD de clientes
app.use('/api/contas-receber', contasReceberRouter); // Rotas para CRUD de contas a receber

// Tratamento de erros 404
app.use((req, res, next) => {
  const error = new Error('Recurso não encontrado na API');
  error.status = 404;
  next(error);
});

// Tratamento de erros geral
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Inicia o servidor
const PORT = 40000;
app.listen(PORT, () => {
  console.log(`Back-End Server rodando na porta ${PORT}`);
  console.log(`Acessível externamente em http://localhost:${PORT}`);
});

module.exports = app;