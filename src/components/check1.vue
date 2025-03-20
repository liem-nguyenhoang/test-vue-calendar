<template>
  <div class="parking-reservation">
    <div class="parking-reservation__location-selector">
      <select class="parking-reservation__dropdown">
        <option selected>東京ドームシティ駐車場</option>
      </select>
    </div>

    <div class="parking-reservation__date-selector">
      <button class="parking-reservation__back-button">
        <span class="parking-reservation__back-icon">&lt;</span>
      </button>
      <div class="parking-reservation__date">2025年3月18日</div>
    </div>

    <div class="parking-reservation__content">
      <div class="parking-reservation__section">
        <div class="parking-reservation__label">貸出予定時間</div>
        <div
          class="parking-reservation__time-range parking-reservation__time-range--available"
        >
          10:00 - 16:00
        </div>
      </div>

      <div class="parking-reservation__section">
        <div class="parking-reservation__label">予約時間</div>
        <div class="parking-reservation__time-slots">
          <div class="parking-reservation__time-slot">
            <div
              class="parking-reservation__time-indicator parking-reservation__time-indicator--available"
            ></div>
            <div class="parking-reservation__time-text">10:00 - 12:00</div>
          </div>

          <div class="parking-reservation__time-slot">
            <div
              class="parking-reservation__time-indicator parking-reservation__time-indicator--available"
            ></div>
            <div class="parking-reservation__time-text">12:00 - 14:00</div>
          </div>

          <div class="parking-reservation__time-slot">
            <div
              class="parking-reservation__time-indicator parking-reservation__time-indicator--unavailable"
            ></div>
            <div class="parking-reservation__time-text">14:00 - 16:00</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic would go here
</script>

<style scoped>
.parking-reservation {
  font-family: sans-serif;
  max-width: 480px;
  margin: 0 auto;
  background-color: #f5f5f5;
  border-radius: 16px;
  padding: 20px;
}

.parking-reservation__location-selector {
  margin-bottom: 20px;
}

.parking-reservation__dropdown {
  width: 100%;
  padding: 15px;
  border-radius: 25px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 15px;
}

.parking-reservation__date-selector {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.parking-reservation__back-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 40px;
  height: 40px;
}

.parking-reservation__date {
  flex-grow: 1;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}

.parking-reservation__section {
  margin-bottom: 20px;
}

.parking-reservation__label {
  font-size: 14px;
  margin-bottom: 10px;
}

.parking-reservation__time-range {
  text-align: center;
  padding: 15px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 18px;
}

.parking-reservation__time-range--available {
  background-color: #d9edf7;
  color: #31708f;
}

.parking-reservation__time-slots {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.parking-reservation__time-slot {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #ddd;
}

.parking-reservation__time-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}

.parking-reservation__time-indicator--available {
  background-color: #1e88e5;
}

.parking-reservation__time-indicator--unavailable {
  background-color: #e53935;
}

.parking-reservation__time-text {
  flex-grow: 1;
  font-size: 16px;
}
</style>
