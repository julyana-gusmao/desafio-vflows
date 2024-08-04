var AnexosWidget = {
    anexos: {},

    init: function() {
        $('#adicionar-anexo').off("click").on('click', function() {
            $('#input-anexo').click();
            $('#anexos-content').show(); 
        });

        $('#input-anexo').off("change").on('change', function() {
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
                <div id="${fileId}" class="anexo-item">
                  <button type="button" class="btn-excluir" data-file-id="${fileId}">
                    <div class="btn-excluir-style">   
                      <img src="./img/trash.png" alt="Trash Icon">
                    </div>
                  </button>
                  <button type="button" class="btn-visualizar" data-file-id="${fileId}">
                    <div class="btn-visualizar-style">   
                      <img src="./img/view.png" alt="Visualizar">
                    </div>
                  </button>
                    <span class="anexo-nome">${file.name}</span>
                </div>
            `;

            $('#anexos-content').append(anexoHtml);

            fileInput.value = '';

            $(`#${fileId} .btn-visualizar`).on('click', function(event) {
                event.preventDefault();
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

        if (Object.keys(this.anexos).length === 0) {
            $('#anexos-content').hide();
        }
    },

    reset: function() {
        this.anexos = {};
        $('#anexos-content').empty();
        $('#anexos-content').hide();
    }
};

window.AnexosWidget = AnexosWidget;

$(document).ready(function() {
    AnexosWidget.init();
});
