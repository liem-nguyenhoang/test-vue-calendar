<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/block-lang -->
<template>
  <div class="app">
    <h1>Vue 3 Calendar Component</h1>
    <Calendar />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useDate } from "vuetify";

const calendar = ref();
const today = ref(new Date());
const events = ref([]);
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

const selectedDate = ref(new Date());
const daysList = ref([]);
const adapter = useDate();

onMounted(() => {
  const adapter = useDate();
  fetchEvents({
    start: adapter.startOfDay(adapter.startOfMonth(new Date())),
    end: adapter.endOfDay(adapter.endOfMonth(new Date())),
  });
  if (calendar.value) {
    daysList.value = calendar.value.daysInMonth || [];
    console.log("Days in month:", daysList.value);
  }
});

function eventHandle(day) {
  return events?.value.filter(
    (e) =>
      adapter.isSameDay(day.date, e.start) || adapter.isSameDay(day.date, e.end)
  );
}

function getAllowedDates(day) {
  console.log("adapter getMonth", adapter.getMonth(adapter.date("2025-03-12")));
  console.log(
    "adapter getWeekArray",
    adapter.getWeekArray(adapter.getMonth(adapter.date("2025-03-12")), 1)
  );
  console.log("adapter ", adapter.getWeekdays);
}

function chunkArray(array, size = 1) {
  return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size)
  );
}

function getTitle(day) {
  return day ? adapter.format(day.date, "dayOfMonth") : "NaN";
}

function getMode(day) {
  if (adapter.format(day.date, "dayOfMonth") < 18) return true;
  return false;
}

function getColor(day) {
  if (adapter.format(day.date, "dayOfMonth") == 18) return "blue";
  console.log(adapter.format(day.date, "dayOfMonth"));
  return "red";
}
function fetchEvents({ start, end }) {
  const _events = [];
  const min = start.getTime();
  const max = end.getTime();
  const days = (max - min) / 86400000;
  const eventCount = rnd(days, days + 20);

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
  events.value = _events;
}

function rnd(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a;
}

// Format thời gian
function formatTime(date) {
  return new Date(date).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Lấy icon theo loại sự kiện
function getEventIcon(title) {
  const icons = {
    Meeting: "mdi-account-group",
    Holiday: "mdi-beach",
    PTO: "mdi-airplane-takeoff",
    Travel: "mdi-briefcase",
    Event: "mdi-calendar-star",
    Birthday: "mdi-cake",
    Conference: "mdi-presentation",
    Party: "mdi-party-popper",
  };
  return icons[title] || "mdi-calendar";
}

// Kiểm tra ngày hiện tại
function isToday(date) {
  const todayDate = new Date();
  return (
    date.getDate() === todayDate.getDate() &&
    date.getMonth() === todayDate.getMonth() &&
    date.getFullYear() === todayDate.getFullYear()
  );
}

// Lấy sự kiện theo ngày
function getEventsForDay(date) {
  return events.value.filter((event) => {
    const eventDate = new Date(event.start);
    return (
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );
  });
}

// Xử lý click vào sự kiện
function handleEventClick(event) {
  console.log("Event clicked:", event);
  // Thêm logic xử lý tại đây (ví dụ: mở dialog chi tiết)
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
  margin-left: auto;
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
  display: grid;
  flex: 1 1;
  border: thin solid #e0e0e0;
}

.v-calendar-month__days > .v-calendar-month__day {
  min-height: var(150px);
}

.v-calendar-month__days.days__0,
.v-calendar-month__days.days__1 {
  grid-template-columns: 1fr;
}

.v-calendar-month__days.days__0 > .v-calendar-month__day,
.v-calendar-month__days.days__1 > .v-calendar-month__day {
  border-right: none;
}

.v-calendar-month__days.days__2 {
  grid-template-columns: repeat(2, 1fr);
}
.v-calendar-month__days.days__2 > .v-calendar-month__day:nth-child(2n) {
  border-right: none;
}

.v-calendar-month__days.days__3 {
  grid-template-columns: repeat(3, 1fr);
}
.v-calendar-month__days.days__3 > .v-calendar-month__day:nth-child(3n) {
  border-right: none;
}

.v-calendar-month__days.days__4 {
  grid-template-columns: repeat(4, 1fr);
}
.v-calendar-month__days.days__4 > .v-calendar-month__day:nth-child(4n) {
  border-right: none;
}

.v-calendar-month__days.days__5 {
  grid-template-columns: repeat(5, 1fr);
}
.v-calendar-month__days.days__5 > .v-calendar-month__day:nth-child(5n) {
  border-right: none;
}

.v-calendar-month__days.days__6 {
  grid-template-columns: repeat(6, 1fr);
}
.v-calendar-month__days.days__6 > .v-calendar-month__day:nth-child(6n) {
  border-right: none;
}

.v-calendar-month__days.days__6.v-calendar-month__weeknumbers {
  grid-template-columns: var(24px) repeat(6, 1fr);
}

.v-calendar-month__days.days__7 {
  grid-template-columns: repeat(7, 1fr);
}
.v-calendar-month__days.days__7 > .v-calendar-month__day:nth-child(7n) {
  border-right: none;
}

.v-calendar-month__days.days-with-weeknumbers__0,
.v-calendar-month__days.days-with-weeknumbers__1 {
  grid-template-columns: var(24px) 1fr;
}

.v-calendar-month__days.days-with-weeknumbers__0 > .v-calendar-month__day,
.v-calendar-month__days.days-with-weeknumbers__1 > .v-calendar-month__day {
  border-right: none;
}

.v-calendar-month__days.days-with-weeknumbers__2 {
  grid-template-columns: var(24px) repeat(2, 1fr);
}
.v-calendar-month__days.days-with-weeknumbers__2
  > .v-calendar-month__day:nth-child(3n) {
  border-right: none;
}

.v-calendar-month__days.days-with-weeknumbers__3 {
  grid-template-columns: var(24px) repeat(3, 1fr);
}
.v-calendar-month__days.days-with-weeknumbers__3
  > .v-calendar-month__day:nth-child(4n) {
  border-right: none;
}

.v-calendar-month__days.days-with-weeknumbers__4 {
  grid-template-columns: var(24px) repeat(4, 1fr);
}
.v-calendar-month__days.days-with-weeknumbers__4
  > .v-calendar-month__day:nth-child(5n) {
  border-right: none;
}

.v-calendar-month__days.days-with-weeknumbers__5 {
  grid-template-columns: var(24px) repeat(5, 1fr);
}
.v-calendar-month__days.days-with-weeknumbers__5
  > .v-calendar-month__day:nth-child(6n) {
  border-right: none;
}

.v-calendar-month__days.days-with-weeknumbers__6 {
  grid-template-columns: var(24px) repeat(6, 1fr);
}
.v-calendar-month__days.days-with-weeknumbers__6
  > .v-calendar-month__day:nth-child(7n) {
  border-right: none;
}

.v-calendar-month__days.days-with-weeknumbers__7 {
  grid-template-columns: var(24px) repeat(7, 1fr);
}
.v-calendar-month__days.days-with-weeknumbers__7
  > .v-calendar-month__day:nth-child(7n) {
  border-right: var(thin) solid var(thin);
}
.v-calendar-month__days.days-with-weeknumbers__7
  > .v-calendar-month__day:nth-child(8n) {
  border-right: none;
}

.v-calendar-month__day {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 150px;
  border-right: thin solid #e0e0e0;
  border-bottom: thin solid #e0e0e0;
  flex: 1 1 auto;
  border-inline-end: thin solid #e0e0e0;
}
</style>
