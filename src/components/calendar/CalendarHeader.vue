<template>
  <div class="calendar-header-responsive">
    <div class="calendar-header-responsive__location">
      <select class="option">
        <option selected>東京ドームシティ駐車場</option>
        <option>東京ドームシティ駐車場2</option>
        <option>東京ドームシティ駐車場3</option>
      </select>
      <v-icon size="small" color="#474747">mdi-chevron-down</v-icon>
    </div>
  </div>
  <div class="calendar-header">
    <div class="calendar-header__date-time">
      <v-btn
        icon
        flat
        base-color="#f4f4f4"
        width="24"
        height="24"
        @click="$emit('previous-month', currentDate)"
        class="nav-btn"
      >
        <v-icon size="small" color="#474747">mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        icon
        flat
        base-color="#f4f4f4"
        width="24"
        height="24"
        @click="$emit('next-month', currentDate)"
        class="nav-btn"
      >
        <v-icon size="small" color="#474747">mdi-chevron-right</v-icon>
      </v-btn>
      <p class="date-text">
        {{ formatJPDate(currentDate) }}
      </p>
    </div>
    <!-- Location -->
    <div class="calendar-header__location">
      <select class="option">
        <option selected>東京ドームシティ駐車場</option>
        <option>東京ドームシティ駐車場2</option>
        <option>東京ドームシティ駐車場3</option>
      </select>
      <v-icon class="location-icon">mdi-chevron-down</v-icon>
    </div>

    <!-- Add scheduler -->
    <button class="calendar-header__add-schedule">
      <v-icon class="add-schedule-icon">mdi-plus</v-icon>
      <span class="add-schedule-text">定型スケジュール</span>
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
.calendar-header-responsive {
  display: none;
  &__location {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: 16px;
    border: 1px solid #e0e0e0;
    font-size: 14px;
    margin-bottom: 16px;

    & .option {
      width: 100%;
      font-size: 12px;
    }
  }
}
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__date-time {
    display: flex;
    gap: 8px;

    & .date-text {
      font-size: 16px;
      margin-left: 8px;
      color: #1f1f1f;
      font-weight: 700;
    }
  }

  &__location {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 440px;
    min-width: 288px;
    padding: 8px 12px;
    border-radius: 16px;
    border: 1px solid #e0e0e0;
    font-size: 14px;

    & .option {
      width: 100%;
      font-size: 12px;
    }
  }

  &__add-schedule {
    display: flex;
    align-items: center;
    padding: 8px 20px;
    background-color: #f4f4f4;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 14px;
    gap: 4px;
    width: 160px;

    & .add-schedule {
      &-icon {
        color: #474747;
        font-weight: bold;
        font-size: 16px;
      }
      &-text {
        font-size: 12px;
        font-weight: 700;
      }
    }
  }
}

@media (max-width: 800px) {
  .calendar-header-responsive {
    display: flex;
  }
  .calendar-header {
    &__location {
      display: none;
    }
  }
}

@media (max-width: 320px) {
  .calendar-header-responsive {
    display: flex;
  }
  .calendar-header {
    &__date-time {
      & .date-text {
        font-size: 14px;
      }
    }

    &__location {
      display: none;
    }

    &__add-schedule {
      padding: 8px 10px;
      width: 128px;
      gap: 0;

      & .add-schedule-icon {
        font-size: 12px;
      }

      & span {
        font-size: 12px;
      }
    }
  }
}
</style>
