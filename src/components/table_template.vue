<template>
<div class="table">

    <md-table id ="customers" v-if="rows != []" v-model="rows" :md-sort.sync="sortBy" :md-sort-order.sync="ascOrDesc" :md-sort-fn="sortTable"  md-card md-fixed-header>
      <md-table-toolbar>
        <div  class="md-toolbar-section-start">
          <h1 class="md-title">AllCustomers</h1>

              <v-btn  v-on:click="editTable('remove')">Remove</v-btn>
              <v-btn v-on:click="editTable('edit')">Edit</v-btn>
              <v-btn v-if="isHidden != 'done'" v-on:click="editTable('done')">Done</v-btn>

        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input id = "nameSearch" placeholder="Search by first name or email..." v-model="search" @input="changeInParams()" > </md-input>
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No users found"
        :md-description="`No user found for this query. Try a different search term or create a new user.`">
      </md-table-empty-state>

      <md-table-row  slot="md-table-row" slot-scope="{ item }" >
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="FIRST NAME" md-sort-by="first_name" >{{ item.first_name }}</md-table-cell>
        <md-table-cell md-label="LAST NAME" md-sort-by="last_name">{{ item.last_name }}</md-table-cell>
        <md-table-cell md-label="EMAIL" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="ADDRESS" md-sort-by="address">{{ item.address }}</md-table-cell>
        <md-table-cell md-label="CITY" md-sort-by="city" >{{ item.city }}</md-table-cell>
        <md-table-cell md-label="STATE" md-sort-by="state">{{ item.state}}</md-table-cell>
        <md-table-cell md-label="ZIP" >{{ item.zip }}</md-table-cell>
        <md-table-cell md-label="TIMESTAMP" >{{ item.emailSent }}</md-table-cell>
        <md-table-cell md-label="EDIT" v-if="isHidden == 'edit'"> <v-btn @click="editCust(item)">Edit {{item.first_name}}</v-btn> </md-table-cell>
        <md-table-cell md-label="REMOVE" v-if="isHidden == 'remove'"><v-btn @click="removeCust(item.id, index)">Remove {{item.first_name}}</v-btn></md-table-cell>
      </md-table-row>
    </md-table>
<div class="text-xs-center">
  </div>
     <p> <v-btn v-on:click="prevPage">PREVIOUS</v-btn><v-btn v-on:click="nextPage">NEXT</v-btn></p>
    <p> Page: {{page}} of {{Math.ceil(this.totalRec/ this.perPage)}} </p><p>Records per Page: <v-text-field v-model="perPage" v-on:input="changeInParams()"></v-text-field> Total Records: {{totalRec}}</p>
</div>
</template>

<script>
import axios from 'axios'



export default {
  name: 'Table',

  data: () => ({
        search: "",
        searching: "NOT_SEARCHING",
        isHidden: 'done',
        rows: [],
        page: 1,
        perPage: 5,
        totalRec: 0,
        sortBy: "none",
        ascOrDesc: "asc",
    }),
 created(){
    this.loadItems()
    this.totalRecords()
  },
   methods: {
     sortTable(){
       this.loadItems()
     },


     nextPage(){
      if(this.totalRec > (this.page * this.perPage) ){
        this.page += 1
        this.loadItems()
      }

     },
     prevPage(){
       if(this.page > 1){
        this.page -= 1
        this.loadItems()
       }

     },
     changeInParams(){
       if( 0 <= this.perPage &&  this.perPage <= 100){
        if(this.search.length){
        this.searching = this.search
        } else {
          this.searching = "NOT_SEARCHING"
        }
        this.page = 1
        this.loadItems()
       } else {
         alert("Only numbers between 0 - 100 please")
       }
     },
     editTable(editHow){
      this.isHidden = editHow

     },
     totalRecords(){
        var url = 'http://localhost:5555/customerCount'
        return axios.get(url).then(response => {
          this.totalRec = response.data
        });
     },
    loadItems() {
        var url = "http://localhost:5555/all_customers/"+this.page+"/"+this.perPage + "/" + this.sortBy + "/" + this.ascOrDesc + '/' + this.searching
        return axios.get(url).then(response => {
         this.rows = response.data;
      });
    },

    removeCust(cid){
        let payload = {
          id: cid
        }
        axios.delete('http://127.0.0.1:5555/crud', {data: payload})
        .then(res =>{
          alert('Customer: '+res.data + ' was deleted' )
        }).catch(err=>{
          alert(err)
        })

    },
    editCust(row){
        this.$router.push({name:"Edit", params:{ row}})
    },
    beforeRouteUpdate(to, from, next){
       next();
     }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text-xs-center {
    position: absolute;
    width: 50%
  }


</style>

