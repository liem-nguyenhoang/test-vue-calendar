<!-- Calendar.vue - Main Component with API integration -->
<template>
  <div class="calendar">
    <!-- Loading overlay -->
    <div v-if="state.loading" class="calendar__loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!-- Header -->
    <calendar-header
      :current-date="state.today"
      @previous-month="previousMonth"
      @next-month="nextMonth"
    />

    <!-- Calendar Body -->
    <div class="calendar__container">
      <calendar-weekdays />

      <div class="calendar__days-grid">
        <template
          v-for="week in chunkArray(state.daysList, 7)"
          :key="week[0].isoDate"
        >
          <calendar-day
            v-for="day in week"
            :key="day.isoDate"
            :day="day"
            :title="getTitle(day)"
            :events="eventHandle(day)"
            @click="handleDayClick(day)"
          />
        </template>
      </div>

      <!-- Error message -->
      <div v-if="state.error" class="calendar__error">
        {{ state.error }}
        <v-btn text small @click="loadEvents">Retry</v-btn>
      </div>
    </div>

    <!-- Event Dialog (optional) -->
    <calendar-event-dialog
      v-if="state.showEventDialog"
      v-model="state.showEventDialog"
      :event="state.selectedEvent"
      :date="state.selectedDate"
      @save="saveEvent"
      @delete="deleteEvent"
      @close="closeEventDialog"
    />
  </div>
</template>

<script setup>
import { onMounted, computed, reactive, watch } from "vue";
import { useDate } from "vuetify";
import { calendarService } from "../services/calendarApi";
import CalendarHeader from "./components/CalendarHeader.vue";
import CalendarWeekdays from "./components/CalendarWeekdays.vue";
import CalendarDay from "./components/CalendarDay.vue";
import CalendarEventDialog from "./components/CalendarEventDialog.vue";

const adapter = useDate();

const state = reactive({
  today: adapter.date(),
  daysList: [],
  events: [],
  loading: false,
  error: null,
  showEventDialog: false,
  selectedEvent: null,
  selectedDate: null,
});

// Watch for date changes and update days list and events
watch(
  () => state.today,
  (newVal) => {
    updateDaysList(newVal);
    loadEvents();
  }
);

onMounted(() => {
  updateDaysList(state.today);
  loadEvents();
});

/**
 * Load events from API for the current month
 */
async function loadEvents() {
  state.loading = true;
  state.error = null;

  try {
    const startDate = adapter.startOfDay(adapter.startOfMonth(state.today));
    const endDate = adapter.endOfDay(adapter.endOfMonth(state.today));

    // Add buffer days to include events from adjacent months that might be visible
    const bufferedStartDate = adapter.addDays(startDate, -7);
    const bufferedEndDate = adapter.addDays(endDate, 7);

    state.events = await calendarService.fetchEvents(
      bufferedStartDate,
      bufferedEndDate
    );
  } catch (error) {
    state.error = "Failed to load events. Please try again.";
    console.error("Error loading events:", error);
  } finally {
    state.loading = false;
  }
}

/**
 * Handle day click event
 * @param {Object} day - The day object that was clicked
 */
function handleDayClick(day) {
  if (day.isDisabled) return;

  state.selectedDate = day.date;
  state.selectedEvent = null;
  state.showEventDialog = true;
}

/**
 * Handle event click
 * @param {Object} event - The event that was clicked
 * @param {Object} day - The day containing the event
 */
function handleEventClick(event, day) {
  state.selectedEvent = event;
  state.selectedDate = day.date;
  state.showEventDialog = true;
}

/**
 * Close the event dialog
 */
function closeEventDialog() {
  state.showEventDialog = false;
  state.selectedEvent = null;
  state.selectedDate = null;
}

/**
 * Save a new or updated event
 * @param {Object} eventData - The event data to save
 */
async function saveEvent(eventData) {
  state.loading = true;

  try {
    if (eventData.id) {
      // Update existing event
      await calendarService.updateEvent(eventData.id, eventData);
    } else {
      // Create new event
      await calendarService.createEvent(eventData);
    }

    // Reload events to reflect changes
    await loadEvents();
    closeEventDialog();
  } catch (error) {
    console.error("Error saving event:", error);
    // You might want to display an error message
  } finally {
    state.loading = false;
  }
}

/**
 * Delete an event
 * @param {string} eventId - The ID of the event to delete
 */
async function deleteEvent(eventId) {
  if (!eventId) return;

  state.loading = true;

  try {
    await calendarService.deleteEvent(eventId);
    await loadEvents();
    closeEventDialog();
  } catch (error) {
    console.error("Error deleting event:", error);
    // You might want to display an error message
  } finally {
    state.loading = false;
  }
}

function updateDaysList(date) {
  const weeksInMonth = adapter.getWeekArray(adapter.date(date));
  const days = weeksInMonth.flat();
  const daysInMonth = genDays(days, date);
  state.daysList = daysInMonth;
}

function eventHandle(day) {
  return state.events.filter(
    (e) =>
      adapter.isSameDay(day.date, e.start) || adapter.isSameDay(day.date, e.end)
  );
}

const weekDays = computed(() => {
  return [0, 1, 2, 3, 4, 5, 6].map((day) => (day + 0) % 7);
});

function genDays(days, today) {
  return days
    .filter((date) => {
      return weekDays.value.includes(adapter.toJsDate(date).getDay());
    })
    .map((date, index) => {
      const isoDate = adapter.toISO(date);
      const isAdjacent = !adapter.isSameMonth(date, today);
      const isStart = adapter.isSameDay(date, adapter.startOfMonth(today));
      const isEnd = adapter.isSameDay(date, adapter.endOfMonth(today));
      const isSame = adapter.isSameDay(date, today);
      const isBefore = adapter.isBefore(date, today);
      const isToday = adapter.isSameDay(date, today);

      return {
        date,
        isoDate,
        formatted: adapter.format(date, "keyboardDate"),
        year: adapter.getYear(date),
        month: adapter.getMonth(date),
        isDisabled: isBefore && !isToday,
        isWeekStart: index % 7 === 0,
        isWeekEnd: index % 7 === 6,
        isToday,
        isAdjacent,
        isHidden: false,
        isStart,
        isSelected: true,
        isEnd,
        isSame,
        localized: adapter.format(date, "dayOfMonth"),
      };
    });
}

function chunkArray(array, size = 1) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

function getTitle(day) {
  return day ? adapter.format(day.date, "dayOfMonth") : "NaN";
}

function previousMonth() {
  const currentMonth = adapter.getMonth(state.today);
  state.today = adapter.setMonth(state.today, currentMonth - 1);
}

function nextMonth() {
  const currentMonth = adapter.getMonth(state.today);
  state.today = adapter.setMonth(state.today, currentMonth + 1);
}
</script>

<style lang="scss">
.calendar {
  position: relative;

  &__container {
    border-radius: 30px;
  }

  &__days-grid {
    border: thin solid black;
    border-radius: 16px;
  }

  &__loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  &__error {
    margin: 16px;
    padding: 12px;
    color: #d32f2f;
    background-color: #ffebee;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
