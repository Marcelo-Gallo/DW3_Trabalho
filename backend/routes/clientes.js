// Define as rotas da API para a entidade CLIENTES, incluindo proteção JWT.

const express = require('express');
const router = express.Router();

// Importa o controlador de clientes
const ctlClientes = require('../app/controllers/ctlClientes');
// Importa o middleware de verificação JWT
const { verifyJWT } = require('../app/utils/auth');

// Retorna todos os clientes
router.get('/', verifyJWT, ctlClientes.getAllClientes);
// Retorna um cliente específico pelo ID
router.get('/:id', verifyJWT, ctlClientes.getClienteByID);
// Insere um novo cliente
router.post('/', verifyJWT, ctlClientes.insertCliente);
// Atualiza um cliente existente
router.put('/:id', verifyJWT, ctlClientes.updateCliente);
// Remove (soft delete) um cliente
router.delete('/:id', verifyJWT, ctlClientes.deleteCliente);

// Exporta o router para ser usado pelo app.js
module.exports = router;