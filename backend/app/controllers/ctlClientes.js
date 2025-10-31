// Arquivo: backend/app/controllers/ctlClientes.js (VERSÃO CORRIGIDA)
const clientesModel = require('../models/mdlClientes');

// (Funções getAllClientes e getClienteByID permanecem iguais às do seu colega)
const getAllClientes = async (req, res) => {
    try { res.status(200).json(await clientesModel.getAllClientes()); } 
    catch (e) { console.error('Erro ctlGetAllClientes:', e); res.status(500).json({ message: 'Erro ao buscar clientes.' }); }
};

const getClienteByID = async (req, res) => {
    try {
        const cliente = await clientesModel.getClienteByID(req.params.id);
        if (!cliente || cliente.length === 0) return res.status(404).json({ message: 'Cliente não encontrado.' });
        res.status(200).json(cliente[0]);
    } catch (e) { console.error(`Erro ctlGetClienteByID ${req.params.id}:`, e); res.status(500).json({ message: 'Erro ao buscar cliente.' }); }
};

// (Função INSERT corrigida)
const insertCliente = async (req, res) => {
    const { nome, datacadastro, limitecredito } = req.body;

    // CORREÇÃO: Validação mais robusta. 
    // Verifica se os campos existem e não são strings vazias (para datas/textos).
    if (!nome || !datacadastro || limitecredito == null) { // '== null' pega undefined e null
         return res.status(400).json({ message: 'Nome, data de cadastro e limite de crédito são obrigatórios.' }); 
    }
    
    // Se a data estiver vazia (embora o 'required' do HTML deva pegar), o banco falharia.
    if (datacadastro === '') {
         return res.status(400).json({ message: 'Data de cadastro não pode ser vazia.' });
    }

    try { 
        res.status(201).json(await clientesModel.insertCliente(req.body)); 
    } catch (e) { 
        console.error('Erro ctlInsertCliente:', e); 
        res.status(500).json({ message: 'Erro ao inserir cliente.' }); 
    }
};

// (Função UPDATE corrigida)
const updateCliente = async (req, res) => {
    const { nome, datacadastro, limitecredito } = req.body;

    // CORREÇÃO: Adicionando validação também no UPDATE
    if (!nome || !datacadastro || limitecredito == null) {
         return res.status(400).json({ message: 'Nome, data de cadastro e limite de crédito são obrigatórios.' }); 
    }
    if (datacadastro === '') {
         return res.status(400).json({ message: 'Data de cadastro não pode ser vazia.' });
    }

    try {
        const clienteAtualizado = await clientesModel.updateCliente(req.params.id, req.body);
        if (!clienteAtualizado) return res.status(404).json({ message: 'Cliente não encontrado.' });
        res.status(200).json(clienteAtualizado);
    } catch (e) { 
        console.error(`Erro ctlUpdateCliente ${req.params.id}:`, e); 
        res.status(500).json({ message: 'Erro ao atualizar cliente.' }); 
    }
};

// (Função DELETE permanece igual à do seu colega)
const deleteCliente = async (req, res) => {
    try {
        const clienteDeletado = await clientesModel.deleteCliente(req.params.id);
        if (!clienteDeletado) return res.status(404).json({ message: 'Cliente não encontrado.' });
        res.status(200).json({ message: `Cliente ${req.params.id} removido.`, cliente: clienteDeletado }); 
    } catch (e) { console.error(`Erro ctlDeleteCliente ${req.params.id}:`, e); res.status(500).json({ message: 'Erro ao remover cliente.' }); }
};

module.exports = { getAllClientes, getClienteByID, insertCliente, updateCliente, deleteCliente };