import React, { useRef, useState } from 'react';
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
import MsService from '../../../services/microsoft/MsService';

function IdForm(props: IFormProps) {
	// State & props
	const { onResolve } = props;
	const [error, setError] = useState<any>({ msg: '', severity: 'error' });
	const [isLoading, setIsLoading] = useState(false);
	const [idInput, setIdInput] = useState('');
	const captchaRef = useRef<ReCAPTCHA>(null);

	// Methodes
	const isFormValid = (id: string) => {
		const isLengthValid = id.length === 9 && isValidIdInput(id);
		const isCaptchaChecked = captchaRef?.current?.getValue();
		return isLengthValid && isCaptchaChecked;
	}

	const isCaptchaChecked = () => {
		const isCaptchaChecked = captchaRef?.current?.getValue();

		return isCaptchaChecked;
	}

	const isValidIdInput = (id: string) => {
		const isInputNumber = /^\d*$/.test(id);

		return isInputNumber;
	}

	const checkIsUserExist = async () => {
		setError({ msg: '', severity: 'error' });
		setIsLoading(true);

		try {
			const data = await RestService.checkUser(idInput, captchaRef?.current?.getValue());

			setIsLoading(false);

			onResolve({id: idInput, mobilePhone: data.mobilePhone});
		} catch (err) {
			setIsLoading(false);

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
			<Grid container direction="column" justify="center" alignItems="center" style={{ margin: "10px 0px" }}>
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
		<ReCAPTCHA hl="iw" ref={captchaRef} style={{marginTop: 10}} sitekey={config.captchaSiteKey}/>
	</>
	);
}

export default IdForm;