<template>
  <div>
    <router-link to="/"><div class="organoBanner"></div></router-link>
    <div class="main-container">
      <div class="container-fluid mb-5">
        <div class="row d-flex justify-content-center">
          <div class="col-6 text-left text-justify">
            <div class="display-4 mb-4 font-title">Meu perfil</div>
            <div>
              <p class="font-text">
                <b>Nome completo:</b> {{ comprador.nome }} {{ comprador.sobrenome }}
              </p>
            </div>
            <div>
              <p class="font-text mt-2"><b>CPF:</b> {{ comprador.cpf }}</p>
            </div>
            <div>
              <p class="font-text mt-2"><b>E-mail:</b> {{ comprador.email }}</p>
            </div>
            <div>
              <p class="font-text mt-2"><b>Telefone:</b> {{ comprador.celular }}</p>
            </div>
            <div>
              <p class="font-text mt-2"><b>Endereços: </b></p>
              <div v-for="endereco in comprador.enderecos" :key="endereco.id">
                <p class="font-text">
                  {{ endereco.rua }}, {{ endereco.numero }} -
                  {{ endereco.complemento }} - CEP: {{ endereco.cep }}
                </p>
              </div>
              <br />
              <router-link
                type="submit"
                class="btn btn-primary btn-lg btn-block col-7"
                style="padding: 0.5px; width: 50%; display: block; float: right"
                :to="'/cadastroEndereco/' + comprador.id"
                >Cadastrar novo endereço</router-link
              >
              <router-link
                type="button"
                class="btn btn-primary btn-lg btn-block col-7"
                style="
                  padding: 0px;
                  width: 45%;
                  display: block;
                  float: left;
                  margin-top: 0px;
                "
                :to="'/editarComprador/'"
              >
                Editar cadastro
              </router-link>
            </div>
            <br>
            <p class="font-subTitle mt-5 mb-2" v-if="comprador.pedidos">
              Pedidos
            </p>
            <div class="row">
              <div
                class="col-md-4 font-subTitle"
                v-for="pedido in compradorPedidos"
                :key="pedido.id"
              >
                <CardPedido :pedido="pedido" />
              </div>
            </div>
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
    ...mapGetters("usuario", ["comprador", "compradorPedidos"]),
  },
  methods: {
    ...mapActions("usuario", ["retornarCompradorPedidos"]),
  },
  components: { CardPedido },
  mounted() {
    this.retornarCompradorPedidos(this.comprador.cpf);
  },
};
</script>
<style>
.image-product {
  width: 100%;
}
.card * {
  max-height: 85vh;
}
</style>