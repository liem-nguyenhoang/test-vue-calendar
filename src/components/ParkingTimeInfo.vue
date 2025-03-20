<!-- src/components/ParkingTimeInfo.vue -->
<template>
  <div class="time-info">
    <div class="time-info__label">貸出予定時間</div>
    <div class="time-info__time-range">
      {{ scheduledTime.start }} - {{ scheduledTime.end }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  scheduledTime: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.start !== undefined && value.end !== undefined;
    },
  },
});
</script>

<style scoped>
.time-info {
  margin-bottom: 10px;
}

.time-info__label {
  font-size: 14px;
  color: #666;
  margin-left: 15px;
  margin-bottom: 5px;
}

.time-info__time-range {
  background-color: #e8f4f9;
  color: #333;
  font-size: 16px;
  text-align: center;
  padding: 12px;
  margin: 0 15px;
  border-radius: 8px;
}
</style>
