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
        <button
          v-if="!estaNoCarrinhoProp"
          @click.stop="adicionarNoCarrinho({produto, quantidade})"
          type="button"
          class="btn btn-tertiary btn-md product-button ml-0"
        ><img
          src="https://i.imgur.com/ceFVghe.png"
          width="21.5"
          alt
        /></button>              
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "CardProduto",
  props: ["produto"],
  data() {
    return {
      estaNoCarrinhoProp: false,
      quantidade: 1,
    };
  },
  computed: {
    ...mapState("produto", ["carrinho"]),
  },
  methods: {
    ...mapActions("produto", ["adicionarNoCarrinho", "removerDoCarrinho"]),
    estaNoCarrinho(id) {
      for (let index = 0; index < this.carrinho.length; index++) {
        const elemento = this.carrinho[index];
        if (elemento.id === id) {
          return true;
        }
      }
      return false;
    },
  },
  watch: {
    produto(val) {
      this.estaNoCarrinhoProp = this.estaNoCarrinho(val.id);
    },
    carrinho() {
      this.isInCardProp = this.estaNoCarrinho(this.produto.id);
    },
    quantidade(val) {
      if (val <= 0) {
        this.quantidade = 1;
      }
    },
  },
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

.btn.product-button {
  margin: auto;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
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