var AnexosWidget = {
    anexos: {},

    init: function() {
        $('#adicionar-anexo').on('click', function() {
            $('#input-anexo').click();
        });

        $('#input-anexo').on('change', function() {
            AnexosWidget.adicionarAnexo();
        });
    },

    adicionarAnexo: function() {
        var fileInput = $('#input-anexo')[0];
        var files = fileInput.files;

        if (files.length > 0) {
            var file = files[0];
            var fileId = 'anexo-' + Date.now();

            this.anexos[fileId] = file;

            var anexoHtml = `
                <tr id="${fileId}">
                    <td>${file.name}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-visualizar" data-file-id="${fileId}">Visualizar</button>
                        <button type="button" class="btn btn-danger btn-excluir" data-file-id="${fileId}">Excluir</button>
                    </td>
                </tr>
            `;

            $('#tabela-anexos tbody').append(anexoHtml);

            fileInput.value = '';

            $(`#${fileId} .btn-visualizar`).on('click', function() {
                AnexosWidget.visualizarAnexo($(this).data('file-id'));
            });

            $(`#${fileId} .btn-excluir`).on('click', function() {
                AnexosWidget.excluirAnexo($(this).data('file-id'));
            });
        }
    },

    visualizarAnexo: function(fileId) {
        var file = this.anexos[fileId];
        var blob = new Blob([file], { type: file.type });
        var url = URL.createObjectURL(blob);

        var a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
    },

    excluirAnexo: function(fileId) {
        delete this.anexos[fileId];
        $(`#${fileId}`).remove();
    },

    reset: function() {
        this.anexos = {};
        $('#tabela-anexos tbody').empty();
    }
};

$(document).ready(function() {
    AnexosWidget.init();
});
