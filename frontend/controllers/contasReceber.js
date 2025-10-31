// Arquivo: frontend/controllers/contasReceber.js (VERSÃO FINAL ATUALIZADA)
const axios = require('axios');
const apiURL = process.env.API_URL;

const getAuthHeaders = (session) => { // Helper para header com token
    if (!session?.token) throw new Error('Token não encontrado na sessão.');
    return { headers: { 'Authorization': `Bearer ${session.token}` } };
};

const handleApiError = (error, res, redirectTo = '/contas-receber') => { // Helper de erro
    console.error(`Erro API Front (Contas): ${error.message}`);
    if (error.response?.status === 401 || error.response?.status === 403) return res.redirect('/logout');
    const msg = error.response?.data?.message || 'Erro ao comunicar com API Contas.';
    res.redirect(`${redirectTo}?error=${encodeURIComponent(msg)}`);
};

const renderListContas = async (req, res) => { // GET /contas-receber
    try {
        const config = getAuthHeaders(req.session);
        const [resContas, resClientes] = await Promise.all([
            axios.get(`${apiURL}/api/contas-receber`, config),
            axios.get(`${apiURL}/api/clientes`, config) // Busca clientes para o nome
        ]);
        const clientesMap = new Map(resClientes.data.map(c => [c.id, c.nome]));
        const contas = resContas.data.map(conta => ({ ...conta, nome_cliente: clientesMap.get(conta.id_cliente) || '?' }));
        res.render('contasReceber/list.njk', { title: 'Contas a Receber', contas, error: req.query.error, success: req.query.success });
    } catch (e) { handleApiError(e, res); }
};

const renderFormConta = async (req, res) => { // GET /contas-receber/add, GET /contas-receber/edit/:id
    const id = req.params.id;
    try {
        const config = getAuthHeaders(req.session);
        const [resClientes, resConta] = await Promise.all([
            axios.get(`${apiURL}/api/clientes`, config), // Busca clientes para dropdown
            id ? axios.get(`${apiURL}/api/contas-receber/${id}`, config) : Promise.resolve({ data: null }) // Busca conta se editando
        ]);
        // Ajuste para pegar conta[0] se API retornar array no getByID
        let contaData = resConta.data;
        if(Array.isArray(contaData)) contaData = contaData[0]; 
        res.render('contasReceber/form.njk', { title: id ? 'Editar Conta' : 'Adicionar Conta', conta: contaData, clientes: resClientes.data, error: req.query.error });
    } catch (e) { handleApiError(e, res, id ? `/contas-receber/edit/${id}` : '/contas-receber/add'); }
};

const processFormConta = async (req, res) => { // POST /contas-receber/save
    const id = req.body.id;
    try {
        if (id) { await axios.put(`${apiURL}/api/contas-receber/${id}`, req.body, getAuthHeaders(req.session)); } 
        else { await axios.post(`${apiURL}/api/contas-receber`, req.body, getAuthHeaders(req.session)); }
        res.redirect('/contas-receber?success=Conta salva!');
    } catch (e) { handleApiError(e, res, id ? `/contas-receber/edit/${id}` : '/contas-receber/add'); }
};

const deleteConta = async (req, res) => { // GET /contas-receber/delete/:id
    try {
        await axios.delete(`${apiURL}/api/contas-receber/${req.params.id}`, getAuthHeaders(req.session));
        res.redirect('/contas-receber?success=Conta removida!');
    } catch (e) { handleApiError(e, res); }
};

module.exports = { renderListContas, renderFormConta, processFormConta, deleteConta };