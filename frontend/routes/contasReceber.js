// Arquivo: frontend/routes/contasReceber.js (VERSÃO FINAL)
const express = require('express');
const router = express.Router();
const contasController = require('../controllers/contasReceber.js'); 
const isAuth = require('../controllers/authMiddleware'); 
router.use(isAuth); // Protege TODAS abaixo
router.get('/', contasController.renderListContas);        
router.get('/add', contasController.renderFormConta);      
router.get('/edit/:id', contasController.renderFormConta);  
router.post('/save', contasController.processFormConta);   
router.get('/delete/:id', contasController.deleteConta);    
module.exports = router;