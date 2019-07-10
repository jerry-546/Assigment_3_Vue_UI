import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  render: h => h(App),
}).$mount('#app')
