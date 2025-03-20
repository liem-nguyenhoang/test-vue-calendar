<!-- components/CalendarEvent.vue -->
<template>
  <div class="calendar-event">
    <div
      class="calendar-event__dot"
      :style="{ backgroundColor: event.color }"
    ></div>
    <div class="calendar-event__text">10:00 - 12:00</div>
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
});
</script>

<style lang="scss">
.calendar-event {
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  font-size: 12px;
  justify-content: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 5px;
    flex-shrink: 0;
  }

  &__text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
