import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import VModal from 'vue-js-modal'
import VueGoodTablePlugin from 'vue-good-table'


import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vue-material/dist/vue-material.min.css'



import App from './App'
import Table from "./components/table_template.vue"
import Send from "./components/email.vue"
import AddCust from "./components/customerAddForm.vue"
import Edit from "./components/customerEditForm"




Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(VueMaterial)
Vue.use(VModal)
Vue.use(VueGoodTablePlugin)

Vue.config.errorHandler = function (err, vm, info) {
  var errors = []
  errors.push(err, vm, info)
  console.log(errors)
}



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
