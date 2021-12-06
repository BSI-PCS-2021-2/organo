<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-6 text-left text-justify">
        <div class="display-4">Perfil do comprador </div>
        <p class="lead text-justify">Nome: {{ comprador.nome}} {{ comprador.sobrenome }}</p>
        <div>
          <p class="h5">CPF: {{ comprador.cpf }}</p>
        </div>
        <div>
          <p class="h5">E-mail: {{ comprador.email }}</p>
        </div>
        <br>
        <p class="h3" v-if="comprador.pedidos"> Pedidos </p>
        <br>
        <div class="row">
            <div class="col-md-4" v-for="pedido in comprador.pedidos" :key="pedido.id">
                <CardPedido :pedido="pedido" />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters} from "vuex";
import CardPedido from "../../components/pedidos/CardPedido";
export default {
  computed: {
    ...mapGetters("usuario", ["comprador"]),
  },
   components: { CardPedido },
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