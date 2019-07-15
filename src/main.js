import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import {MdTable} from 'vue-material/dist/components'

import App from './App'
import Table from "./components/table_template.vue"
import Send from "./components/email.vue"
import AddCust from "./components/customerAddForm.vue"
import Test from "./components/Navigation.vue"



Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(MdTable)

const routes = [
  {
    path: '/table',
    name: 'Table',
    component: Table
  },

  {
    path: '/send',
    name: 'Send',
    component: Send
  },
  {
    path: '/add',
    name: "Add",
    component: AddCust
  },
  {
    path: '/test',
    name: "Test",
    component: Test

  }


]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  render: h => h(App)
});
