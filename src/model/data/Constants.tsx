import React from 'react';
import { Typography } from '@material-ui/core';
import config from "./Configuration";

// GraphApi
export const GRAPH_REQUEST = {
	scopes: ["user.read"]

};
export const LOGIN_REQUEST = {
	prompt: "login",
	scopes: config.msalScopes
};
export const CLICK_API_REQUEST = {
	scopes: config.clickApiScopes
};

// Click Domain
export const CLICK_DOMAIN = "idf.il";


export const SUPPORT_INFO = 
<React.Fragment>
	<Typography>צור קשר עם מוקד התמיכה:</Typography>
	<Typography>צור קשר עם מוקד התמיכה במס' 1111 ובחר את השלוחה המתאימה עבורך –</Typography>
	<Typography>מתגייסים – שלוחה 1, משרתים – שלוחה 0, מילואים – שלוחה 4</Typography>
</React.Fragment>

// Errors
export const ERRORS = {
	general: 
	<React.Fragment>
		<Typography className="bold">נתקלנו בשגיאה לא צפויה</Typography>
		{SUPPORT_INFO}
	</React.Fragment>,
	smsError: 
	<React.Fragment>
		<Typography className="bold">לא הצלחנו לשלוח לך סיסמה ב-SMS</Typography>
		{SUPPORT_INFO}
	</React.Fragment>,

	invalidId: "מספר תעודת זהות אינו תקין",
	invalidOtp: "הקוד שהוזן איננו תואם, אנא נסה שנית.",

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
	

	passwordResetsExceededLimit: "ניצלת את כל נסיונות איפוס הסיסמה שלך, אנא פנה למוקד התמיכה לקבלת עזרה"
	
}

export const idToUpn = (id) => `${id}@${CLICK_DOMAIN}`