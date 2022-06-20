import { Typography } from "@material-ui/core"
import { SUPPORT_INFO } from "../General/General"


export const ERRORS = {
	general: 
	<>
		<Typography className="bold">נתקלנו בשגיאה לא צפויה</Typography>
		{SUPPORT_INFO}
	</>,
	smsError: 
	<>
		<Typography className="bold">לא הצלחנו לשלוח לך סיסמה ב-SMS</Typography>
		{SUPPORT_INFO}
	</>,

	invalidId: "מספר תעודת זהות אינו תקין",
	invalidCode: "הקוד שהוזן איננו תואם, אנא נסה שנית.",
	requiredCaptcha: `אנא לחץ על כפתור "אני לא רובוט"`,

	userAlreadyRegistered: (upn) => {
		return (
		<>
				<Typography className="bold">חדשות טובות!</Typography>
				<Typography className="bold">אתה כבר רשום למערכת :)</Typography>
				<Typography className="bold" style={{marginTop: "10px"}}>שם המשתמש האישי שלך הינו:</Typography>
				<Typography className="english-font" dir="ltr">{upn}</Typography>
				<Typography style={{marginTop: "10px"}}>לא זוכר את הסיסמה? ניתן לאפס אותה <a href="https://passwordreset.microsoftonline.com/">כאן</a></Typography>
		</>
		)
	},
	

	passwordResetsExceededLimit: "ניצלת את כל נסיונות איפוס הסיסמה שלך, אנא פנה למוקד התמיכה לקבלת עזרה"
	
}