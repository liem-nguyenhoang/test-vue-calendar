<template>
    <div 
      class="calendar-day"
      :class="{
        'calendar-day--sunday': isSunday,
        'calendar-day--saturday': isSaturday,
        'calendar-day--today': day.isToday,
        'calendar-day--selected': day.isSelected,
        'calendar-day--other-month': !day.isCurrentMonth
      }"
    >
      <div 
        class="calendar-day__number"
        :class="{
          'calendar-day__number--red': isSunday,
          'calendar-day__number--blue': isSaturday && !isSunday
        }"
      >
        {{ day.date.getDate() }}
      </div>
      
      <CalendarEvent 
        v-for="(event, index) in events" 
        :key="index" 
        :event="event"
      />
    </div>
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  import CalendarEvent from './CalendarEvent.vue';
  
  const props = defineProps({
    day: {
      type: Object,
      required: true
    },
    events: {
      type: Array,
      default: () => []
    }
  });
  
  const isSunday = computed(() => props.day.date.getDay() === 0);
  const isSaturday = computed(() => props.day.date.getDay() === 6);
  </script>
  
  <style lang="scss">
  .calendar-day {
    position: relative;
    border-right: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0; 
    box-sizing: border-box;
    
    &:nth-child(7n) {
      border-right: none;
    }
    
    &__number { 
      font-size: 14px;
      font-weight: 500;
      
      &--red {
        color: #e53935;
      }
      
      &--blue {
        color: #1976d2;
      }
    }
    
    &--sunday {
      background-color: #fff8f8;
    }
    
    &--saturday {
      background-color: #f8f9ff;
    }
    
    &--today {
      background-color: #333;
      color: white;
      
      .calendar-day__number {
        background-color: #333;
        color: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        left: 5px;
        top: 5px;
      }
    }
    
    &--selected {
      position: relative;
      
      &::before {
        content: "✕";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: white;
        background-color: #666;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }
    }
    
    &--other-month {
      .calendar-day__number {
        color: #bbbbbb;
      }
    }
    
    @media screen and (max-width: 768px) {
      &__number {
        font-size: 12px;
        top: 3px;
        left: 5px;
      }
    }
  }
  </style>