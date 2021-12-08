<template>
  <div>
    <div class="container" style="padding-top: 10%">
      <div class="row d-flex justify-content-center">
        <div class="col-5 text-left login-form-container">
         <p class="h3">Cadastro de comprador:</p>
          <div class="d-flex justify-content-center">
            <img src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png" width="150" alt="">
          </div>
          <div>
            <form>
                <div class="form-group">
                    <label for="inputEmail">E-mail</label>
                    <input type="email" v-model="email" class="form-control" id="inputEmail" placeholder="Entre com e-mail" required>
                </div>
                <div class="form-group">
                    <label for="inputPassword">Senha</label>
                    <input type="password" v-model="senha" class="form-control" id="inputPassword" placeholder="Senha" required>
                </div>
                <div class="form-group">
                    <label for="inputName">Nome</label>
                    <input type="text" v-model="nome" class="form-control" id="inputName" placeholder="Nome" required>
                </div>
                <div class="form-group">
                    <label for="inputLastName">Sobrenome</label>
                    <input type="text" v-model="sobrenome" class="form-control" id="inputLastName" placeholder="Sobrenome" required>
                </div>
                <div class="form-group">
                    <label for="inputCpf">CPF</label>
                    <input type="" v-model="cpf" class="form-control" id="inputCpf" placeholder="CPF" maxLength="11" required>
                </div>
                <p class="h5">Endereço:</p>
                <div class="form-group">
                    <label for="inputRua">Rua</label>
                    <input type="text" v-model="rua" class="form-control" id="inputRua" placeholder="Rua" required>
                </div>
                <div class="form-group">
                    <label for="inputNumero">Número</label>
                    <input type="number" v-model="numero" class="form-control" id="inputNumero" placeholder="Número" required>
                </div>
                <div class="form-group">
                    <label for="inputComplemento">Complemento (opcional)</label>
                    <input type="text" v-model="complemento" class="form-control" id="inputComplemento" placeholder="Complemento">
                </div>
                <div class="form-group">
                    <label for="inputCep">CEP</label>
                    <input type="text" v-model="cep" class="form-control" id="inputCep" placeholder="CEP" maxLength="8" required>
                </div>
                <button @click="cadastraComprador()" type="submit" class="btn btn-primary">Cadastrar</button>
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
export default {
  name: "CadastroComprador",
  data() {
    return {
        cpf: '',
        cep: '',
        numero: '',
        rua: '',
        complemento: '',
        nome: '',
        sobrenome: '',
        email: '',
        senha: ''
    };
  },
  computed: {
    ...mapGetters("usuario", ["comprador"])
  },
  methods: {
    ...mapActions("usuario", ["retornaFornecedores", "cadastrarComprador"]),
    cadastraComprador() {
        if(this.nome === "" || this.sobrenome === "" || this.senha === "" || this.email === "" ||
        this.cpf === "" || this.rua === "" || this.numero === "" || this.cep === "") {
            document.getElementBId("preenche-campos").value = "Por favor, preencha todos os campos obrigatórios."
        }
        document.getElementBId("preenche-campos").value = ""
        const comprador = {
            nome: this.nome,
            sobrenome: this.sobrenome,
            email: this.email,
            senha: this.senha,
            cpf: this.cpf,
            enderecos: [
                {
                    rua: this.rua,
                    numero: this.numero,
                    complemento: this.complemento,
                    cep: this.cep
                }
            ]
        }
        this.cadastrarComprador(comprador)
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
</style>
  
  
  
  
  
