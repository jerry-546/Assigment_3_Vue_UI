<template>
<v-app>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Customer</span>
        </v-card-title>

  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-container fluid grid-list-xl>
      <v-layout wrap align-center>
        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="first_name"
            :rules="nameRules"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="last_name"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-flex>
                <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="address"
            label="Address"
            required
          ></v-text-field>
        </v-flex>
                <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="city"
            label="City"
            required
          ></v-text-field>
        </v-flex>

    <v-select
      v-model="state"
      :items="allStates"
      item-text= "text"
      item-value= "value"
      :rules="[v => !!v || 'State is required']"
      label= "State"
      required
    ></v-select>

                <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="zip"
            label="Zip"
            :rules="zipRules"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn color="blue darken-1" flat @click="onSubmit">Submit</v-btn>
    <v-btn color="blue darken-1" flat @click="hide"> Cancel </v-btn>
  </v-form>


      </v-card>
    </v-dialog>
  </v-layout>
</v-app>
</template>
<script>
import axios from 'axios'
import states from '../../src/assets/methods/state.js'

  export default {
    data: () => ({
            dialog: false,
            valid: false,
            first_name: '',
            last_name: '',
            email: null,
            address: null,
            city: null,
            state: null,
            zip: null,
            allStates: states,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      zipRules: [
        v => !!v || 'Zip is required',
        v => /^[0-9]{5}(?:-[0-9]{4})?$/.test(v) || 'Zip must be valid'
      ],
    }),
created(){
    },
    mounted(){

    },

    methods: {
    show () {

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

                axios.post("http://127.0.0.1:5555/crud",{

                    new_customer
                })
                .then(res => {
                alert( "Customer: " + res.data + " was added")
                }).catch(err => {
                    alert(err)
                })
            this.$router.push('table')
        }
    }
  }
</script>