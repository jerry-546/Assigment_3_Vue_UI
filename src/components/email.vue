<template>
    <div>
        <div>

</div>
    <select>
      <option v-for="row in rows" v-bind:key = "row.id" v-bind:title="row.email" :value="row.id" > {{row.email}} </option>
    </select>

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
  }
    
}
</script>
<style>

</style>
