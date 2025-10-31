// Arquivo: frontend/controllers/clientes.js (VERSÃO FINAL ATUALIZADA)
const axios = require('axios');
const apiURL = process.env.API_URL;

const getAuthHeaders = (session) => { // Helper para header com token
    if (!session?.token) throw new Error('Token não encontrado na sessão.');
    return { headers: { 'Authorization': `Bearer ${session.token}` } };
};

const handleApiError = (error, res, redirectTo = '/clientes') => { // Helper de erro
    console.error(`Erro API Front (Clientes): ${error.message}`);
    if (error.response?.status === 401 || error.response?.status === 403) return res.redirect('/logout');
    const msg = error.response?.data?.message || 'Erro ao comunicar com API Clientes.';
    res.redirect(`${redirectTo}?error=${encodeURIComponent(msg)}`);
};

const renderListClientes = async (req, res) => { // GET /clientes
    try { res.render('clientes/list.njk', { title: 'Lista de Clientes', clientes: (await axios.get(`${apiURL}/api/clientes`, getAuthHeaders(req.session))).data, error: req.query.error, success: req.query.success }); } 
    catch (e) { handleApiError(e, res); }
};

const renderFormCliente = async (req, res) => { // GET /clientes/add, GET /clientes/edit/:id
    const id = req.params.id;
    try {
        let cliente = null;
        if (id) cliente = (await axios.get(`${apiURL}/api/clientes/${id}`, getAuthHeaders(req.session))).data;
        // Ajuste para pegar cliente[0] se API retornar array no getByID
        if (Array.isArray(cliente)) cliente = cliente[0]; 
        res.render('clientes/form.njk', { title: id ? 'Editar Cliente' : 'Adicionar Cliente', cliente, error: req.query.error });
    } catch (e) { handleApiError(e, res, id ? `/clientes/edit/${id}` : '/clientes/add'); }
};

const processFormCliente = async (req, res) => { // POST /clientes/save
    const id = req.body.id;
    try {
        if (id) { await axios.put(`${apiURL}/api/clientes/${id}`, req.body, getAuthHeaders(req.session)); } 
        else { await axios.post(`${apiURL}/api/clientes`, req.body, getAuthHeaders(req.session)); }
        res.redirect('/clientes?success=Cliente salvo!');
    } catch (e) { handleApiError(e, res, id ? `/clientes/edit/${id}` : '/clientes/add'); }
};

const deleteCliente = async (req, res) => { // GET /clientes/delete/:id
    try {
        await axios.delete(`${apiURL}/api/clientes/${req.params.id}`, getAuthHeaders(req.session));
        res.redirect('/clientes?success=Cliente removido!');
    } catch (e) { handleApiError(e, res); }
};

module.exports = { renderListClientes, renderFormCliente, processFormCliente, deleteCliente };