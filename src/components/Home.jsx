import React from 'react';
import './Home.css'; // Import styles for the Home component

const Home = () => {
	return (
		<div className="home">
			<h1>Welcome to the Gas Leakage Detection and Alert System</h1>
			<p>
				This system helps monitor gas levels in real-time and alerts you in case of a leak. 
				Stay safe and secure with our advanced detection technology.
			</p>
			<img src="/alert.png" alt="Gas Leakage Detection Alert" className="home-logo" />
		</div>
	);
};

export default Home;
