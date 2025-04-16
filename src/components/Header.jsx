import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css';

const Header = () => {
	return (
		<header className="header">
			<Link to="/" className="logo-link"> {/* Add link to the home page */}
				<img src="/logo.png" alt="Gas Leakage Detection Logo" className="logo" />
			</Link>
			<h1 className="title">Gas Leakage Detection and Alert System</h1>
			<nav className="nav-buttons">
				<Link to="/dashboard" className="nav-link">Dashboard</Link> {/* Ensure this is correct */}
				<Link to="/historical-data" className="nav-link">Historical Data</Link>
				<Link to="/alerts" className="nav-link">Alert and Notifications</Link>
			</nav>
		</header>
	);
};

export default Header;
