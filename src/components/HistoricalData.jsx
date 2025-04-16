import React, { useEffect, useState } from 'react';
import { fetchHistoricalData } from '../services/api.js';
import './HistoricalData.css'; // Add styles for the component

const HistoricalData = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchHistoricalData();
        
        // Assuming the data returned is an array of historical records,
        // and fields might be in DynamoDB format (e.g., deviceId.S, timestamp.S)
        const formattedData = data.map(record => ({
          deviceId: record.deviceId?.S || 'Unknown',
          timestamp: record.timestamp?.S || 'Unknown',
          gasLevel: record.gasLevel?.N || '0',
          leakStatus: record.leakStatus?.BOOL ? 'Yes' : 'No',
        }));
        
        setHistoricalData(formattedData);
      } catch (err) {
        console.error('Failed to fetch historical data:', err.message);
        setError('Failed to fetch historical data');
      }
    };
    getData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (historicalData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="historical-data">
      <h1>Historical Gas Leakage Data</h1>
      <table>
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Timestamp</th>
            <th>Gas Level (ppm)</th>
            <th>Leak Status</th>
          </tr>
        </thead>
        <tbody>
          {historicalData.map((record, index) => (
            <tr key={index}>
              <td>{record.deviceId}</td>
              <td>{record.timestamp}</td>
              <td>{record.gasLevel}</td>
              <td>{record.leakStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoricalData;
