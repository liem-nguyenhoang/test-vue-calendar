<template>
  <div class="calendar">
    <calendar-header
      :current-date="state.today"
      @previous-month="previousMonth"
      @next-month="nextMonth"
    />
    <calendar-grid :days-list="state.daysList" :event-handler="eventHandle" />
    <div class="calendar__footer">line space</div>
  </div>
</template>

<script setup>
import { onMounted, computed, reactive, watch } from "vue";
import { useDate } from "vuetify";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarGrid from "./CalendarGrid.vue";

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

  const weeksInMonth = adapter.getWeekArray(adapter.date(state.today));
  const days = weeksInMonth.flat();
  const daysInMonth = genDays(days, state.today);
  state.daysList = daysInMonth;
});

function eventHandle(day) {
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

function fetchEvents({ start, end }) {
  const _events = [];
  const min = start.getTime();
  const max = end.getTime();
  const days = (max - min) / 86400000;
  const eventCount = rnd(days, days + 70);

  for (let i = 0; i < eventCount; i++) {
    const allDay = rnd(1, 3) === 2;
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
  _events.map((val) => console.log("_events", val.allDay));
  events = _events;
}

function previousMonth(date) {
  const currentMonth = adapter.getMonth(date);
  state.today = adapter.setMonth(state.today, currentMonth - 1);
}

function nextMonth(date) {
  const currentMonth = adapter.getMonth(date);
  state.today = adapter.setMonth(state.today, currentMonth + 1);
}

function rnd(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a;
}
</script>

<style lang="scss">
.calendar {
  padding: 24px;
  max-width: 960px;
  width: 100%;
  border-radius: 20px;
  border: none;
  background-color: #ffff;

  &__footer {
    margin: 10px 0;
  }
}

@media (max-width: 320px) {
  .calendar {
    padding: 12px;
  }
}
</style>
