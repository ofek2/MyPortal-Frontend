import React from 'react';
import './InfoForm.css';
import { Typography, Grid, Button } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import IFormProps from '../IForm';

function InfoForm(props: IFormProps) {
	// State & props
	const { onResolve, payload } = props;

	// Handlers
	const onClick = async () => {
		onResolve(payload);
	}

	// Rendering
	return (
		<React.Fragment>
			{/* <Typography variant="h5" className="bold">שים <Favorite style={{ color: "red", position: "relative", top: "5px" }} />, <span>תהליך הרישום מורכב מכמה שלבים פשוטים:</span></Typography>
			<Grid item sm={6} xs={12}>
				<Typography align="left">1) קבלת סיסמה חד-פעמית לכניסה ב-SMS</Typography>
				<Typography align="left">2) רישום לתהליך האימות הדו-שלבי</Typography>
				<Typography align="left">3) בחירת סיסמה קבועה לשירות</Typography>
			</Grid>
			<Typography style={{ marginTop: "10px" }}>לאחר מכן, בעזרת שם המשתמש והסיסמה האישיים שלך ניתן להתחבר לכל שירותי הדיגיטל של צה"ל בקליק.</Typography>
			 */}
			 <Typography>שירותי הדיגיטל של צה"ל שומרים על רמת אבטחה גבוהה</Typography>
			 <Typography>ולכן, ההזדהות החכמה של MY IDF כוללת אימות דו-שלבי באמצעות הודעת SMS.</Typography>
			 <Typography className="bold" style={{marginTop: 10}}>לסיום תהליך הרישום, נצטרך לאמת את זהותך עוד פעם אחת:</Typography>
			<Button variant="contained" onClick={onClick} disableElevation={true} color="primary" className="idf-button" style={{ margin: "10px 0px" }}>קבל סיסמה</Button>
		</React.Fragment>
	);
}

export default InfoForm;