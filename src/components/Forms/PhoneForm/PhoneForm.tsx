import React from 'react';
import './PhoneForm.css';
import { Typography, Button } from '@material-ui/core';
import IFormProps from '../IForm';
import CensorPhone from '../../CensorPhone/CensorPhone';
import MsService from '../../../services/microsoft/MsService';
import { CLICK_DOMAIN } from '../../../model/data/Constants';
import RestService from '../../../services/rest/RestService';

function PhoneForm(props: IFormProps) {
	// State & props
	const { onResolve, payload } = props;

	// Handlers
	const onContinueClick = async () => {
		const {id} = payload;

		try {
			await MsService.login(`${id}@${CLICK_DOMAIN}`);
		} catch(err) {
			console.log(err);
		}
	}

	const onSendAgainClick = async () => {
		const { id } = payload;

		try {
			await RestService.resetUserPassword(id);

			onResolve(payload);
		} catch (err) {
			console.log(err);
		}
	}

	// Rendering
	return (
		<React.Fragment>
			<Typography >שלחנו סיסמת כניסה חד-פעמית למספר הבא:</Typography>
			<CensorPhone phone={payload.mobilePhone} stringToReplace="X"/>
			<Button variant="contained" onClick={onContinueClick} disableElevation={true} color="primary" className="idf-button" style={{ margin: "10px 0px", marginLeft: "20px" }}>קיבלתי, בואו נמשיך</Button>
			<Button variant="contained" onClick={onSendAgainClick} disableElevation={true} className="idf-button-secondary" style={{ margin: "10px 0px", backgroundColor: "#333", color: "white !important" }}>שלחו לי שוב</Button>
			<Typography>זהו אינו מספר הפלאפון שלך?</Typography>
			<Typography>צור קשר עם מוקד התמיכה במספר 1111, שלוחה 4</Typography>
		</React.Fragment>
	);
}

export default PhoneForm;