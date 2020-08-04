import React, { useState } from 'react';
import './PhoneForm.css';
import { Typography, Button, Grid } from '@material-ui/core';
import IFormProps from '../IForm';
import CensorPhone from '../../CensorPhone/CensorPhone';
import MsService from '../../../services/microsoft/MsService';
import { CLICK_DOMAIN, ERRORS } from '../../../model/data/Constants';
import RestService from '../../../services/rest/RestService';
import { Alert } from '@material-ui/lab';
import LoadingButton from '../../Buttons/LoadingButton';

function PhoneForm(props: IFormProps) {
	// State & props
	const { payload } = props;
	const [error, setError] = useState({ msg: '' });
	const [isResettingPassword, setIsResettingPassword] = useState(false);


	// Handlers
	const onContinueClick = async () => {
		const { id } = payload;

		try {
			await MsService.login(`${id}@${CLICK_DOMAIN}`);
		} catch (err) {
			setError({ msg: ERRORS.general })
		}
	}

	const onSendAgainClick = async () => {
		const { id } = payload;

		setIsResettingPassword(true);
		try {
			await RestService.resetUserPassword(id);
			setIsResettingPassword(false);
		} catch (err) {
			setError({ msg: ERRORS.smsError })
			setIsResettingPassword(false);
		}
	}

	// Rendering
	return (
		<React.Fragment>
			<Typography>נשלחה אליך סיסמה חד-פעמית לכניסה למספר הבא:</Typography>
			<CensorPhone phone={payload.mobilePhone} stringToReplace="X" />
			<Grid container item xs={12} justify="center" alignItems="center">
				<Button variant="contained" onClick={onContinueClick} disableElevation={true} color="primary" className="idf-button" style={{ margin: "10px 0px", marginLeft: "20px" }}>קיבלתי, בואו נמשיך</Button>
				<LoadingButton isLoading={isResettingPassword} variant="contained" onClick={onSendAgainClick} disableElevation={true} className="idf-button-secondary" style={{ margin: "10px 0px", backgroundColor: "#333", color: "white !important" }}>שלחו לי שוב</LoadingButton>
			</Grid>
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

			<Typography variant="h6" className="bold">זהו אינו מספר הטלפון הנייד שלך?</Typography>
			<Typography>צור קשר עם מוקד התמיכה:</Typography>
			<Typography>משרתי מילואים – טלפון מס' 1111  שלוחה 4</Typography>
			<Typography>משרתים פעילים – יש לעדכן את הטלפון אצל גורמי המשא"ן ביחידה ולנסות לאחר 24 שעות</Typography>
		</React.Fragment>
	);
}

export default PhoneForm;