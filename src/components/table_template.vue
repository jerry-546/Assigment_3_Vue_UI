<template>
<div class="table">
    <md-table v-model="searched" md-sort="first_name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div  class="md-toolbar-section-start">
          <h1 class="md-title">AllCustomers</h1>
              <button v-on:click="removeApper">Remove</button>
              <button v-on:click="editApper">Edit</button>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input id = "nameSearch" placeholder="Search by first name..." v-model="search" @input="searchOnTable"> </md-input>
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No users found"
        :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="FIRST NAME" md-sort-by="first_name">{{ item.first_name }}</md-table-cell>
        <md-table-cell md-label="LAST NAME" md-sort-by="last_name">{{ item.last_name }}</md-table-cell>
        <md-table-cell md-label="EMAIL" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="ADDRESS" >{{ item.address }}</md-table-cell>
        <md-table-cell md-label="CITY" md-sort-by="city" >{{ item.city }}</md-table-cell>
        <md-table-cell md-label="STATE" md-sort-by="state">{{ item.state}}</md-table-cell>
        <md-table-cell md-label="ZIP" >{{ item.zip }}</md-table-cell>
        <md-table-cell md-label="TIMESTAMP" >{{ item.emailSent }}</md-table-cell>
        <md-table-cell md-label="EDIT" v-if="isHidden == 'edit'"><button @click="editCust(item)">Edit</button></md-table-cell>
        <md-table-cell md-label="REMOVE" v-if="isHidden == 'remove'"><button @click="removeCust(item.id, index)">Remove</button></md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from 'axios'

  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.first_name).includes(toLower(term)))
    }

    return items
  }

export default {
  name: 'Table',

  data: () => ({

        search: null,
        searched: [],
        isHidden: null,
        rows: []
    }),
  created(){
        axios.get('http://127.0.0.1:5555/all_customers')
        .then(res => {
          this.rows = res.data
          this.searched = this.rows
        }).catch(err => {
          alert(err)
        })
  },
   methods: {

     searchOnTable(){
       this.searched = searchByName(this.rows, this.search)

     },

     removeApper(){
       this.isHidden = 'remove'
     },
      editApper(){
       this.isHidden = 'edit'
     },

     removeCust(cid){
        let payload = {
          id: cid
        }
        axios.delete('http://127.0.0.1:5555/crud', {data: payload})
        .then(res =>{
          alert('Customer: '+res.data + ' was deleted')
        }).catch(err=>{
          alert(err)
        })

      },

      editCust(row){
        alert("id "+ row.id )
        console.log(row)
     }

   },



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table {
    font-family: 'Open Sans', sans-serif;
    width: 750px;
    border-collapse: collapse;
    border: 3px solid rgb(254, 254, 254);
    margin: 10px 10px 0 10px;
  }

  .table th  {
    text-transform: uppercase;
    text-align: center;
    background: rgb(254, 0, 0);
    color: #FFF;
    cursor: pointer;
    padding: 8px;
    min-width: 30px;
  }
  .table th:hover {
          background: #ff8a8a;
        }
  .table td {
    text-align: left;
    padding: 8px;
    border-right: 2px solid rgb(255, 0, 0);
  }
  .table td:last-child {
    border-right: none;
  }
  .table tbody tr:nth-child(2n) td {
    background: rgb(252, 190, 190);
  }
  .table button {
 background-color: rgb(255, 78, 78);
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.table button:hover {
          background: #ff8a8a;
        }
  .md-field {
    max-width: 300px;
  }
</style>
