import { Typography } from "@material-ui/core"
import { SUPPORT_INFO } from "../General/General"


export const ERRORS = {
	general: 
	<>
		<Typography className="bold">לצערנו, נתקלנו בשגיאה לא צפויה</Typography>
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
	passwordResetsExceededLimit: "ניצלת את כל נסיונות איפוס הסיסמה שלך, אנא פנה למוקד התמיכה לקבלת עזרה"
	
}