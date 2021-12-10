<template>
  <div class="container" style="padding: 30px">
    <div class="row d-flex justify-content-center">
      <div class="list-group col-9">
        <a
          v-for="item in carrinho"
          :key="item.id"
          href="#"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        >
          <div v-if="item.fotoUrl">
          <img v-bind:src="`${item.fotoUrl}`" alt height="80" width="80" />
          </div>
          <div v-if="item.foto_url">
            <img v-bind:src="`${item.foto_url}`" alt height="80" width="80" />
          </div>
          <p class="font-text">{{ item.nome }}</p>
          <div class="row">
            <div class="mr-4">
              <p>Preço Unitário</p>
              <p class="font-text">R$ {{ item.preco.toLocaleString(2) }}</p>
            </div>
            <div class="mr-4">
              <p>Preço Total</p>
              <p class="font-text">R$ {{ (item.preco * item.quantidade).toLocaleString(2) }}</p>
            </div>
            <div>
              <p>Quantidade</p>
              <p class="font-text">{{ item.quantidade }}</p>
            </div>
          </div>
        </a>
        <div
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        >
          <p class="h4">Total</p>
          <div>
            <p class="h4">Preço total</p>
            <p class="font-text"><b>R$ {{ precoTotal.toLocaleString(2) }}</b></p>
          </div>
        </div>
        <button
          @click="checkout()"
          type="button"
          class="btn btn-primary btn-lg btn-block mt-4"
        >Finalizar compra</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Carrinho",
  data() {
    return {
      precoTotal: 0,
    };
  },
  computed: {
    ...mapGetters("produto", ["carrinho"]),
    ...mapGetters("usuario", ["comprador"]),
  },
  methods: {
    ...mapActions("produto", ["removerDoCarrinho"]),
    calcPreco() {
      this.carrinho.forEach((elemento) => {
        this.precoTotal += elemento.preco * elemento.quantidade;
      });
    },
    checkout() {
      const vm = this;
      setTimeout(() => {
        vm.removerDoCarrinho();
        alert("Compra finalizada com sucesso!");
        vm.$router.push("/");
      }, 2000);
    },
  },
  mounted() {
    this.calcPreco();
  },
};
</script>
<style>