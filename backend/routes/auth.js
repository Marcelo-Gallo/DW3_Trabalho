// Define as rotas para o endpoint de autenticação.

const express = require('express');
const router = express.Router();

// Importa o controlador de autenticação
const ctlAuth = require('../app/controllers/ctlAuth.js');

// Define a rota para o login
router.post('/login', ctlAuth.login);

// Exporta o router para ser usado pelo app.js
module.exports = router;