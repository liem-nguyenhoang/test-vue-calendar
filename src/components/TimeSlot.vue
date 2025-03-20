<!-- src/components/TimeSlot.vue -->
<template>
  <div
    class="time-slot"
    :class="{
      'time-slot--selected': isSelected,
      'time-slot--available': timeSlot.status === 'available',
      'time-slot--unavailable': timeSlot.status === 'unavailable',
    }"
  >
    <div class="time-slot__status-indicator"></div>
    <div class="time-slot__time">{{ timeSlot.start }} - {{ timeSlot.end }}</div>
  </div>
</template>

<script setup>
defineProps({
  timeSlot: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.time-slot {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.time-slot--available {
  background-color: white;
}

.time-slot--unavailable {
  opacity: 0.8;
  cursor: not-allowed;
}

.time-slot--selected {
  border-color: #0078d4;
}

.time-slot__status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}

.time-slot--available .time-slot__status-indicator {
  background-color: #0078d4;
}

.time-slot--unavailable .time-slot__status-indicator {
  background-color: #e74c3c;
}

.time-slot__time {
  font-size: 16px;
}
</style>
