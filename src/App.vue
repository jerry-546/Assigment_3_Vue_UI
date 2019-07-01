<template>
  <div id="app">
    <button v-on:click="isHidden = true">Table</button>
    <button v-on:click="isHidden = false">Send Email</button>
    <!-- <navigation/> -->
    <Table v-if="isHidden" v-bind:rows = "rows"/>
    <email v-if="!isHidden" v-bind:rows = "rows"/>

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
      rows : [],
      isHidden: true
      }
    },mounted(){
        axios.get('http://127.0.0.1:5555/customers')
        .then(res => {
          //console.log(res.data.data)
          this.rows = res.data.data
        }).catch(err => {
          alert(err)
        }) 
      this.$nextTick(() => {
      console.log(
        'inside nextTick callback:'
      ) // => 'not updated'
    })
  }
}
</script>

<style>
button {
 background-color: rgb(255, 0, 0); /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
