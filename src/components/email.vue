<template>
    <div>
        <select class = "select-css" v-model="email" @change="update_email_info($event)">
          <option  v-for="row in rows" v-bind:key = "row.id" v-bind:value="row.email" :id="row.id"  > {{row.email}} </option>
        </select>
    <div>
        <label>Subject</label>
        <v-text-field v-model="subject"></v-text-field>
        <label>Message</label>
        <v-text-field v-model="message"></v-text-field>
        <label>SMTP server</label>
        <v-text-field v-model="smtp"></v-text-field>
    </div>
        <v-btn v-on:click="send_email">SEND EMAIL</v-btn>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'Email',
    props: {
        rows:{
          type:Array,
          required: true
        }
      },
    data: function(){
      return {
        email: '',
        emailID: '',
        subject: '',
        message: '',
        smtp: '',
        rows: []
      }
    },
    mounted(){
      axios.get('http://127.0.0.1:5555/send')
        .then(res => {
          this.rows = res.data
          this.searched = this.rows
        }).catch(err => {
          alert(err)
        })
    },
     methods: {
    //Getting information to send email to chosen  email
     update_email_info: function(event){
      var index = event.target.options.selectedIndex;
      var idCho = event.emailID = event.target.options[index].id;
      var emailCho = event.target.options[index].text;
      this.email = emailCho
      this.emailID = idCho
     },
      //Sends email and send alert to confirm email was sent
     send_email: function(){
      axios.post("http://127.0.0.1:5555/send",{
        email: this.email,
        subject: this.subject,
        message: this.message,
        smtp: this.smtp

      })
      .then(res => {
        console.log(res.data)
          alert("Email was sent to "+ res.data)
       }).catch(err => {
        alert(err)
       })


     }
   }

}
</script>
<style>
select {
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
