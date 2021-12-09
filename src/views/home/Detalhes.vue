<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-2">
        <div class="card text-left shadow-md">
          <img class="card-img-top image-product" v-bind:src="`${produto.foto_url}`" alt />
        </div>
      </div>
      <div class="col-3 text-left text-justify">
        <div class="display-3 font-subTitle">{{ produto.nome }}</div>
        <p class="lead text-justify">{{ produto.conteudo }}</p>
        <div>
          <p class="font-text"><b>Preço:</b> R$ {{ produto.preco }}</p> 
        </div>
        <div>
          <p class="font-text"><b>Validade:</b> {{ produto.validade }}</p>
        </div>
        <div>
          <p class="font-text"><b>Fornecedor:</b> {{ produto.fornecedor.nomeFantasia }}</p>
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
  padding: 20px !important;
}
.card * {
  max-height: 85vh;
}
</style>