<template>
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

</template>

<script>
  export default {
    name: 'TableTemplate',
    data: () => ({
      users: [
        {
          id: 1,
          name: 'Shawna Dubbin',
          email: 'sdubbin0@geocities.com',
          gender: 'Male',
          title: 'Assistant Media Planner'
        },
        {
          id: 2,
          name: 'Odette Demageard',
          email: 'odemageard1@spotify.com',
          gender: 'Female',
          title: 'Account Coordinator'
        },
        {
          id: 3,
          name: 'Lonnie Izkovitz',
          email: 'lizkovitz3@youtu.be',
          gender: 'Female',
          title: 'Operator'
        },
        {
          id: 4,
          name: 'Thatcher Stave',
          email: 'tstave4@reference.com',
          gender: 'Male',
          title: 'Software Test Engineer III'
        },
        {
          id: 5,
          name: 'Clarinda Marieton',
          email: 'cmarietonh@theatlantic.com',
          gender: 'Female',
          title: 'Paralegal'
        }
      ]
    })
  }
</script>