import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import VModal from 'vue-js-modal'


import App from './App'
import Table from "./components/table_template.vue"
import Send from "./components/email.vue"
import AddCust from "./components/customerAddForm.vue"
import Edit from "./components/customerEditForm"
import Test from "./components/Navigation.vue"



Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(VueMaterial)
Vue.use(VModal)



const routes = [
  {
    path: '/table',
    name: 'Table',
    component: Table,
  },

  {
    path: '/send',
    name: 'Send',
    component: Send
  },
  {
    path: '/edit/:row',
    name: 'Edit',
    component: Edit,
    props: true

  },
  {
    path: '/add',
    name: "ADD",
    component: AddCust,
    meta: {
      showModal: true
    }
  },

  {
    path: '/test',
    name: "Test",
    component: Test,
    meta: {
      showModal: true
    }
  }


]

const router = new VueRouter({
  mode: 'history',
  routes

})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  render: h => h(App)
});
