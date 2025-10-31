// Arquivo: frontend/app.js (VERSÃO FINAL COMPLETA)
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const session = require('express-session'); 
const bodyParser = require('body-parser'); 
const nunjucksDate = require('nunjucks-date-filter'); // Importa o filtro de data

const indexRouter = require('./routes/index');
const clientesRouter = require('./routes/clientes');
const contasReceberRouter = require('./routes/contasReceber');

const app = express();

// --- Configuração do Template Engine (Nunjucks) ---
const env = nunjucks.configure('views', { 
    autoescape: true, 
    express: app, 
    watch: true 
});
app.set('view engine', 'njk'); 

// --- ADICIONA OS FILTROS CUSTOMIZADOS ---
env.addFilter('date', nunjucksDate); 
env.addFilter('numberFormat', (num, locale, options) => { 
    try {
        return new Intl.NumberFormat(locale, options).format(num);
    } catch (e) {
        console.error("Erro no filtro numberFormat:", e);
        return num; 
    }
});

// --- Middlewares ---
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- Configuração da Sessão ---
if (!process.env.SESSION_SECRET) { 
    console.error('ERRO FATAL: SESSION_SECRET não definido!'); 
    process.exit(1); 
}
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true } 
}));

// *** CORREÇÃO PARA O MENU APARECER ***
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// --- Definição das Rotas ---
app.use('/', indexRouter);                         
app.use('/clientes', clientesRouter);             
app.use('/contas-receber', contasReceberRouter); 

// --- Tratamento de Erros (404) ---
app.use((req, res, next) => {
    res.status(404).render('404.njk', { 
        title: 'Página não encontrada' 
    });
});

// --- Tratamento de Erros Geral ---
app.use((err, req, res, next) => {
    console.error("Erro Front:", err.stack);
    res.status(500).render('500.njk', { 
        title: 'Erro Interno', 
        error: err.message 
    });
});

// --- Iniciar o Servidor ---
const PORT = process.env.PORT || 40100; 
app.listen(PORT, () => { 
    console.log(`🚀 Front-End Server rodando na porta ${PORT}`); 
    console.log(`Acessível externamente em http://localhost:${PORT}`);
});

module.exports = app;