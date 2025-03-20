<template>
  <div class="calendar-grid">
    <calendar-weekdays />
    <div class="calendar-grid__days days__7">
      <template v-for="week in chunkArray()">
        <calendar-day v-for="day in week" :key="day.day" :day="day" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import CalendarWeekdays from "./CalendarWeekdays.vue";
import CalendarDay from "./CalendarDay.vue";

const props = defineProps({
  daysList: {
    type: Array,
    required: true,
  },
});

function chunkArray() {
  const { daysList } = props;
  const size = 7;
  return Array.from({ length: Math.ceil(daysList.length / size) }, (v, i) =>
    daysList.slice(i * size, i * size + size)
  );
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
