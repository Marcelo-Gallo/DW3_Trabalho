// Carrega variáveis de ambiente (necessário para DB_HOST, DB_USER, etc.)
require('dotenv').config();

const { Pool } = require('pg'); // Importa o Pool de conexões do pacote 'pg'

// Configuração do pool de conexões com o banco de dados
// As credenciais são carregadas das variáveis de ambiente (.env)
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 20, // Define o número máximo de clientes inativos no pool
    idleTimeoutMillis: 30000, // Tempo em ms para um cliente ser removido do pool se inativo
    connectionTimeoutMillis: 2000, // Tempo em ms para tentar adquirir um cliente antes de gerar erro
});

// Listener para erros na conexão do pool
pool.on('error', (err, client) => {
    console.error('Erro inesperado no pool de banco de dados:', err);
});

async function query(text, params) {
    try {
        const res = await pool.query(text, params);
        return res;
    } catch (error) {
        console.error('Erro na query SQL:', error);
        throw error; // Propaga o erro para o chamador
    }
}

// Exporta a função de query e o pool (se precisar acessar diretamente em algum lugar)
module.exports = {
    query,
    pool,
};