<template>
  <div class="container" style="padding: 30px">
    <div class="row d-flex justify-content-center">
      <div class="list-group col-8">
        <a
          v-for="item in carrinho"
          :key="item.id"
          href="#"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        >
          <img :src="item.fotoUrl" alt height="60" width="60" />
          <p class="h4">{{ item.nome }}</p>
          <div class="row">
            <div class="mr-2">
              <p>Preço Unitário</p>
              <p>${{ item.preco }}</p>
            </div>
            <div class="mr-2">
              <p>Preço Total</p>
              <p>${{ item.preco * item.quantidade }}</p>
            </div>
            <div>
              <p>Quantidade</p>
              <p>{{ item.quantidade }}</p>
            </div>
          </div>
        </a>
        <div
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        >
          <p class="h4">Total</p>
          <div>
            <p>Preço total</p>
            <p>${{ precoTotal }}</p>
          </div>
        </div>
        <button
          @click="checkout()"
          type="button"
          class="btn btn-primary btn-lg btn-block mt-4"
        >Checkout</button>
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