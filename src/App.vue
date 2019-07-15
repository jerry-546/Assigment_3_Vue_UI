<template>
  <div id="app">

    <router-link class = "navigation_button" to="/table" tag="button">Table</router-link>
    <router-link class = "navigation_button" to="/send" tag="button">Send Email</router-link>
    <router-link class = "navigation_button" to="/add" tag="button">Add Customer</router-link>
     <router-link class = "navigation_button" to="/test" tag="button">Test</router-link>
    <!-- <router-link class = "navigation_button" to="/table/edit" tag="button">Edit</router-link>
    <router-link class = "navigation_button" to="/table/remove" tag="button">Remove</router-link> -->

    <router-view :key="$route.fullPath"></router-view>





  </div>

</template>

<script>

export default {
    name: 'app',
}
</script>

<style>
.navigation_button {
 background-color: rgb(255, 0, 0);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.navigation_button:hover {
          background: #ff8a8a;
        }
</style>
