// Arquivo: backend/app/models/mdlClientes.js (VERSÃO FINAL CORRIGIDA)
// (Inclui a formatação de data TO_CHAR para corrigir o bug do front-end)

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
    // Usa nomes minúsculos (datacadastro, limitecredito)
    const { nome, cnpj, datacadastro, limitecredito } = cliente; 
    const sqlText = `INSERT INTO CLIENTES (nome, cnpj, datacadastro, limitecredito) VALUES ($1, $2, $3, $4) RETURNING *`;
    try { 
        const params = [nome, cnpj || null, datacadastro, limitecredito];
        return (await query(sqlText, params)).rows[0]; 
    } catch (e) { console.error('Erro insertCliente:', e); throw e; }
};

const updateCliente = async (id, cliente) => {
    // Usa nomes minúsculos
    const { nome, cnpj, datacadastro, limitecredito } = cliente; 
    const sqlText = `UPDATE CLIENTES SET nome = $1, cnpj = $2, datacadastro = $3, limitecredito = $4 WHERE id = $5 AND removido = false RETURNING *`;
    try { 
        const params = [nome, cnpj || null, datacadastro, limitecredito, id];
        return (await query(sqlText, params)).rows[0]; 
    } catch (e) { console.error(`Erro updateCliente ${id}:`, e); throw e; }
};

const deleteCliente = async (id) => {
    const sqlText = `UPDATE CLIENTES SET removido = true WHERE id = $1 RETURNING id, removido`;
    try { return (await query(sqlText, [id])).rows[0]; } catch (e) { console.error(`Erro deleteCliente ${id}:`, e); throw e; }
};

module.exports = { getAllClientes, getClienteByID, insertCliente, updateCliente, deleteCliente };