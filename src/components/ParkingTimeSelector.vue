<!-- src/components/ParkingTimeSelector.vue -->
<template>
  <div class="time-selector">
    <div class="time-selector__label">予約時間</div>
    <div class="time-selector__slots">
      <TimeSlot
        v-for="slot in availableTimeSlots"
        :key="slot.id"
        :timeSlot="slot"
        :isSelected="selectedTimeSlot === slot.id"
        @click="$emit('select-time-slot', slot.id)"
      />
    </div>
  </div>
</template>

<script setup>
import TimeSlot from "./TimeSlot.vue";

defineProps({
  availableTimeSlots: {
    type: Array,
    required: true,
  },
  selectedTimeSlot: {
    type: Number,
    default: null,
  },
});

defineEmits(["select-time-slot"]);
</script>

<style scoped>
.time-selector {
  margin-top: 20px;
}

.time-selector__label {
  font-size: 14px;
  color: #666;
  margin-left: 15px;
  margin-bottom: 5px;
}

.time-selector__slots {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 15px;
}
</style>
