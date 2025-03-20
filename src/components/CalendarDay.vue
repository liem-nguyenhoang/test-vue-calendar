<!-- components/CalendarDay.vue -->
<template>
  <div
    class="calendar-day"
    :class="{
      'calendar-day--sunday': day.isWeekStart,
      'calendar-day--saturday': day.isWeekEnd,
      'calendar-day--disabled': day.isDisabled,
      'calendar-day--adjacent': day.isAdjacent,
    }"
    @click="$emit('click', day)"
  >
    <!-- Day number -->
    <div class="calendar-day__header">
      <div
        class="calendar-day__number"
        :class="{ 'calendar-day__number--today': day.isToday }"
      >
        {{ title }}
      </div>
    </div>

    <!-- Day events -->
    <div class="calendar-day__content">
      <template v-if="events.length > 0">
        <!-- All Day Events -->
        <calendar-event
          v-for="(event, index) in allDayEvents"
          :key="`all-day-${index}`"
          :event="event"
          @click.stop="$emit('event-click', event, day)"
        />

        <!-- Regular Events -->
        <calendar-event
          v-for="(event, index) in regularEvents"
          :key="`regular-${index}`"
          :event="event"
          @click.stop="$emit('event-click', event, day)"
        />
      </template>
    </div>
  </div>
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

const emit = defineEmits(["click", "event-click"]);

const allDayEvents = computed(() => {
  return props.events.filter((e) => e.allDay);
});

const regularEvents = computed(() => {
  return props.events.filter((e) => !e.allDay);
});
</script>

<style lang="scss">
.calendar-day {
  min-height: 80px;
  border: 1px solid #e0e0e0;
  padding: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }

  &__header {
    text-align: center;
    margin-bottom: 4px;
  }

  &__number {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 12px;

    &--today {
      background-color: black;
      color: white;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &--disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;

    .calendar-day__number {
      color: #9e9e9e;
    }
  }

  &--sunday {
    .calendar-day__number {
      color: red;
    }
  }

  &--saturday {
    .calendar-day__number {
      color: blue;
    }
  }

  &--adjacent {
    background-color: #f5f5f5;
  }
}
</style>
