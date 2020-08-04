import React from 'react';
import './Header.css';
import { AppBar, Toolbar } from '@material-ui/core';
import Logo from '../../assets/images/idf.png';

function Header() {
	return (
		<AppBar position="fixed" style={{backgroundColor: "white"}}>
			<Toolbar>
				<img alt="לוגו" src={Logo} className="header-logo" />
			</Toolbar>
		</AppBar>
	);
}

export default Header;