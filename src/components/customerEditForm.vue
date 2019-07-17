<template>
    <div id = "modalDiv" v-on:click="show">
        <modal name="hello-world">
          <form id = "customerEditForm" ref = "form" class="custForm" @submit.prevent = "onSubmit()">
            <p>
                <label for="customer.first_name"> First Name </label>
                <input required id ="first_name" v-model="customer.first_name" placeholder="First Name">

                <label for="customer.last_name"> Last Name </label>
                <input required id ="last_name" v-model="customer.last_name" placeholder="last_name">
            </p>
                    <p>
                <label for="customer.email"> Email </label>
                <input required id ="email" v-model="customer.email" placeholder="email">

                <label for="customer.address"> Address </label>
                <input id ="address" v-model="customer.address" placeholder="address">
            </p>
                    <p>
                <label for="customer.city"> City </label>
                <input id ="city" v-model="customer.city" placeholder="city">

                <label for="customer.state"> State  </label>
                <input id ="state" v-model="customer.state" placeholder="state">
            </p>
                    <p>
                <label for="customer.zip"> Zip </label>
                <input id ="zip" v-model="customer.zip" placeholder="zip">
            </p>
            <p>
                <input type="submit" value="submit">
            </p>
        </form>
        <button v-on:click="hide()">Cancel</button>
        </modal>
    </div>

</template>



<script>
import axios from 'axios'
export default {
    name: "EditForm",

    data(){
        return {
            customer: this.$route.params.row,
            changed: false
        }
    },
    mounted(){
        this.$modal.show('hello-world');
    },
    methods:{
    show () {
        this.$modal.show('hello-world');
    },
    hide () {
      this.$router.push({name:"Table"})
    },
        onSubmit() {
            let updated_customer = this.customer
            if(this.changed){
                if(updated_customer.email.includes('@')){
                    axios.put("http://127.0.0.1:5555/crud",{
                        updated_customer
                    })
                    .then(res => {
                    alert( "Customer: " + res.data.first_name + " has been edited")
                    }).catch(err => {
                        alert(err)
                    })
                } else {
                    alert("Not a proper email")
                }
                this.$router.push({name:"Table"})
            } else{
                alert( "No changes have been made")
            }
            this.$router.push({name:"Table"})
        }
    },
    watch: {
        customer: {
            handler: function(){
                if(!this.changed){
                this.changed = true
                }
            },
            deep: true

        }

    },


}
</script>
<style>
    #modalDiv{
        width:100%;
        height:280px;
        top:100%;
    }
</style>
