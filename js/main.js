$(document).ready(function() {
    $('#fornecedor-form').on('submit', function(event) {
        event.preventDefault();

        let formStatus = 'success';

        if ($('#produtos-container .produto-item').length === 0) {
            alert('Por favor, adicione pelo menos um produto.');
            formStatus = 'failure';
        }

        if (Object.keys(AnexosWidget.anexos).length === 0) {
            alert('Por favor, adicione pelo menos um anexo.');
            formStatus = 'failure';
        }

        if (formStatus === 'failure') {
            return;
        }

        $('#loadingModal').modal('show');

        var fornecedorData = {
            razaoSocial: $('#razao-social').val(),
            nomeFantasia: $('#nome-fantasia').val(),
            cnpj: $('#cnpj').val(),
            inscricaoEstadual: $('#inscricao-estadual').val(),
            inscricaoMunicipal: $('#inscricao-municipal').val(),
            cep: $('#cep').val(),
            endereco: $('#endereco').val(),
            numero: $('#numero').val(),
            complemento: $('#complemento').val(),
            bairro: $('#bairro').val(),
            municipio: $('#municipio').val(),
            estado: $('#estado').val(),
            nomeContato: $('#nome-contato').val(),
            telefone: $('#telefone').val(),
            email: $('#email').val(),
            produtos: [],
            anexos: []
        };

        $('#produtos-container .produto-item').each(function() {
            var produto = {
                descricao: $(this).find('.descricao').val(),
                unidadeMedida: $(this).find('.unidade-medida').val(),
                quantidade: $(this).find('.quantidade').val(),
                valorUnitario: $(this).find('.valor-unitario').val(),
                valorTotal: $(this).find('.valor-total').val()
            };
            fornecedorData.produtos.push(produto);
        });

        for (var key in AnexosWidget.anexos) {
            if (AnexosWidget.anexos.hasOwnProperty(key)) {
                var anexo = AnexosWidget.anexos[key];
                fornecedorData.anexos.push({
                    name: anexo.name,
                    type: anexo.type,
                    size: anexo.size
                });
            }
        }

        setTimeout(function() {
            console.log("Dados do Fornecedor:", JSON.stringify(fornecedorData, null, 2));
            $('#loadingModal .modal-body').html('<div class="text-center"><p>Sucesso!</p></div>');

            if (formStatus === 'success') {
                $('#fornecedor-form')[0].reset();
                $('#produtos-container').empty();
                AnexosWidget.reset();

                $('#produtos-container').load('components/produtos.html', function() {
                    ProdutosWidget.init();
                });
            }

            setTimeout(function() {
                $('#loadingModal').modal('hide');
                $('#loadingModal .modal-body').html('<div class="spinner-border" role="status"><span class="sr-only"></span></div><p>Carregando...</p>');
            }, 2000);
        }, 2000);
    });
});
