// src/services/mockApi.js
// This file can be used for development and testing without a real backend

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create a new instance of axios-mock-adapter
const mock = new MockAdapter(axios);

// Mock data for the Tokyo Dome City parking
const parkingData = {
  '2025-03-17': {
    location: '東京ドームシティ駐車場',
    scheduledTime: { start: '10:00', end: '16:00' },
    timeSlots: [
      { id: 1, start: '10:00', end: '12:00', status: 'available' },
      { id: 2, start: '12:00', end: '14:00', status: 'available' },
      { id: 3, start: '14:00', end: '16:00', status: 'available' }
    ]
  },
  '2025-03-18': {
    location: '東京ドームシティ駐車場',
    scheduledTime: { start: '10:00', end: '16:00' },
    timeSlots: [
      { id: 1, start: '10:00', end: '12:00', status: 'available' },
      { id: 2, start: '12:00', end: '14:00', status: 'available' },
      { id: 3, start: '14:00', end: '16:00', status: 'unavailable' }
    ]
  },
  '2025-03-19': {
    location: '東京ドームシティ駐車場',
    scheduledTime: { start: '10:00', end: '16:00' },
    timeSlots: [
      { id: 1, start: '10:00', end: '12:00', status: 'unavailable' },
      { id: 2, start: '12:00', end: '14:00', status: 'available' },
      { id: 3, start: '14:00', end: '16:00', status: 'available' }
    ]
  }
};

// Mock GET request for parking availability
mock.onGet(/\/api\/example\.com\/parking\/availability/).reply((config) => {
  const date = config.params.date;
  
  if (parkingData[date]) {
    // Return [status, data, headers]
    return [200, parkingData[date]];
  } else {
    // If no data for the date, create default data
    const defaultData = {
      location: '東京ドームシティ駐車場',
      scheduledTime: { start: '10:00', end: '16:00' },
      timeSlots: [
        { id: 1, start: '10:00', end: '12:00', status: 'available' },
        { id: 2, start: '12:00', end: '14:00', status: 'available' },
        { id: 3, start: '14:00', end: '16:00', status: 'available' }
      ]
    };
    return [200, defaultData];
  }
});

// Mock POST request for reservations
mock.onPost('/api/example.com/parking/reserve').reply((config) => {
  const reservationData = JSON.parse(config.data);
  
  // Simulate reservation success
  return [200, {
    success: true,
    reservationId: 'res-' + Math.random().toString(36).substr(2, 9),
    ...reservationData
  }];
});

// Mock DELETE request for cancellations
mock.onDelete(/\/api\/example\.com\/parking\/reserve\//).reply((config) => {
  // Extract reservation ID from URL
  const reservationId = config.url.split('/').pop();
  
  // Simulate cancellation success
  return [200, {
    success: true,
    message: `Reservation ${reservationId} cancelled successfully`
  }];
});

export default mock;