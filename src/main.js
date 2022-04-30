import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

// global styles
import './assets/normalize.css'
import './assets/main.css'

const app = createApp(App)
app.use(store)
app.mount('#app')
