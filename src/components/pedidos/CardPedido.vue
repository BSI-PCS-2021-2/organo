<template>
  <div class="card mb-4 shadow-sm">
    <img src="https://cdn0.iconfinder.com/data/icons/commerce-line-1/512/comerce_delivery_shop_business-24-512.png" class="card-img-top pedido-image" />
    <div class="card-body">
      <p class="h7">Valor: {{ pedido.valor.toLocaleString(2) }} reais</p>
      <p class="h7">Data de entrega: {{ pedido.dataEntrega }}</p>
      <p class="h7">Status: {{ pedido.status }}</p>
      <p class="h7">Método de pagamento: {{ pedido.metodoPagamento }}</p>
      <router-link
        v-if="Object.keys(comprador).length !== 0"
        type="button"
        class="btn btn-secondary btn-md product-button details"
        style="box-sizing:content-box;"
        :to="'/detalhesPedido/' + pedido.id"
      >
      Detalhes
      </router-link>
      <router-link
        v-if="Object.keys(fornecedor).length !== 0"
        type="button"
        class="btn btn-secondary btn-md product-button details"
        style="box-sizing:content-box;"
        :to="'/detalhesPedidoFornecedor/' + pedido.id"
      >
      Detalhes
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: "CardPedido",
    props: ["pedido"],
    computed: {
        ...mapGetters("usuario", ["comprador", "fornecedor"]),
    },
};
</script>
<style>
.card .pedido-image {
  height: 300px;
}
</style>