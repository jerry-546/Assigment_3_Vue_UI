<template>
    <div>
    <select v-model="email" @change="supdate_email_info($event)">
      <option data-item-type ="choice" v-for="row in rows" v-bind:key = "row.id" v-bind:value="row.id" > {{row.email}} </option>
    </select>
    <button v-on:click="send_email">SEND EMAIL</button>
            <div>
                  {{email}}
                  {{emailID}}
            </div>

    </div>
</template>
<script>
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
      emailID: ''
    }
  },
     methods: {
     update_email_info: function(event){
      var index = event.target.options.selectedIndex;
      var idCho = event.emailID = event.target.options[index].value;
      var emailCho = event.target.options[index].text;
      this.email = emailCho
      this.emailID = idCho
       //alert("sent email to ")
     },
     send_email: function(){

     }
   }
    
}
</script>
<style>

</style>
