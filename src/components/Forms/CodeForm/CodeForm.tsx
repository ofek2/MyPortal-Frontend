import React, { useState, useCallback } from 'react';
import './CodeForm.css';
import { Typography, InputAdornment, Grid, IconButton, CircularProgress, Container } from '@material-ui/core';
import { ClkInput } from '../../ClkInput/ClkInput';
import Send from '@material-ui/icons/Send';
import IFormProps from '../IForm';
import RestService from '../../../services/rest/RestService';
import _ from 'lodash';
import { useTimer } from '../../../hooks/timerHook';
import CensorPhone from '../../CensorPhone/CensorPhone';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { MessageAlert } from '../../Common/MessageAlert';
import { ERRORS } from '../../Common/Errors/ErrorMessages';
import RegisteredUserSection from './RegisteredUserSection';
import Hourglass from '../../Common/Hourglass';


function CodeForm(props: IFormProps) {
	const waitingTime = 30;
	const debounceDelay = 2000;
	// State & props
	const { onResolve, payload } = props;
	const [error, setError] = useState<any>({ msg: '', severity: 'error' });
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [codeInput, setCodeInput] = useState('');
	const [isRegistered, setIsRegistered] = useState(false);
	const [isUserLocked, setIsUserLocked] = useState(false);
	const [isUserInitiallyLocked, setIsUserInitiallyLocked] = useState(false);
	const [userPrincipalName, setUserPrincipalName] = useState("");
	const [showUserUnlockedMessage, setShowUserUnlockedMessage] = useState(false);
	const [showResetPasswordSuccessfulMessage, setShowResetPasswordSuccessfulMessage] = useState(false);
	const [isLoadingResetPassword, setIsLoadingResetPassword] = useState(false);
	const [isLoadingUnlockUser, setIsLoadingUnlockUser] = useState(false);


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


	const isValidInput = (input: string) => {
		const isValidInput = input.length === 8;

		return isValidInput;
	}

	const isCodeMatch = async () => {
		const { id } = payload;

		setError({ msg: '', severity: 'error' });
		setIsLoading(true);

		try {
			const { isValid, isRegistered, mobilePhone, upn, isUserLocked } = await RestService.validateCode(id, codeInput);

			console.log(isRegistered,isUserLocked)
			setIsLoading(false);

			if (!isValid) {		// first check if the entered code was valid
				setError({
					msg: ERRORS.invalidCode,
					severity: 'error'
				});
			} else if (isRegistered) {		// next check if the user is already registered
				setIsRegistered(true);
				setUserPrincipalName(upn);
				if (isUserLocked) {			// if the user is registered but locked
					setIsUserLocked(true);
					setIsUserInitiallyLocked(true);	// this will tell us if the user was locked so we can show him a success message when he unlocks his user successfully
				}
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

	const renderCodeInput = () => {
		return (
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
					<Typography style={{display: "flex"}}><Hourglass/>
	ההודעה תתקבל במכשירך ב-{waitingTime} השניות הקרובות..</Typography>
				</Grid>
				}
				
			</Grid>
		</React.Fragment>
		);
	}

	const handleUserUnlock = async () => {
		try {
			setIsLoadingUnlockUser(true);
			setShowUserUnlockedMessage(false);

			await RestService.unlockUser();
			setShowUserUnlockedMessage(true);

		} catch (err) {
			setError({
				msg: ERRORS.general,
				severity: 'error'
			});
		} finally {	
			setIsLoadingUnlockUser(false);
			setIsUserLocked(false);
		}
	}

	const handleUserResetPassword = async () => {
		try {
			setIsLoadingResetPassword(true);
			setShowResetPasswordSuccessfulMessage(false);

			await RestService.resetUserPassword();
			setShowResetPasswordSuccessfulMessage(true);

			// remove success message after 10 seconds
			setTimeout(()=> {
				setShowResetPasswordSuccessfulMessage(true);
			},10000)
		} catch (err) {
			setError({
				msg: ERRORS.general,
				severity: 'error'
			});
		} finally{
			setIsLoadingResetPassword(false);
		}
	}

	// Rendering
	return (
		<Container maxWidth="sm">
			{renderCodeInput()}
			{isRegistered && userPrincipalName && 
				<MessageAlert alert={{ 
					msg:<RegisteredUserSection userPrincipleName={userPrincipalName} isUserInitallyLocked={isUserInitiallyLocked} isUserLocked={isUserLocked}
					isLoadingUnlock={isLoadingUnlockUser} isLoadingResetPassword={isLoadingResetPassword}
					showUserUnlockedMessage={showUserUnlockedMessage} showResetPasswordSuccessfulMessage={showResetPasswordSuccessfulMessage}
					onResetPassword={handleUserResetPassword} onUnlockUser={handleUserUnlock}/>,
					severity: "info"
				}}/>
			}

			<MessageAlert alert={error}/>
		</Container>
	);
}

export default CodeForm;