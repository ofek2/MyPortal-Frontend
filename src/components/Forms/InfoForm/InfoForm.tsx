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
	const [error, setError] = useState<any>({ msg: '' });

	// Handlers
	const onClick = async () => {
		const { id } = payload;

		try {
			await RestService.resetUserPassword(id);

			onResolve(payload);
		} catch (err) {
			setError({
				msg:
					<React.Fragment>
						<Typography>צור קשר עם מוקד התמיכה:</Typography>
						<Typography>משרתי מילואים – טלפון מס' 1111 ß שלוחה 4</Typography>
						<Typography>משרתים פעילים – באמצעות הודעת WhatsApp למס': <a href="https://api.whatsapp.com/send?phone=9720529436631">052-9436631</a>052-9436631</Typography>
					</React.Fragment>
			});
		}
	}

	// Rendering
	return (
		<React.Fragment>
			<Typography variant="h6">שים <Favorite style={{ color: "red", position: "relative", top: "5px" }} />, <span style={{ fontWeight: "bold" }}>תהליך הרישום מורכב מכמה שלבים פשוטים:</span></Typography>
			<Grid item xs={6}>
				<Typography align="left">1) קבלת סיסמה חד-פעמית לכניסה ב-SMS</Typography>
				<Typography align="left">2) רישום לתהליך האימות הדו-שלבי</Typography>
				<Typography align="left">3) בחירת סיסמה קבועה לשירות</Typography>
			</Grid>
			<Typography style={{ marginTop: "10px" }}>לאחר מכן, בעזרת שם המשתמש והסיסמה האישיים שלך ניתן להתחבר לכל שירותי הדיגיטל של צה"ל בקליק.</Typography>
			<Button variant="contained" onClick={onClick} disableElevation={true} color="primary" className="idf-button" style={{ margin: "10px 0px" }}>קבל סיסמה</Button>
			{
				error && error.msg !== '' ?
					<Grid container direction="column" justify="center" alignItems="center" style={{ margin: "10px 0px" }}>
						<Grid item xs={12}>

							<Alert severity="error" >
								{error.msg}
							</Alert>
						</Grid>
					</Grid> :
					<React.Fragment />
			}
		</React.Fragment>
	);
}

export default InfoForm;