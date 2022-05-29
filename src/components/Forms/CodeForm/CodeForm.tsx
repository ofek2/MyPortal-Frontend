import React, { useState, useCallback } from 'react';
import './CodeForm.css';
import { Typography, InputAdornment, Grid, IconButton, CircularProgress, Container } from '@material-ui/core';
import { ClkInput } from '../../ClkInput/ClkInput';
import Send from '@material-ui/icons/Send';
import IFormProps from '../IForm';
import RestService from '../../../services/rest/RestService';
import hourglassGif from '../../../assets/images/Hourglass.gif'
import _ from 'lodash';
import { useTimer } from '../../../hooks/timerHook';
import CensorPhone from '../../CensorPhone/CensorPhone';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { MessageAlert } from '../../Common/MessageAlert';
import { ERRORS } from '../../Common/Errors/ErrorMessages';


function CodeForm(props: IFormProps) {
	const waitingTime = 30;
	const debounceDelay = 2000;
	// State & props
	const { onResolve, payload } = props;
	const [error, setError] = useState<any>({ msg: '', severity: 'error' });
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [codeInput, setCodeInput] = useState('');

	const openChatBot = () => {
		let chatBot: HTMLElement | null = document.querySelector('#chat_bot_logo');

		// if not chat bot element wasn't found for some reason dont do anything
		if (!chatBot) return;

		let activeChat = document.querySelector('#active_chat');

		if (activeChat) {
			chatBot.click();	// close active chat
		}

		chatBot.click();
		setTimeout(() => {
			let chatBtns: NodeListOf<HTMLElement> | null = document.querySelectorAll('#active_chat button');
			if (chatBtns) {
				let noCodeReceivedBtn: HTMLElement | null = chatBtns[1];
				noCodeReceivedBtn?.click();
			}
		}, 500);
			
		
	}
	const [time, setTime, timerOn, setTimerOn] = useTimer(waitingTime, openChatBot);
	
	// Methods


	const isValidInput = (id: string) => {
		const isValidInput = id.length === 8;

		return isValidInput;
	}

	const isCodeMatch = async () => {
		const { id } = payload;

		setError({ msg: '', severity: 'error' });
		setIsLoading(true);

		try {
			const { isValid, isRegistered, mobilePhone, upn } = await RestService.validateCode(id, codeInput);

			setIsLoading(false);

			if (!isValid) {
				setError({
					msg: ERRORS.invalidCode,
					severity: 'error'
				});
			} else if (isRegistered) {
				setError({
					msg: ERRORS.userAlreadyRegistered(upn),
					severity: 'info'
				});
			} else {
				onResolve({ ...payload, mobilePhone, code: codeInput });
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

		// stop the timer to prevent the chat bot to pop up in case the user starts to enter the validation code
		if (timerOn) {
			setTimerOn(false);
		}

		setCodeInput(inputVal);
	}

	const handleClickShowPassword = (event) => {
		setShowPassword(!showPassword);
	} 

	const submit = async () => {
		if (isLoading) return;
		
		if (isValidInput(codeInput)) {
			setIsLoading(true);
			setTimerOn(false);
			await isCodeMatch();
		} else {
			setError({
				msg: ERRORS.invalidCode,
				severity: 'error'
			});
		}
		
	}
	const handleSubmit = async (event) => {
		event.preventDefault();

		await submit();
	}

	// Rendering
	return (
		<Container maxWidth="sm">
			<React.Fragment>
				<Typography className="bold">נשלח אלייך קוד לטלפון:</Typography>
				<CensorPhone phone={payload.mobilePhone} stringToReplace="X" />
				<Grid container direction="column" justifyContent="center" alignItems="center" style={{ margin: "10px 0px" }}>
					<Typography>נא להזין את הקוד שנשלח:​</Typography>
					<Grid item md={6}>
						<form noValidate onSubmit={handleSubmit}>
							<ClkInput type={showPassword ? "text" : "password"} onChange={onChange} value={codeInput} className="clk-input input-password" endAdornment={
								<InputAdornment position="end" onClick={handleSubmit}>
									{
										isLoading ?
											<CircularProgress color="primary" size={23} thickness={7} style={{ marginLeft: "10px", cursor: "default" }} />
											:
											<IconButton size="small">
												<Send className="login-send-icon" />
											</IconButton>
									}
								</InputAdornment>
							} startAdornment={
								<InputAdornment position="start">
									<IconButton
									style={{paddingRight:0}}
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									edge="end"
									>
									{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
						  		</InputAdornment>
						} placeholder={"הכנס קוד"} autoFocus={false} fullWidth />
						</form>
					</Grid>
					{timerOn && 
					<Grid container item xs={12} justifyContent="center">
						<Typography style={{display: "flex"}}><img src={hourglassGif} className="hourglass"/>
ההודעה תתקבל במכשירך ב-{waitingTime} השניות הקרובות..</Typography>
					</Grid>
					}
					
				</Grid>
			</React.Fragment>
			
			<MessageAlert alert={error}/>
		</Container>
	);
}

export default CodeForm;