<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-6 text-left text-justify">
        <div class="display-4">Perfil do fornecedor </div>
        <br>
        <p class="lead text-justify">Nome: {{ fornecedor.nomeFantasia }}</p>
        <div>
          <p class="h5">CNPJ: {{ fornecedor.cnpj }}</p>
        </div>
        <div>
          <p class="h5">E-mail: {{ fornecedor.email }}</p>
        </div>
        <br>
        <p class="h3" v-if="Object.keys(produtos) !== 0"> Produtos cadastrados: </p>
        <br>
        <div class="row">
            <div class="mr-2 mb-4" v-for="produto in produtos" :key="produto">
                <div class="mr-2 mb-4" v-for="p in produto" :key="p.id">
                    <CardProdutoFornecedor :produto="p" />
                </div>
            </div>
        </div>
        <br>
        <p class="h3" v-if="Object.keys(fornecedorPedidos) !== 0"> Pedidos registrados: </p>
        <br>
        <div class="row">
            <div class="col-md-4" v-for="pedido in fornecedorPedidos" :key="pedido.id">
                <CardPedido :pedido="pedido" />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CardProdutoFornecedor from "../../components/produtos/CardProdutoFornecedor";
import CardPedido from "../../components/pedidos/CardPedido";
export default {
  computed: {
    ...mapGetters("usuario", ["fornecedor", "fornecedorPedidos"]),
    ...mapGetters("produto", ["produtos"]),
  },
  methods: {
    ...mapActions("produto", ["retornarProdutos", "esvaziarProdutos"]),
    ...mapActions("usuario", ["retornarPedidos"]),
  },
  components: { CardProdutoFornecedor, CardPedido },
  mounted() {
      this.esvaziarProdutos()
      this.retornarProdutos(this.fornecedor.cnpj)
      this.retornarPedidos(this.fornecedor.cnpj)
  }
};
</script>
<style>
.container-fluid {
  padding: 30px;
}
.image-product {
  width: 100%;
}
.card * {
  max-height: 85vh;
}
</style>