<template>
  <div>
    <div class="organoBanner"></div>
    <div class="container" style="padding-top: 5%; padding-bottom: 3%">
      <div class="row d-flex justify-content-center">
        <div class="col-5 text-left login-form-container">
          <p class="h3">Atualização de cadastro:</p>
          <div class="d-flex justify-content-center">
            <img
              src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
              width="150"
              alt=""
            />
          </div>
          <div>
            <form>
              <div class="form-group">
                <label for="inputEmail">E-mail</label>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  id="inputEmail"
                  placeholder="Entre com e-mail"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputPassword">Senha</label>
                <input
                  type="password"
                  v-model="senha"
                  class="form-control"
                  id="inputPassword"
                  placeholder="Senha"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputName">Nome</label>
                <input
                  type="text"
                  v-model="nomeFantasia"
                  class="form-control"
                  id="inputName"
                  placeholder="Nome"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputCpf">CNPJ</label>
                <input
                  type=""
                  v-model="cnpj"
                  class="form-control"
                  id="inputCnpj"
                  placeholder="CNPJ"
                  maxLength="14"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputTelefoneMovel">Telefone móvel</label>
                <input
                  type="phone"
                  v-model="telefoneMovel"
                  class="form-control"
                  id="inputTelefoneMovel"
                  placeholder="Ex: 21999999999"
                  maxLength="11"
                />
              </div>
              <p class="h4">Informações de entrega</p>
              <p class="h7">
                Selecione as opções de entrega fornecidas por você:
              </p>
              <div class="form-check form-switch">
                <input
                  v-model="entrega"
                  class="form-check-input"
                  type="checkbox"
                  id="entrega"
                />
                <label class="form-check-label" for="entrega">Entrega</label>
              </div>
              <div class="form-check form-switch">
                <input
                  v-model="retirada"
                  class="form-check-input"
                  type="checkbox"
                  id="retirada"
                />
                <label class="form-check-label" for="retirada">Retirada</label>
              </div>
              <br />
              <p class="h5">Horários de entrega/retirada:</p>
              <div class="form-check form-switch">
                <input
                  v-model="manha"
                  class="form-check-input"
                  type="checkbox"
                  id="manha"
                />
                <label class="form-check-label" for="manha"
                  >Manhã, de 9h às 12h</label
                >
              </div>
              <div class="form-check form-switch">
                <input
                  v-model="tarde"
                  class="form-check-input"
                  type="checkbox"
                  id="tarde"
                />
                <label class="form-check-label" for="tarde"
                  >Tarde, de 13h às 17h</label
                >
              </div>
              <div class="form-check form-switch">
                <input
                  v-model="noite"
                  class="form-check-input"
                  type="checkbox"
                  id="noite"
                />
                <label class="form-check-label" for="noite"
                  >Noite, de 18h às 22h</label
                >
              </div>
              <br />
              <p class="h5">Endereço:</p>
              <div class="form-group">
                <label for="inputRua">Rua</label>
                <input
                  type="text"
                  v-model="rua"
                  class="form-control font-text form"
                  id="inputRua"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputNumero">Número</label>
                <input
                  type="number"
                  v-model="numero"
                  class="form-control font-text form"
                  id="inputNumero"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputComplemento">Complemento (opcional)</label>
                <input
                  type="text"
                  v-model="complemento"
                  class="form-control font-text form"
                  id="inputComplemento"
                />
              </div>
              <div class="form-group">
                <label for="inputCep">CEP</label>
                <input
                  type="text"
                  v-model="cep"
                  class="form-control font-text form"
                  id="inputCep"
                  v-on:blur="valCEP"
                  maxLength="8"
                  required
                />
              </div>
              <br />
              <div class="form-group">
                <button
                  @click="atualizaFornecedor()"
                  type="submit"
                  class="btn btn-primary"
                  style="display: inline; float: left"
                >
                  Atualizar
                </button>
                <router-link
                  type="button"
                  class="btn btn-primary"
                  style="display: inline; float: right"
                  :to="'/fornecedor/'"
                >
                  Cancelar
                </router-link>
                <span id="preenche-campos" class="h5"></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "EditarFornecedor",
  data() {
    return {
      cnpj: "",
      nomeFantasia: "",
      email: "",
      senha: "",
      entrega: false,
      retirada: false,
      infoEntrega: "",
      telefoneMovel: "",
      manha: false,
      tarde: false,
      noite: false,
      cep: "",
      numero: "",
      rua: "",
      complemento: "",
    };
  },
  computed: {
    ...mapGetters("usuario", ["fornecedor", "cepVerificadoFornecedor"]),
  },
  methods: {
    ...mapActions("usuario", [
      "atualizarFornecedor",
      "verificaCEP",
      "resetVerificaCEP",
    ]),
    atualizaFornecedor() {
      if (
        this.nomeFantasia === "" ||
        this.senha === "" ||
        this.email === "" ||
        this.cnpj === ""
      ) {
        document.getElementById("preenche-campos").value =
          "Por favor, preencha todos os campos obrigatórios.";
        return;
      }
      document.getElementById("preenche-campos").value = "";
      if (this.entrega === true && this.retirada === true) {
        this.infoEntrega = "ENTREGA_E_RETIRADA";
      } else if (this.entrega === true) {
        this.infoEntrega = "ENTREGA";
      } else if (this.retirada === true) {
        this.infoEntrega = "RETIRADA";
      }

      let infosHorarios = [];
      if (this.manha)
        infosHorarios.push({
          horarioSelecionado: "MANHA",
          fornecedor: this.fornecedor,
        });
      if (this.tarde)
        infosHorarios.push({
          horarioSelecionado: "TARDE",
          fornecedor: this.fornecedor,
        });
      if (this.noite)
        infosHorarios.push({
          horarioSelecionado: "NOITE",
          fornecedor: this.fornecedor,
        });

      const fornecedor = {
        nomeFantasia: this.nomeFantasia,
        email: this.email,
        senha: this.senha,
        cnpj: this.cnpj,
        infoEntrega: this.infoEntrega,
        telefoneMovel: this.telefoneMovel,
        horarios: infosHorarios,
        enderecos: [
          {
            rua: this.rua,
            numero: this.numero,
            complemento: this.complemento,
            cep: this.cep,
          },
        ],
      };
      this.atualizarFornecedor(fornecedor);
    },
    valCEP(e) {
      this.resetVerificaCEP("Fornecedor");
      const info = {
        cep: e.target.value,
        type: "Fornecedor",
      };

      this.verificaCEP(info);
      setTimeout(() => {
        if (!this.cepVerificadoFornecedor) {
          document.getElementById("inputCep").value = "";
          Swal.fire({
            title: "CEP inválido.",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      }, 3000);
    },
  },
  mounted() {
    this.cnpj = this.fornecedor.cnpj;
    this.nomeFantasia = this.fornecedor.nomeFantasia;
    this.email = this.fornecedor.email;
    this.senha = this.fornecedor.senha;
    this.entrega =
      this.fornecedor.infoEntrega == "ENTREGA_E_RETIRADA" ||
      this.fornecedor.infoEntrega == "ENTREGA"
        ? true
        : false;
    this.retirada =
      this.fornecedor.infoEntrega == "ENTREGA_E_RETIRADA" ||
      this.fornecedor.infoEntrega == "RETIRADA"
        ? true
        : false;
    this.infoEntrega = this.fornecedor.infoEntrega;
    this.telefoneMovel = this.fornecedor.telefoneMovel;
    this.cep = this.fornecedor.enderecos[0].cep;
    this.numero = this.fornecedor.enderecos[0].numero;
    this.rua = this.fornecedor.enderecos[0].rua;
    this.complemento = this.fornecedor.enderecos[0].complemento;

    this.fornecedor.horarios.forEach((infoHorario) => {
      if (infoHorario.horarioSelecionado == "MANHA") {
        this.manha = true;
      }
      if (infoHorario.horarioSelecionado == "TARDE") {
        this.tarde = true;
      }
      if (infoHorario.horarioSelecionado == "NOITE") {
        this.noite = true;
      }
    });
  },
};
</script>
<style>
input:required {
  box-shadow: none;
}

input:invalid {
  box-shadow: 0 0 3px red;
}
</style>
  
  
  
  
  
