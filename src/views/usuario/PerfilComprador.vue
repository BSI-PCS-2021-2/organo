<template>
  <div class="container-fluid">
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
        <p class="font-subTitle mt-5 mb-5" v-if="comprador.pedidos">Pedidos</p>
        <div class="row">
            <div class="col-md-4 font-subTitle" v-for="pedido in comprador.pedidos" :key="pedido.id">
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