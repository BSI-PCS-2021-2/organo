<template>
  <div class="card mb-4 shadow-sm">
    <img src="https://cdn0.iconfinder.com/data/icons/commerce-line-1/512/comerce_delivery_shop_business-24-512.png" class="card-img-top pedido-image" />
    <div class="card-body">
      <h5 class="card-title text-left">Id: {{ pedido.id }}</h5>
      <p class="h7">Valor: {{ pedido.valor }} reais</p>
      <p class="h7">Data de entrega: {{ pedido.dataEntrega }}</p>
      <p class="h7">Status: {{ pedido.status }}</p>
    </div>
  </div>
</template>
<script>
export default {
    name: "CardPedido",
    props: ["pedido"]
};
</script>
<style>
.card .pedido-image {
  height: 300px;
}
</style>