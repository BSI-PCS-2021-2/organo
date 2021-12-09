<template>
  <div class="row mt-4">
    <div class="col-3">
      <label class="sr-only" for="inlineFormInputName2">Quantidade</label>
      <input type="number" v-model="quantidade" class="form-control mb-2 mr-sm-2" />
    </div>
    <button
      v-if="!estaNoCarrinhoProp"
      @click.stop="adicionarNoCarrinho({produto, quantidade})"
      type="button"
      class="btn btn-primary btn-lg btn-block col-7"
    >Adicionar no carrinho</button>
    <button
      v-else
      @click.stop="removerDoCarrinho(produto.id)"
      type="button"
      class="btn btn-primary btn-lg btn-block col-7"
    >Remover do carrinho</button>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
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
</style>