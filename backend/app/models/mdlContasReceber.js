// Arquivo: backend/app/models/mdlContasReceber.js (VERSÃO CORRIGIDA)
const { query } = require('../utils/db');

const getAllContas = async () => {
    // CORREÇÃO: Formata a data direto no SQL para 'DD/MM/YYYY'
    const sqlText = `
        SELECT id, descricao, valor, 
               TO_CHAR(datavencimento, 'DD/MM/YYYY') AS datavencimento_formatado, 
               id_cliente 
        FROM CONTAS_RECEBER 
        WHERE removido = false ORDER BY datavencimento ASC
    `;
    try { return (await query(sqlText)).rows; } catch (e) { console.error('Erro getAllContas:', e); throw e; }
};

const getContaByID = async (id) => {
    // CORREÇÃO: Formata a data direto no SQL para 'YYYY-MM-DD'
    const sqlText = `
        SELECT id, descricao, valor, 
               TO_CHAR(datavencimento, 'YYYY-MM-DD') AS datavencimento, 
               id_cliente 
        FROM CONTAS_RECEBER 
        WHERE id = $1 AND removido = false
    `;
    try { return (await query(sqlText, [id])).rows; } catch (e) { console.error(`Erro getContaByID ${id}:`, e); throw e; }
};

const getContasByClienteID = async (clienteId) => {
    // CORREÇÃO: Formata a data direto no SQL para 'DD/MM/YYYY'
    const sqlText = `
        SELECT id, descricao, valor, 
               TO_CHAR(datavencimento, 'DD/MM/YYYY') AS datavencimento_formatado, 
               id_cliente 
        FROM CONTAS_RECEBER 
        WHERE id_cliente = $1 AND removido = false ORDER BY datavencimento ASC
    `;
    try { return (await query(sqlText, [clienteId])).rows; } catch (e) { console.error(`Erro getContasByClienteID ${clienteId}:`, e); throw e; }
};

const insertConta = async (conta) => {
    const { descricao, valor, datavencimento, id_cliente } = conta; 
    const sqlText = `INSERT INTO CONTAS_RECEBER (descricao, valor, datavencimento, id_cliente) VALUES ($1, $2, $3, $4) RETURNING *`;
    try { return (await query(sqlText, [descricao, valor, datavencimento, id_cliente])).rows[0]; } catch (e) { console.error('Erro insertConta:', e); throw e; }
};

const updateConta = async (id, conta) => {
    const { descricao, valor, datavencimento, id_cliente } = conta; 
    const sqlText = `UPDATE CONTAS_RECEBER SET descricao = $1, valor = $2, datavencimento = $3, id_cliente = $4 WHERE id = $5 AND removido = false RETURNING *`;
    try { return (await query(sqlText, [descricao, valor, datavencimento, id_cliente, id])).rows[0]; } catch (e) { console.error(`Erro updateConta ${id}:`, e); throw e; }
};

const deleteConta = async (id) => {
    const sqlText = `UPDATE CONTAS_RECEBER SET removido = true WHERE id = $1 RETURNING id, removido`;
    try { return (await query(sqlText, [id])).rows[0]; } catch (e) { console.error(`Erro deleteConta ${id}:`, e); throw e; }
};

module.exports = { getAllContas, getContaByID, getContasByClienteID, insertConta, updateConta, deleteConta };