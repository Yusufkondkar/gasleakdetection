import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Ensure Link is imported
import Alerts from './components/Alerts'; // Import the Alerts component
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import HistoricalData from './components/HistoricalData'; // Import the HistoricalData component
import Home from './components/Home'; // Import the Home component

const App = () => {
	return (
		<Router>
			<div>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/dashboard" element={<Dashboard />} /> {/* Ensure this is correct */}
					<Route path="/historical-data" element={<HistoricalData />} />
					<Route path="/alerts" element={<Alerts />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
