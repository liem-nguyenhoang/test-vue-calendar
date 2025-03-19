<template>
    <div class="calendar-header">
      <div 
        v-for="(day, index) in weekdays" 
        :key="index"
        class="calendar-header__day"
        :class="{
          'calendar-header__day--sunday': index === 0,
          'calendar-header__day--saturday': index === 6
        }"
      >
        {{ day }}
      </div>
    </div>
  </template>
  
  <script setup>
  // Japanese weekday labels
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  </script>
  
  <style lang="scss">
  .calendar-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background-color: #f8f8f8;
    border-bottom: 1px solid #e0e0e0;
    
    &__day {
      text-align: center;
      padding: 10px;
      font-weight: 500;
      font-size: 14px;
      
      &--sunday {
        color: #e53935;
      }
      
      &--saturday {
        color: #1976d2;
      }
    }
  
    @media screen and (max-width: 480px) {
      &__day {
        font-size: 12px;
        padding: 5px;
      }
    }
  }
  </style>