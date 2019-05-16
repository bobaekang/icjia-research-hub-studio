import Vue from 'vue'
import './plugins/vuetify'

import 'icjia-research-hub-lib/dist/index.css'

import App from './App.vue'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
