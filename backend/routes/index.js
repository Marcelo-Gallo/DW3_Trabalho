// Arquivo: backend/routes/index.js (VERSÃO FINAL GERADA)
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        status: 'API Online',
        message: 'Bem-vindo ao Back-End!',
        endpoints: { auth: '/api/auth', clientes: '/api/clientes', contas_a_receber: '/api/contas-receber' }
    });
});

module.exports = router;