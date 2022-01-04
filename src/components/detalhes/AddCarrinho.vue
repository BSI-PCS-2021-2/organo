<template>
  <div class="row mt-4">
    <div class="col-3">
      <label class="sr-only" for="inlineFormInputName2">Quantidade</label>
      <input type="number" v-model="quantidade" class="form-control mb-2 mr-sm-2" />
    </div>
    <button
      @click.stop="adicionarNoCarrinho({produto, quantidade})"
      type="button"
      class="btn btn-primary btn-lg btn-block col-7"
    >Adicionar no carrinho</button>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["produto"],
  data() {
    return {
      quantidade: 1,
    };
  },
  computed: {
    ...mapState("produto", ["carrinho"]),
  },
  methods: {
    ...mapActions("produto", ["adicionarNoCarrinho", "removerDoCarrinho"]),
  },
  watch: {
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