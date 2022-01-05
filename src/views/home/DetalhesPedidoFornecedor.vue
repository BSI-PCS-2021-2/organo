<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-6 text-left text-justify">
        <div class="display-4">Pedido: {{ fornecedorPedido.id }} </div>
        <br>
        <p class="display-7">Método de pagamento: {{ fornecedorPedido.metodoPagamento }}</p>
        <br>
        <p class="display-7">Valor total: R$ {{ fornecedorPedido.valor.toLocaleString(2) }}</p>
        <br>
        <p class="display-7">Status: {{ fornecedorPedido.status }}</p>
        <br>
        <p class="display-7">Data de entrega: {{ fornecedorPedido.dataEntrega }}</p>
        <br>
        <p class="h3"> Itens: </p>
        <br>
        <div class="container">
            <div class="mr-2 mb-4" v-for="item in fornecedorPedido.itens" :key="item.id">
                <div class="row">
                   <div>
                    <h5> Quantidade: {{ item.quantidade }} </h5>
                    <br>
                    <CardProdutoPedido :produto="item.produto" />
                   </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CardProdutoPedido from "../../components/produtos/CardProdutoPedido"
export default {
  computed: {
    ...mapGetters("usuario", ["fornecedor", "fornecedorPedido", "fornecedorPedidos"]),
    ...mapGetters("produto", ["produto"])
  },
  components: { CardProdutoPedido },
  methods: {
    ...mapActions("usuario", ["estabelecerPedidoFornecedor"]),
  },
  mounted() {
      this.estabelecerPedidoFornecedor(this.$route.params.idPedido);
  }
};
</script>
<style>
.container-fluid {
  padding: 30px;
}
.image-product {
  width: 100%;
  padding: 20px !important;
}
.card * {
  max-height: 85vh;
}
</style>