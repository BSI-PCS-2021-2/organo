<template>
  <div style="padding: 25px;">
    <div class="container">
      <div class="col-md-4" v-for="f in fornecedores" :key="f.id">
        <p class="h4">{{ f.nomeFantasia }}</p>
      </div>
      <div class="row">
        <div class="col-md-4" v-for="produto in produtos" :key="produto.id">
          <CardProduto :produto="produto" />
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
    ...mapActions("produto", ["retornarProdutos", "adicionarNoCarrinho", "removerDoCarrinho"]),
    ...mapActions("usuario", ["retornaFornecedores"]),
  },
  watch: {
    fornecedores(val) {
      console.log(val[0].cnpj)
      this.retornarProdutos(val[0].cnpj)
    },
  },
  mounted() {
    this.retornaFornecedores()
  }
};
</script>
<style>
</style>