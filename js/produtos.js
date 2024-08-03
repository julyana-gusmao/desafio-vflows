var ProdutosWidget = {
    produtoIndex: 0,

    init: function() {
        this.setupEventHandlers();
    },

    setupEventHandlers: function() {
        $('#adicionar-produto').on('click', this.addProduct.bind(this));
    },

    addProduct: function() {
        this.produtoIndex++;
        var produtoRow = `
            <tr id="produto-${this.produtoIndex}">
                <td><input type="text" class="form-control descricao" required maxlength="40"></td>
                <td>
                    <select class="form-control unidade-medida" required>
                        <option value="UN">UN</option>
                        <option value="CM">CM</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="ML">ML</option>
                        <option value="G">G</option>
                        <option value="KG">KG</option>
                    </select>
                </td>
                <td><input type="number" class="form-control quantidade" required min="0" step="1"></td>
                <td><input type="number" class="form-control valor-unitario" required min="0" step="0.01"></td>
                <td><input type="number" class="form-control valor-total" readonly></td>
                <td>
                    <button type="button" class="btn btn-danger remover-produto" data-index="${this.produtoIndex}">Excluir</button>
                </td>
            </tr>
        `;
        $('#tabela-produtos tbody').append(produtoRow);

        $(`#produto-${this.produtoIndex} .quantidade, #produto-${this.produtoIndex} .valor-unitario`).on('input', this.updateProductTotal.bind(this, this.produtoIndex));
        $(`#produto-${this.produtoIndex} .remover-produto`).on('click', this.removeProduct.bind(this));
    },

    updateProductTotal: function(index) {
        var quantidade = $(`#produto-${index} .quantidade`).val();
        var valorUnitario = $(`#produto-${index} .valor-unitario`).val();
        var valorTotal = quantidade * valorUnitario;
        $(`#produto-${index} .valor-total`).val(valorTotal);
    },

    removeProduct: function(event) {
        var index = $(event.target).data('index');
        $(`#produto-${index}`).remove();
    }
};

$(document).ready(function() {
    ProdutosWidget.init();
});
