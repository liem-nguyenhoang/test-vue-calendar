<template>
  <div class="calendar">
    <calendar-header
      :current-date="state.today"
      @previous-month="previousMonth"
      @next-month="nextMonth"
    />
    <calendar-grid :days-list="state.daysList" />
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";
import { useDate } from "vuetify";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarGrid from "./CalendarGrid.vue";
import data_mock from "./data_mock.js";
import moment from "moment";

const adapter = useDate();

const state = reactive({
  today: adapter.date(),
  daysList: [],
});

watch(
  () => state.today,
  (newVal) => {
    const weeksInMonth = adapter.getWeekArray(newVal);
    const days = weeksInMonth.flat();
    const parkingData = data_mock;
    const result = processParkingDataWithArray(parkingData, days);
    state.daysList = result;
  }
);

// Function to create maps from the provided date array
function createDateMapsFromArray(dateArray) {
  const dateMap = new Map();

  for (const date of dateArray) {
    const yyyymmdd = moment(date).format("YYYYMMDD");
    dateMap.set(yyyymmdd, []);
  }

  return dateMap;
}

// Main processing function
function processParkingDataWithArray(data, dateArray) {
  // Create date maps from the provided array
  const dateMap = createDateMapsFromArray(dateArray);
  // Single pass through the data to bucket records
  for (const record of data.lend_list) {
    const lendDate = record.lend_date;
    if (dateMap.has(lendDate)) {
      dateMap.get(lendDate).push(record);
    }
  }
  // Convert Map to required array format using original order
  const result = dateArray.map((date, index) => {
    const yyyymmdd = moment(date).format("YYYYMMDD");
    const records = dateMap.get(yyyymmdd);
    const isToday = moment(date).isSame(moment(), "day");
    const isDisabled = moment(date).isBefore(moment(), "day");
    const isActive = rnd(1, 4) === 2;
    const isNormal = !isActive && rnd(1, 4) === 2;
    const isCancel = !isActive && rnd(1, 4) === 2;

    return {
      day: date,
      isDisabled,
      isToday,
      isActive,
      isNormal,
      isCancel,
      isWeekStart: index % 7 === 0,
      isWeekEnd: index % 7 === 6,
      events: records.length > 0 ? records : [],
    };
  });
  return result;
}

onMounted(() => {
  const weeksInMonth = adapter.getWeekArray(state.today);
  const days = weeksInMonth.flat();
  const parkingData = data_mock;
  const result = processParkingDataWithArray(parkingData, days);
  state.daysList = result;
});

function previousMonth(date) {
  const currentMonth = adapter.getMonth(date);
  state.today = adapter.setMonth(state.today, currentMonth - 1);
}

function nextMonth(date) {
  const currentMonth = adapter.getMonth(date);
  state.today = adapter.setMonth(state.today, currentMonth + 1);
}

function rnd(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a;
}
</script>

<style lang="scss">
.calendar {
  padding: 24px;
  max-width: 960px;
  width: 100%;
  border-radius: 20px;
  border: none;
  background-color: #ffff;

  &__footer {
    margin: 10px 0;
  }
}

@media (max-width: 320px) {
  .calendar {
    padding: 12px;
  }
}
</style>
