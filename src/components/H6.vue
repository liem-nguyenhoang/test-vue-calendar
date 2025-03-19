<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/block-lang -->
<template>
  <!-- Header -->
  <div class="d-flex" style="gap: 8px">
    <v-btn
      icon
      flat
      base-color="black"
      width="24"
      height="24"
      @click="previousMonth(state.today)"
    >
      <v-icon size="small"> mdi-chevron-left </v-icon>
    </v-btn>
    <v-btn
      icon
      flat
      base-color="black"
      width="24"
      height="24"
      @click="nextMonth(state.today)"
    >
      <v-icon size="small"> mdi-chevron-right </v-icon>
    </v-btn>
    <p style="margin-left: 8px">time: {{ formatJPDate(state.today) }}</p>
  </div>
  <!-- Calendar -->
  <div class="container-calendar">
    <div class="v-calendar-weekly__head days__7">
      <template v-for="weekday in [0, 1, 2, 3, 4, 5, 6]" :key="weekday">
        <div class="v-calendar-weekly__head-weekday" style="margin: 8px">
          {{ ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][weekday] }}
        </div>
      </template>
    </div>

    <div class="v-calendar-month__days days__7">
      <template v-for="week in chunkArray(state.daysList, 7)">
        <template v-for="day in week" :key="day.isoDate">
          <v-calendar-month-day
            :day="day"
            :title="getTitle(day)"
            :events="eventHandle(day)"
            :disabled="day.isDisabled"
          >
            <!-- <template #event="{ event }">
              <div
                class="event-item"
                :style="{ backgroundColor: event.color }"
                @click="handleEventClick(event)"
              >
                <v-icon small class="mr-1">{{
                  getEventIcon(event.title)
                }}</v-icon>
                <span class="event-title">{{ event.title }}</span>
                <span class="event-time">
                  {{ formatTime(event.start) }} - {{ formatTime(event.end) }}
                </span>
              </div>
            </template> -->

            <template #title="{ title }">
              <div
                :class="`title ${day.isDisabled ? 'disabled' : ''} ${
                  day.isToday ? 'today' : ''
                }`"
              >
                <p>{{ title }}</p>
              </div>
            </template>

            <template #content>
              <div class="saymeme">
                <div
                  v-for="event in eventHandle(day).filter((e) => e.allDay)"
                  :key="event"
                >
                  <v-chip density="comfortable" width="100%" color="yellow">
                    {{ event?.title }}{{ event?.allDay }}
                  </v-chip>
                </div>
                <div
                  v-for="event in eventHandle(day).filter((e) => !e.allDay)"
                  :key="event"
                >
                  <v-chip density="comfortable" width="100%">
                    {{ event?.title }}
                  </v-chip>
                </div>
              </div>
            </template>
          </v-calendar-month-day>
        </template>
      </template>
    </div>

    <div style="margin: 10px 0">line spave</div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, reactive, watch } from "vue";
import { useDate } from "vuetify";

let events = [];
const colors = [
  "#2196F3",
  "#3F51B5",
  "#673AB7",
  "#00BCD4",
  "#4CAF50",
  "#FF9800",
  "#757575",
];
const names = [
  "Meeting",
  "Holiday",
  "PTO",
  "Travel",
  "Event",
  "Birthday",
  "Conference",
  "Party",
];
const adapter = useDate();

const state = reactive({
  today: adapter.date(),
  daysList: [],
});

watch(
  () => state.today,
  (newVal) => {
    const weeksInMonth = adapter.getWeekArray(adapter.date(newVal));
    const days = weeksInMonth.flat();
    const daysInMonth = genDays(days, newVal);
    state.daysList = daysInMonth;
  }
);

onMounted(() => {
  fetchEvents({
    start: adapter.startOfDay(adapter.startOfMonth(new Date())),
    end: adapter.endOfDay(adapter.endOfMonth(new Date())),
  });
  //
  const weeksInMonth = adapter.getWeekArray(adapter.date(state.today));
  const days = weeksInMonth.flat();
  const daysInMonth = genDays(days, state.today);
  state.daysList = daysInMonth;
  console.log("daysInMonth", daysInMonth);

  console.log("events", events);
});

function eventHandle(day) {
  // console.log('eventHandle', {date: day.date,event: events?.value[0], start: events.value[0].start},  adapter.isSameMonth(day.date, events.value[0].start))
  return events.filter(
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
      console.log("isSunday", adapter.getDate(date));

      return {
        date,
        isoDate,
        formatted: adapter.format(date, "keyboardDate"),
        year: adapter.getYear(date),
        month: adapter.getMonth(date),
        isDisabled: isBefore && !isToday, // TODO: check điều kiện để bật isDisabled
        isWeekStart: index % 7 === 0,
        isWeekEnd: index % 7 === 6,
        isToday: isToday,
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
  return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size)
  );
}

function getTitle(day) {
  return day ? adapter.format(day.date, "dayOfMonth") : "NaN";
}

function fetchEvents({ start, end }) {
  const _events = [];
  const min = start.getTime();
  const max = end.getTime();
  const days = (max - min) / 86400000;
  const eventCount = rnd(days, days + 70);

  for (let i = 0; i < eventCount; i++) {
    const allDay = rnd(0, 3) === 0;
    const firstTimestamp = rnd(min, max);
    const first = new Date(firstTimestamp - (firstTimestamp % 900000));
    const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000;
    const second = new Date(first.getTime() + secondTimestamp);

    _events.push({
      title: names[rnd(0, names.length - 1)],
      start: first,
      end: second,
      color: colors[rnd(0, colors.length - 1)],
      allDay,
    });
  }
  events = _events;
}
function formatJPDate(date) {
  const year = adapter.getYear(date);
  const month = adapter.getMonth(date) + 1; // Months are zero-based
  return `${year}Year${month}Month`;
}

function previousMonth(date) {
  console.log("previous month before", state.today);
  const currentMonth = adapter.getMonth(date);
  state.today = adapter.setMonth(state.today, currentMonth - 1);
  console.log("previous month after", state.today);
}

function nextMonth(date) {
  console.log("next month before", state.today);
  const currentMonth = adapter.getMonth(date);
  state.today = adapter.setMonth(state.today, currentMonth + 1);
  console.log("next month after", state.today);
}
function rnd(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a;
}
</script>

<style scoped>
.event-item {
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  position: relative;
  height: 100%;
}

.event-title {
  font-weight: 500;
}

.event-time {
  opacity: 0.8;
  display: none;
}

.event-action {
  position: absolute;
  right: 2px;
  top: 2px;
}

.day-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
}

.day-label.today {
  background-color: #e3f2fd;
  border-radius: 50%;
  color: #1976d2;
  font-weight: bold;
}

.v-calendar-month__days {
  border: thin solid black;
  border-radius: 16px;
  .v-calendar-month__day {
    .v-calendar-weekly__day-label {
      cursor: cell;
    }
  }
  .v-calendar-weekly__day-label {
    .title {
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        width: 24px;
        height: 24px;
        border-radius: 12px;
      }
    }
    .title.disabled {
      p {
        background-color: white;
        color: gray;
      }
    }
    .title.today {
      p {
        background-color: black;
        color: white;
      }
    }
  }
}

.v-calendar-month__day:nth-last-child(-n + 7) {
  border-bottom: none;
}

.container-calendar {
  border-radius: 30px;
}

.v-calendar-weekly__head-weekday {
  border: none;
}

.v-calendar-weekly__head-weekday:nth-child(1) {
  color: red;
}

.v-calendar-weekly__head-weekday:nth-child(7) {
  color: blue;
}

.v-calendar-month__day:nth-child(7n) {
  p {
    color: blue;
  }
}
.v-calendar-month__day:nth-child(7n + 1) {
  p {
    color: red;
  }
}
</style>
