<template>
  <div id="app">
    <!-- <navigation/> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Table v-bind:rows = "rows"/>

  </div>

</template>

<script>
import axios from 'axios';
//import navigation from './components/Navigation.vue'
import HelloWorld from './components/HelloWorld.vue'
import Table from './components/table_template.vue'


export default {
    name: 'app',
    components: {
      HelloWorld,
      Table
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
