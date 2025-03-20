<!-- src/App.vue -->
<template>
  <div class="parking-app">
    <ParkingHeader :location="parkingLocation" />
    <ParkingDateSelector :date="selectedDate" @navigate="navigateDate" />
    <ParkingTimeInfo :scheduledTime="scheduledTime" />
    <ParkingTimeSelector
      :availableTimeSlots="timeSlots"
      :selectedTimeSlot="selectedTimeSlot"
      @select-time-slot="selectTimeSlot"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ParkingHeader from "./ParkingHeader.vue";
import ParkingDateSelector from "./ParkingDateSelector.vue";
import ParkingTimeInfo from "./ParkingTimeInfo.vue";
import ParkingTimeSelector from "./ParkingTimeSelector.vue";

const parkingLocation = ref("東京ドームシティ駐車場");
const selectedDate = ref(new Date("2025-03-18"));
const scheduledTime = ref({ start: "10:00", end: "16:00" });
const selectedTimeSlot = ref(null);

const timeSlots = ref([
  { id: 1, start: "10:00", end: "12:00", status: "available" },
  { id: 2, start: "12:00", end: "14:00", status: "available" },
  { id: 3, start: "14:00", end: "16:00", status: "unavailable" },
]);

const navigateDate = (direction) => {
  const newDate = new Date(selectedDate.value);
  if (direction === "prev") {
    newDate.setDate(newDate.getDate() - 1);
  } else if (direction === "next") {
    newDate.setDate(newDate.getDate() + 1);
  }
  selectedDate.value = newDate;
};

const selectTimeSlot = (timeSlotId) => {
  selectedTimeSlot.value = timeSlotId;
};
</script>

<style>
.parking-app {
  max-width: 480px;
  margin: 0 auto;
  font-family: sans-serif;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
}
</style>
