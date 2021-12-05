import Vue from 'vue'
import Vuex from 'vuex'

import usuario from './usuario'
import produto from './produto'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      usuario,
      produto
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}