<template>
        <div>
            <nav class="navbar navbar-expand-lg fixed-top">
                <div class="navbar-container">
                    <router-link
                        v-if="Object.keys(fornecedor).length === 0"
                        to="/"
                        ><img src="../assets/logo.png" class="navbar-logo"
                    /></router-link>
                    <p v-if="Object.keys(fornecedor).length !== 0">
                        <img src="../assets/logo.png" class="navbar-logo" />
                    </p>
                    <div class="ml-auto">
                        <div
                            class="btn btn-primary"
                            v-if="
                                Object.keys(comprador).length !== 0 &&
                                Object.keys(fornecedor).length === 0
                            "
                        >
                            <router-link
                                class="btn btn-primary"
                                to="/comprador"
                            >
                                <img
                                    src="../assets/icons/user_icon.png"
                                    alt="Perfil"
                                    title="Perfil"
                                />
                            </router-link>
                        </div>
                        <router-link
                            v-else-if="
                                Object.keys(comprador).length === 0 &&
                                Object.keys(fornecedor).length === 0
                            "
                            class="btn btn-primary navbar-option"
                            to="/loginComprador"
                            >Login</router-link
                        >
                        <router-link
                            class="btn btn-primary navbar-option"
                            v-if="
                                Object.keys(fornecedor).length === 0 &&
                                Object.keys(comprador).length === 0
                            "
                            to="/loginFornecedor"
                        >
                            Sou fornecedor
                        </router-link>

                        <router-link
                            class="btn btn-primary navbar-card"
                            to="/carrinho"
                        >
                            <img
                                v-if="Object.keys(fornecedor).length === 0"
                                src="https://i.imgur.com/lXAH3Yy.png"
                                width="40"
                                alt
                            />
                            <span
                                v-if="Object.keys(fornecedor).length === 0"
                                class="badge badge-danger badge-pill"
                                >{{ carrinho.length }}</span
                            >
                        </router-link>

                        <button
                            v-if="
                                (comprador &&
                                    Object.keys(comprador).length !== 0) ||
                                (fornecedor &&
                                    Object.keys(fornecedor).length !== 0)
                            "
                            @click="encerrarSessao()"
                            type="button"
                            class="btn btn-primary navbar-option"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </nav>
            <router-view />
        
        <footer></footer>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "Base",
    computed: {
        ...mapGetters("usuario", ["comprador", "fornecedor"]),
        ...mapGetters("produto", ["carrinho"]),
    },
    methods: {
        ...mapActions("usuario", ["sair"]),
        encerrarSessao() {
            if (Object.keys(this.comprador).length !== 0) {
                this.sair({ id: this.comprador.id, type: "comprador" });
            } else if (Object.keys(this.fornecedor).length !== 0) {
                this.sair({ id: this.fornecedor.id, type: "fornecedor" });
            }
        },
    },
};
</script>

<style>
nav {
    background-color: #008542;
    height: 55px;
}

.navbar-card {
    border: none;
    border-radius: 0;
}

.navbar-logo {
    height: 45px;
    margin-top: 0.28em;
}

.navbar-option {
    margin: 0 !important;
    font-family: "Source Sans Pro", sans-serif;
    height: 100% !important;
    font-size: 18px;
    border: none;
    border-radius: 0;
    padding-top: 12.5px;
}

.profile-image {
    width: 50px;
    border-radius: 100% !important;
}

.btn {
    margin: 0;
    font-weight: bold;
    background: #008542;
}

.btn:hover {
    background: #6aa84f;
    color: black;
}

input {
    border-radius: 0%;
}

.btn:focus {
    background: #6aa84f;
}
</style>