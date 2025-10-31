// Arquivo: backend/app.js (VERSÃO FINAL CORRIGIDA)
require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const clientesRouter = require('./routes/clientes');
const contasReceberRouter = require('./routes/contasReceber');

const app = express();
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/', indexRouter); 
app.use('/api/auth', authRouter); 
app.use('/api/clientes', clientesRouter); 
app.use('/api/contas-receber', contasReceberRouter); 

app.use((req, res, next) => { // 404
  const error = new Error('Recurso não encontrado na API');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => { // Erro geral
  res.status(error.status || 500);
  res.json({ message: error.message }); // Formato { message: ... }
});

const PORT = process.env.PORT || 40000; // Lê do .env
app.listen(PORT, () => { console.log(`🚀 Back-End Server rodando na porta ${PORT}`); });

module.exports = app;