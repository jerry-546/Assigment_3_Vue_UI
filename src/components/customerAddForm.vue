<template>
  <v-app>
    <v-form v-model="valid" ref="form" :lazy-validation="lazy">
      <v-container fluid grid-list-xl>
        <v-layout wrap align-center>
          <v-flex xs12 md4>
            <v-text-field
              v-model="first_name"
              :rules="nameRules"
              :counter="10"
              label="First name"
              required
            />
          </v-flex>

          <v-flex xs12 md4>
            <v-text-field
              v-model="last_name"
              :rules="nameRules"
              :counter="10"
              label="Last name"
              required
            />
          </v-flex>

          <v-flex xs12 md4>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required />
          </v-flex>
          <v-flex xs12 md4>
            <v-text-field v-model="address" label="Address" required />
          </v-flex>
          <v-flex xs12 md4>
            <v-text-field v-model="city" label="City" required />
          </v-flex>

          <v-select
            v-model="state"
            :items="allStates"
            item-text="text"
            item-value="value"
            :rules="[v => !!v || 'State is required']"
            label="State"
            required
          />

          <v-flex xs12 md4>
            <v-text-field v-model="zip" label="Zip" :rules="zipRules" />
          </v-flex>
        </v-layout>
      </v-container>
      <v-btn :disabled="!valid" @click="onSubmit">Submit</v-btn>
      <v-btn @click="hide">Cancel</v-btn>
    </v-form>
  </v-app>
</template>
<script>
import axios from "axios";
import states from "../../src/config/conf.js";
import { base_url } from "../config/confRoutes";

export default {
  data: function() {
    return {
      valid: false,
      first_name: "",
      last_name: "",
      email: null,
      address: null,
      city: null,
      state: null,
      zip: null,
      allStates: ["test"],
      showModal: this.$route.params,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      zipRules: [
        v => !!v || "Zip is required",
        v => /^[0-9]{5}(?:-[0-9]{4})?$/.test(v) || "Zip must be valid"
      ]
    };
  },
  created() {
    this.allStates = states;
  },
  mounted() {},

  methods: {
    show() {},
    hide() {
      this.$router.push("table");
    },
    onSubmit() {
      let new_customer = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zip
      };

      axios
        .post(base_url + "/crud", {
          new_customer
        })
        .then(res => {
          alert("Customer: " + res.data + " was added");
        })
        .catch(err => {
          alert(err);
        });
      this.$router.push("table");
    }
  }
};
</script>
<style>
</style>
