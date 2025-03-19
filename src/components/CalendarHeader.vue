<template>
  <div class="calendar-header">
    <div
      v-for="(day, index) in weekdays"
      :key="index"
      class="calendar-header__day"
      :class="{
        'calendar-header__day--sunday': index === 0,
        'calendar-header__day--saturday': index === 6,
      }"
    >
      {{ day }}
    </div>
  </div>
</template>

<script setup>
// Japanese weekday labels
const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
</script>

<style lang="scss">
.calendar-header {
  display: flex;
  width: 100%;
  max-height: 30px;

  &__day {
    flex: 1;
    padding: 5px;
    text-align: center;
    font-weight: bold;
    line-height: 20px;

    &--sunday {
      color: #e53935;
    }

    &--saturday {
      color: #1976d2;
    }
  }

  @media screen and (max-width: 480px) {
    &__day {
      font-size: 12px;
      padding: 5px;
    }
  }
}
</style>
