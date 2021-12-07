<template>
  <div class="card mb-3 shadow-sm product-card">
    <img v-bind:src="`${produto.fotoUrl}`" class="card-img-top product-image" />
    <div class="card-body">
      <h5 class="card-title text-left product-name mb-1">{{ produto.nome }}</h5>
      <p class="text-left mt-1">R$ {{ produto.preco.toString() }}</p>
      <div class="row">
        <router-link
          type="button"
          class="btn btn-secondary btn-md product-button mr-1 pr-4 pl-4"
          :to="'/detalhes/' + produto.id"
        >Detalhes</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardProdutoFornecedor",
  props: ["produto"],
};
</script>
<style>
.card .product-image {
  height: fit-content;
}

.card.product-card {
  width: fit-content !important;
}

.card .product-image {
  margin: auto;
  height: 150px;
  width: 150px;
  margin-top: 10px;
}

.card .product-name {
  font-size: 1.2em;
  font-family: 'Roboto', sans-serif;
}

.card.product-card {
  width: 180px;
  height: 285px;
}
</style>