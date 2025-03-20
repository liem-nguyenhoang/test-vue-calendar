<template>
  <v-calendar-month-day
    :day="day"
    :title="getTitle()"
    :events="day.events"
    class="calendar-day"
    :class="{
      'calendar-day--sunday': day.isWeekStart,
      'calendar-day--saturday': day.isWeekEnd,
      'calendar-day--disabled': day.isDisabled,
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
      <div class="calendar-day__content">
        <template v-if="day.events.length > 0">
          <calendar-event
            v-for="(event, index) in day.events"
            :key="`all-day-${index}`"
            :event="event"
            :is-disabled="day.isDisabled"
            :is-active="day.isActive"
            :is-normal="day.isNormal"
            :is-cancel="day.isCancel"
          />
        </template>
      </div>
    </template>
  </v-calendar-month-day>
</template>

<script setup>
import CalendarEvent from "./CalendarEvent.vue";
import moment from "moment";

const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
});

function getTitle() {
  const { day } = props.day;
  return day ? moment(day).get("date") : "NaN";
}
</script>

<style lang="scss">
.calendar-day {
  position: relative;
  min-height: 120px;

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

    & p {
      width: 24px;
      height: 24px;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 700;
    }

    &--disabled {
      p {
        background-color: #fbfbfb;
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
  }
  &:nth-child(1) {
    border-top-left-radius: 15px;
  }
  &:nth-child(1n) {
    border: thin solid #f4f4f4;
  }
  &:nth-child(7) {
    border-top-right-radius: 15px;
  }
  &:nth-last-child(1) {
    border-bottom-right-radius: 15px;
  }
  &:nth-last-child(7) {
    border-bottom-left-radius: 15px;
  }

  &--disabled {
    background-color: #fbfbfb;
  }
}

@media (max-width: 320px) {
  .calendar-day {
    min-height: 80px;

    &__title {
      p {
        font-size: 10px;
      }
    }
  }
}
</style>
