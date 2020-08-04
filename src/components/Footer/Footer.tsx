import React from 'react';
import Buildings from '../../assets/images/building.png';
import './Footer.css';

function Footer() {
	return (
		<div className="footer-container" style={{backgroundImage: `url(${Buildings})`}}/>
	);
}

export default Footer;