import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './organo-store'
import './assets/style.css';

Vue.config.productionTip = false

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')