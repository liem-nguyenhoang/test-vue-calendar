<template>
    <div class="calendar">
      <CalendarHeader />
      <CalendarGrid :days="days" :events="events" :selectedDate="selectedDate" :today="today" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import CalendarHeader from './CalendarHeader.vue';
  import CalendarGrid from './CalendarGrid.vue';
  
  // Mock data - in a real app, this would come from props or API
  const today = ref(new Date(2023, 6, 15)); // July 13th as today
  const selectedDate = ref(new Date(2023, 5, 27)); // June 27th as selected
  
  // Generate calendar days data
  const days = computed(() => {
    const currentMonth = today.value.getMonth();
    const currentYear = today.value.getFullYear();
    
    // Get the first day of the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    
    // Get the last day of the previous month
    const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    // Get the last day of the current month
    const lastDayOfCurrMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const calendarDays = [];
    
    // Add days from previous month
    for (let i = dayOfWeek - 1; i >= 0; i--) {
      calendarDays.push({
        date: new Date(currentYear, currentMonth - 1, lastDayOfPrevMonth - i),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= lastDayOfCurrMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      calendarDays.push({
        date,
        isCurrentMonth: true,
        isToday: i === today.value.getDate() && currentMonth === today.value.getMonth(),
        isSelected: i === selectedDate.value.getDate() && 
                   currentMonth === selectedDate.value.getMonth() &&
                   currentYear === selectedDate.value.getFullYear()
      });
    }
    
    // Add days from next month to fill the grid
    const remainingDays = 42 - calendarDays.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        date: new Date(currentYear, currentMonth + 1, i),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      });
    }
    
    return calendarDays;
  });
  
  // Mock events data
  const events = ref([
    {
      date: new Date(2023, 5, 28), // June 28
      color: 'grey',
      times: ['10:00 - 12:00', '10:00 - 12:00', '10:00 - 12:00']
    },
    {
      date: new Date(2023, 6, 7), // July 7
      color: 'grey',
      times: ['10:00 - 12:00', '10:00 - 12:00', '10:00 - 12:00']
    },
    {
      date: new Date(2023, 6, 14), // July 14
      color: 'blue',
      times: ['10:00 - 12:00', '10:00 - 12:00', '10:00 - 12:00','10:00 - 12:00', '10:00 - 12:00', '10:00 - 12:00','10:00 - 12:00', '10:00 - 12:00', '10:00 - 12:00']
    },
    {
      date: new Date(2023, 6, 18), // July 18
      color: 'blue',
      times: ['10:00 - 12:00']
    },
    {
      date: new Date(2023, 6, 21), // July 21
      color: 'blue',
      times: ['10:00 - 12:00']
    },
    {
      date: new Date(2023, 6, 24), // July 24
      color: 'blue',
      times: ['10:00 - 12:00', '10:00 - 12:00', '10:00 - 12:00'],
      hasRedEvent: true
    },
    {
      date: new Date(2023, 6, 28), // July 28
      color: 'blue',
      times: ['10:00 - 12:00', '10:00 - 12:00', '10:00 - 12:00']
    }
  ]);
  </script>
  
  <style lang="scss">
  .calendar {  
    width: 100%;
  }
  </style>