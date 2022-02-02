<template>
  <div>
    <div class="organoBanner"></div>
    <div class="container" style="padding-top: 5%; padding-bottom: 3%">
      <div class="row d-flex justify-content-center">
        <div class="col-5 text-left login-form-container">
          <p class="h3">Cadastro de produto:</p>
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
                  placeholder="Nome do produto"
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
                  placeholder="Preço do produto"
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
                  placeholder="Data de validade"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputFotoUrl">Imagem</label>
                <input
                  type="text"
                  v-model="fotoUrl"
                  class="form-control font-text form"
                  id="inputFotoUrl"
                  placeholder="URL da imagem do produto"
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
                  placeholder="Quantidade disponível"
                  required
                />
              </div>
              <button @click="cadastro()" type="submit" class="btn btn-primary">
                Cadastrar
              </button>
              <span id="preenche-campos" class="h5"></span>
              
              <router-link
                type="button"
                class="btn btn-primary"
                style="display: inline; float: right"
                :to="'/fornecedor/'"
              >
                Cancelar
              </router-link>
              <br />

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
import { mapActions, mapGetters } from "vuex";
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
    ...mapActions("usuario", ["cadastrarProduto"]),
    cadastro() {
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
      this.preco = this.preco.replace(/,/g, ".");
      let payload = {
        cnpjFornecedor: this.$route.params.cnpjFornecedor,
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
      this.cadastrarProduto(payload);
    },
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