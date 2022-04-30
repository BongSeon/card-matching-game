import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'

// global styles
import './assets/normalize.css'
import './assets/main.css'

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
