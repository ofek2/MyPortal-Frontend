import React from 'react';
import './PhoneForm.css';
import { Typography, Button } from '@material-ui/core';

function PhoneForm() {
	return (
		<React.Fragment>
			<Typography >שלחנו סיסמת כניסה חד-פעמית למספר הבא:</Typography>
			<Typography variant="h5">xxx-xxx-xx08</Typography>
			<Button variant="contained" disableElevation={true} color="primary" className="idf-button" style={{ margin: "10px 0px", marginLeft: "20px" }}>קיבלתי, בואו נמשיך</Button>
			<Button variant="contained" disableElevation={true} className="idf-button-secondary" style={{ margin: "10px 0px", backgroundColor: "#333", color: "white !important" }}>שלחו לי שוב</Button>
			<Typography>זהו אינו מספר הפלאפון שלך?</Typography>
			<Typography>צור קשר עם מוקד התמיכה במספר 1111, שלוחה 4</Typography>
		</React.Fragment>
	);
}

export default PhoneForm;