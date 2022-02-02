<template>
  <div>
    <div class="organoBanner"></div>
    <div class="main-container">
      <div class="container" style="padding-top: 5%">
        <div class="row d-flex justify-content-center">
          <div class="col-5 text-left login-form-container">
            <p class="h3">Atualização de produto</p>
            <button @click="deleta()" type="submit" class="btn btn-primary">
              Excluir produto
            </button>
            <br />
            <div class="d-flex justify-content-center">
              <img
                src="https://cdn0.iconfinder.com/data/icons/food-set-4/64/Artboard_12_copy-512.png"
                width="150"
                alt=""
              />
            </div>
            <div>
              <form>
                <div class="form-group">
                  <label for="inputNome">Nome</label>
                  <input
                    type="text"
                    v-model="nome"
                    class="form-control font-text form"
                    id="inputNome"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="inputPreco">Preço</label>
                  <input
                    type="text"
                    v-model="preco"
                    class="form-control font-text form"
                    id="inputPreco"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="inputValidade">Data de validade</label>
                  <input
                    type="date"
                    v-model="validade"
                    class="form-control font-text form"
                    id="inputValidade"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="inputFotoUrl">URL da Imagem</label>
                  <input
                    type="text"
                    v-model="fotoUrl"
                    class="form-control font-text form"
                    id="inputFotoUrl"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="inputQuantidade">Quantidade disponível</label>
                  <input
                    type="text"
                    v-model="quantidade"
                    class="form-control font-text form"
                    id="inputQuantidade"
                    required
                  />
                </div>
                <button
                  @click="atualiza()"
                  type="submit"
                  class="btn btn-primary"
                >
                  Atualizar
                </button>
                <router-link
                  type="button"
                  class="btn btn-primary"
                  style="display: inline; float: right"
                  :to="'/fornecedor/'"
                >
                  Cancelar
                </router-link>
                <span id="preenche-campos" class="h5"></span>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "CadastroProduto",
  data() {
    return {
      nome: "",
      preco: "",
      validade: "",
      fotoUrl: "",
      quantidade: 1,
    };
  },
  computed: {
    ...mapGetters("usuario", ["fornecedor"]),
    ...mapGetters("produto", ["produto"]),
  },
  methods: {
    ...mapActions("usuario", ["atualizarProduto", "deletarProduto"]),
    atualiza() {
      if (
        this.nome === "" ||
        this.preco === "" ||
        this.validade === "" ||
        this.fotoUrl === ""
      ) {
        document.getElementById("preenche-campos").value =
          "Por favor, preencha todos os campos obrigatórios.";
        return;
      }
      document.getElementById("preenche-campos").value = "";
      this.preco = String(this.preco).replace(/,/g, ".");
      let payload = {
        cnpjFornecedor: this.produto.fornecedor.cnpjFornecedor,
        produto: {
          nome: this.nome,
          preco: this.preco,
          validade: this.validade,
          fotoUrl: this.fotoUrl,
          quantidade: this.quantidade,
          fornecedor: this.fornecedor,
          deleted: false,
        },
      };
      this.atualizarProduto(payload);
    },
    deleta() {
      const payload = {
        produtoId: this.$route.params.idProduto,
        cnpjFornecedor: this.produto.fornecedor.cnpj,
      };
      this.deletarProduto(payload);
    },
  },
  mounted() {
    (this.nome = this.produto.nome),
      (this.preco = this.produto.preco),
      (this.validade = moment(this.produto.validade).format("YYYY-MM-DD")),
      (this.fotoUrl = this.produto.foto_url),
      (this.quantidade = this.produto.quantidade);
  },
};
</script>
<style>
input:required {
  box-shadow: none;
}
input:invalid {
  box-shadow: 0 0 3px red;
}
.form {
  font-size: 1em !important;
}
</style>