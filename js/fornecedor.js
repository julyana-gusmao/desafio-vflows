var FornecedorWidget = {
    init: function() {
        this.applyMasks();
    },

    applyMasks: function() {
        $('#cnpj').mask('00.000.000/0000-00');
        $('#inscricao-estadual').mask('000.000.000.000');
        $('#cep').mask('00.000-000');
        $('#telefone').mask('(00) 00000-0000');
    }
};

window.FornecedorWidget = FornecedorWidget;

$(document).ready(function() {
    FornecedorWidget.init();
});
