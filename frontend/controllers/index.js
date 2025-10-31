// Arquivo: frontend/controllers/index.js (VERSÃO FINAL ATUALIZADA)
const axios = require('axios');
const apiURL = process.env.API_URL; 

const renderIndex = (req, res) => { // GET /
    if (req.session?.token) { res.redirect('/clientes'); } else { res.redirect('/login'); }
};

const renderLoginPage = (req, res) => { // GET /login
    res.render('login.njk', { title: 'Login', error: req.query.error });
};

const processLogin = async (req, res) => { // POST /login
    if (!apiURL) { return res.redirect(`/login?error=Configuração interna incorreta.`); }
    try {
        const response = await axios.post(`${apiURL}/api/auth/login`, req.body);
        if (response.data?.auth === true && response.data.token) { // Verifica { auth, token }
            req.session.token = response.data.token;
            res.redirect('/clientes'); 
        } else { res.redirect('/login?error=Resposta inválida da API'); }
    } catch (error) {
        // Trata erro { message: ... }
        const msg = error.response?.data?.message || 'Erro ao conectar à API.';
        res.redirect(`/login?error=${encodeURIComponent(msg)}`);
    }
};

const logout = (req, res) => { // GET /logout
    req.session.destroy(() => {
        res.clearCookie('connect.sid'); 
        res.redirect('/login');
    });
};

module.exports = { renderIndex, renderLoginPage, processLogin, logout };