<template>
    <div class="calendar-grid">
      <CalendarDay 
        v-for="(day, index) in days" 
        :key="index"
        :day="day"
        :events="getDayEvents(day.date)"
      />
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import CalendarDay from './CalendarDay.vue';
  
  const props = defineProps({
    days: {
      type: Array,
      required: true
    },
    events: {
      type: Array,
      default: () => []
    },
    selectedDate: {
      type: Date,
      required: true
    },
    today: {
      type: Date,
      required: true
    }
  });
  
  // Function to get events for a specific day
  const getDayEvents = (date) => {
    return props.events.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };
  </script>
  
  <style lang="scss">
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: minmax(120px, 1fr);
  }
  </style>