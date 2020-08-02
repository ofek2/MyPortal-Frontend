import React from 'react';
import './InfoForm.css';
import { Typography, Button } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';


function InfoForm() {
	return (
		<React.Fragment>
			<Typography variant="h6">שים <Favorite style={{ color: "red", position: "relative", top: "5px" }} />, <span style={{ fontWeight: "bold" }}>תהליך הרישום מורכב מכמה שלבים פשוטים:</span></Typography>
			<Typography>1) קבלת סיסמה חד-פעמיצ לכניסה ב-SMS</Typography>
			<Typography>2) רישום לתהליך האימות הדו-שלבי (MFA)</Typography>
			<Typography>3) בחירת סיסמה קבועה לשירות</Typography>
			<Typography style={{marginTop: "10px"}}>לאחר מכן, בעזרת שם המשתמש והסיסמה האישיים שלך ניתן להתחבר לכל שירותי הדיגיטל של צהל בקליק</Typography>
			<Button variant="contained" disableElevation={true} color="primary" className="idf-button" style={{ margin: "10px 0px"}}>המשך</Button>
		</React.Fragment>
	);
}

export default InfoForm;