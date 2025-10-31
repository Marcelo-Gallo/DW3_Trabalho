const isAuth = (req, res, next) => {
    // Verifica se o token JWT está armazenado na sessão
    if (req.session && req.session.token) {
        // Usuário está logado, permite continuar
        return next();
    } else {
        // Usuário não está logado, redireciona para a página de login
        res.redirect('/login');
    }
};

module.exports = isAuth;