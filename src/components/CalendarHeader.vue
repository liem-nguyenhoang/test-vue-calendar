<template>
  <div class="calendar-header">
    <div class="calendar-header__date-time">
      <v-btn
        icon
        flat
        base-color="black"
        width="24"
        height="24"
        @click="$emit('previous-month', currentDate)"
        class="nav-btn"
      >
        <v-icon size="small">mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        icon
        flat
        base-color="black"
        width="24"
        height="24"
        @click="$emit('next-month', currentDate)"
        class="nav-btn"
      >
        <v-icon size="small">mdi-chevron-right</v-icon>
      </v-btn>
      <p class="date-text">
        {{ formatJPDate(currentDate) }}
      </p>
    </div>
    <!-- Location -->
    <div class="calendar-header__location">
      <select class="option">
        <option selected>東京ドームシティ駐車場</option>
      </select>
    </div>

    <!-- Add scheduler -->
    <button class="calendar-header__add-schedule">
      <span class="icon">+</span>
      <span class="text">定型スケジュール</span>
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useDate } from "vuetify";

const adapter = useDate();

defineProps({
  currentDate: {
    type: Object,
    required: true,
  },
});

defineEmits(["previous-month", "next-month"]);

function formatJPDate(date) {
  const year = adapter.getYear(date);
  const month = adapter.getMonth(date) + 1; // Months are zero-based
  return `${year}年${month}月`;
}
</script>

<style lang="scss">
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__date-time {
    display: flex;
    gap: 8px;

    & .date-text {
      margin-left: 8px;
    }
  }

  &__location {
    flex-grow: 1;
    max-width: 440px;
    & .option {
      width: 100%;
      padding: 8px 12px;
      border-radius: 16px;
      border: 1px solid #e0e0e0;
      background-color: #yellow;
      font-size: 14px;
      padding-right: 32px;
    }
  }

  &__add-schedule {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: #f5f5f5;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 16px;

    & .icon {
      font-weight: bold;
    }
  }
}
</style>
