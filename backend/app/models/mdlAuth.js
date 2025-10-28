// Importa a função de query do módulo de banco de dados
const { query } = require('../utils/db');

/**
 * Busca as credenciais de um usuário pelo username.
 * @param {string} username - O nome de usuário para buscar.
 * @returns {Promise<Array>} Um array com os usuários encontrados (espera-se 0 ou 1).
 */
const getCredencialByUsername = async (username) => {
    // Texto da query SQL para buscar o usuário
    // Usamos $1 como placeholder para o parâmetro (prevenção de SQL Injection)
    // A apostila usa a tabela 'usuarios' [cite: 781-782, 1023-1025], vamos usar essa tabela também.
    // É importante que seu databaseConfig.sql crie essa tabela 'usuarios' com 'username' e 'password'.
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