// Arquivo: frontend/routes/clientes.js (VERSÃO FINAL)
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clientes.js'); 
const isAuth = require('../controllers/authMiddleware'); 
router.use(isAuth); // Protege TODAS abaixo
router.get('/', clienteController.renderListClientes);      
router.get('/add', clienteController.renderFormCliente);    
router.get('/edit/:id', clienteController.renderFormCliente); 
router.post('/save', clienteController.processFormCliente); 
router.get('/delete/:id', clienteController.deleteCliente); 
module.exports = router;