// Arquivo: frontend/public/javascripts/_datatables_init.js
$(document).ready(function() {
    $('#tabelaDados').DataTable({ // Assume que todas as tabelas terão id="tabelaDados"
        "language": { 
            "url": "//cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json"
        },
        "columnDefs": [
            { "orderable": false, "targets": 'dt-nosort' } // Desabilita ordenação em colunas com a classe 'dt-nosort' (ex: Ações)
        ],
        // Você pode adicionar mais configurações aqui se precisar
        // Ex: "order": [[ 0, "asc" ]] // Ordenar pela primeira coluna por padrão
    });
});