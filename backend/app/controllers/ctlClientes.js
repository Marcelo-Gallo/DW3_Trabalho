<<<<<<< HEAD
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
=======
// Importa o modelo de clientes para interagir com o banco de dados
const clientesModel = require('../models/mdlClientes');

/**
 * Retorna todos os clientes não removidos.
 * Método: GET
 * Rota: /api/clientes
 */
const getAllClientes = async (req, res) => {
    try {
        const clientes = await clientesModel.getAllClientes();
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Erro no controlador getAllClientes:', error);
        res.status(500).json({ message: 'Erro ao buscar clientes.' });
    }
};

/**
 * Retorna um cliente específico pelo ID.
 * Método: GET
 * Rota: /api/clientes/:id
 */
const getClienteByID = async (req, res) => {
    const { id } = req.params; // Pega o ID da URL

    try {
        const cliente = await clientesModel.getClienteByID(id);
        if (!cliente || cliente.length === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado.' });
        }
        res.status(200).json(cliente[0]); // Retorna o primeiro (e único) cliente
    } catch (error) {
        console.error(`Erro no controlador getClienteByID para ID ${id}:`, error);
        res.status(500).json({ message: 'Erro ao buscar cliente.' });
    }
};

/**
 * Insere um novo cliente.
 * Método: POST
 * Rota: /api/clientes
 */
const insertCliente = async (req, res) => {
    const novoCliente = req.body; // Pega os dados do cliente do corpo da requisição

    // Validação básica dos dados recebidos
    if (!novoCliente.nome || !novoCliente.limiteCredito) {
        return res.status(400).json({ message: 'Nome e limite de crédito são obrigatórios.' });
    }

    try {
        const clienteInserido = await clientesModel.insertCliente(novoCliente);
        res.status(201).json(clienteInserido); // Status 201 Created
    } catch (error) {
        console.error('Erro no controlador insertCliente:', error);
        res.status(500).json({ message: 'Erro ao inserir cliente.' });
    }
};

/**
 * Atualiza um cliente existente pelo ID.
 * Método: PUT
 * Rota: /api/clientes/:id
 */
const updateCliente = async (req, res) => {
    const { id } = req.params;
    const dadosCliente = req.body; // Pega os dados atualizados do corpo da requisição

    try {
        const clienteAtualizado = await clientesModel.updateCliente(id, dadosCliente);
        if (!clienteAtualizado) {
            return res.status(404).json({ message: 'Cliente não encontrado para atualização.' });
        }
        res.status(200).json(clienteAtualizado);
    } catch (error) {
        console.error(`Erro no controlador updateCliente para ID ${id}:`, error);
        res.status(500).json({ message: 'Erro ao atualizar cliente.' });
    }
};

/**
 * Executa um "soft delete" em um cliente pelo ID.
 * Método: DELETE
 * Rota: /api/clientes/:id
 */
const deleteCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const clienteDeletado = await clientesModel.deleteCliente(id);
        if (!clienteDeletado) {
            return res.status(404).json({ message: 'Cliente não encontrado para exclusão (soft).' });
        }
        res.status(200).json({ message: `Cliente ${id} marcado como removido.`, cliente: clienteDeletado });
    } catch (error) {
        console.error(`Erro no controlador deleteCliente para ID ${id}:`, error);
        res.status(500).json({ message: 'Erro ao marcar cliente como removido.' });
    }
};

// Exporta todas as funções do controlador
module.exports = {
    getAllClientes,
    getClienteByID,
    insertCliente,
    updateCliente,
    deleteCliente
};
>>>>>>> 5974d28db4eb4434688c9f11d64dd63b99654077
