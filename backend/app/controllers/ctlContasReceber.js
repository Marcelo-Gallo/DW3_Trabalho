// Arquivo: backend/app/controllers/ctlContasReceber.js (VERSÃO CORRIGIDA)
const contasModel = require('../models/mdlContasReceber');

// (Funções getAllContas, getContaByID, getContasByClienteID permanecem iguais)
const getAllContas = async (req, res) => {
    try { res.status(200).json(await contasModel.getAllContas()); } 
    catch (e) { console.error('Erro ctlGetAllContas:', e); res.status(500).json({ message: 'Erro ao buscar contas.' }); }
};
const getContaByID = async (req, res) => {
    try {
        const conta = await contasModel.getContaByID(req.params.id);
        if (!conta || conta.length === 0) return res.status(404).json({ message: 'Conta não encontrada.' });
        res.status(200).json(conta[0]);
    } catch (e) { console.error(`Erro ctlGetContaByID ${req.params.id}:`, e); res.status(500).json({ message: 'Erro ao buscar conta.' }); }
};
const getContasByClienteID = async (req, res) => {
    try { res.status(200).json(await contasModel.getContasByClienteID(req.params.id_cliente)); } 
    catch (e) { console.error(`Erro ctlGetContasByClienteID ${req.params.id_cliente}:`, e); res.status(500).json({ message: 'Erro ao buscar contas do cliente.' }); }
};

// (Função INSERT corrigida)
const insertConta = async (req, res) => {
    const { descricao, valor, datavencimento, id_cliente } = req.body;
    // CORREÇÃO: Validação mais robusta
    if (!descricao || valor == null || !datavencimento || !id_cliente) {
        return res.status(400).json({ message: 'Descrição, valor, vencimento e ID do cliente são obrigatórios.' });
    }
    if (datavencimento === '') {
         return res.status(400).json({ message: 'Data de vencimento não pode ser vazia.' });
    }

    try { res.status(201).json(await contasModel.insertConta(req.body)); } 
    catch (e) { console.error('Erro ctlInsertConta:', e); res.status(500).json({ message: 'Erro ao inserir conta.' }); }
};

// (Função UPDATE corrigida)
const updateConta = async (req, res) => {
    const { descricao, valor, datavencimento, id_cliente } = req.body;
    // CORREÇÃO: Adicionando validação também no UPDATE
    if (!descricao || valor == null || !datavencimento || !id_cliente) {
        return res.status(400).json({ message: 'Descrição, valor, vencimento e ID do cliente são obrigatórios.' });
    }
    if (datavencimento === '') {
         return res.status(400).json({ message: 'Data de vencimento não pode ser vazia.' });
    }

    try {
        const contaAtualizada = await contasModel.updateConta(req.params.id, req.body);
        if (!contaAtualizada) return res.status(404).json({ message: 'Conta não encontrada.' });
        res.status(200).json(contaAtualizada);
    } catch (e) { console.error(`Erro ctlUpdateConta ${req.params.id}:`, e); res.status(500).json({ message: 'Erro ao atualizar conta.' }); }
};

// (Função DELETE permanece igual)
const deleteConta = async (req, res) => {
    try {
        const contaDeletada = await contasModel.deleteConta(req.params.id);
        if (!contaDeletada) return res.status(404).json({ message: 'Conta não encontrada.' });
        res.status(200).json({ message: `Conta ${req.params.id} removida.`, conta: contaDeletada }); 
    } catch (e) { console.error(`Erro ctlDeleteConta ${req.params.id}:`, e); res.status(500).json({ message: 'Erro ao remover conta.' }); }
};

module.exports = { getAllContas, getContaByID, getContasByClienteID, insertConta, updateConta, deleteConta };