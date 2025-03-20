// services/calendarApi.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const calendarService = {
  /**
   * Fetch calendar events for a specific date range
   * @param {Date} startDate - Start date for the events
   * @param {Date} endDate - End date for the events
   * @returns {Promise} Promise containing event data
   */
  async fetchEvents(startDate, endDate) {
    try {
      // Format dates as ISO strings for the API
      const start = startDate.toISOString();
      const end = endDate.toISOString();
      
      const response = await apiClient.get('/events', {
        params: { start, end }
      });
      
      return response.data.map(event => ({
        id: event.id,
        title: event.title,
        start: new Date(event.startTime),
        end: new Date(event.endTime),
        color: event.color || '#1976d2',
        allDay: event.allDay || false,
        description: event.description || '',
        location: event.location || ''
      }));
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw error;
    }
  },
  
  /**
   * Create a new calendar event
   * @param {Object} eventData - Event data object
   * @returns {Promise} Promise containing created event data
   */
  async createEvent(eventData) {
    try {
      const response = await apiClient.post('/events', eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw error;
    }
  },
  
  /**
   * Update an existing calendar event
   * @param {string} eventId - ID of the event to update
   * @param {Object} eventData - Updated event data object
   * @returns {Promise} Promise containing updated event data
   */
  async updateEvent(eventId, eventData) {
    try {
      const response = await apiClient.put(`/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      console.error('Error updating calendar event:', error);
      throw error;
    }
  },
  
  /**
   * Delete a calendar event
   * @param {string} eventId - ID of the event to delete
   * @returns {Promise} Promise containing success status
   */
  async deleteEvent(eventId) {
    try {
      const response = await apiClient.delete(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      throw error;
    }
  }
};