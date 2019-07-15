<template>

  <div class="table">
    <table id = "AllCustomers">
      <thead>

        <th>Last Name</th>
        <th>First Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>City</th>
        <th>State</th>
        <th>Zip</th>
        <th>Timestamp</th>
        <th v-if="isHidden == 'edit'">Edit</th>
        <th v-if="isHidden == 'remove'">Remove</th>
      </thead>

      <tbody >
        <tr v-for="(row, index) in rows" v-bind:key="row.id" v-bind:index = "index" >
          <td>{{row.last_name}}</td>
          <td>{{row.first_name}}</td>
          <td> {{row.email}}</td>
          <td>{{row.address}}</td>
          <td>{{row.city}}</td>
          <td>{{row.state}}</td>
          <td>{{row.zip}}</td>
          <td>{{row.emailSent}}</td>
          <td v-if="isHidden == 'edit'" ><button @click="editCust(row)">Edit</button></td>
          <td v-if="isHidden == 'remove'"><button @click="removeCust(row.id, index)">Remove</button></td>
        </tr>
      </tbody>
    </table>
    <button v-on:click="removeApper">Remove</button>
    <button v-on:click="editApper">Edit</button>
<div class="table">
    <md-table v-model="rows"  :md-sort.sync="currentSort" :md-sort-order.sync="currentSortOrder" :md-sort-fn="customSort" md-card>
      <md-table-toolbar>
        <h1 class="md-title">AllCustomers</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="FIRST NAME" md-sort-by="first_name">{{ item.first_name }}</md-table-cell>
        <md-table-cell md-label="LAST NAME" md-sort-by="last_name">{{ item.last_name }}</md-table-cell>
        <md-table-cell md-label="EMAIL" >{{ item.email }}</md-table-cell>
        <md-table-cell md-label="ADDRESS" >{{ item.address }}</md-table-cell>
        <md-table-cell md-label="CITY" >{{ item.city }}</md-table-cell>
        <md-table-cell md-label="STATE" >{{ item.state}}</md-table-cell>
        <md-table-cell md-label="ZIP" >{{ item.zip }}</md-table-cell>
        <md-table-cell md-label="TIMESTAMP" >{{ item.emailSent }}</md-table-cell>
        <md-table-cell md-label="EDIT" v-if="isHidden == 'edit'"><button @click="editCust(item)">Edit</button></md-table-cell>
        <md-table-cell md-label="REMOVE" v-if="isHidden == 'remove'"><button @click="removeCust(item.id, index)">Remove</button></md-table-cell>

      </md-table-row>
    </md-table>
    </div>
  </div>



</template>

<script>
import axios from 'axios'

export default {
  name: 'Table',
  props: {},
  data: function() {
      return{
        isHidden: this.$route.params.isHidden,
        rows: []
      }
    },
  beforeRouteUpdate(to, from,next)  {
    this.isHidden = to.params.isHidden
    next()
  },
  mounted(){
        axios.get('http://127.0.0.1:5555/all_customers')
        .then(res => {
          this.rows = res.data
        }).catch(err => {
          alert(err)
        })
  },
   methods: {
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
      customSort(value) {
          return value.sort((a, b) => {
          const sortBy = this.currentSort

          if (this.currentSortOrder === 'desc') {
            return a[sortBy].localeCompare(b[sortBy])
          }

          return b[sortBy].localeCompare(a[sortBy])
        })
      },
      editCust(row){
        alert("id "+ row.id )
        console.log(row)
     }

   }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  table {
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
</style>
