import React, { useEffect, useState } from 'react';
import { fetchGasData } from '../services/api.js';

const Dashboard = () => {
  const [gasData, setGasData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchGasData();
        
        // Log the data to verify its structure
        console.log('Fetched Data:', data);

        // Assuming the data is an array and we take the first item
        const formattedData = data.length > 0 ? data[0] : {};

        // Map the response to the desired structure
        setGasData({
          deviceId: formattedData.device_id?.S || 'N/A',
          timestamp: formattedData.timestamp?.S || 'N/A',
          gasLevel: formattedData.gas_level?.N ? parseInt(formattedData.gas_level.N) : 0,
          leakStatus: formattedData.status?.S === 'Leak Detected' ? true : false,
        });
      } catch (err) {
        console.error('Failed to fetch gas data:', err.message);
        setError('Failed to fetch gas data');
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>🚀 Gas Leakage Monitoring Dashboard</h1>
      <p>
        Your central hub for monitoring gas levels in real-time, tracking historical data, 
        and managing alerts. Stay informed and ensure safety with immediate access to critical information.
      </p>
      <hr />
      {error ? (
        <div>
          <h2>Error</h2>
          <p>Failed to fetch gas data. Please try again later.</p>
        </div>
      ) : !gasData ? (
        <div>
          <h2>Loading...</h2>
          <p>Fetching the latest gas data. Please wait.</p>
        </div>
      ) : (
        <>
          <h2>Current Gas Data</h2>
          <p><strong>Device ID:</strong> {gasData.deviceId}</p>
          <p><strong>Timestamp:</strong> {gasData.timestamp}</p>
          <p><strong>Gas Level (ppm):</strong> {gasData.gasLevel}</p>
          <p><strong>Leak Status:</strong> {gasData.leakStatus ? 'Yes' : 'No'}</p>
        </>
      )}
    </div>
  );
};

export default Dashboard;
