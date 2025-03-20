<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card class="schedule-registration">
      <v-card-title class="schedule-registration__title d-flex align-center">
        <span>定型スケジュール登録</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="schedule-registration__content pt-4">
        <div class="schedule-registration__header mb-4">曜日指定</div>

        <div
          v-for="(day, index) in days"
          :key="index"
          class="schedule-registration__day-row d-flex align-center mb-4"
        >
          <div
            class="schedule-registration__day-label"
            :class="{ 'schedule-registration__day-label--sunday': index === 0 }"
          >
            {{ day }}
          </div>

          <v-text-field
            v-model="schedules[index].startTime"
            class="schedule-registration__time-input ml-4"
            hide-details
            density="compact"
            variant="outlined"
            placeholder="00:00"
          ></v-text-field>

          <div class="schedule-registration__time-separator mx-2">-</div>

          <v-text-field
            v-model="schedules[index].endTime"
            class="schedule-registration__time-input"
            hide-details
            density="compact"
            variant="outlined"
            placeholder="00:00"
          ></v-text-field>
        </div>

        <div class="schedule-registration__notes mt-4">
          <div class="schedule-registration__note">
            ※明日以降のスケジュールを変更します。
          </div>
          <div class="schedule-registration__note">
            ※既に登録されているスケジュールには影響しません。
          </div>
          <div class="schedule-registration__note">
            ※月が変わる度に自動的に3ヶ月先まで本定型スケジュールに
          </div>
          <div class="schedule-registration__note ml-2">て追加されます。</div>
        </div>
      </v-card-text>

      <v-card-actions class="schedule-registration__actions justify-end pa-4">
        <v-btn
          class="schedule-registration__submit-btn"
          color="primary"
          rounded
          min-width="120"
          @click="submitSchedule"
        >
          登録
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ScheduleRegistrationDialog",

  data() {
    return {
      dialog: true,
      days: ["日", "月", "火", "水", "木", "金", "土"],
      schedules: [
        { startTime: "00:00", endTime: "00:00" },
        { startTime: "00:00", endTime: "00:00" },
        { startTime: "00:00", endTime: "00:00" },
        { startTime: "00:00", endTime: "00:00" },
        { startTime: "00:00", endTime: "00:00" },
        { startTime: "10:00", endTime: "12:00" },
        { startTime: "00:00", endTime: "00:00" },
      ],
    };
  },

  methods: {
    closeDialog() {
      this.dialog = false;
      this.$emit("close");
    },

    submitSchedule() {
      this.$emit("submit", this.schedules);
      this.closeDialog();
    },
  },
};
</script>

<style scoped>
.schedule-registration__title {
  font-weight: bold;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
}

.schedule-registration__header {
  font-weight: 500;
  margin-bottom: 16px;
}

.schedule-registration__day-label {
  width: 20px;
  text-align: center;
}

.schedule-registration__day-label--sunday {
  color: #f44336;
}

.schedule-registration__time-input {
  width: 100px;
}

.schedule-registration__submit-btn {
  font-weight: bold;
}

.schedule-registration__notes {
  font-size: 0.85rem;
  color: #757575;
}

.schedule-registration__note {
  line-height: 1.5;
}
</style>
