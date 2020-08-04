import React from 'react';
import { Typography } from '@material-ui/core';

// GraphApi
export const GRAPH_REQUEST = {
	scopes: ["user.read"]

};
export const LOGIN_REQUEST = {
	prompt: "login",
	scopes: ["user.read", "openid"]
};

// Click Domain
export const CLICK_DOMAIN = "idf.il";

// Errors
export const ERRORS = {
	general: "הרתה תקלה, אנה נסה שנית במועד מאוחר יותר",

	invalidId: "מספר תעודת זהות אינו תקין",

	userNotExists: 
	<React.Fragment>
		<Typography className="bold">לא הצלחנו לאמת את זהותך</Typography>
		<Typography>צור קשר עם מוקד התמיכה במס' 1111 ובחר את השלוחה המתאימה עבורך –</Typography>
		<Typography>מתגייסים – שלוחה 1, משרתים – שלוחה 0, מילואים – שלוחה 4</Typography>
	</React.Fragment>,

	userAlreadyRegistered: (upn) => {
		return (
		<React.Fragment>
				<Typography className="bold">חדשות טובות!</Typography>
				<Typography className="bold">אתה כבר רשום למערכת :)</Typography>
				<Typography className="bold" style={{marginTop: "10px"}}>שם המשתמש האישי שלך הינו:</Typography>
				<Typography className="english-font" dir="ltr">{upn}</Typography>
				<Typography style={{marginTop: "10px"}}>לא זוכר את הסיסמה? ניתן לאפס אותה <a href="https://passwordreset.microsoftonline.com/">כאן</a></Typography>
		</React.Fragment>
		)
	},

	smsError: "לא הצלחנו לשלוח לך סיסמה ב-SMS"
	
}

export const SUPPORT_INFO = 
<React.Fragment>
	<Typography>צור קשר עם מוקד התמיכה:</Typography>
	<Typography>משרתי מילואים – טלפון מס' 1111 שלוחה 4</Typography>
	<Typography>משרתים פעילים – באמצעות הודעת WhatsApp למס': <a href="https://api.whatsapp.com/send?phone=9720529436631">052-9436631</a></Typography>
</React.Fragment>




