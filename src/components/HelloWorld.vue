<template>
  <div class="calendar">
    <!-- Header with weekday names -->
    <div class="calendar__header">
      <div class="calendar__header-day calendar__header-day--sunday">日</div>
      <div class="calendar__header-day">月</div>
      <div class="calendar__header-day">火</div>
      <div class="calendar__header-day">水</div>
      <div class="calendar__header-day">木</div>
      <div class="calendar__header-day">金</div>
      <div class="calendar__header-day calendar__header-day--saturday">土</div>
    </div>
    
    <!-- Calendar grid -->
    <div class="calendar__grid">
      <!-- First row: 23-1 -->
      <div class="calendar__day">
        <div class="calendar__day-number">23</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">24</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">25</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">26</div>
      </div>
      <div class="calendar__day calendar__day--selected">
        <div class="calendar__day-number">27</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">28</div>
        <div class="calendar__event calendar__event--grey">
          <div class="calendar__event-time">10:00 - 12:00</div>
          <div class="calendar__event-details">
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--grey"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--grey"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--grey"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
          </div>
        </div>
      </div>
      <div class="calendar__day calendar__day--saturday">
        <div class="calendar__day-number">1</div>
      </div>
      
      <!-- Second row: 2-8 -->
      <div class="calendar__day">
        <div class="calendar__day-number">2</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">3</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">4</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">5</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">6</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">7</div>
        <div class="calendar__event calendar__event--grey">
          <div class="calendar__event-time">10:00 - 12:00</div>
          <div class="calendar__event-details">
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--grey"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--grey"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--grey"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
          </div>
        </div>
      </div>
      <div class="calendar__day calendar__day--saturday">
        <div class="calendar__day-number">8</div>
      </div>
      
      <!-- Third row: 9-15 -->
      <div class="calendar__day">
        <div class="calendar__day-number">9</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">10</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">11</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">12</div>
      </div>
      <div class="calendar__day calendar__day--today">
        <div class="calendar__day-number">13</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">14</div>
        <div class="calendar__event calendar__event--blue">
          <div class="calendar__event-time">10:00 - 12:00</div>
          <div class="calendar__event-details">
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--blue"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--blue"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--blue"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
          </div>
        </div>
      </div>
      <div class="calendar__day calendar__day--saturday">
        <div class="calendar__day-number calendar__day-number--blue">15</div>
      </div>
      
      <!-- Fourth row: 16-22 -->
      <div class="calendar__day calendar__day--sunday">
        <div class="calendar__day-number calendar__day-number--red">16</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">17</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">18</div>
        <div class="calendar__event calendar__event--blue">
          <div class="calendar__event-time">10:00 - 12:00</div>
          <div class="calendar__event-details">
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--blue"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
          </div>
        </div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">19</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">20</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">21</div>
        <div class="calendar__event calendar__event--blue">
          <div class="calendar__event-time">10:00 - 12:00</div>
          <div class="calendar__event-details">
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--blue"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
          </div>
        </div>
      </div>
      <div class="calendar__day calendar__day--saturday">
        <div class="calendar__day-number calendar__day-number--blue">22</div>
      </div>
      
      <!-- Fifth row: 23-29 -->
      <div class="calendar__day calendar__day--sunday">
        <div class="calendar__day-number calendar__day-number--red">23</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">24</div>
        <div class="calendar__event calendar__event--blue">
          <div class="calendar__event-time">10:00 - 12:00</div>
          <div class="calendar__event-details">
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--blue"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--blue"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--red"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
          </div>
        </div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">25</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">26</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">27</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">28</div>
        <div class="calendar__event calendar__event--blue">
          <div class="calendar__event-time">10:00 - 12:00</div>
          <div class="calendar__event-details">
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--blue"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--blue"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
            <div class="calendar__event-detail">
              <span class="calendar__event-dot calendar__event-dot--blue"></span>
              <span class="calendar__event-text">10:00 - 12:00</span>
            </div>
          </div>
        </div>
      </div>
      <div class="calendar__day calendar__day--saturday">
        <div class="calendar__day-number calendar__day-number--blue">29</div>
      </div>
      
      <!-- Sixth row: 30-5 -->
      <div class="calendar__day calendar__day--sunday">
        <div class="calendar__day-number calendar__day-number--red">30</div>
      </div>
      <div class="calendar__day">
        <div class="calendar__day-number">31</div>
      </div>
      <div class="calendar__day calendar__day--other-month">
        <div class="calendar__day-number">1</div>
      </div>
      <div class="calendar__day calendar__day--other-month">
        <div class="calendar__day-number">2</div>
      </div>
      <div class="calendar__day calendar__day--other-month">
        <div class="calendar__day-number">3</div>
      </div>
      <div class="calendar__day calendar__day--other-month">
        <div class="calendar__day-number">4</div>
      </div>
      <div class="calendar__day calendar__day--other-month calendar__day--saturday">
        <div class="calendar__day-number">5</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component could be extended with props and data for dynamic rendering
</script>

<style scoped>
.calendar {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  width: 100%;  
}

.calendar__header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #f8f8f8;
  border-bottom: 1px solid #e0e0e0;
}

.calendar__header-day {
  text-align: center;
  padding: 10px;
  font-weight: 500;
  font-size: 14px;
}

.calendar__header-day--sunday {
  color: #e53935;
}

.calendar__header-day--saturday {
  color: #1976d2;
}

.calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* Force equal width for all columns */
  grid-auto-rows: 1fr;
  /* This ensures rows all have the same height */
}

.calendar__grid::before {
  content: '';
  width: 0;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

.calendar__grid > *:first-child {
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

.calendar__day {
  position: relative;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  min-height: 120px;
  /* Use padding-bottom to force square cells */
  padding-bottom: 100%;
  box-sizing: border-box;
}

/* Remove right border for the last column */
.calendar__day:nth-child(7n) {
  border-right: none;
}

.calendar__day-number {
  position: absolute;
  top: 5px;
  left: 10px;
  font-size: 14px;
  font-weight: 500;
}

.calendar__day-number--red {
  color: #e53935;
}

.calendar__day-number--blue {
  color: #1976d2;
}

.calendar__day--sunday {
  background-color: #fff8f8;
}

.calendar__day--saturday {
  background-color: #f8f9ff;
}

.calendar__day--today {
  background-color: #333;
  color: white;
}

.calendar__day--today .calendar__day-number {
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

.calendar__day--selected {
  position: relative;
}

.calendar__day--selected::before {
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

.calendar__day--other-month .calendar__day-number {
  color: #bbbbbb;
}

.calendar__event {
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  margin: 0 5px;
  border-radius: 4px;
  overflow: hidden;
  z-index: 0;
}

.calendar__event--grey {
  background-color: #f5f5f5;
}

.calendar__event--blue {
  background-color: #e3f2fd;
}

.calendar__event-time {
  text-align: center;
  padding: 2px 4px;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.05);
}

.calendar__event-details {
  padding: 5px;
}

.calendar__event-detail {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-bottom: 3px;
}

.calendar__event-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 5px;
  flex-shrink: 0;
}

.calendar__event-dot--grey {
  background-color: #9e9e9e;
}

.calendar__event-dot--blue {
  background-color: #1976d2;
}

.calendar__event-dot--red {
  background-color: #e53935;
}

.calendar__event-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .calendar__event-details {
    padding: 2px;
  }
  
  .calendar__day-number {
    font-size: 12px;
    top: 3px;
    left: 5px;
  }
  
  .calendar__event-time {
    font-size: 10px;
  }
  
  .calendar__event-text {
    font-size: 10px;
  }
}

@media screen and (max-width: 480px) {
  .calendar__header-day {
    font-size: 12px;
    padding: 5px;
  }
  
  .calendar__event-details {
    display: none;
  }
  
  .calendar__event-time {
    padding: 1px;
    font-size: 8px;
  }
}
</style>