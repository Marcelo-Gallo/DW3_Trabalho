// Arquivo: backend/routes/contasReceber.js (VERSÃO FINAL GERADA)
const express = require('express');
const router = express.Router();
const ctlContasReceber = require('../app/controllers/ctlContasReceber');
const { verifyJWT } = require('../app/utils/auth'); // Usa desestruturação

router.get('/', verifyJWT, ctlContasReceber.getAllContas);
router.get('/:id', verifyJWT, ctlContasReceber.getContaByID);
router.get('/cliente/:id_cliente', verifyJWT, ctlContasReceber.getContasByClienteID); 
router.post('/', verifyJWT, ctlContasReceber.insertConta);
router.put('/:id', verifyJWT, ctlContasReceber.updateConta);
router.delete('/:id', verifyJWT, ctlContasReceber.deleteConta);

module.exports = router;