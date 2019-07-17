<template>
<div id = "modalDiv" v-on:click="show">
  <modal name="hello-world">
            <form ref = "form" class="custForm" @submit.prevent = "onSubmit()">
            <b-form-input
            id="first_name_input"
            v-model="first_name"
            >

            </b-form-input>
            <p>
                <label for="first_name"> First Name </label>
                <input required id ="first_name" v-model="first_name" placeholder="First Name">

                <label for="last_name"> Last Name </label>
                <input required id ="last_name" v-model="last_name" placeholder="last_name">
            </p>
                    <p>
                <label for="email"> Email </label>
                <input required id ="email" v-model="email" placeholder="email">

                <label for="address"> Address </label>
                <input id ="address" v-model="address" placeholder="address">
            </p>
                    <p>
                <label for="city"> City </label>
                <input id ="city" v-model="city" placeholder="city">

                <label for="state"> State  </label>
                <input id ="state" v-model="state" placeholder="state">
            </p>
                    <p>
                <label for="zip"> Zip </label>
                <input id ="zip" v-model="zip" placeholder="zip">
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
    data: function(){
        return{
            first_name: null,
            last_name: null,
            email: null,
            address: null,
            city: null,
            state: null,
            zip: null,
            showModal: this.$route.params
        }

    },
      watch: {
        '$route.meta' ({showModal}){
            this.showModal = showModal
        }
    },
    mounted(){
        this.$modal.show('hello-world');
    },

    methods: {
    show () {
        this.$modal.show('hello-world');
    },
    hide () {
      this.$router.push('table')
    },
        onSubmit() {
            let new_customer ={
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                address: this.address,
                city: this.city,
                state: this.state,
                zip: this.zip
            }
            if(new_customer.email.includes('@')){

                axios.post("http://127.0.0.1:5555/crud",{

                    new_customer
                })
                .then(res => {
                alert( "Customer: " + res.data + " was added")
                }).catch(err => {
                    alert(err)
                })
            } else {
                alert("Not a proper email")
            }
            this.$router.push('table')
        }
    }

}
</script>
<style>
#modalDiv{
    width:100%;
    height:280px;
    top:100%;
}

</style>
