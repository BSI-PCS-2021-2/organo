import axios from "axios"
//import router from '../../router'

export function retornarProdutos({ commit, getters }, fornecedorCnpj) {
    let url = `http://localhost:8082/organo/fornecedor/${fornecedorCnpj}/listarProdutos`;
    let produtos = getters.produtos
    axios.get(url).then((response) => {
        if(Object.keys(response.data).length !== 0) {
            produtos.push(response.data)
        }
        commit("setProdutos", produtos);
    }).catch(error => {
        console.log(error);
    });
}

export function detalhesProduto({ commit }, id, fornecedorCnpj) {
    let url = `http://localhost:8082/organo/produto/${fornecedorCnpj}/${id}`;
    axios.get(url).then((response) => {
        const produtoData = {
            nome: response.data.nome,
            id: response.data.id,
            preco: response.data.preco,
            validade: response.data.validade,
            foto_url: response.data.fotoUrl,
            fornecedor: response.data.fornecedor
        }
        commit("setProduto", produtoData);
    }).catch(function (error) {
        console.log(error);
    });
}

export function adicionarNoCarrinho({ commit, getters }, payload) {
    let carrinho = getters.carrinho
    let data = payload.produto 
    data["quantidade"] = payload.quantidade
    carrinho.push(data)
    commit("setCarrinho", carrinho)
    //router.push('/carrinho')
}

export function removerDoCarrinho({ commit, getters }, id) {
    let carrinho = []
    if (id) {
        for (let index = 0; index < getters.carrinho.length; index++) {
            const elemento = getters.carrinho[index];
            if (elemento.id !== id) {
                carrinho.push(elemento)
            }
        }
    }
    commit("setCarrinho", carrinho)
}

export function esvaziarProdutos({commit, getters}) {
    let produtos = getters.produtos
    produtos = []
    commit("setProdutos", produtos)
}