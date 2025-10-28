// Carrega dotenv
require('dotenv').config();

// Importa o modelo para buscar dados no BD
const authModel = require('../models/mdlAuth');
// Importa bcryptjs para comparar senhas
const bcrypt = require('bcryptjs');
// Importa jsonwebtoken para criar tokens
const jwt = require('jsonwebtoken');


// Lida com a requisição de login.
const login = async (req, res) => {
    const { username, password } = req.body;

    // Validação básica de entrada
    if (!username || !password) {
        return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' });
    }

    try {
        // 1. Busca o usuário no banco de dados
        const users = await authModel.getCredencialByUsername(username);

        // Se o usuário não for encontrado
        if (users.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const user = users[0]; // user.password contém o hash do banco

        // 2. Compara a senha enviada (limpa) com o hash do banco
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Se a senha for inválida
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // 3. Senha válida: Gera um JSON Web Token (JWT)
        const token = jwt.sign(
            { userId: user.usuarioid, username: user.username }, // Payload (dados do usuário no token)
            process.env.JWT_SECRET,                               // Chave secreta
            { expiresIn: '1h' }                                   // Tempo de expiração
        );

        // Retorna o token para o cliente (front-end)
        res.status(200).json({ auth: true, token: token });

    } catch (error) {
        console.error('Erro no processo de login:', error);
        res.status(500).json({ message: 'Erro interno do servidor durante o login.' });
    }
};

// Exporta a função de login para ser usada nas rotas
module.exports = {
    login
};