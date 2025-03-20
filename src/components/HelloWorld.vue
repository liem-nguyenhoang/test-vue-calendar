<template>
  <div class="app">
    <h1>Vue 3 Calendar Component</h1>
    <Calendar />
  </div>
</template>

<script setup>
import Calendar from "./Calendar.vue";
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: gray;

  h1 {
    margin-bottom: 24px;
  }
}
</style>
