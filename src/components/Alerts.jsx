import React, { useEffect, useState } from 'react';
import { fetchAlerts } from '../services/api.js'; // Add an API function to fetch alerts
import './Alerts.css'; // Add styles for the Alerts component

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAlerts();
        
        // Assuming the data returned is an array of alerts
        // and the fields might be in DynamoDB format (e.g., deviceId.S, timestamp.S)
        const formattedAlerts = data.map(alert => ({
          deviceId: alert.deviceId?.S || 'Unknown',
          timestamp: alert.timestamp?.S || 'Unknown',
          message: alert.message?.S || 'No message',
        }));
        
        setAlerts(formattedAlerts);
      } catch (err) {
        console.error('Failed to fetch alerts:', err.message);
        setError('Failed to fetch alerts');
      }
    };
    getData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (alerts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="alerts">
      <h1>Alerts and Notifications</h1>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>
            <strong>Device ID:</strong> {alert.deviceId} | 
            <strong> Timestamp:</strong> {alert.timestamp} | 
            <strong> Message:</strong> {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
