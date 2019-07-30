<template>
  <div id="app">
    <v-toolbar color="red">
      <v-toolbar-title>Customers</v-toolbar-title>
      <v-toolbar-items>
        <router-link class="navigation_button" to="/table" tag="v-btn">Table</router-link>
        <router-link class="navigation_button" to="/send" tag="v-btn">Send Email</router-link>
        <router-link class="navigation_button" to="/add" tag="v-btn">Add Customer</router-link>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon>mdi-export-variant</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </template>
    </v-toolbar>

    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style >
@import "../src/assets/css/main.css";
</style>
