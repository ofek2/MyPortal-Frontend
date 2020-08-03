import React, { useState } from 'react';
import './InfoForm.css';
import { Typography, Button, Grid } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import IFormProps from '../IForm';
import RestService from '../../../services/rest/RestService';
import { Alert } from '@material-ui/lab';

function InfoForm(props: IFormProps) {
	// State & props
	const { onResolve, payload } = props;
	const [error, setError] = useState({ msg: '' });

	// Handlers
	const onClick = async () => {
		const { id } = payload;

		try {
			await RestService.resetUserPassword(id);

			onResolve(payload);
		} catch (err) {
			setError({
				msg: "הרתה תקלה בשליחת ה-SMS, אנה פנה למוקד התמיכה ב-1111 שלוחה מספר 4"
			});
		}
	}

	// Rendering
	return (
		<React.Fragment>
			<Typography variant="h6">שים <Favorite style={{ color: "red", position: "relative", top: "5px" }} />, <span style={{ fontWeight: "bold" }}>תהליך הרישום מורכב מכמה שלבים פשוטים:</span></Typography>
			<Grid item xs={6}>
				<Typography align="left">1) קבלת סיסמה חד-פעמית לכניסה ב-SMS</Typography>
				<Typography align="left">2) רישום לתהליך האימות הדו-שלבי (MFA)</Typography>
				<Typography align="left">3) בחירת סיסמה קבועה לשירות</Typography>
			</Grid>
			<Typography style={{ marginTop: "10px" }}>לאחר מכן, בעזרת שם המשתמש והסיסמה האישיים שלך ניתן להתחבר לכל שירותי הדיגיטל של צהל בקליק</Typography>
			<Button variant="contained" onClick={onClick} disableElevation={true} color="primary" className="idf-button" style={{ margin: "10px 0px" }}>קבל סיסמה</Button>
			<Grid container direction="column" justify="center" alignItems="center" style={{ margin: "10px 0px" }}>
				<Grid item xs={12}>
					{
						error && error.msg !== '' ?
							<Alert severity="error" >
								{error.msg}
							</Alert> :
							<React.Fragment />
					}
				</Grid>
			</Grid>

		</React.Fragment>
	);
}

export default InfoForm;