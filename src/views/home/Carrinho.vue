<template>
    <div class="container card-page" style="padding: 30px">
        <div class="row d-flex justify-content-center">
            <div class="list-group col-9">
                <a
                    v-for="item in carrinho"
                    :key="item.id"
                    href="#"
                    class="
                        list-group-item list-group-item-action
                        d-flex
                        justify-content-between
                        align-items-center
                    "
                >
                    <div v-if="item.fotoUrl">
                        <img
                            v-bind:src="`${item.fotoUrl}`"
                            alt
                            height="80"
                            width="80"
                        />
                    </div>
                    <div v-if="item.foto_url">
                        <img
                            v-bind:src="`${item.foto_url}`"
                            alt
                            height="80"
                            width="80"
                        />
                    </div>
                    <p class="font-text">{{ item.nome }}</p>
                    <div class="row">
                        <div class="mr-4">
                            <p>Preço Unitário</p>
                            <p class="font-text">
                                R$ {{ item.preco.toLocaleString(2) }}
                            </p>
                        </div>
                        <div class="mr-4">
                            <p>Preço Total</p>
                            <p class="font-text">
                                R$
                                {{
                                    (
                                        item.preco * item.quantidade
                                    ).toLocaleString(2)
                                }}
                            </p>
                        </div>
                        <div>
                            <p>Quantidade</p>
                            <p class="font-text">{{ item.quantidade }}</p>
                        </div>
            <br>
            <div>
                <button
                    @click="rmProduto(item.id)"
                    type="button"
                    class="btn btn-primary btn-lg btn-block col-7 rm-produto"
                > X </button>
            </div>
                    </div>
                </a>
                <div
                    class="
                        list-group-item list-group-item-action
                        d-flex
                        justify-content-between
                        align-items-center
                    "
                >
                    <p class="h4">Total</p>
                    <div>
                        <p class="h4">Preço total</p>
                        <p class="font-text">
                            <b>R$ {{ precoTotal.toLocaleString(2) }}</b>
                        </p>
                    </div>
                </div>
                <br />
                <label for="metodoDePagamento">Método de pagamento:</label>
                <select name="metodoDePagamento" id="metodoDePagamento" @change="onChange($event)">
                    <option value="CARTAO_CREDITO">Cartão de crédito</option>
                    <option value="CARTAO_DEBITO">Cartão de débito</option>
                    <option value="PIX">Pix</option>
                    <option value="DINHEIRO">Dinheiro</option>
                </select>
                <br />

                <button
                    @click="checkout()"
                    type="button"
                    class="btn btn-primary btn-lg btn-block mt-4"
                >
                    Finalizar compra
                </button>
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
            metodoPagamento: '',
            onChange(e) {
              this.metodoPagamento = e.target.value;
            }
        };
    },
    computed: {
        ...mapGetters("produto", ["carrinho"]),
        ...mapGetters("usuario", ["comprador"]),
    },
    methods: {
        ...mapActions("produto", ["removerDoCarrinho"]),
        ...mapActions("usuario", ["finalizarCompra"]),
        calcPreco() {
            this.carrinho.forEach((elemento) => {
                this.precoTotal += elemento.preco * elemento.quantidade;
            });
        },
        checkout() {
            if(this.precoTotal === 0) {
                return;
            }
            if(this.metodoPagamento === '') {
                this.metodoPagamento = 'CARTAO_CREDITO'
            }
            const payload = {
                carrinho: this.carrinho,
                precoTotal: this.precoTotal,
                metodoPagamento: this.metodoPagamento,
                dataEntrega: ''
            }
            this.finalizarCompra(payload);
        },
        rmProduto(id) {
            this.removerDoCarrinho(id);
            this.precoTotal = 0;
            this.calcPreco();
            document.getElementById("precoTotal").innerHTML = "R$" + this.precoTotal.toLocaleString(2);
        }
    },
    mounted() {
        this.calcPreco();
    },
};
</script>
<style>
.rm-produto {
  margin: 10px;
  width: 100px;
  float: right;
}
#metodoDePagamento {
    width: 30%;
    margin: auto;
}
</style>