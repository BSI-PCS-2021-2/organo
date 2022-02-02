<template>
    <div class="card-page">
    <div class="organoBanner"></div>
        <div class="row d-flex justify-content-center mt-5 mb-5" style="margin-right: 20%; margin-left: 20%">
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
                    <p class="font-text" style="width:20%">{{ item.nome }}</p>
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
                <p class="h5" v-if="retirada && this.carrinho[0] && this.carrinho[0].fornecedor.enderecos"><b>Endereço da loja: </b> {{this.carrinho[0].fornecedor.enderecos[0].rua}}, {{this.carrinho[0].fornecedor.enderecos[0].numero}}</p>
                <br>
                <label class="h5" for="metodoDePagamento">Método de pagamento:</label>
                <select name="metodoDePagamento" id="metodoDePagamento" @change="onChangePagamento($event)">
                    <option value="CARTAO_CREDITO">Cartão de crédito</option>
                    <option value="CARTAO_DEBITO">Cartão de débito</option>
                    <option value="PIX">Pix</option>
                    <option value="DINHEIRO">Dinheiro</option>
                </select>
                <br />
                <label class="h5" v-if="entrega || retirada" for="formaEntrega">Forma de entrega:</label>
                <select v-if="entrega || retirada" name="formaEntrega" id="formaEntrega" @change="onChangeEntrega($event)">
                    <option v-if="retirada" value="RETIRADA">Retirada</option>
                    <option v-if="entrega" value="ENTREGA">Entrega</option>
                </select>
                <br>
                <p class="h5" v-if="entrega && this.comprador.enderecos && this.formaEntrega === 'ENTREGA'"> Escolha o endereço de entrega: </p>
                <select v-model="enderecoEscolhido" name="enderecoEscolhido" id="enderecoEscolhido" v-if="entrega && this.comprador.enderecos && this.formaEntrega === 'ENTREGA'">
                    <option v-for="option in options" :value="option.value" :key="option">{{option.text}}</option>
                </select>
                <br>
                <label class="h5" v-if="manha || tarde || noite" for="horarioEntrega">Horário de entrega:</label>
                <select v-if="manha || tarde || noite" name="horarioEntrega" id="horarioEntrega" @change="onChangeHorario($event)">
                    <option v-if="(manha && this.dataHoje.demanha) || (manha && !this.dataHoje.demanha && !this.dataHoje.tarde && !this.dataHoje.noite)" value="MANHA">Manhã, de 9h às 12h</option>
                    <option v-if="(tarde && this.dataHoje.tarde) || (tarde && !this.dataHoje.demanha && !this.dataHoje.tarde && !this.dataHoje.noite)" value="TARDE">Tarde, de 13h às 17h</option>
                    <option v-if="(noite && this.dataHoje.noite) || (noite && !this.dataHoje.demanha && !this.dataHoje.tarde && !this.dataHoje.noite)" value="NOITE">Noite, de 18h às 22h</option>
                </select>
                <br>
                <p v-if="!this.dataHoje.demanha && !this.dataHoje.tarde && !this.dataHoje.noite" class="h5"><b>A entrega/retirada deve ser efetuada no dia seguinte à compra. </b></p>
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
import Swal from 'sweetalert2';
import moment from 'moment';
export default {
    name: "Carrinho",
    data() {
        return {
            precoTotal: 0,
            metodoPagamento: '',
            horarioEntrega: '',
            manha: '',
            tarde: '',
            noite: '',
            entrega: '',
            retirada: '',
            formaEntrega: '',
            enderecoEscolhido: '',
            dataHoje: {},
            onChangePagamento(e) {
              this.metodoPagamento = e.target.value;
            },
            onChangeHorario(e) {
              this.horarioEntrega = e.target.value;
            },
            onChangeEntrega(e) {
              this.formaEntrega = e.target.value;
            }
        };
    },
    computed: {
        ...mapGetters("produto", ["carrinho"]),
        ...mapGetters("usuario", ["comprador"]),
        options() {
            return this.comprador.enderecos.map(endereco => {
                return {
                    value: endereco,
                    text: `${endereco.rua}, ${endereco.numero} - CEP: ${endereco.cep}`
                }
            })
        }
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
            if((!this.entrega && !this.retirada) || (!this.manha && !this.tarde && !this.noite)) {
                Swal.fire({
                    title: 'Não foi possível finalizar a compra.',
                    text: 'O fornecedor não possui informações de entrega.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                return;
            }
            if(this.precoTotal === 0) {
                return;
            }

            if(this.metodoPagamento === '') {
                this.metodoPagamento = 'CARTAO_CREDITO'
            }

            if(this.horarioEntrega === '') {
                this.horarioEntrega = 'MANHA'
            }

            if(this.formaEntrega === '') {
                this.formaEntrega = 'RETIRADA'
            }

            let amanha = new Date();
            amanha.setDate(amanha.getDate()+1);
            amanha = moment(amanha).format("DD/MM/YYYY");

            const payload = {
                carrinho: this.carrinho,
                precoTotal: this.precoTotal,
                metodoPagamento: this.metodoPagamento,
                dataEntrega: amanha,
                horarioEntrega: this.horarioEntrega,
                formaEntrega: this.formaEntrega,
                endereco: this.enderecoEscolhido
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
        if(this.comprador.enderecos) {
            this.enderecoEscolhido = this.comprador.enderecos[0];
        }

        this.calcPreco();
        this.carrinho[0].fornecedor.horarios.forEach((horario) => {
           if(horario.horarioSelecionado === 'MANHA') this.manha = horario.horarioSelecionado;
           if(horario.horarioSelecionado === 'TARDE') this.tarde = horario.horarioSelecionado;
           if(horario.horarioSelecionado === 'NOITE') this.noite = horario.horarioSelecionado;
        })

        if(this.carrinho[0].fornecedor.infoEntrega === 'ENTREGA' || this.carrinho[0].fornecedor.infoEntrega === 'ENTREGA_E_RETIRADA') this.entrega = this.carrinho[0].fornecedor.infoEntrega;
        if(this.carrinho[0].fornecedor.infoEntrega === 'RETIRADA' || this.carrinho[0].fornecedor.infoEntrega === 'ENTREGA_E_RETIRADA') this.retirada = this.carrinho[0].fornecedor.infoEntrega;

        let hoje = new Date();
            console.log(hoje.getHours());
            if(hoje.getHours() >= 9 && hoje.getHours() <= 12 && this.manha) {
                this.dataHoje.demanha = true;
            }
            if(hoje.getHours() >= 9 && hoje.getHours() <= 17 && this.tarde) {
                this.dataHoje.tarde = true
            }
            if(hoje.getHours() >= 9 && hoje.getHours() <= 22 && this.noite) {
                this.dataHoje.noite = true;
            }
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
    width: 50%;
    margin: auto;
}

#horarioEntrega {
    width: 50%;
    margin: auto;
}

#enderecoEscolhido {
    width: 50%;
    margin: auto;
}

#formaEntrega {
    width: 50%;
    margin: auto;
}
</style>