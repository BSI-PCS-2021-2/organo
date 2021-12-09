<template>
  <div class="card mb-3 shadow-sm product-card">
    <img v-bind:src="`${produto.fotoUrl}`" class="card-img-top product-image" v-bind:tag="`${produto.nome}`" v-bind:title="`${produto.nome}`" />
    <div class="card-body mr-0">
      <h5 class="card-title text-left product-name mb-1">{{ produto.nome }}</h5>
      <p class="text-left mt-1 product-price">R$ {{ produto.preco.toString() }}</p>
      <div class="row">
        <router-link
          type="button"
          class="btn btn-secondary btn-md product-button details"
          :to="'/detalhes/' + produto.id"
        >Detalhes</router-link>
        <button
          v-if="!estaNoCarrinhoProp"
          @click.stop="adicionarNoCarrinho({produto, quantidade})"
          type="button"
          class="btn btn-tertiary btn-md product-button card"
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
  width: 220px !important;
  padding: 0;
}

.card .product-image {
  margin: auto;
  height: 150px;
  width: 150px;
  margin-top: 10px;
}

.card .product-price {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1.2em;
  margin-top: 48px!important;
}

.btn.product-button {
  font-family: 'Roboto', sans-serif !important; 
  height: 35px !important;
  margin: auto;
}

.btn.product-button.details {
  padding-left: 35px;
  padding-right: 35px;
}

.btn.product-button.card {
  padding-left: 20px;
  padding-right: 20px;
}

.card-title {
  color: black;
  font-size: 1.1em;
  font-weight: 900 !important;
  font-family: 'Roboto', sans-serif !important;
  word-wrap: break-word;
  position: absolute;
}

.card.product-card {
  width: 220px !important;
  height: 320px !important;
}
</style>