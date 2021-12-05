<template>
  <div>
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <router-link class="navbar-brand" to="/">Organo</router-link>
        <div class="ml-auto">
          <div class="btn btn-primary my-2 my-sm-0" v-if="comprador">
            <img
              :src="comprador.foto"
              class="img-thumbnail profile-image"
              alt
            />
          </div>
          <router-link v-else class="btn btn-primary my-2 my-sm-0" to="/loginComprador">Login</router-link>
          <router-link class="btn btn-primary my-2 my-sm-0" to="/carrinho">
              <img
                src="https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG38.png"
                width="50"
                alt
              />
              <span class="badge badge-danger badge-pill">{{ carrinho.length }}</span>
          </router-link>
          <router-link class="btn btn-primary my-2 my-sm-0" to="/loginFornecedor"> Sou fornecedor
          </router-link>
          <button
          @click="sair()"
          type="button"
          class="btn btn-primary my-2 my-sm-0"
          >Sair</button>
        </div>
      </nav>
    </div>
    <div class="page-container">
      <router-view />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Base",
  computed: {
    ...mapGetters("usuario", ["comprador"]),
    ...mapGetters("produto", ["carrinho"])
  },
  methods: {
    ...mapActions("usuario", ["sair"]),
    sair() {
      if(this.fornecedor) {
        this.sair({ id: this.fornecedor.id, type: 'fornecedor'} )
      } else if(this.comprador) {
        this.sair({ id: this.comprador.id, type: 'comprador'})
      }   
    }
  }

};
</script>

<style>
nav {
  background-color: teal;
}
.navbar-brand {
  font-weight: bold;
  font-size: 25px;
  color: #ffffff !important;
}
.profile-image {
  width: 50px;
  border-radius: 100% !important;
}
.page-container {
  padding-top: 81px;
}
.btn {
  border-radius: 0%;
  font-weight: bold;
  background: teal;
  border: teal;
}
.btn:hover {
  background: #00b4b4;
}
input {
  border-radius: 0%;
}
.btn:focus {
  background: teal;
}
</style>