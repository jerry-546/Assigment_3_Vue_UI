<template>
  <v-app>
    <v-toolbar flat color="light red" dark>
      <v-toolbar-title>Edit Customer</v-toolbar-title>
    </v-toolbar>
    <v-form v-model="valid" ref="form">
      <v-container fluid grid-list-xl>
        <v-layout wrap align-center>
          <v-flex xs12 md4>
            <v-text-field
              v-model="customer.first_name"
              :rules="nameRules"
              :counter="10"
              label="First name"
              required
            />
          </v-flex>

          <v-flex xs12 md4>
            <v-text-field
              v-model="customer.last_name"
              :rules="nameRules"
              :counter="10"
              label="Last name"
              required
            />
          </v-flex>

          <v-flex xs12 md4>
            <v-text-field v-model="customer.email" :rules="emailRules" label="E-mail" required />
          </v-flex>
          <v-flex xs12 md4>
            <v-text-field v-model="customer.address" label="Address" required />
          </v-flex>
          <v-flex xs12 md4>
            <v-text-field v-model="customer.city" label="City" required />
          </v-flex>
          <v-flex xs12 md4>
            <v-select
              v-model="customer.state"
              :items="allStates"
              item-text="text"
              item-value="value"
              :rules="[v => !!v || 'State is required']"
              label="State"
              required
            ></v-select>
          </v-flex>
          <v-flex xs12 md4>
            <v-text-field v-model="customer.zip" label="Zip" :rules="zipRules" />
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
  name: "EditForm",
  data() {
    return {
      valid: false,
      customer: this.$route.params.row,
      changed: false,
      allStates: states,
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
  mounted() {
    this.$modal.show("hello-world");
  },

  methods: {
    show() {
      this.$modal.show("hello-world");
    },

    hide() {
      this.$router.push({ name: "Table" });
    },

    onSubmit() {
      let updated_customer = this.customer;
      if (this.changed) {
        if (updated_customer.email.includes("@")) {
          axios
            .put(base_url + "/crud", {
              updated_customer
            })
            .then(res => {
              alert("Customer: " + res.data.first_name + " has been edited");
            })
            .catch(err => {
              alert(err);
            });
        } else {
          alert("Not a proper email");
        }
        this.$router.push({ name: "Table" });
      } else {
        alert("No changes have been made");
      }
      this.$router.push({ name: "Table" });
    }
  },

  watch: {
    customer: {
      handler: function() {
        if (!this.changed) {
          this.changed = true;
        }
      },
      deep: true
    }
  }
};
</script>


<style>
#modalDiv {
  width: 100%;
  height: 280px;
  top: 100%;
}
</style>
