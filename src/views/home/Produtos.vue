<template>
  <div style="padding: 25px;">
    <div class="container">
      <div v-for="listaProdutos in produtos" :key="listaProdutos[0].fornecedor.id">
        <p class="h5"> {{ listaProdutos[0].fornecedor.nomeFantasia }}</p>
        <div class="row">
            <div class="col-md-4" v-for="produto in listaProdutos" :key="produto.id">
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
      console.log('entrei no fornecedores')
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
</style>