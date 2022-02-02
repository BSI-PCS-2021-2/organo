<template>
  <div>
    <div class="organoBanner"></div>
    <div class="products-container">
      <div class="products-list">
        <div
          v-for="listaProdutos in produtos"
          :key="listaProdutos[0].fornecedor.id"
        >
          <p class="nome-fornecedor mb-3 mt-4">
            {{ listaProdutos[0].fornecedor.nomeFantasia }}
          </p>
          <div class="row ml-0">
            <div
              class="mr-2 mb-2"
              v-for="produto in listaProdutos"
              :key="produto.id"
            >
              <CardProduto
                :produto="produto"
                v-if="produto.quantidade !== 0 && produto.deleted === false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CardProduto from "../../components/produtos/CardProduto";

export default {
  name: "Produtos",
  computed: {
    ...mapGetters("produto", ["produtos", "produto"]),
    ...mapGetters("usuario", ["fornecedores"]),
  },
  components: { CardProduto },
  methods: {
    ...mapActions("produto", [
      "retornarProdutos",
      "adicionarNoCarrinho",
      "removerDoCarrinho",
      "esvaziarProdutos",
    ]),
    ...mapActions("usuario", ["retornaFornecedores"]),
  },
  watch: {
    fornecedores() {
      this.fornecedores.forEach((fornecedor) => {
        this.retornarProdutos(fornecedor.cnpj);
      });
    },
  },
  mounted() {
    this.esvaziarProdutos();
    this.retornaFornecedores();
  },
};
</script>
<style>
.nome-fornecedor {
  text-align: left;
  font-size: 1.6em;
}

h1 {
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: linear-gradient(
    90deg,
    rgba(88, 140, 236, 1),
    rgba(106, 106, 207, 1)
  );
}
</style>