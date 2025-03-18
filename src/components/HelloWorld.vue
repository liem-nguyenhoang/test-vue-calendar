<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-calendar
          v-model="value"
          :type="calendarType"
          :events="events"
          event-color="primary"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { useBreakpoints } from '@vuetify/framework';

export default defineComponent({
  setup() {
    const breakpoints = useBreakpoints();
    return { breakpoints };
  },
  data() {
    return {
      value: new Date().toISOString().substr(0, 10),
      events: [
        { name: 'Meeting', start: '2025-03-18 09:00', end: '2025-03-18 10:00', color: 'blue' },
        { name: 'Lunch Break', start: '2025-03-19 12:00', end: '2025-03-19 13:00', color: 'green' },
      ],
    };
  },
  computed: {
    calendarType() {
      if (this.breakpoints.xs) return 'day';
      if (this.breakpoints.sm) return 'week';
      return 'month';
    },
  },
});
</script>