import React, { useState, useEffect } from 'react';
import './OtpForm.css';
import { Typography, InputAdornment, Grid, IconButton, CircularProgress } from '@material-ui/core';
import { ClkInput } from '../../ClkInput/ClkInput';
import Send from '@material-ui/icons/Send';
import IFormProps from '../IForm';
import RestService from '../../../services/rest/RestService';
import { Alert } from '@material-ui/lab';
import { ERRORS, idToUpn } from '../../../model/data/Constants';

function OtpForm(props: IFormProps) {
	// State & props
	const { onResolve, payload } = props;
	const [error, setError] = useState<any>({ msg: '', severity: 'error' });
	const [isLoading, setIsLoading] = useState(false);
	const [otpInput, setOtpInput] = useState('');

	useEffect(() => {
		onInit();
	}, [])

	const onInit = () => {
		const {id, isRegistered} = payload;

		if (isRegistered) {
			setError({
				msg: ERRORS.userAlreadyRegistered(idToUpn(id)),
				severity: 'info'
			});
		}
	}

	// Methodes
	const isFormValid = (number: string) => {
		const isLengthValid = number.length === 6 && isValidInput(number);

		return isLengthValid;
	}

	const isValidInput = (id: string) => {
		const isInputNumber = /^\d*$/.test(id);

		return isInputNumber;
	}

	const isOtpMatch = async () => {
		const { id } = payload;

		setError({ msg: '', severity: 'error' });
		setIsLoading(true);

		try {
			// const requestToken = jwt.sign({ secret: payload.secret }, otpInput);
			const { isValid } = await RestService.validateOtp(id, otpInput);

			setIsLoading(false);

			if (isValid) {
				onResolve({ ...payload, otp: otpInput });
			} else {
				setError({
					msg: ERRORS.invalidOtp,
					severity: 'error'
				});
			}
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
		const inputVal = value.target.value;

		if (isValidInput(inputVal)) {
			setOtpInput(inputVal);
		}
	}

	const onClick = async (event) => {
		event.preventDefault();

		if (!isLoading) {
			if (isFormValid(otpInput)) {
				setIsLoading(true);
				await isOtpMatch();
			}
			else {
				setError({
					msg: ERRORS.invalidOtp,
					severity: 'error'
				});
			}
		}
	}

	const {id, isRegistered} = payload;

	// Rendering
	return (
		<React.Fragment>
			{!isRegistered && (
				<React.Fragment>
					<Typography variant="h6" className="bold">תעודת הזהות שהוכנסה: {id}</Typography>
					<Typography>במידה ומס' הטלפון הנייד שלך קיים במערכות צה"ל,</Typography>
					<Typography>ישלח אליך מסרון עם קוד בדקות הקרובות.</Typography>

					<Grid container direction="column" justify="center" alignItems="center" style={{ margin: "10px 0px" }}>
						<Typography className="bold">נא להזין את הקוד שנשלח:​</Typography>
						<Grid item md={3}>
							<form noValidate onSubmit={onClick}>
								<ClkInput onChange={onChange} value={otpInput} endAdornment={
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
								} placeholder={"הכנס קוד"} autoFocus={false} fullWidth />
							</form>
						</Grid>
						
					</Grid>
				</React.Fragment>
			)}
			<Grid item xs={12}>
				{
					error && error.msg !== '' ?
						<Alert severity={error.severity} >
							{error.msg}
						</Alert> :
						<React.Fragment />
				}
			</Grid>
			<Grid item xs={12}>
				<Typography variant="subtitle1" className="bold support-section">לא קיבלת את הקוד?</Typography>
				<Typography variant="body2">צור קשר עם מוקד התמיכה במס' 1111 ובחר את השלוחה המתאימה עבורך</Typography>
				<Typography variant="body2">מתגייסים - שלוחה 1, משרתים - שלוחה 0, מילואים - שלוחה 4</Typography>
			</Grid> 
			
		</React.Fragment>
	);
}

export default OtpForm;