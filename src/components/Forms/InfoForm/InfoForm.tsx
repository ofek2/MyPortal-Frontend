import React, { useState } from 'react';
import './InfoForm.css';
import { Typography, Grid } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import IFormProps from '../IForm';
import RestService from '../../../services/rest/RestService';
import { Alert } from '@material-ui/lab';
import { SUPPORT_INFO, ERRORS } from '../../../model/data/Constants';
import LoadingButton from '../../Buttons/LoadingButton';

function InfoForm(props: IFormProps) {
	// State & props
	const { onResolve, payload } = props;
	const [error, setError] = useState<any>({ msg: '' });
	const [isResettingPassword, setIsResettingPassword] = useState(false);

	// Handlers
	const onClick = async () => {
		const { id } = payload;

		setIsResettingPassword(true);
		
		try {
			await RestService.resetUserPassword(id);
			setIsResettingPassword(false);
			onResolve(payload);
		} catch (err) {
			setIsResettingPassword(false);

			setError({
				msg: ERRORS.general
			});
		}
	}

	// Rendering
	return (
		<React.Fragment>
			<Typography variant="h5" className="bold">שים <Favorite style={{ color: "red", position: "relative", top: "5px" }} />, <span>תהליך הרישום מורכב מכמה שלבים פשוטים:</span></Typography>
			<Grid item sm={6} xs={12}>
				<Typography align="left">1) קבלת סיסמה חד-פעמית לכניסה ב-SMS</Typography>
				<Typography align="left">2) רישום לתהליך האימות הדו-שלבי</Typography>
				<Typography align="left">3) בחירת סיסמה קבועה לשירות</Typography>
			</Grid>
			<Typography style={{ marginTop: "10px" }}>לאחר מכן, בעזרת שם המשתמש והסיסמה האישיים שלך ניתן להתחבר לכל שירותי הדיגיטל של צה"ל בקליק.</Typography>
			
			<LoadingButton isLoading={isResettingPassword} variant="contained" onClick={onClick} disabled={isResettingPassword} disableElevation={true} color="primary" className="idf-button" style={{ margin: "10px 0px" }}>קבל סיסמה</LoadingButton>
			{
				error && error.msg !== '' ?
					<Grid container direction="column" justify="center" alignItems="center" style={{ margin: "10px 0px" }}>
						<Grid item xs={12} sm={8}>
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