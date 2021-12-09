import router from '../../router'
import Axios from 'axios';
import Swal from 'sweetalert2'
export function login({ commit }, user) {
    const usuario = {
        email: user.email,
        senha: user.senha
    }
    let url = `http://localhost:8082/organo/${user.type}/autenticar`
    Axios.post(url, usuario).then(function (response) {
        let userData = null;
        if(user.type === 'comprador') {
            userData = {
                nome: response.data.nome,
                sobrenome: response.data.sobrenome,
                email: response.data.email,
                cpf: response.data.cpf,
                id: response.data.id,
                enderecos: response.data.enderecos,
                pedidos: response.data.pedidos
            }
            commit("setComprador", userData)
            Swal.fire({
                title: 'Login efetuado com sucesso!',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            router.push('/')
        } else if(user.type === 'fornecedor') {
            userData = {
                nomeFantasia: response.data.nomeFantasia,
                email: response.data.email,
                cnpj: response.data.cnpj,
                id: response.data.id,
                foto: response.data.foto
            }
            commit("setFornecedor", userData)
            Swal.fire({
                title: 'Login efetuado com sucesso!',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
            router.push('/fornecedor')
        }
    })
        .catch(function (error) {
            Swal.fire({
                title: 'Login com erro',
                text: 'Tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            (error)
        });
}

export function cadastrarComprador({commit, getters}, compradorCadastro) {
    console.log(compradorCadastro)
    let url = "http://localhost:8082/organo/comprador/cadastrar"
    Axios.post(url, compradorCadastro).then(function (response) {
        if(response.status === 201) {
            Swal.fire({
                title: 'Comprador cadastrado com sucesso!',
                text: 'Você já pode se logar.',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
            const comprador = getters.comprador
            commit('setComprador', comprador)  
            setTimeout(router.push('/loginComprador'), 1500)
        }
    })
        .catch(function (error) {
            Swal.fire({
                title: 'Cadastro com erro',
                text: 'Tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            console.log(error)
        });
}

export function cadastrarFornecedor({commit, getters}, fornecedorCadastro) {
    console.log(fornecedorCadastro)
    let url = "http://localhost:8082/organo/fornecedor/cadastrar"
    Axios.post(url, fornecedorCadastro).then(function (response) {
        if(response.status === 201) {
            Swal.fire({
                title: 'Fornecedor cadastrado com sucesso!',
                text: 'Você já pode se logar.',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
            const fornecedor = getters.fornecedor
            commit('setFornecedor', fornecedor)  
            setTimeout(router.push('/loginFornecedor'), 1500)
        }
    })
        .catch(function (error) {
            Swal.fire({
                title: 'Cadastro com erro',
                text: 'Tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            console.log(error)
        });
}

export function retornaFornecedores({ commit }) {
    let url = `http://localhost:8082/organo/fornecedor/listar`;
    Axios.get(url).then(function (response) {
        commit("setFornecedores", response.data)
    })
        .catch(function (error) {
            console.log(error)
        });
}

export function retornarPedidos({ commit }, fornecedorCnpj) {
    let url = `http://localhost:8082/organo/fornecedor/${fornecedorCnpj}/listarPedidos`;
    Axios.get(url).then(function (response) {
        commit("setFornecedorPedidos", response.data)
    })
        .catch(function (error) {
            console.log(error)
        });
}

export function sair({ commit }, user) {
    let usuario = {}
    if (user.id) {
        if(user.type === 'fornecedor') {
            commit("setFornecedor", usuario)
        } else if(user.type === 'comprador') {
            commit("setComprador", usuario)
        }
    }
    
    router.push('/')
}