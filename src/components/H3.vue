<template>
    <div class="calendar">
      <div class="calendar__header">
        <button class="calendar__nav-button calendar__nav-button--prev">
          <span class="calendar__nav-icon">&lt;</span>
        </button>
        <button class="calendar__nav-button calendar__nav-button--next">
          <span class="calendar__nav-icon">&gt;</span>
        </button>
        <div class="calendar__title">2025年 3月</div>
        
        <div class="calendar__location-selector">
          <select class="calendar__location-select">
            <option selected>東京ドームシティ駐車場</option>
          </select>
        </div>
        
        <button class="calendar__schedule-button">
          <span class="calendar__schedule-icon">+</span>
          <span class="calendar__schedule-text">定型スケジュール</span>
        </button>
      </div>
      
      <div class="calendar__grid">
        <div class="calendar__weekdays">
          <div class="calendar__weekday calendar__weekday--sun">日</div>
          <div class="calendar__weekday">月</div>
          <div class="calendar__weekday">火</div>
          <div class="calendar__weekday">水</div>
          <div class="calendar__weekday">木</div>
          <div class="calendar__weekday">金</div>
          <div class="calendar__weekday calendar__weekday--sat">土</div>
        </div>
        
        <div class="calendar__days">
          <template v-for="week in weeks" :key="week.id">
            <div 
              v-for="day in week" 
              :key="`${week.id}-${day.date}`" 
              :class="[
                'calendar__day', 
                { 'calendar__day--today': day.isToday },
                { 'calendar__day--other-month': !day.isCurrentMonth },
                { 'calendar__day--sun': day.isSunday },
                { 'calendar__day--sat': day.isSaturday }
              ]"
            >
              <div class="calendar__day-number">{{ day.date }}</div>
              <div v-if="day.hasEvents" class="calendar__events">
                <div class="calendar__event-time">
                  10:00 - 12:00
                </div>
                <div class="calendar__event-indicators">
                  <div 
                    v-for="(event, index) in day.events" 
                    :key="index" 
                    :class="[
                      'calendar__event-indicator', 
                      `calendar__event-indicator--${event.color}`
                    ]"
                  >
                    10:00 - 12:00
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Calendar data structure
  const weeks = ref([
    { 
      id: 1, 
      days: [
        { date: 23, isCurrentMonth: false, isSunday: true, isSaturday: false, hasEvents: false, events: [] },
        { date: 24, isCurrentMonth: false, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 25, isCurrentMonth: false, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 26, isCurrentMonth: false, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 27, isCurrentMonth: false, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 28, isCurrentMonth: false, isSunday: false, isSaturday: false, hasEvents: true, events: [
          { color: 'gray' }, { color: 'gray' }, { color: 'gray' }, { color: 'gray' }
        ] },
        { date: 1, isCurrentMonth: true, isSunday: false, isSaturday: true, hasEvents: false, events: [] }
      ]
    },
    { 
      id: 2, 
      days: [
        { date: 2, isCurrentMonth: true, isSunday: true, isSaturday: false, hasEvents: false, events: [] },
        { date: 3, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 4, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 5, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 6, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 7, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: true, events: [
          { color: 'gray' }, { color: 'gray' }, { color: 'gray' }, { color: 'gray' }
        ] },
        { date: 8, isCurrentMonth: true, isSunday: false, isSaturday: true, hasEvents: false, events: [] }
      ]
    },
    { 
      id: 3, 
      days: [
        { date: 9, isCurrentMonth: true, isSunday: true, isSaturday: false, hasEvents: false, events: [] },
        { date: 10, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 11, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 12, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 13, isCurrentMonth: true, isSunday: false, isSaturday: false, isToday: true, hasEvents: false, events: [] },
        { date: 14, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: true, events: [
          { color: 'blue' }, { color: 'blue' }, { color: 'blue' }, { color: 'blue' }
        ] },
        { date: 15, isCurrentMonth: true, isSunday: false, isSaturday: true, hasEvents: false, events: [] }
      ]
    },
    { 
      id: 4, 
      days: [
        { date: 16, isCurrentMonth: true, isSunday: true, isSaturday: false, hasEvents: false, events: [] },
        { date: 17, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 18, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: true, events: [
          { color: 'blue' }
        ] },
        { date: 19, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 20, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 21, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: true, events: [
          { color: 'blue' }
        ] },
        { date: 22, isCurrentMonth: true, isSunday: false, isSaturday: true, hasEvents: false, events: [] }
      ]
    },
    { 
      id: 5, 
      days: [
        { date: 23, isCurrentMonth: true, isSunday: true, isSaturday: false, hasEvents: false, events: [] },
        { date: 24, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: true, events: [
          { color: 'blue' }, { color: 'blue' }, { color: 'red' }
        ] },
        { date: 25, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 26, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 27, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 28, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: true, events: [
          { color: 'blue' }, { color: 'blue' }, { color: 'blue' }
        ] },
        { date: 29, isCurrentMonth: true, isSunday: false, isSaturday: true, hasEvents: false, events: [] }
      ]
    },
    { 
      id: 6, 
      days: [
        { date: 30, isCurrentMonth: true, isSunday: true, isSaturday: false, hasEvents: false, events: [] },
        { date: 31, isCurrentMonth: true, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 1, isCurrentMonth: false, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 2, isCurrentMonth: false, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 3, isCurrentMonth: false, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 4, isCurrentMonth: false, isSunday: false, isSaturday: false, hasEvents: false, events: [] },
        { date: 5, isCurrentMonth: false, isSunday: false, isSaturday: true, hasEvents: false, events: [] }
      ]
    }
  ]);
  </script>
  
  <style scoped>
  .calendar {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    max-width: 1080px;
    margin: 0 auto;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  
  .calendar__header {
    display: flex;
    align-items: center;
    padding: 16px;
    gap: 8px;
  }
  
  .calendar__nav-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 50%;
  }
  
  .calendar__nav-button:hover {
    background-color: #f5f5f5;
  }
  
  .calendar__title {
    font-size: 16px;
    font-weight: 500;
    margin-right: 16px;
  }
  
  .calendar__location-selector {
    flex-grow: 1;
  }
  
  .calendar__location-select {
    width: 100%;
    padding: 8px 12px;
    border-radius: 16px;
    border: 1px solid #e0e0e0;
    background-color: #fff;
    font-size: 14px;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 32px;
  }
  
  .calendar__schedule-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: #f5f5f5;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 16px;
  }
  
  .calendar__schedule-icon {
    font-weight: bold;
  }
  
  .calendar__grid {
    border-top: 1px solid #f0f0f0;
  }
  
  .calendar__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    padding: 8px 0;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .calendar__weekday--sun {
    color: #e53935;
  }
  
  .calendar__weekday--sat {
    color: #1e88e5;
  }
  
  .calendar__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  
  .calendar__day {
    height: 120px;
    border-bottom: 1px solid #f0f0f0;
    border-right: 1px solid #f0f0f0;
    padding: 8px;
    position: relative;
  }
  
  .calendar__day:nth-child(7n) {
    border-right: none;
  }
  
  .calendar__day-number {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
  }
  
  .calendar__day--other-month {
    color: #bdbdbd;
    background-color: #fafafa;
  }
  
  .calendar__day--sun .calendar__day-number {
    color: #e53935;
  }
  
  .calendar__day--sat .calendar__day-number {
    color: #1e88e5;
  }
  
  .calendar__day--today {
    background-color: #f5f5ff;
  }
  
  .calendar__day--today .calendar__day-number {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    background-color: #333;
    color: #fff;
    border-radius: 50%;
  }
  
  .calendar__events {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .calendar__event-time {
    display: inline-block;
    font-size: 12px;
    padding: 2px 8px;
    background-color: #f0f8ff;
    border-radius: 4px;
    margin-bottom: 4px;
  }
  
  .calendar__event-indicators {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .calendar__event-indicator {
    display: flex;
    align-items: center;
    font-size: 12px;
    padding-left: 16px;
    position: relative;
    color: #757575;
  }
  
  .calendar__event-indicator::before {
    content: '';
    position: absolute;
    left: 8px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #9e9e9e;
  }
  
  .calendar__event-indicator--blue::before {
    background-color: #2196f3;
  }
  
  .calendar__event-indicator--red::before {
    background-color: #f44336;
  }
  
  .calendar__event-indicator--gray::before {
    background-color: #9e9e9e;
  }
  </style>