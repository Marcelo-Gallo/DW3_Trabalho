// Arquivo: frontend/routes/index.js (VERSÃO FINAL)
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.js'); 
const isAuth = require('../controllers/authMiddleware');
const redirectIfAuth = (req, res, next) => { req.session?.token ? res.redirect('/clientes') : next(); };

router.get('/', indexController.renderIndex);
router.get('/login', redirectIfAuth, indexController.renderLoginPage);
router.post('/login', redirectIfAuth, indexController.processLogin);
router.get('/logout', isAuth, indexController.logout);

module.exports = router;