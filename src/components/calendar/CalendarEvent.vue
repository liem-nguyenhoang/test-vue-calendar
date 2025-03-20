<template>
  <div
    class="calendar-event"
    :class="{
      'calendar-event--disabled': isDisabled,
      'calendar-event--active': isActive,
    }"
  >
    <div
      class="calendar-event__dot"
      :class="{
        'calendar-event__dot--disabled': isDisabled,
        'calendar-event__dot--normal': isNormal,
        'calendar-event__dot--cancel': isCancel,
      }"
    />
    <div class="calendar-event__text">
      <div class="calendar-event__text--start">
        {{ convertTime(event.lend_start_time) }}
        <div>-</div>
      </div>
      <div class="calendar-event__text--end">
        {{ convertTime(event.lend_end_time) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  event: {
    type: Object,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isNormal: {
    type: Boolean,
    default: false,
  },
  isCancel: {
    type: Boolean,
    default: false,
  },
});

function convertTime(timeString: string) {
  const hours = timeString.slice(0, 2);
  const minutes = timeString.slice(2, 4);
  return `${hours}:${minutes}`;
}
</script>

<style lang="scss">
.calendar-event {
  display: flex;
  align-items: center;
  border-radius: 4px;
  font-size: 12px;
  justify-content: center;
  margin: 4px 8px;
  padding: 2px 4px;

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 4px;

    &--disabled {
      background-color: #9e9e9e;
    }
    &--normal {
      background-color: #2d89cd;
    }
    &--cancel {
      background-color: #ec1303;
    }
  }

  &__text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    font-size: 12px;
    display: flex;
    align-items: center;

    &--start {
      display: flex;
      gap: 3px;
    }

    &--end:before {
      content: " ";
      display: inline-block;
      width: 2px;
      height: 2px;
    }
  }

  &--active {
    background-color: #d6e8f3;
    & .calendar-event__dot {
      display: none;
    }
  }

  &--disabled {
    background-color: #e0e0e0;
    color: #9e9e9e;
  }
}

@media (max-width: 320px) {
  .calendar-event {
    margin: 0 2px;
    padding: 2px;
    &__dot {
      width: 4px;
      height: 4px;
      margin: 2px;
    }

    &--active:not(.calendar-event--disabled) {
      .calendar-event__text {
        &--end:before {
          display: none;
        }
      }
      & .calendar-event__text {
        display: flex;
        flex-direction: column;
      }
    }

    &__text {
      font-size: 8px;
      &--start {
        gap: 0;
      }
      // &--hyphen:before {
      //   display: none;
      // }
      // &--hyphen:after {
      //   display: none;
      // }
      // &--end {
      //   display: none;
      // }
    }
  }
}
</style>
