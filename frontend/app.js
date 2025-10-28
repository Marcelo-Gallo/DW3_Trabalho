// Importa os módulos principais
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const session = require('express-session'); // Para gerenciar o login do usuário
const bodyParser = require('body-parser'); // Para ler formulários de login

// Importa as rotas
const indexRouter = require('./routes/index');
const clientesRouter = require('./routes/clientes');
const contasReceberRouter = require('./routes/contasReceber');

// Inicializa o Express
const app = express();

// Define a pasta onde os arquivos .njk (views) estão
nunjucks.configure('views', {
    autoescape: true, // Protege contra XSS
    express: app,     // Vincula o Nunjucks ao app Express
    watch: true       // Recarrega templates automaticamente (ótimo para dev)
});
app.set('view engine', 'njk'); // Define a extensão dos arquivos de view

// --- Middlewares ---
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares para analisar o corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- Configuração da Sessão ---
app.use(session({
    secret: process.env.SESSION_SECRET, // Chave secreta lida do .env
    resave: false,                      // Não salva a sessão se não houver mudanças
    saveUninitialized: true,            // Salva sessões novas (mesmo vazias)
    cookie: { 
        secure: false, // Em produção (HTTPS), mude para 'true'
        httpOnly: true // Impede acesso ao cookie via JS no navegador
    } 
}));

// --- Definição das Rotas ---
app.use('/', indexRouter);                         // Ex: /, /login, /logout
app.use('/clientes', clientesRouter);             // Ex: /clientes, /clientes/add
app.use('/contas-receber', contasReceberRouter); // Ex: /contas-receber

// --- Tratamento de Erros (404) ---
app.use((req, res, next) => {
    res.status(404).render('404.njk', { title: 'Página não encontrada' });
});

// --- Tratamento de Erros Geral ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500.njk', { error: err.message });
});

// --- Iniciar o Servidor ---
const PORT = process.env.PORT || 40100;
app.listen(PORT, () => {
    console.log(`Front-End Server rodando na porta ${PORT}`);
    console.log(`Acessível externamente em http://localhost:${PORT}`);
});

module.exports = app;