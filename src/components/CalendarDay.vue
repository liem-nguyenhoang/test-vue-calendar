<template>
  <v-calendar-month-day
    :day="day"
    :title="title"
    :events="events"
    :disabled="day.isDisabled"
    class="calendar-day"
    :class="{
      'calendar-day--weekend-start': day.isWeekStart,
      'calendar-day--weekend-end': day.isWeekEnd,
      'calendar-day--sunday': day.isWeekStart,
      'calendar-day--saturday': day.isWeekEnd,
    }"
  >
    <template #title="{ title }">
      <div
        class="calendar-day__title"
        :class="{
          'calendar-day__title--disabled': day.isDisabled,
          'calendar-day__title--today': day.isToday,
        }"
      >
        <p>{{ title }}</p>
      </div>
    </template>

    <template #content>
      <!-- Day events -->
      <div class="calendar-day__content">
        <template v-if="events.length > 0">
          <!-- All Day Events -->
          <calendar-event
            v-for="(event, index) in allDayEvents"
            :key="`all-day-${index}`"
            :event="event"
          />

          <!-- Regular Events -->
          <calendar-event
            v-for="(event, index) in regularEvents"
            :key="`regular-${index}`"
            :event="event"
          />
        </template>
      </div>
    </template>
  </v-calendar-month-day>
</template>

<script setup>
import { computed } from "vue";
import CalendarEvent from "./CalendarEvent.vue";

const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  events: {
    type: Array,
    default: () => [],
  },
});

const allDayEvents = computed(() => {
  return props.events.filter((e) => e.allDay);
});

const regularEvents = computed(() => {
  return props.events.filter((e) => !e.allDay);
});
</script>

<style lang="scss">
.calendar-day {
  position: relative;

  &--sunday p {
    color: red;
  }

  &--saturday p {
    color: blue;
  }

  &:nth-last-child(-n + 7) {
    border-bottom: none;
  }

  &__title {
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      width: 24px;
      height: 24px;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &--disabled {
      p {
        background-color: white;
        color: gray;
      }
    }

    &--today {
      p {
        background-color: black;
        color: white;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__events {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__event {
    width: 100%;

    &--all-day {
      // Specific styles for all-day events
    }
  }
  &:nth-child(7n) {
    border-right: none;
  }
}
</style>
