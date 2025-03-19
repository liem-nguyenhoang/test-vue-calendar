<template>
    <div 
      class="calendar-event"
      :class="`calendar-event--${event.color}`"
    >
      <div class="calendar-event__time">
        {{ event.times[0] }}
      </div>
      <div class="calendar-event__details">
        <div 
          v-for="(time, index) in event.times" 
          :key="index"
          class="calendar-event__detail"
        >
          <span 
            class="calendar-event__dot"
            :class="getDotClass(index, event)"
          ></span>
          <span class="calendar-event__text">{{ time }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    event: {
      type: Object,
      required: true
    }
  });
  
  const getDotClass = (index, event) => {
    if (event.hasRedEvent && index === event.times.length - 1) {
      return 'calendar-event__dot--red';
    }
    return `calendar-event__dot--${event.color}`;
  };
  </script>
  
  <style lang="scss">
  .calendar-event {
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    margin: 0 5px;
    border-radius: 4px;
    overflow: hidden;
    z-index: 0;
    
    &--grey {
      background-color: #f5f5f5;
    }
    
    &--blue {
      background-color: #e3f2fd;
    }
    
    &__time {
      text-align: center;
      padding: 2px 4px;
      font-size: 12px;
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    &__details {
      padding: 5px;
    }
    
    &__detail {
      display: flex;
      align-items: center;
      font-size: 12px;
      margin-bottom: 3px;
    }
    
    &__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 5px;
      flex-shrink: 0;
      
      &--grey {
        background-color: #9e9e9e;
      }
      
      &--blue {
        background-color: #1976d2;
      }
      
      &--red {
        background-color: #e53935;
      }
    }
    
    &__text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    @media screen and (max-width: 768px) {
      &__details {
        padding: 2px;
      }
      
      &__time {
        font-size: 10px;
      }
      
      &__text {
        font-size: 10px;
      }
    }
    
    @media screen and (max-width: 480px) {
      &__details {
        display: none;
      }
      
      &__time {
        padding: 1px;
        font-size: 8px;
      }
    }
  }
  </style>