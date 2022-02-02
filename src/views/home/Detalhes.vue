<template>
  <div class="details-page">
    <div class="organoBanner"></div>
    <div class="main-container">
    <div class="row d-flex justify-content-center mt-5 mb-5">
      <div class="col-2">
        <div class="card text-left shadow-md">
          <img class="card-img-top image-product" v-bind:src="`${produto.foto_url}`" alt />
        </div>
      </div>
      <div class="col-3 text-left text-justify">
        <div class="display-3 font-subTitle">{{ produto.nome }}</div>
        <p class="lead text-justify">{{ produto.conteudo }}</p>
        <div>
          <p class="h3"><b>Preço:</b> R$ {{ produto.preco.toLocaleString(2) }}</p> 
        </div>
        <div>
          <p class="font-text"><b>Em estoque:</b> {{ produto.quantidade }}</p>
        </div>
        <div>
          <p class="font-text"><b>Validade:</b> {{ this.dataValidade }}</p>
        </div>
        <div>
          <p class="font-text"><b>Fornecedor:</b> {{ produto.fornecedor.nomeFantasia }}</p>
        </div>
        <AddCarrinho :produto="produto"/>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AddCarrinho from "../../components/detalhes/AddCarrinho"
import moment from 'moment'
export default {
  data() {
    return {
      dataValidade: '',
    };
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
    this.dataValidade = moment(this.produto.validade).format("DD/MM/YYYY");
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