<template>
  <div>
    <div class="container" style="padding-top: 10%">
      <div class="row d-flex justify-content-center">
        <div class="col-5 text-left login-form-container">
          <p class="h3">Autenticar como comprador:</p>
          <br>
          <div class="d-flex justify-content-center">
            <img src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png" width="150" alt="">
          </div>
          <div>
            <div class="form-group">
              <label for="exampleInputEmail1">E-mail</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Senha</label>
              <input type="password" class="form-control" id="exampleInputPassword1" v-model="senha"/>
            </div>
            <button @click="loginUsuario()" type="submit" class="btn btn-primary btn-block">Login</button>
            <button @click="cadastrarUsuario()" type="submit" class="btn btn-primary btn-block">Cadastrar-se</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: '',
      senha: ''
    };
  },
  methods: {
    ...mapActions("usuario", ["login"]),
    loginUsuario() {
      const user = {
          email: this.email,
          senha: this.senha,
          type: 'comprador'
      }
      this.login(user)
    }
  },
};
</script>

<style>
.form-control {
  border-radius: 0%;
  height: 50px;
}
.login-form-container {
  padding: 20px;
  box-shadow: 0px 2px 5px 2px #888888;
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
.btn:focus {
  background: teal;
}
</style>