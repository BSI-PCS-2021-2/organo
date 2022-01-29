<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-6 text-left text-justify">
        <div class="display-4">Pedido: {{ fornecedorPedido.id }} </div>
        <br>
        <p class="display-7">Método de pagamento: {{ fornecedorPedido.metodoPagamento.replace(/_/g, ' ') }}</p>
        <br>
        <p class="display-7">Valor total: R$ {{ fornecedorPedido.valor.toLocaleString(2) }}</p>
        <br>
        <p class="display-7">Status: {{ fornecedorPedido.status.replace(/_/g, ' ') }}</p>
        <br>
        <p class="display-7">Data de entrega: {{ fornecedorPedido.dataEntrega }}</p>
        <br>
        <p class="h3"> Itens: </p>
        <br>
        <div class="container">
            <div class="mr-2 mb-4" v-for="item in fornecedorPedido.itens" :key="item.id">
                <div class="row">
                   <div>
                    <h5> Quantidade: {{ item.quantidade }} </h5>
                    <br>
                    <CardProdutoPedido :produto="item.produto" />
                   </div>
                </div>
            </div>
        </div>
        <br>
        <div>
          <label class="h3" for="statusPedido" style="margin-bottom:20px"> Atualizar status do pedido:</label>
          <select style="display:block; float:left;" name="statusPedido" id="statusPedido" @change="onChangeStatus($event)">
            <option value="EM_ABERTO">Em aberto</option>
            <option value="INICIADO">Iniciado</option>
            <option value="CANCELADO">Cancelado</option>
            <option value="CONCLUIDO">Concluído</option>
          </select>
          <br>
          <br>
          <div>
            <button @click="atualizaStatus()" id="buttonStatus" type="submit" class="btn btn-primary">Atualizar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CardProdutoPedido from "../../components/produtos/CardProdutoPedido"
export default {
  data() {
      return {
          statusPedido: '',
          onChangeStatus(e) {
            this.statusPedido = e.target.value;
          },
      };
  },
  computed: {
    ...mapGetters("usuario", ["fornecedor", "fornecedorPedido", "fornecedorPedidos"]),
    ...mapGetters("produto", ["produto"])
  },
  components: { CardProdutoPedido },
  methods: {
    ...mapActions("usuario", ["estabelecerPedidoFornecedor", "atualizarStatusPedido"]),
    atualizaStatus() {
      if(this.statusPedido === '') {
        this.statusPedido = 'EM_ABERTO';
      }

      const info = {
        status: this.statusPedido,
        pedidoId: this.fornecedorPedido.id
      }

      this.atualizarStatusPedido(info);
    }
  },
  mounted() {
      this.estabelecerPedidoFornecedor(this.$route.params.idPedido);
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

#statusPedido {
    width: 80%;
    margin: auto;
}

#buttonStatus {
    margin-top: 20px;
}
</style>