$(document).ready(function() {
    $("#modal-placeholder").load("components/modal.html", function() {
        $('#fornecedor-container').load('components/fornecedor.html', function() {
            FornecedorWidget.init();
        });

        $('#produtos-container').load('components/produtos.html', function() {
            ProdutosWidget.init();
        });

        $('#anexos-container').load('components/anexos.html', function() {
            AnexosWidget.init();
        });
    });
});
