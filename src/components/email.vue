<template>
    <div>
        <select class = "select-css" v-model="email" @change="update_email_info($event)">
          <option  v-for="row in rows" v-bind:key = "row.id" v-bind:value="row.email" :id="row.id"  > {{row.email}} </option>
        </select>
        <button v-on:click="send_email">SEND EMAIL</button>
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
    }
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
        id: this.emailID,
        email: this.email
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
