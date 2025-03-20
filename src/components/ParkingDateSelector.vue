<!-- src/components/ParkingDateSelector.vue -->
<template>
  <div class="date-selector">
    <button
      class="date-selector__nav-button"
      @click="$emit('navigate', 'prev')"
    >
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
          d="M15 18l-6-6 6-6"
        />
      </svg>
    </button>
    <div class="date-selector__current-date">
      {{ formattedDate }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
});

defineEmits(["navigate"]);

const formattedDate = computed(() => {
  const year = props.date.getFullYear();
  const month = props.date.getMonth() + 1;
  const day = props.date.getDate();
  return `${year}年${month}月${day}日`;
});
</script>

<style scoped>
.date-selector {
  display: flex;
  align-items: center;
  padding: 15px;
  font-size: 18px;
  font-weight: 500;
}

.date-selector__nav-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 5px;
  margin-right: 10px;
}

.date-selector__current-date {
  font-size: 16px;
}
</style>
