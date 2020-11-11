import React, { useState, useEffect } from 'react';
import './PhoneForm.css';
import { Typography, Button, Grid, CircularProgress } from '@material-ui/core';
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
	const [error, setError] = useState<any>({ msg: '' });
	const [isResettingPassword, setIsResettingPassword] = useState(false);
	const [isLoadingFirstTime, setIsLoadingFirstTime] = useState(false);

	useEffect(() => {
		onInit();
	}, [])

	const onInit = async () => {
		setIsLoadingFirstTime(true);
		// await onSendAgainClick();
		// setIsLoadingFirstTime(false);
	}
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
		setError({msg: ''})
		setIsResettingPassword(true);
		try {
			// const requestToken = jwt.sign({ secret: payload.secret }, otp);

			const {succeeded} = await RestService.resetUserPassword();
			setIsResettingPassword(false);

			if (!succeeded) {
				setError({msg: ERRORS.passwordResetsExceededLimit});
			}
		} catch (err) {
			setError({ msg: ERRORS.smsError });
			setIsResettingPassword(false);
		}
	}

	// Rendering
	return (
		<React.Fragment>
		{
			isLoadingFirstTime ? 
			<Grid container item xs={12} justify="center" alignItems="center" spacing={2}>
				<Grid item xs={12}>
					<CircularProgress size={48}/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h6">מכין עבורך את משתמש ה MyIDF שלך,</Typography>
					<Typography variant="h6">אנא המתן מספר רגעים..</Typography>
				</Grid>
			</Grid>
			
			: 
		
		<React.Fragment>
			<Typography>נשלחה אליך סיסמה חד-פעמית לכניסה למספר הבא:</Typography>
			<CensorPhone phone={payload.mobilePhone} stringToReplace="X" />
			<Grid container item xs={12} justify="center" alignItems="center">
				<Button variant="contained" onClick={onContinueClick} disableElevation={true} color="primary" className="idf-button" style={{ margin: "10px 0px", marginLeft: "20px" }}>קיבלתי, אפשר להמשיך</Button>
				<LoadingButton isLoading={isResettingPassword} variant="contained" onClick={onSendAgainClick} disableElevation={true} className="idf-button-secondary" style={{ margin: "10px 0px", backgroundColor: "#333" }}>שלחו לי שוב</LoadingButton>
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
			<Grid item xs={12}>
				<Typography variant="subtitle1" className="bold support-section">זהו אינו מספר הטלפון הנייד שלך?</Typography>
				<Typography variant="body2">צור קשר עם מוקד התמיכה במס' 1111 ובחר את השלוחה המתאימה עבורך</Typography>
				<Typography variant="body2">מתגייסים - שלוחה 1, משרתים - שלוחה 0, מילואים - שלוחה 4</Typography>
			</Grid> 
		</React.Fragment>
		}
		</React.Fragment>
	);
}

export default PhoneForm;