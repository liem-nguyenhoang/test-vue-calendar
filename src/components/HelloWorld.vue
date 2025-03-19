<template>
  <div class="app">
    <h1>Vue 3 Calendar Component</h1>
    <Calendar />
  </div>
</template>

<script setup>
import Calendar from './Calendar.vue';
</script>

<style lang="scss">
.app {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>