<template>
  <div>
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top pl-3 pt-0 pb-0">
        <img	
          src="https://i.imgur.com/jGIvAzn.png"	
          width="170px"	
         />
        <router-link v-if="Object.keys(fornecedor).length === 0" class="navbar-brand ml-2" to="/">Organo</router-link>
        <p v-if="Object.keys(fornecedor).length !== 0" class="navbar-brand ml-2">Organo</p>
        <div class="ml-auto">
          <div class="btn btn-primary my-2 my-sm-0" v-if="Object.keys(comprador).length !== 0 && Object.keys(fornecedor).length === 0">
          <router-link class="btn btn-primary my-2 my-sm-0" to="/comprador">
            <img
              src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
              class="img-thumbnail profile-image"
              alt
            />
            </router-link>
          </div>
          <router-link v-else-if="Object.keys(comprador).length === 0 && Object.keys(fornecedor).length === 0" class="btn btn-primary my-2 my-sm-0 navbar-option" to="/loginComprador">Login</router-link>
          <router-link class="btn btn-primary my-2 my-sm-0" to="/carrinho">
              <img
                v-if="Object.keys(fornecedor).length === 0"
                src="https://i.imgur.com/lXAH3Yy.png"
                width="40"
                alt
              />
              <span  v-if="Object.keys(fornecedor).length === 0" class="badge badge-danger badge-pill">{{ carrinho.length }}</span>
          </router-link>
          <router-link class="btn btn-primary my-2 my-sm-0 navbar-option" v-if="Object.keys(fornecedor).length === 0 && Object.keys(comprador).length === 0" to="/loginFornecedor"> Sou fornecedor
          </router-link>
          <button v-if="(comprador && Object.keys(comprador).length !== 0) || (fornecedor && Object.keys(fornecedor).length !== 0)"
          @click="encerrarSessao()"
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
    ...mapGetters("usuario", ["comprador", "fornecedor"]),
    ...mapGetters("produto", ["carrinho"])
  },
  methods: {
    ...mapActions("usuario", ["sair"]),
    encerrarSessao() {
      if(Object.keys(this.comprador).length !== 0) {
        this.sair({ id: this.comprador.id, type: 'comprador'} )
      } else if(Object.keys(this.fornecedor).length !== 0) {
        this.sair({ id: this.fornecedor.id, type: 'fornecedor'})
      }   
    }
  },

};
</script>

<style>
nav {
  background-color: #6aa84f;
}
.navbar-brand {
  font-weight: 500;	
  font-size: 50px;	
  color: #ffffff !important;	
  font-family: 'Poiret One', cursive;	
  margin-top: -0.15em;	
  margin-bottom: -0.05em;	
  padding: 0;
}

.navbar-option {	
  font-size: 20px;	
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
  background: #6aa84f;
  border: #6aa84f;
}

.btn-secondary {
  border-radius: 0%;
  font-weight: bold;
  background: rgb(235, 235, 235);
  border: grey;
  color: black;
}

.btn-tertiary {
  border-radius: 0%;
  font-weight: bold;
  background: rgb(95, 95, 95);
  border: grey;
  color: rgb(255, 255, 255);
}

.btn:hover {
  background: #6aa84f;
  color: black
}
input {
  border-radius: 0%;
}
.btn:focus {
  background: #6aa84f;
}
</style>