// Middleware para verificar a validade de um JSON Web Token (JWT).

// Carrega variáveis de ambiente para acessar o JWT_SECRET
require('dotenv').config();

// Importa jsonwebtoken para verificar tokens
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    // 1. Pega o token do cabeçalho de autorização
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Pega a segunda parte

    // 2. Verifica se o token existe
    if (!token) {
        // Retorna erro 401 se nenhum token for fornecido
        return res.status(401).json({ auth: false, message: 'Nenhum token fornecido.' });
    }

    // 3. Verifica a validade do token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // Se houver um erro na verificação (token inválido, expirado, etc.)
        if (err) {
            return res.status(403).json({ auth: false, message: 'Falha na autenticação do token.' });
        }

        // Se o token for válido, os dados decodificados (payload) são anexados à requisição
        req.userId = decoded.userId;
        req.username = decoded.username;
        
        // Passa o controle para a próxima função middleware ou rota
        next();
    });
};

// Exporta o middleware
module.exports = {
    verifyJWT
};