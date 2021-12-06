import router from '../../router'
import Axios from 'axios';
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
        } else if(user.type === 'fornecedor') {
            userData = {
                nomeFantasia: response.data.nomeFantasia,
                email: response.data.email,
                cnpj: response.data.cnpj,
                id: response.data.id,
                foto: response.data.foto
            }
            commit("setFornecedor", userData)
        }
        router.push('/')
    })
        .catch(function (error) {
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