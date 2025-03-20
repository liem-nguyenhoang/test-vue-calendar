<!-- src/App.vue -->
<template>
  <div class="parking-app">
    <div v-if="loading" class="parking-app__loader">
      <div class="parking-app__spinner"></div>
      <div>Loading...</div>
    </div>
    <div v-else-if="error" class="parking-app__error">
      {{ error }}
      <button class="parking-app__retry-button" @click="fetchParkingData">
        Retry
      </button>
    </div>
    <template v-else>
      <ParkingHeader :location="parkingLocation" />
      <ParkingDateSelector :date="selectedDate" @navigate="navigateDate" />
      <ParkingTimeInfo :scheduledTime="scheduledTime" />
      <ParkingTimeSelector
        :availableTimeSlots="timeSlots"
        :selectedTimeSlot="selectedTimeSlot"
        @select-time-slot="selectTimeSlot"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ParkingHeader from "./components/ParkingHeader.vue";
import ParkingDateSelector from "./components/ParkingDateSelector.vue";
import ParkingTimeInfo from "./components/ParkingTimeInfo.vue";
import ParkingTimeSelector from "./components/ParkingTimeSelector.vue";
import ParkingService from "./services/ParkingService";

const parkingLocation = ref("");
const selectedDate = ref(new Date());
const scheduledTime = ref({ start: "", end: "" });
const selectedTimeSlot = ref(null);
const timeSlots = ref([]);
const loading = ref(true);
const error = ref(null);

// Fetch parking data from API
const fetchParkingData = async () => {
  loading.value = true;
  error.value = null;

  try {
    const formattedDate = formatDateForAPI(selectedDate.value);
    const data = await ParkingService.getParkingData(formattedDate);

    // Update state with API response
    parkingLocation.value = data.location;
    scheduledTime.value = data.scheduledTime;
    timeSlots.value = data.timeSlots;
    loading.value = false;
  } catch (err) {
    console.error("Failed to fetch parking data:", err);
    error.value = "Failed to load parking data. Please try again.";
    loading.value = false;
  }
};

// Format date for API request (YYYY-MM-DD)
const formatDateForAPI = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const navigateDate = async (direction) => {
  const newDate = new Date(selectedDate.value);
  if (direction === "prev") {
    newDate.setDate(newDate.getDate() - 1);
  } else if (direction === "next") {
    newDate.setDate(newDate.getDate() + 1);
  }
  selectedDate.value = newDate;

  // Fetch new data when date changes
  await fetchParkingData();
};

const selectTimeSlot = (timeSlotId) => {
  const slot = timeSlots.value.find((slot) => slot.id === timeSlotId);
  if (slot && slot.status === "available") {
    selectedTimeSlot.value = timeSlotId;
  }
};

// Initial data fetch on component mount
onMounted(async () => {
  // Set initial date to March 18, 2025 (from the UI image)
  selectedDate.value = new Date("2025-03-18");
  await fetchParkingData();
});
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
  position: relative;
  min-height: 300px;
}

.parking-app__loader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #666;
}

.parking-app__spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #eaeaea;
  border-radius: 50%;
  border-top-color: #0078d4;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

.parking-app__error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #e74c3c;
  text-align: center;
  padding: 0 20px;
}

.parking-app__retry-button {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
