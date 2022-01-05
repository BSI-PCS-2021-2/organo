<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-6 text-left text-justify">
        <div class="display-4">Pedido: {{ compradorPedido.id }} </div>
        <br>
        <p class="display-7">Fornecedor: {{ compradorPedido.itens[0].produto.fornecedor.nomeFantasia }}</p>
        <br>
        <p class="display-7">Método de pagamento: {{ compradorPedido.metodoPagamento }}</p>
        <br>
        <p class="display-7">Valor total: R$ {{ compradorPedido.valor.toLocaleString(2) }}</p>
        <br>
        <p class="display-7">Status: {{ compradorPedido.status }}</p>
        <br>
        <p class="display-7">Data de entrega: {{ compradorPedido.dataEntrega }}</p>
        <br>
        <p class="h3"> Itens: </p>
        <br>
        <div class="container">
            <div class="mr-2 mb-4" v-for="item in compradorPedido.itens" :key="item.id">
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
    ...mapGetters("usuario", ["comprador", "compradorPedidos", "compradorPedido"]),
    ...mapGetters("produto", ["produto"])
  },
  components: { CardProdutoPedido },
  methods: {
    ...mapActions("usuario", ["estabelecerPedido"]),
  },
  mounted() {
      this.estabelecerPedido(this.$route.params.idPedido);
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