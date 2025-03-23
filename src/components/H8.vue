<template>
  <v-container>
    <v-btn @click="expand = !expand">Toggle</v-btn>

    <v-slide-x-transition>
      <div v-if="expand" class="mt-3 pa-3 border">Nội dung mở rộng...</div>
    </v-slide-x-transition>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const expand = ref(false);
</script>

<style>
.border {
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
