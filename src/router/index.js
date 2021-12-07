import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../layout/Base.vue'),
    children: [ 
      { path: '', component: () => import('../views/home/Produtos.vue') },
      { path: 'detalhes/:idProduto', component: () => import('../views/home/Detalhes.vue') },
      { path: 'carrinho', component: () => import('../views/home/Carrinho.vue') },
      { path: 'comprador', component: () => import('../views/usuario/PerfilComprador.vue') },
      { path: 'fornecedor', component: () => import('../views/usuario/PerfilFornecedor.vue') }
    ]
  },
  {
    path: '/loginComprador',
    component: () => import('../views/usuario/LoginComprador.vue')
  },
  {
    path: '/loginFornecedor',
    component: () => import('../views/usuario/LoginFornecedor.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router