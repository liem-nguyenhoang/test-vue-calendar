<template>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="today"
            :events="events"
            color="primary"
            type="month"
            :event-overlap-mode="'stack'"
          >
            <!-- Slot để custom event -->
            <template v-slot:event="{ event }">
              <div class="event-item" :style="{ backgroundColor: event.color }">
                <v-icon small class="mr-1">{{ getEventIcon(event.title) }}</v-icon>
                <span class="event-title">{{ event.title }}</span>
                <span class="event-time">
                  {{ formatTime(event.start) }} - {{ formatTime(event.end) }}
                </span>
                <v-btn
                  icon
                  x-small
                  class="event-action"
                  @click="handleEventClick(event)"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </div>
            </template>
            
            <!-- Slot để custom ngày -->
            <template v-slot:day-label="{ day, date }">
              <div class="day-label" :class="{ 'today': isToday(date) }">
                <span>{{ day }}</span>
                <v-badge
                  v-if="getEventsForDay(date).length"
                  :content="getEventsForDay(date).length"
                  color="red"
                  overlap
                  dot
                ></v-badge>
              </div>
            </template>
          </v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useDate } from 'vuetify'
  
  const calendar = ref()
  const today = ref(new Date())
  const events = ref([])
  const colors = ['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575']
  const names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']
  
  onMounted(() => {
    const adapter = useDate()
    fetchEvents({ 
      start: adapter.startOfDay(adapter.startOfMonth(new Date())),
      end: adapter.endOfDay(adapter.endOfMonth(new Date()))
    })
  })
  
  function fetchEvents({ start, end }) {
    const _events = []
    const min = start.getTime()
    const max = end.getTime()
    const days = (max - min) / 86400000
    const eventCount = rnd(days, days + 20)
    
    for (let i = 0; i < eventCount; i++) {
      const allDay = rnd(0, 3) === 0
      const firstTimestamp = rnd(min, max)
      const first = new Date(firstTimestamp - (firstTimestamp % 900000))
      const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000
      const second = new Date(first.getTime() + secondTimestamp)
      
      _events.push({
        title: names[rnd(0, names.length - 1)],
        start: first,
        end: second,
        color: colors[rnd(0, colors.length - 1)],
        allDay,
      })
    }
    events.value = _events
  }
  
  function rnd(a, b) {
    return Math.floor((b - a + 1) * Math.random()) + a
  }
  
  // Format thời gian
  function formatTime(date) {
    return new Date(date).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  // Lấy icon theo loại sự kiện
  function getEventIcon(title) {
    const icons = {
      'Meeting': 'mdi-account-group',
      'Holiday': 'mdi-beach',
      'PTO': 'mdi-airplane-takeoff',
      'Travel': 'mdi-briefcase',
      'Event': 'mdi-calendar-star',
      'Birthday': 'mdi-cake',
      'Conference': 'mdi-presentation',
      'Party': 'mdi-party-popper'
    }
    return icons[title] || 'mdi-calendar'
  }
  
  // Kiểm tra ngày hiện tại
  function isToday(date) {
    const todayDate = new Date()
    return date.getDate() === todayDate.getDate() &&
           date.getMonth() === todayDate.getMonth() &&
           date.getFullYear() === todayDate.getFullYear()
  }
  
  // Lấy sự kiện theo ngày
  function getEventsForDay(date) {
    return events.value.filter(event => {
      const eventDate = new Date(event.start)
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear()
    })
  }
  
  // Xử lý click vào sự kiện
  function handleEventClick(event) {
    console.log('Event clicked:', event)
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
  </style>