<template>
  <div class="table">
    <table id = "AllCustomers">
        <thead>
        <th>ID</th>
        <th>Last Name</th>
        <th>First Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>City</th>
        <th>State</th>
        <th>Zip</th>
        <th>Timestamp</th>
      </thead>
      <tbody>
        
        <tr v-for="row in rows" v-bind:key = "row.id" >
          <td>{{row.id}}</td>
          <td>{{row.last_name}}</td>
          <td>{{row.first_name}}</td>
          <td> {{row.email}}</td>
          <td>{{row.address}}</td>
          <td>{{row.city}}</td>
          <td>{{row.state}}</td>
          <td>{{row.zip}}</td>
          <td>{{row.timestamp}}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>

export default {
  name: 'Table',
  props: {
    rows:{
      type:Array,
      required: true
    }
  },
  data: function() {
    return{
      
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

  table th {
    text-transform: uppercase;
    text-align: center;
    background: rgb(254, 0, 0);
    color: #FFF;
    cursor: pointer;
    padding: 8px;
    min-width: 30px;
  }
  table th:hover {
          background: #ff8a8a;
        }
  table td {
    text-align: left;
    padding: 8px;
    border-right: 2px solid rgb(255, 0, 0);
  }
  table td:last-child {
    border-right: none;
  }
  table tbody tr:nth-child(2n) td {
    background: rgb(252, 190, 190);
  }

</style>
