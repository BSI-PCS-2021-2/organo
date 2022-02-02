<template>
  <div class="card mb-4 shadow-sm">
    <!--<img src="https://cdn0.iconfinder.com/data/icons/commerce-line-1/512/comerce_delivery_shop_business-24-512.png" class="card-img-top pedido-image" />-->
    <div class="card-body">
      <p class="font-text" style="font-size: 22px!important"><b>Pedido #{{pedido.id}}</b></p>
      <p class="font-text" style="font-size: 18px!important">Valor: R$ {{ pedido.valor.toLocaleString(2) }}</p>
      <p class="font-text" style="font-size: 18px!important">Data de entrega: {{ pedido.dataEntrega }}</p>
      <p class="font-text" style="font-size: 18px!important">Status: {{ pedido.status.replace(/_/g, ' ')}}</p>
      <p class="font-text" style="font-size: 18px!important">Método de pagamento: {{ pedido.metodoPagamento.replace(/_/g, ' DE ') }}</p>
      <router-link
        v-if="Object.keys(comprador).length !== 0"
        type="button"
        class="btn btn-primary product-button details"
        style="font-size: 18px; width: 100%"
        :to="'/detalhesPedido/' + pedido.id"
      >
      Detalhes
      </router-link>
      <router-link
        v-if="Object.keys(fornecedor).length !== 0"
        type="button"
        class="btn btn-primary product-button details"
        style="font-size: 18px; width: 100%"
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