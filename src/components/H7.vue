<template>
  <v-container>
    <v-btn @click="isShowA = !isShowA">Toggle Component</v-btn>

    <div class="transition-wrapper">
      <v-slide-x-transition mode="out-in">
        <div v-if="isShowA" key="a" class="component blue">
          <h2>Component A</h2>
        </div>
        <div v-else key="b" class="component green">
          <h2>Component B</h2>
        </div>
      </v-slide-x-transition>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const isShowA = ref(true);
</script>

<style scoped>
.transition-wrapper {
  position: relative;
  width: 100%;
  height: 200px; /* Đảm bảo vùng hiển thị có kích thước cố định */
  overflow: hidden;
}

.component {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  border-radius: 8px;
}

.blue {
  background-color: #42a5f5;
}

.green {
  background-color: #66bb6a;
}
</style>
