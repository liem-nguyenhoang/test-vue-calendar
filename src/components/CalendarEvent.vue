<!-- components/CalendarEvent.vue -->
<template>
  <div class="calendar-event" @click="$emit('click', event)">
    <div
      class="calendar-event__dot"
      :style="{ backgroundColor: event.color }"
    ></div>
    <div class="calendar-event__text">
      {{ displayText }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDate } from "vuetify";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["click"]);

const adapter = useDate();

const displayText = computed(() => {
  if (props.event.allDay) {
    return props.event.title;
  }

  const startTime = adapter.format(props.event.start, "shortTime");
  const endTime = adapter.format(props.event.end, "shortTime");
  return `${startTime} - ${endTime} ${props.event.title}`;
});
</script>

<style lang="scss">
.calendar-event {
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
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
