<template>
<v-app>
  <v-card id = "emailFormCard">
    <v-toolbar
      flat
      color="light red"
      dark
    >

      <v-toolbar-title>Send Email</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon :disabled="!valid" @click="send_email()">send</v-icon>
    </v-toolbar>
    <v-form
      v-model="valid"
      :lazy-validation="lazy">
      <v-autocomplete
        v-model="email"
        :items="emails"
        chips
        label="To"
        full-width
        hide-details
        hide-no-data
        hide-selected
        multiple
        single-line
        required
      ></v-autocomplete>
      <v-divider></v-divider>
      <v-text-field
        label="Subject"
        v-model="subject"
        placeholder="Subject"
        single-line
        full-width
        hide-details
      ></v-text-field>
      <v-divider></v-divider>
      <v-textarea
        v-model="message"
        label="Message"
        counter
        maxlength="120"
        full-width
        single-line
      ></v-textarea>

      <v-divider></v-divider>
        <v-select
        id="select-server"
        v-model="smtp"
        :items="servers"
        :rules="[v => !!v || 'Server is required']"
        label= "Server"
                full-width
        hide-details
        hide-no-data
        hide-selected
        multiple
        single-line
        required
      ></v-select>
      <v-divider></v-divider>
    </v-form>
  </v-card>
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
        valid: true,
        lazy: false,
        email: '',
        emails: [],
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
          this.rows.forEach(element => {
            this.emails.push(element.email)
          });
          this.rows = res.data
        }).catch(err => {
          alert(err)
        })
    },
     methods: {

     send_email: function(){
      //Sends email and send alert to confirm email was sent
      console.log(this.email, this.subject, this.message, this.smtp)
      axios.post(base_url + "/send",{
        email: this.email[0],
        subject: this.subject,
        message: this.message,
        smtp: this.smtp[0]
      })
      .then(res => {
          alert(res.data)
       }).catch(err => {
        alert(err)
       })
     }

   }
}
</script>


<style>
@import "../assets/css/table.css";

</style>
