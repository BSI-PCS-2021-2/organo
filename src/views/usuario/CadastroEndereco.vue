<template>
  <div>
    <div class="organoBanner"></div>
    <div class="container" style="padding-top: 5%; padding-bottom: 5%">
      <div class="row d-flex justify-content-center">
        <div class="col-5 text-left login-form-container">
         <p class="h3">Cadastro de endereço:</p>
          <div class="d-flex justify-content-center">
            <img src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png" width="150" alt="">
          </div>
          <div>
            <form>
                <div class="form-group">
                    <label for="inputRua">Rua</label>
                    <input type="text" v-model="rua" class="form-control font-text form" id="inputRua" placeholder="Rua" required>
                </div>
                <div class="form-group">
                    <label for="inputNumero">Número</label>
                    <input type="number" v-model="numero" class="form-control font-text form" id="inputNumero" placeholder="Número" required>
                </div>
                <div class="form-group">
                    <label for="inputComplemento">Complemento (opcional)</label>
                    <input type="text" v-model="complemento" class="form-control font-text form" id="inputComplemento" placeholder="Complemento">
                </div>
                <div class="form-group">
                    <label for="inputCep">CEP</label>
                    <input type="text" v-model="cep" class="form-control font-text form" id="inputCep" v-on:blur="valCEP" placeholder="CEP" maxLength="8" required>
                </div>
                <button @click="atualizaComprador()" type="submit" class="btn btn-primary">Cadastrar</button>
                <span id="preenche-campos" class="h5"></span>     
            </form>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
import { mapActions, mapGetters } from "vuex";
import Swal from 'sweetalert2';
export default {
  name: "CadastroEndereco",
  data() {
    return {
        cep: '',
        numero: '',
        rua: '',
        complemento: '',
    };
  },
  computed: {
    ...mapGetters("usuario", ["comprador", "cepVerificado"])
  },
  methods: {
    ...mapActions("usuario", ["atualizarComprador", "verificaCEP", "resetVerificaCEP"]),
    atualizaComprador() {
        if(this.rua === "" || this.numero === "" || this.cep === "") {
            document.getElementById("preenche-campos").value = "Por favor, preencha todos os campos obrigatórios."
            return;
        }
        document.getElementById("preenche-campos").value = ""
        const endereco = {
                    rua: this.rua,
                    numero: this.numero,
                    complemento: this.complemento,
                    cep: this.cep
        }
        this.comprador.enderecos.push(endereco);
        this.atualizarComprador(this.comprador);
    },
    valCEP(e) {
      this.resetVerificaCEP('');
      const info = {
        cep: e.target.value, 
        type: ''
      };

      this.verificaCEP(info);
      setTimeout(() => {
        if(!this.cepVerificado) {
          document.getElementById("inputCep").value = '';
          Swal.fire({
              title: 'CEP inválido.',
              icon: 'error',
              confirmButtonText: 'Ok'
          })
        }
      }, 3000);
    }
  },
};
</script>
<style>
input:required {
    box-shadow:none;
}
input:invalid {
    box-shadow:0 0 3px red;
}
.form {
  font-size: 1em !important;
}
</style>
  
  
  
  
  
