import React, { useState, useEffect } from 'react';
import './OtpForm.css';
import { Typography, InputAdornment, Grid, IconButton, CircularProgress, Container } from '@material-ui/core';
import { ClkInput } from '../../ClkInput/ClkInput';
import Send from '@material-ui/icons/Send';
import IFormProps from '../IForm';
import RestService from '../../../services/rest/RestService';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ERRORS, idToUpn } from '../../../model/data/Constants';
import hourglassGif from '../../../assets/images/Hourglass.gif'



function OtpForm(props: IFormProps) {
	// State & props
	const { onResolve, payload } = props;
	const [error, setError] = useState<any>({ msg: '', severity: 'error' });
	const [isLoading, setIsLoading] = useState(false);
	const [otpInput, setOtpInput] = useState('');
	const [timerInterval, setTimerInterval] = useState(0);
	const [time, setTime] = useState(30);
	
	useEffect(() => {
		onInit();
	}, [])

	const onInit = () => {
		let intervalId = setInterval(() => {
			setTime(time - 1);
			console.log(time)
			if (time < 0) {
				console.log("entered")
				clearInterval(intervalId);
			}
		}, 1000);
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
			const { isValid, isRegistered, mobilePhone, upn } = await RestService.validateOtp(id, otpInput);

			setIsLoading(false);

			if (isValid) {
				if (isRegistered) {
					setError({
						msg: ERRORS.userAlreadyRegistered(upn),
						severity: 'info'
					});
				} else {
					onResolve({ ...payload, mobilePhone, otp: otpInput });
				}
				
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

	const {id} = payload;

	// Rendering
	return (
		<Container maxWidth="sm">
			<React.Fragment>
				<Typography variant="h6" className="bold">תעודת הזהות שהוכנסה: {id}</Typography>
				<Typography>במידה ומס' הטלפון הנייד שלך קיים במערכות צה"ל,</Typography>
				<Typography>ישלח אליך מסרון עם קוד.</Typography>

				<Grid container direction="column" justify="center" alignItems="center" style={{ margin: "10px 0px" }}>
					<Typography className="bold">נא להזין את הקוד שנשלח:​</Typography>
					<Grid item md={6}>
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
					<Grid container item md={12} justify="center">
						<img src={hourglassGif} className="hourglass"/>
						<Typography>ההודעה תתקבל בעוד כ-{time} שניות..</Typography>
					</Grid>
					
				</Grid>
			</React.Fragment>
			
			<Grid item xs={12}>
				{
					error && error.msg !== '' ?
						<Alert severity={error.severity} className="info-container">
							{error.msg}
						</Alert> :
						<React.Fragment />
				}
			</Grid>
			
			<Grid item xs={12}>
				<Alert severity="info" className="info-container">
					<AlertTitle><b>לא קיבלת את הקוד?</b></AlertTitle>		
					<Typography variant="body2">מספר הטלפון שברשותך אינו מעודכן ברישומת הצה"לית,</Typography>
					<Typography variant="body2">יש להתחבר לאתר הפרט (<a href="https://prat.idf.il">Prat.idf.il</a>) ולעדכן את מספר הטלפון ב- "הפרופיל שלי".​</Typography>
					<Typography variant="body2">לאחר כרבע שעה ניתן יהיה לשוב ולהשלים את תהליך הרישום.​</Typography>

					<Typography variant="body2" style={{marginTop: 20}}>לחילופין,  <u>חיילי חובה וקבע</u> - יש לפנות לקצין/ת המשא"ן ביחידה.​</Typography>
					<Typography variant="body2"><u>מילואים</u> - יש לעדכן את פרטי הקשר אצל קצין/ת הקישור.</Typography>
					<Typography variant="body2"><u>אזרחים עובדי צה"ל</u> - יש לעדכן את פרטי הקשר אצל קצין/ת האזרחים.</Typography>
				</Alert>
			</Grid> 
			<Grid item xs={12}>
				<Alert severity="info" className="info-container">	
					<Typography variant="body2"><b>הסתבכת? לא הצלחת? יש לך שאלות נוספות? </b> אנחנו כאן כדי לעזור!</Typography>	
					<Typography variant="body2">פנו אלינו במייל: MySupport@idf.il</Typography>
				</Alert>
			</Grid> 
		
		</Container>
	);
}

export default OtpForm;