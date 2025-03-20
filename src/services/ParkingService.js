// src/services/ParkingService.js
import axios from 'axios';

const API_BASE_URL = 'https://api.example.com/parking'; // Replace with your actual API endpoint

class ParkingService {
  /**
   * Get parking data for a specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise} Promise with parking data
   */
  static async getParkingData(date) {
    try {
      const response = await axios.get(`${API_BASE_URL}/availability`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  /**
   * Reserve a parking time slot
   * @param {Object} reservationData - Reservation details
   * @returns {Promise} Promise with reservation confirmation
   */
  static async reserveTimeSlot(reservationData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/reserve`, reservationData);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  /**
   * Cancel an existing reservation
   * @param {string} reservationId - ID of the reservation to cancel
   * @returns {Promise} Promise with cancellation confirmation
   */
  static async cancelReservation(reservationId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/reserve/${reservationId}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

export default ParkingService;