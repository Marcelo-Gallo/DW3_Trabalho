<<<<<<< HEAD
// Arquivo: backend/app/models/mdlClientes.js (VERSÃO CORRIGIDA)
const { query } = require('../utils/db');

const getAllClientes = async () => {
    // CORREÇÃO: Formata a data direto no SQL para 'DD/MM/YYYY'
    const sqlText = `
        SELECT id, nome, cnpj, 
               TO_CHAR(datacadastro, 'DD/MM/YYYY') AS datacadastro_formatado, 
               limitecredito 
        FROM CLIENTES 
        WHERE removido = false ORDER BY nome ASC
    `;
    try { return (await query(sqlText)).rows; } catch (e) { console.error('Erro getAllClientes:', e); throw e; }
};

const getClienteByID = async (id) => {
    // CORREÇÃO: Formata a data direto no SQL para 'YYYY-MM-DD' (para o input type="date")
    const sqlText = `
        SELECT id, nome, cnpj, 
               TO_CHAR(datacadastro, 'YYYY-MM-DD') AS datacadastro, 
               limitecredito 
        FROM CLIENTES 
        WHERE id = $1 AND removido = false
    `;
     try { return (await query(sqlText, [id])).rows; } catch (e) { console.error(`Erro getClienteByID ${id}:`, e); throw e; }
};

const insertCliente = async (cliente) => {
    const { nome, cnpj, datacadastro, limitecredito } = cliente; 
    const sqlText = `INSERT INTO CLIENTES (nome, cnpj, datacadastro, limitecredito) VALUES ($1, $2, $3, $4) RETURNING *`;
    try { return (await query(sqlText, [nome, cnpj || null, datacadastro, limitecredito])).rows[0]; } catch (e) { console.error('Erro insertCliente:', e); throw e; }
};

const updateCliente = async (id, cliente) => {
    const { nome, cnpj, datacadastro, limitecredito } = cliente; 
    const sqlText = `UPDATE CLIENTES SET nome = $1, cnpj = $2, datacadastro = $3, limitecredito = $4 WHERE id = $5 AND removido = false RETURNING *`;
    try { return (await query(sqlText, [nome, cnpj || null, datacadastro, limitecredito, id])).rows[0]; } catch (e) { console.error(`Erro updateCliente ${id}:`, e); throw e; }
};

const deleteCliente = async (id) => {
    const sqlText = `UPDATE CLIENTES SET removido = true WHERE id = $1 RETURNING id, removido`;
    try { return (await query(sqlText, [id])).rows[0]; } catch (e) { console.error(`Erro deleteCliente ${id}:`, e); throw e; }
};

module.exports = { getAllClientes, getClienteByID, insertCliente, updateCliente, deleteCliente };
=======
// Importa a função de query do utilitário de banco de dados
const { query } = require('../utils/db');

const getAllClientes = async () => {
    const sqlText = 'SELECT * FROM CLIENTES WHERE removido = false ORDER BY nome ASC';
    try {
        const result = await query(sqlText);
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar todos os clientes:', error);
        throw error;
    }
};

const getClienteByID = async (id) => {
    const sqlText = 'SELECT * FROM CLIENTES WHERE id = $1 AND removido = false';
    try {
        const result = await query(sqlText, [id]);
        return result.rows;
    } catch (error) {
        console.error(`Erro ao buscar cliente por ID ${id}:`, error);
        throw error;
    }
};

const insertCliente = async (cliente) => {
    const { nome, cnpj, dataCadastro, limiteCredito } = cliente;
    const sqlText = `
        INSERT INTO CLIENTES (nome, cnpj, dataCadastro, limiteCredito)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    try {
        const result = await query(sqlText, [nome, cnpj, dataCadastro, limiteCredito]);
        return result.rows[0]; // Retorna o registro completo que foi inserido
    } catch (error) {
        console.error('Erro ao inserir cliente:', error);
        throw error;
    }
};

const updateCliente = async (id, cliente) => {
    const { nome, cnpj, dataCadastro, limiteCredito } = cliente;
    const sqlText = `
        UPDATE CLIENTES
        SET nome = $1, cnpj = $2, dataCadastro = $3, limiteCredito = $4
        WHERE id = $5 AND removido = false
        RETURNING *
    `;
    try {
        const result = await query(sqlText, [nome, cnpj, dataCadastro, limiteCredito, id]);
        return result.rows[0];
    } catch (error) {
        console.error(`Erro ao atualizar cliente ${id}:`, error);
        throw error;
    }
};


const deleteCliente = async (id) => {
    // Esta é a lógica do "soft delete" exigida pelo trabalho
    const sqlText = `
        UPDATE CLIENTES
        SET removido = true
        WHERE id = $1
        RETURNING *
    `;
    try {
        const result = await query(sqlText, [id]);
        return result.rows[0];
    } catch (error) {
        console.error(`Erro ao deletar (soft) cliente ${id}:`, error);
        throw error;
    }
};

// Exporta todas as funções do modelo
module.exports = {
    getAllClientes,
    getClienteByID,
    insertCliente,
    updateCliente,
    deleteCliente
};
>>>>>>> 5974d28db4eb4434688c9f11d64dd63b99654077
