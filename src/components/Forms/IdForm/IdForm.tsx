import React, { useState } from 'react';
import './IdForm.css';
import { Typography, InputAdornment, Grid, IconButton, CircularProgress, Container } from '@material-ui/core';
import { ClkInput } from '../../ClkInput/ClkInput';
import Send from '@material-ui/icons/Send';
import IFormProps from '../IForm';
import RestService from '../../../services/rest/RestService';
import { Alert } from '@material-ui/lab';
import { ERRORS, MY_IDF } from '../../../model/data/Constants';
import ReCAPTCHA from "react-google-recaptcha";
import config from "../../../model/data/Configuration";

function IdForm(props: IFormProps) {
	// State & props
	const { onResolve } = props;
	const [error, setError] = useState<any>({ msg: '', severity: 'error' });
	const [isLoading, setIsLoading] = useState(false);
	const [idInput, setIdInput] = useState('');
	const [captchToken, setCaptchToken] = useState('');

	// Methodes
	const isFormValid = (id: string) => {
		return isValidIsraeliID(id) && isCaptchaChecked();
	}

	const handleVerify = (token) => {
		setCaptchToken(token);
	}

	const isCaptchaChecked = () => {
		return captchToken !== "" && captchToken !== null;
	}

	const isValidIsraeliID = (id: string) => {
		id = String(id).trim();
		if (id.length !== 9 || +id === 0) return false;
	
		// Pad string with zeros up to 9 digits
		// id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

		return Array
			.from(id, Number)
				.reduce((counter, digit, i) => {
				const step = digit * ((i % 2) + 1);
						return counter + (step > 9 ? step - 9 : step);
					}) % 10 === 0;
	}

	const isValidIdInput = (id: string) => {
		const isInputNumber = /^\d*$/.test(id);

		return isInputNumber;
	}

	const checkIsUserExist = async () => {
		setError({ msg: '', severity: 'error' });
		setIsLoading(true);

		try {
			// const captchaValue = captchaRef?.current?.getValue();
			const captchaValue = captchToken;
			const data = await RestService.checkUser(idInput, captchaValue);

			setIsLoading(false);

			onResolve({id: idInput, mobilePhone: data.mobilePhone});
		} catch (err) {
			setIsLoading(false);
			console.log(err)
			setError({
				msg: ERRORS.general,
				severity: 'error'
			});
		}
	}

	// Handlers
	const onChange = (value: any) => {
		const idFromInput = value.target.value;

		if (isValidIdInput(idFromInput)) {
			setIdInput(idFromInput);
		}
	}

	const onClick = async (event) => {
		event.preventDefault();

		if (!isLoading) {
			if (!isCaptchaChecked()){
				setError({
					msg: ERRORS.requiredCaptcha,
					severity: 'error'
				});
				return;
			}
			if (!isFormValid(idInput)) {
				setError({
					msg: ERRORS.invalidId,
					severity: 'error'
				});
				return;
			}

			setIsLoading(true);
			await checkIsUserExist();
		}
	}
	
	// Rendering
	return (
	<>
		<Container maxWidth="sm">
			<Typography variant="h3" style={{ fontWeight: "bold", marginBottom: 10 }}>ברוכים הבאים</Typography>

			<Typography className="bold">שירותי הדיגיטל של צה"ל עוברים להזדהות חכמה!</Typography>
			<Typography>כאן ניתן ליצור באופן עצמאי ובקלות, משתמש {MY_IDF}.</Typography>
			<Typography style={{marginTop: 20}}>להתחלת תהליך הרישום ולצורך אימות מול מערכת כח האדם,</Typography>
			<Typography>יש להזין מספר תעודת זהות מלא באורך 9 ספרות:</Typography>
			<Grid container direction="column" justifyContent="center" alignItems="center" style={{ margin: "10px 0px" }}>
				<Grid item md={6}>
					<form noValidate onSubmit={onClick}>
						<ClkInput onChange={onChange} value={idInput} endAdornment={
							<InputAdornment position="end" onClick={onClick}>
								{
									isLoading ?
										<CircularProgress color="primary" size={23} thickness={7} style={{ marginLeft: "10px", cursor: "default" }} />
										:
										<IconButton size="small">
											<Send className="login-send-icon" />
										</IconButton>
								}
							</InputAdornment>
						} placeholder={"הכנס תעודת זהות"} autoFocus={false} fullWidth />
					</form>
				</Grid>
				<Grid item xs={12}>
					{
						error && error.msg !== '' ?
							<Alert severity={error.severity} >
								{error.msg}
							</Alert> :
							<React.Fragment />
					}
				</Grid>
			</Grid>
		</Container>
		<ReCAPTCHA hl="iw" style={{marginTop: 10}} sitekey={config.captchaSiteKey} onChange={handleVerify}/>
	</>
	);
}

export default IdForm;