import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../layout/Base.vue'),
    meta: {
      title: 'Organo - Home'
    },
    children: [ 
      { path: '', component: () => import('../views/home/Produtos.vue') },
      { path: 'detalhes/:idProduto', component: () => import('../views/home/Detalhes.vue') },
      { path: 'carrinho', component: () => import('../views/home/Carrinho.vue') },
      { path: 'comprador', component: () => import('../views/usuario/PerfilComprador.vue') }
    ]
  },
  {
    path: '/loginComprador',
    meta: {
      title: 'Organo - Login | Comprador'
    },
    component: () => import('../views/usuario/LoginComprador.vue')
  },
  {
    path: '/loginFornecedor',
    meta: {
      title: 'Organo - Login | Fornecedor'
    },
    component: () => import('../views/usuario/LoginFornecedor.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  if(!nearestWithMeta) return next();

  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });
    
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router

