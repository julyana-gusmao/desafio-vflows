var ProdutosWidget = {
    produtoIndex: 0,
  
    init: function () {
      this.setupEventHandlers();
    },
  
    setupEventHandlers: function () {
      $("#adicionar-produto").on("click", this.addProduct.bind(this));
    },
  
    addProduct: function () {
      if ($("#produtos-container").css("display") === "none") {
        $("#produtos-container").css("display", "block");
      }
  
      this.produtoIndex++;
      var produtoHtml = `
          <div class="produto-item" id="produto-${this.produtoIndex}">
              <button class="btn-remover-produto" data-index="${this.produtoIndex}">
                  <div class="btn-remover-produto-style">   
                      <img src="./img/trash.png" alt="Trash Icon">
                  </div>
              </button>
              <div class="produto-content">
                  <span class="produto-title">Produto ${this.produtoIndex}</span>
                  <div class="produto-details">
                      <div class="produto-imagem">
                          <img src="./img/package.png" alt="Product Image">
                      </div>
                      <div class="produto-campos">
                          <div class="form-group">
                            <label for="descricao">Produto</label>
                            <input type="text" class="input-full descricao" required maxlength="40">
                          </div>
                          <div class="produtos-bottom">
                              <div class="form-group">
                                  <label for="unidade-medida">UND. Medida</label>
                                  <select class="select-und unidade-medida" required>
                                      <option value="UN">UN</option>
                                      <option value="CM">CM</option>
                                      <option value="M">M</option>
                                      <option value="L">L</option>
                                      <option value="ML">ML</option>
                                      <option value="G">G</option>
                                      <option value="KG">KG</option>
                                  </select>
                              </div>
                              <div class="form-group">
                                  <label for="quantidade">QTDE. em Estoque</label>
                                  <input type="number" class="input-small quantidade" required min="0" step="1">
                              </div>
                              <div class="form-group">
                                  <label for="valor-unitario">Valor Unitário</label>
                                  <input type="number" class="input-small valor-unitario" required min="0" step="0.01">
                              </div>
                              <div class="form-group">
                                  <label for="valor-total">Valor Total</label>
                                  <input type="number" class="input-small valor-total" readonly>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `;
      $("#produtos-container").append(produtoHtml);
  
      $(`#produto-${this.produtoIndex} .quantidade, #produto-${this.produtoIndex} .valor-unitario`)
        .on("input", this.updateProductTotal.bind(this, this.produtoIndex));
      $(`#produto-${this.produtoIndex} .btn-remover-produto`)
        .on("click", this.removeProduct.bind(this));
    },
  
    updateProductTotal: function (index) {
      var quantidade = $(`#produto-${index} .quantidade`).val();
      var valorUnitario = $(`#produto-${index} .valor-unitario`).val();
      var valorTotal = quantidade * valorUnitario;
      $(`#produto-${index} .valor-total`).val(valorTotal);
    },
  
    removeProduct: function (event) {
      var index = $(event.currentTarget).data("index");
      $(`#produto-${index}`).remove();
    },
  };
  
  $(document).ready(function () {
    ProdutosWidget.init();
  });
