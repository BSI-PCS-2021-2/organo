<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-6">
        <div class="card text-left shadow-md">
          <img class="card-img-top" :src="produto.fotoUrl" alt />
        </div>
      </div>
      <div class="col-6 text-left text-justify">
        <div class="display-3">{{ produto.nome }}</div>
        <p class="lead text-justify">{{ produto.conteudo }}</p>
        <div>
          <p class="h5">Preço</p>
          <p class="h5">{{ produto.preco }}</p>
        </div>
        <div>
          <p class="h5">Validade</p>
          <p class="h5">{{ produto.validade }}</p>
        </div>
        <div>
          <p class="h5">Fornecedor</p>
          <p class="h5">{{ produto.fornecedor.nomeFantasia }}</p>
        </div>
        <AddCarrinho :produto="produto"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AddCarrinho from "../../components/detalhes/AddCarrinho"
export default {
  data () {
    return {
      estaNoCarrinhoProp: false,
    }
  },
  computed: {
    ...mapGetters("usuario", ["comprador", "fornecedor"]),
    ...mapGetters("produto", ["produto"])
  },
  components: { AddCarrinho },
  methods: {
    ...mapActions("produto", ["detalhesProduto"]),
  },
  mounted() {
    this.detalhesProduto(this.$route.params.idProduto);
  }
};
</script>
<style>
.container-fluid {
  padding: 30px;
}
.image-product {
  width: 100%;
}
.card * {
  max-height: 85vh;
}
</style>