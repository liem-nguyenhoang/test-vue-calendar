<template>
  <div class="calendar-weekdays">
    <template v-for="weekday in [0, 1, 2, 3, 4, 5, 6]" :key="weekday">
      <div
        class="calendar-weekdays__day"
        :class="{
          'calendar-weekdays__day--sunday': weekday === 0,
          'calendar-weekdays__day--saturday': weekday === 6,
        }"
      >
        {{ ["日", "月", "火", "水", "木", "金", "土"][weekday] }}
      </div>
    </template>
  </div>
</template>

<script setup>
// No props or additional logic needed
</script>

<style lang="scss">
.calendar-weekdays {
  display: flex;

  &__day {
    flex: 1;
    margin: 8px;
    border: none;
    text-align: center;

    &--sunday {
      color: red;
    }

    &--saturday {
      color: blue;
    }
  }
}
</style>
