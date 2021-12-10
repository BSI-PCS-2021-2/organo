<template>
    <div>
        <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
        >
        <!--
            <ol class="carousel-indicators">
                <li data-target="#" data-slide-to="0" class="active"></li>
                <li data-target="#" data-slide-to="1"></li>
                <li data-target="#" data-slide-to="2"></li>
            </ol>
            -->
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <!-- <img class="d-block w-100" src="https://i.imgur.com/hTBLKFo.jpg" alt="First slide" /> -->
                </div>
                <div class="carousel-item">
                    <!-- <img class="d-block w-100" src="" alt="Second slide" /> -->
                </div>
                <div class="carousel-item">
                    <!-- <img class="d-block w-100" src="" alt="Third slide" /> -->
                </div>
            </div>
        </div>
        <div class="main-container">
            <div class="products-list">
                <div
                    v-for="listaProdutos in produtos"
                    :key="listaProdutos[0].fornecedor.id"
                >
                    <p class="nome-fornecedor mb-3 mt-4">
                        {{ listaProdutos[0].fornecedor.nomeFantasia }}
                    </p>
                    <div class="row ml-0">
                        <div
                            class="mr-2 mb-2"
                            v-for="produto in listaProdutos"
                            :key="produto.id"
                        >
                            <CardProduto :produto="produto" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CardProduto from "../../components/produtos/CardProduto";

export default {
    name: "Produtos",
    computed: {
        ...mapGetters("produto", ["produtos", "produto"]),
        ...mapGetters("usuario", ["fornecedores"]),
    },
    components: { CardProduto },
    methods: {
        ...mapActions("produto", [
            "retornarProdutos",
            "adicionarNoCarrinho",
            "removerDoCarrinho",
            "esvaziarProdutos",
        ]),
        ...mapActions("usuario", ["retornaFornecedores"]),
    },
    watch: {
        fornecedores() {
            this.fornecedores.forEach((fornecedor) => {
                this.retornarProdutos(fornecedor.cnpj);
            });
        },
    },
    mounted() {
        this.esvaziarProdutos();
        this.retornaFornecedores();
    },
};
</script>
<style>
.carousel {
    background-image: url(https://i.imgur.com/K1EL2gX.png);
    background-repeat: no-repeat;
    background-size: cover;
    height: 300px;
    width: 100%;
    margin-top: 55px;
}

.nome-fornecedor {
    text-align: left;
    font-size: 1.6em;
}

h1 {
    height: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: linear-gradient(
        90deg,
        rgba(88, 140, 236, 1),
        rgba(106, 106, 207, 1)
    );
}
</style>