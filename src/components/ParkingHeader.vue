<!-- src/components/ParkingHeader.vue -->
<template>
  <div class="parking-header">
    <div class="parking-header__content">
      <h1 class="parking-header__title">{{ location }}</h1>
      <button class="parking-header__dropdown-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 9l6 6 6-6"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  location: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.parking-header {
  padding: 15px;
  border-bottom: 1px solid #eaeaea;
}

.parking-header__content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.parking-header__title {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}

.parking-header__dropdown-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 5px;
}
</style>
