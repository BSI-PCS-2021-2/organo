<template>
  <div class="container-fluid mt-5 mb-5">
    <div class="row d-flex justify-content-center">
      <div class="col-6 text-left text-justify">
        <div class="display-4 mb-4 font-title">Perfil do comprador </div>
        <div>
          <p class="font-text"><b>Nome</b></p>
          <p class="font-text">{{ comprador.nome}} {{ comprador.sobrenome }}</p>
        </div>
        <div>
          <p class="font-text mt-3"><b>CPF</b></p>
          <p class="font-text">{{ comprador.cpf }}</p>
        </div>
        <div>
          <p class="font-text mt-3"><b>E-mail</b></p>
          <p class="font-text">{{ comprador.email }}</p>
        </div>
        <div>
          <p class="font-text mt-3"><b>Endereços: </b></p>
          <div v-for="endereco in comprador.enderecos" :key="endereco.id">
                    <p class="font-text">
                        {{ endereco.rua }}, {{ endereco.numero }} - {{ endereco.complemento }} - CEP: {{ endereco.cep }}
                    </p>
          </div>
          <br>
          <router-link
            type="submit"
            class="btn btn-primary btn-block"
            :to="'/cadastroEndereco/'+ comprador.id"
            >Cadastrar novo endereço</router-link
          >
        </div>
        <p class="font-subTitle mt-5 mb-5" v-if="comprador.pedidos">Pedidos</p>
        <div class="row">
            <div class="col-md-4 font-subTitle" v-for="pedido in compradorPedidos" :key="pedido.id">
                <CardPedido :pedido="pedido" />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CardPedido from "../../components/pedidos/CardPedido";

export default {
  computed: {
    ...mapGetters("usuario", ["comprador", "compradorPedidos"])
  },
  methods: {
    ...mapActions("usuario", ["retornarCompradorPedidos"]),
  },
  components: { CardPedido },
  mounted() {
      this.retornarCompradorPedidos(this.comprador.cpf)
  }
};
</script>
<style>
.container-fluid {
  padding: 100px;
}
.image-product {
  width: 100%;
}
.card * {
  max-height: 85vh;
}
</style>