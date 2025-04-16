// src/services/api.js
import axios from 'axios';

// Make sure this environment variable is defined in your .env file
const API_BASE_URL = 'https://81mlye8ua4.execute-api.eu-north-1.amazonaws.com/leakage';  // Update this to your API URL

// Fetch real-time gas data
export const fetchGasData = async () => {
  try {
    // Use the '/dashboard' route for real-time gas data
    const response = await axios.get(`${API_BASE_URL}/dashboard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching gas data:', error.message);
    throw error;
  }
};

// Fetch historical gas data (assuming this is a valid endpoint, e.g., /dashboard/historical)
export const fetchHistoricalData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard/historical`);  // Assuming historical data is at /dashboard/historical
    return response.data;
  } catch (error) {
    console.error('Error fetching historical data:', error.message);
    throw error;
  }
};

// Fetch gas leak alerts (assuming this is a valid endpoint, e.g., /dashboard/alerts)
export const fetchAlerts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard/alerts`);  // Assuming alerts endpoint is at /dashboard/alerts
    console.log("Fetched alerts:", response.data); // For debugging
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error.message);
    throw error;
  }
};
