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