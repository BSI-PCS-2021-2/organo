<template>
  <div style="padding: 25px;">
    <div class="container">
      <div v-for="listaProdutos in produtos" :key="listaProdutos[0].fornecedor.id">
        <p class="nome-fornecedor"> {{ listaProdutos[0].fornecedor.nomeFantasia }}</p>
        <div class="row">
            <div class="mr-2" v-for="produto in listaProdutos" :key="produto.id">
              <CardProduto :produto="produto" />
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
    ...mapGetters("usuario", ["fornecedores"])
  },
  components: { CardProduto },
  methods: {
    ...mapActions("produto", ["retornarProdutos", "adicionarNoCarrinho", "removerDoCarrinho", "esvaziarProdutos"]),
    ...mapActions("usuario", ["retornaFornecedores"]),
  },
  watch: {
    fornecedores() {
      this.fornecedores.forEach((fornecedor) => {
        this.retornarProdutos(fornecedor.cnpj)
      })     
    },
  },
  mounted() {
    this.esvaziarProdutos()
    this.retornaFornecedores()
  }
};
</script>
<style>
.nome-fornecedor {
  text-align: left;
  font-size: 1.6em;
  font-family: 'Roboto', sans-serif;
}
</style>