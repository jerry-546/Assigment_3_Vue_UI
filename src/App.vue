<template>
  <div id="app">
    <!-- <navigation/> -->
    <Table v-bind:rows = "rows"/>
    <email v-bind:rows = "rows"/>

  </div>

</template>

<script>
import axios from 'axios';
//import navigation from './components/Navigation.vue'
import Table from './components/table_template.vue'
import email from './components/email.vue'



export default {
    name: 'app',
    components: {
      Table,
      email
    },
      data: function() {
      return{
      rows : []
      }
    },mounted(){
        axios.get('http://127.0.0.1:5555/customers')
        .then(res => {
          //console.log(res.data.data)
          this.rows = res.data.data
        }) 
  }
}
</script>

<style>

</style>
