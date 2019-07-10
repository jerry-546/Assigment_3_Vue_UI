<template>
  <div id="app">

    <button class = "navigation_button" v-on:click="isHidden = 'table'">Table</button>
    <button class = "navigation_button" v-on:click="isHidden = 'email'">Send Email</button>
    <button class = "navigation_button" v-on:click="isHidden = 'add'">Add Customer</button>
    <button class = "navigation_button" v-on:click="isHidden = 'edit'">Edit</button>
    <button class = "navigation_button" v-on:click="isHidden = 'remove'">Remove</button>

    <Table v-if="(isHidden == 'table') || (isHidden == 'edit') || (isHidden == 'remove')" v-bind:rows = "rows" v-bind:isHidden = "isHidden"/>
    <email v-if="isHidden == 'email'" v-bind:rows = "rows"/>
    <customerForm v-if="isHidden == 'add'"/>

  </div>

</template>

<script>
import axios from 'axios';
import Table from './components/table_template.vue'
import email from './components/email.vue'
import customerForm from './components/customerForm'



export default {
    name: 'app',
    components: {
      Table,
      email,
      customerForm
    },
      data: function() {
      return{
      rows : [],
      isHidden: 'table'
      }
    },mounted(){
        axios.get('http://127.0.0.1:5555/all_customers')
        .then(res => {
          this.rows = res.data
        }).catch(err => {
          alert(err)
        })

  }
}
</script>

<style>
.navigation_button {
 background-color: rgb(255, 0, 0);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.navigation_button:hover {
          background: #ff8a8a;
        }
</style>
