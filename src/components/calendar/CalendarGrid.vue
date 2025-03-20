<template>
  <div class="calendar-grid">
    <calendar-weekdays />
    <div class="calendar-grid__days days__7">
      <template v-for="week in chunkArray(daysList, 7)">
        <calendar-day
          v-for="day in week"
          :key="day.isoDate"
          :day="day"
          :title="getTitle(day)"
          :events="eventHandler(day)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useDate } from "vuetify";
import CalendarWeekdays from "./CalendarWeekdays.vue";
import CalendarDay from "./CalendarDay.vue";

const adapter = useDate();

defineProps({
  daysList: {
    type: Array,
    required: true,
  },
  eventHandler: {
    type: Function,
    required: true,
  },
});

function chunkArray(array, size = 1) {
  return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size)
  );
}

function getTitle(day) {
  return day ? adapter.format(day.date, "dayOfMonth") : "NaN";
}
</script>

<style lang="scss">
.calendar-grid {
  &__days {
    border: thin solid #f4f4f4;
    border-radius: 16px;
  }
}

.days__7 {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
</style>
