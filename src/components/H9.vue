<template>
  <v-dialog v-model="dialog" max-width="500px" class="reservation-cancel">
    <v-card class="reservation-cancel__card">
      <div class="reservation-cancel__header">
        <span class="reservation-cancel__title">予約のキャンセル依頼</span>
        <v-btn icon class="reservation-cancel__close-btn" @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <v-divider></v-divider>

      <div class="reservation-cancel__content">
        <p class="reservation-cancel__instructions">
          希望の時間帯にチェックを入れて「予約のキャンセルを依頼する」ボタンを押すすると、キャンセル依頼の通知が送信されます。
        </p>

        <div class="reservation-cancel__section">
          <div class="reservation-cancel__section-title">貸出可能時間</div>
          <div class="reservation-cancel__time-range">
            <div class="reservation-cancel__date">3月14日</div>
            <div class="reservation-cancel__time-input">
              <v-text-field
                dense
                outlined
                hide-details
                readonly
                class="reservation-cancel__time-field"
                value="10:00"
              ></v-text-field>
            </div>
            <div class="reservation-cancel__time-separator">-</div>
            <div class="reservation-cancel__time-input">
              <v-text-field
                dense
                outlined
                hide-details
                readonly
                class="reservation-cancel__time-field"
                value="12:00"
              ></v-text-field>
            </div>
          </div>
          <div class="reservation-cancel__warning">
            以下の予約があるため、変更できませんん。
          </div>
        </div>

        <div class="reservation-cancel__section">
          <div class="reservation-cancel__section-title">予約済み時間</div>
          <div class="reservation-cancel__time-checkbox">
            <v-checkbox
              v-model="selectedTime"
              label="10:00-12:00"
              color="primary"
              hide-details
              class="reservation-cancel__checkbox"
            ></v-checkbox>
          </div>
        </div>
      </div>

      <div class="reservation-cancel__footer">
        <v-btn
          class="reservation-cancel__submit-btn"
          color="error"
          rounded
          elevation="0"
          @click="submitCancellation"
        >
          予約のキャンセルを依頼する
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
      selectedTime: true,
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    submitCancellation() {
      // Handle cancellation request
      console.log("Cancellation requested for:", this.selectedTime);
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.reservation-cancel__card {
  border-radius: 16px;
  overflow: hidden;
  padding: 0;
}

.reservation-cancel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.reservation-cancel__title {
  font-size: 16px;
  font-weight: 500;
}

.reservation-cancel__content {
  padding: 16px 20px;
}

.reservation-cancel__instructions {
  margin-bottom: 24px;
  line-height: 1.5;
  font-size: 14px;
}

.reservation-cancel__section {
  margin-bottom: 24px;
}

.reservation-cancel__section-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
}

.reservation-cancel__time-range {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
}

.reservation-cancel__date {
  font-size: 14px;
  margin-right: 8px;
}

.reservation-cancel__time-field {
  width: 110px;
}

.reservation-cancel__time-separator {
  margin: 0 4px;
}

.reservation-cancel__warning {
  color: #ff0000;
  font-size: 13px;
  margin-top: 8px;
}

.reservation-cancel__footer {
  display: flex;
  justify-content: center;
  padding: 16px 20px 24px;
}

.reservation-cancel__submit-btn {
  background-color: #e71d36 !important;
  color: white;
  font-size: 14px;
  padding: 0 32px;
  height: 44px;
}

.reservation-cancel__checkbox {
  margin-top: 0;
}
</style>
