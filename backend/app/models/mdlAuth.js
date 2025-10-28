// Importa a função de query do módulo de banco de dados
const { query } = require('../utils/db');

const getCredencialByUsername = async (username) => {
    // Texto da query SQL para buscar o usuário
    // $1 é um placeholder para o parâmetro (prevenção de SQL Injection)
    const sqlText = `
        SELECT username, password 
        FROM usuarios 
        WHERE username = $1 AND removido = false
    `;

    try {
        // Executa a query usando nossa função utilitária
        const result = await query(sqlText, [username]);
        
        // Retorna as linhas (registros) encontradas
        return result.rows;
    } catch (error) {
        console.error(`Erro ao buscar credencial para ${username}:`, error);
        throw error; // Propaga o erro para o controlador
    }
};

// Exporta as funções do modelo para serem usadas pelo controlador
module.exports = {
    getCredencialByUsername
};