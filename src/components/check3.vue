<template>
  <v-dialog v-model="dialog" max-width="400px" class="schedule-dialog">
    <v-card class="schedule-dialog__card">
      <div class="schedule-dialog__header">
        <span class="schedule-dialog__title">貸出スケジュール登録</span>
        <v-btn icon class="schedule-dialog__close" @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <v-divider></v-divider>

      <div class="schedule-dialog__content">
        <div class="schedule-dialog__label">貸出可能時間</div>

        <div class="schedule-dialog__time-row">
          <div class="schedule-dialog__date">3月xx日</div>

          <div class="schedule-dialog__time-inputs">
            <v-text-field
              v-model="startTime"
              class="schedule-dialog__time-input"
              variant="outlined"
              density="compact"
              hide-details
            ></v-text-field>

            <span class="schedule-dialog__time-separator">-</span>

            <v-text-field
              v-model="endTime"
              class="schedule-dialog__time-input"
              variant="outlined"
              density="compact"
              hide-details
            ></v-text-field>
          </div>
        </div>
      </div>

      <div class="schedule-dialog__footer">
        <v-btn
          color="#0066b3"
          class="schedule-dialog__submit-btn"
          block
          rounded="lg"
          @click="submitSchedule"
        >
          登録
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(true);
const startTime = ref("00:00");
const endTime = ref("00:00");

const closeDialog = () => {
  dialog.value = false;
};

const submitSchedule = () => {
  // Handle schedule submission logic here
  closeDialog();
};
</script>

<style scoped>
.schedule-dialog__card {
  border-radius: 16px;
  padding: 0;
}

.schedule-dialog__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.schedule-dialog__title {
  font-size: 16px;
  font-weight: 500;
}

.schedule-dialog__content {
  padding: 20px;
}

.schedule-dialog__label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
}

.schedule-dialog__time-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.schedule-dialog__date {
  min-width: 80px;
  margin-right: 10px;
}

.schedule-dialog__time-inputs {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.schedule-dialog__time-input {
  width: 120px;
}

.schedule-dialog__time-separator {
  margin: 0 10px;
}

.schedule-dialog__footer {
  padding: 0 20px 20px 20px;
}

.schedule-dialog__submit-btn {
  color: white;
  height: 48px;
  font-weight: 500;
}
</style>
