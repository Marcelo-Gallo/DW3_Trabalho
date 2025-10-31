<<<<<<< HEAD
//// Arquivo: frontend/app.js (VERSÃO FINAL COMPLETA)
// Descrição: Ponto de entrada do servidor Front-End (Interface Web).

=======
>>>>>>> 5974d28db4eb4434688c9f11d64dd63b99654077
// Importa os módulos principais
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
<<<<<<< HEAD
const session = require('express-session'); 
const bodyParser = require('body-parser'); 
const nunjucksDate = require('nunjucks-date-filter'); // Importa o filtro de data
=======
const session = require('express-session'); // Para gerenciar o login do usuário
const bodyParser = require('body-parser'); // Para ler formulários de login
>>>>>>> 5974d28db4eb4434688c9f11d64dd63b99654077

// Importa as rotas
const indexRouter = require('./routes/index');
const clientesRouter = require('./routes/clientes');
const contasReceberRouter = require('./routes/contasReceber');

// Inicializa o Express
const app = express();

<<<<<<< HEAD
// --- Configuração do Template Engine (Nunjucks) ---
// Salva o ambiente Nunjucks na variável 'env'
const env = nunjucks.configure('views', { 
=======
// Define a pasta onde os arquivos .njk (views) estão
nunjucks.configure('views', {
>>>>>>> 5974d28db4eb4434688c9f11d64dd63b99654077
    autoescape: true, // Protege contra XSS
    express: app,     // Vincula o Nunjucks ao app Express
    watch: true       // Recarrega templates automaticamente (ótimo para dev)
});
app.set('view engine', 'njk'); // Define a extensão dos arquivos de view

<<<<<<< HEAD
// --- ADICIONA OS FILTROS CUSTOMIZADOS ---
// 1. Filtro 'date' (requer 'npm install nunjucks-date-filter')
env.addFilter('date', nunjucksDate); 

// 2. Filtro 'numberFormat' (para moeda BRL)
env.addFilter('numberFormat', (num, locale, options) => { 
    try {
        // Usa a API nativa do JS Intl.NumberFormat
        return new Intl.NumberFormat(locale, options).format(num);
    } catch (e) {
        console.error("Erro no filtro numberFormat:", e);
        return num; // Retorna o número original em caso de erro
    }
});
// --- (Fim dos filtros) ---


// --- Middlewares ---
// Serve arquivos estáticos (CSS, JS) da pasta /public
=======
// --- Middlewares ---
>>>>>>> 5974d28db4eb4434688c9f11d64dd63b99654077
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares para analisar o corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

<<<<<<< HEAD
// --- Configuração da Sessão (Crucial para o Login) ---
// Verifica se o SESSION_SECRET foi carregado do .env
if (!process.env.SESSION_SECRET) { 
    console.error('ERRO FATAL: SESSION_SECRET não definido nas variáveis de ambiente!'); 
    process.exit(1); // Aborta a inicialização
}
app.use(session({
    secret: process.env.SESSION_SECRET, // Lê do .env
    resave: false, 
    saveUninitialized: true,
=======
// --- Configuração da Sessão ---
app.use(session({
    secret: process.env.SESSION_SECRET, // Chave secreta lida do .env
    resave: false,                      // Não salva a sessão se não houver mudanças
    saveUninitialized: true,            // Salva sessões novas (mesmo vazias)
>>>>>>> 5974d28db4eb4434688c9f11d64dd63b99654077
    cookie: { 
        secure: false, // Em produção (HTTPS), mude para 'true'
        httpOnly: true // Impede acesso ao cookie via JS no navegador
    } 
}));

<<<<<<< HEAD
// *** CORREÇÃO PARA O MENU APARECER ***
// Middleware global para expor a sessão para as views (Nunjucks)
// Isso permite que o 'layout.njk' consiga ler 'session.token'
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// --- Definição das Rotas ---
app.use('/', indexRouter);                         
app.use('/clientes', clientesRouter);             
app.use('/contas-receber', contasReceberRouter); 

// --- Tratamento de Erros (404) --- (Restaurado para usar a view)
app.use((req, res, next) => {
    res.status(404).render('404.njk', { 
        title: 'Página não encontrada' 
    });
});

// --- Tratamento de Erros Geral --- (Restaurado para usar a view)
app.use((err, req, res, next) => {
    console.error("Erro Front:", err.stack);
    res.status(500).render('500.njk', { 
        title: 'Erro Interno', 
        error: err.message 
    });
});

// --- Iniciar o Servidor ---
// Lê a porta do .env, conforme configuração do Docker corrigida
const PORT = process.env.PORT || 40100; 
app.listen(PORT, () => { 
    console.log(`🚀 Front-End Server rodando na porta ${PORT}`); 
=======
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
>>>>>>> 5974d28db4eb4434688c9f11d64dd63b99654077
    console.log(`Acessível externamente em http://localhost:${PORT}`);
});

module.exports = app;