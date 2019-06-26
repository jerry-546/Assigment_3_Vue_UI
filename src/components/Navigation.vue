<template>
     <nav>
        <ul>
            <li><a >Home</a></li>
            <li><a >All Customers</a></li>
            <li><a >Texas & The Rest </a></li>
         </ul>
     </nav>

</template>
<script>
export default {
    name: 'navigation'
}
</script>

       
<style scoped>
body {
    padding: -5% -5%;
    background: #ffffff;
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        width: 5%;
        background-color: #e44444;
      }
      
      li a {
        display: block;
        color: #000;
        padding: 5% 10%;
        text-decoration: none;
      }
      
      /* Change the link color on hover */
      li a:hover {
        background-color: rgb(255, 255, 255);
        color: rgb(255, 55, 55);
        
      }
      ul {
        list-style-type: none;
        margin: -10px;
        padding: -5%;
        width: 15%;
        background-color: #ff4646;
        height: 100%; /* Full height */
        position: fixed; /* Make it stick, even on scroll */
        overflow: auto; /* Enable scrolling if the sidenav has too much content */
      }

</style>

