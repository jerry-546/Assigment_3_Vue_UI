<template>
<v-app>
  <v-form>
  <v-container grid-list-x1>
    <v-layout wrap>
    <div>
      <h1 class="md-title">Send Email</h1>
        <select id = "email" class = "select-css" v-model="email" @change="update_email_info($event)">
          <option  v-for="row in rows" v-bind:key = "row.id" v-bind:value="row.email" :id="row.id"  > {{row.email}} </option>
        </select>
    <div>

        <label>Subject</label>
        <v-text-field placeholder="Subject..." v-model="subject" required></v-text-field>
        <label>Message</label>
        <v-text-field placeholder="Message..." v-model="message" required></v-text-field>
      <v-flex xs12 md14>
        <v-select
        id = "server"
        class = "select-css"
        v-model="smtp"
        :items="servers"
        :rules="[v => !!v || 'Server is required']"
        label= "Server"
        required
      ></v-select>
      </v-flex>
    </div>
        <v-btn v-on:click="send_email">SEND EMAIL</v-btn>
    </div>
    </v-layout>
  </v-container>
  </v-form>
</v-app>
</template>


<script>
import axios from 'axios';
import {base_url} from '../config/confRoutes'

export default {
    name: 'Email',
    props: {
      },
    data: function(){
      return {
        email: '',
        emailID: '',
        subject: '',
        message: '',
        smtp: '',
        rows: [],
        servers: ['exchange.heb.com']
      }
    },
    mounted(){
      //Get all the emails in database
      axios.get(base_url +'/send')
        .then(res => {
          this.rows = res.data
          this.searched = this.rows
        }).catch(err => {
          alert(err)
        })
    },
     methods: {

     update_email_info: function(event){
      //Getting information to send email to chosen  email
      var index = event.target.options.selectedIndex;
      var idCho = event.emailID = event.target.options[index].id;
      var emailCho = event.target.options[index].text;
      this.email = emailCho
      this.emailID = idCho
     },

     send_email: function(){
      //Sends email and send alert to confirm email was sent
      axios.post(base_url + "/send",{
        email: this.email,
        subject: this.subject,
        message: this.message,
        smtp: this.smtp
      })
      .then(res => {
          alert("Email was sent to "+ res.data)
       }).catch(err => {
        alert(err)
       })
     }

   }
}
</script>


<style>
#email {
  width: 50%;
  height: 30px;
  color: rgb(255, 104, 104);

  background: transparent;
  font-size: 16px;
  border: 1px solid #ccc;
  height: 34px;

  border: 1px solid #111;
  border-radius: 3px;
  overflow: hidden;
}
#server{
  width: 50%;
  height: 30px;
  color: rgb(255, 104, 104);

  background: transparent;
  font-size: 16px;
  border: 1px solid #ccc;
  height: 34px;

  border: 1px solid #111;
  border-radius: 3px;
  overflow: hidden;
}

</style>
