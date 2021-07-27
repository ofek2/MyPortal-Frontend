import React, { useState, useEffect, useCallback } from 'react';
import './OtpForm.css';
import { Typography, InputAdornment, Grid, IconButton, CircularProgress, Container } from '@material-ui/core';
import { ClkInput } from '../../ClkInput/ClkInput';
import Send from '@material-ui/icons/Send';
import IFormProps from '../IForm';
import RestService from '../../../services/rest/RestService';
import { Alert } from '@material-ui/lab';
import { ERRORS } from '../../../model/data/Constants';
import hourglassGif from '../../../assets/images/Hourglass.gif'
import _ from 'lodash';
import { useTimer } from '../../../hooks/timerHook';


function OtpForm(props: IFormProps) {
	const waitingTime = 30;
	const debounceDelay = 2000;
	// State & props
	const { onResolve, payload } = props;
	const [error, setError] = useState<any>({ msg: '', severity: 'error' });
	const [isLoading, setIsLoading] = useState(false);
	const [otpInput, setOtpInput] = useState('');

	const openChatBot = () => {
		let chatBot: HTMLElement | null = document.querySelector('#chat_bot_logo');

		if (chatBot) {
			let activeChat = document.querySelector('#active_chat');
			if (activeChat) {
				chatBot.click();	// close active chat
			}
			chatBot.click();
			setTimeout(() => {
				let chatBtns: NodeListOf<HTMLElement> | null = document.querySelectorAll('#active_chat button');
				if (chatBtns) {
					let noOtpReceivedBtn: HTMLElement | null = chatBtns[1];
					noOtpReceivedBtn?.click();
				}
			}, 500);
			
		}
	}
	const [time, setTime, timerOn, setTimerOn] = useTimer(waitingTime, openChatBot);
	// const [timerOn, setTimerOn] = useState(true);
	// const [time, setTime] = useState(waitingTime);
	// let intervalId;

	// useEffect(() => {
	// 	if (timerOn) {
	// 		intervalId = setInterval(() => {
	// 			setTime(time => time - 1);
	// 		}, 1000);
	// 	} else {
	// 		clearInterval(intervalId);
	// 	}
		

	// 	return () => clearInterval(intervalId);
	// }, [timerOn])

	// useEffect(() => {
	// 	if (time <= 0) {
	// 		setTimerOn(false);
	// 		openChatBot();
	// 	}
	// }, [time])

	// useEffect(()=> {
	// 	if (otpInput != "") {
	// 		debouncedSubmit();
	// 	}
	// }, [otpInput])
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

	const submit = async () => {
		if (!isLoading) {
			if (isFormValid(otpInput)) {
				setIsLoading(true);
				setTimerOn(false);
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
	const onSubmit = async (event) => {
		event.preventDefault();

		await submit();
	}

	const debouncedSubmit = useCallback(
		_.debounce(submit, debounceDelay),
		[otpInput], // will be created only once initially
	);
	

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
						<form noValidate onSubmit={onSubmit}>
							<ClkInput onChange={onChange}  value={otpInput} endAdornment={
								<InputAdornment position="end" onClick={onSubmit}>
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
					{timerOn && 
					<Grid container item xs={12} justify="center">
						<Typography style={{display: "flex"}}><img src={hourglassGif} className="hourglass"/>
ההודעה תתקבל במכשירך ב-{waitingTime} השניות הקרובות..</Typography>
					</Grid>
					}
					
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
		</Container>
	);
}

export default OtpForm;