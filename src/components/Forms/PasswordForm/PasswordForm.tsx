import React, { useState, useEffect } from 'react';
import './PasswordForm.css';
import { Typography, Button, Grid, IconButton, Tooltip } from '@material-ui/core';
import IFormProps from '../IForm';
import ContentCopy from '../../../assets/icon/content_copy-black-18dp.svg';
import MsService from '../../../services/microsoft/MsService';
import { CLICK_DOMAIN, ERRORS } from '../../../model/data/Constants';
import { Alert } from '@material-ui/lab';
import copy from 'copy-to-clipboard';

function PasswordForm(props: IFormProps) {
	// State & props
	const { payload } = props;
	const [error, setError] = useState<any>({ msg: '' });
	const [timer, setTimer] = useState(5);

	const { password } = payload;
	let interval;

	useEffect(()=> {
		return onInit();
	}, [])

	useEffect(() => {
		if (timer <= 1) {
			clearInterval(interval)
			onContinueClick();
		}
	}, [timer])

	const onInit = () => {
		interval = setInterval(async () => {
			setTimer(currentTimer => currentTimer - 1);
		}, 1000);

		return () => clearInterval(interval);
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

	const copyToClipboard = () => {
		copy(password);
	}

	// Rendering
	return (
		<React.Fragment>
			<Grid item xs={12} style={{marginBottom: "10px"}}>
				<Typography variant="h6">הסיסמה הראשונית שלך הינה:</Typography>
				<Typography variant="h4" >{password} 
					<Tooltip title={<Typography>העתק</Typography>} arrow>
						<IconButton> <img src={ContentCopy} width={28} onClick={copyToClipboard}/></IconButton>
					</Tooltip>
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h6" className="important-text">יש לשמור סיסמה זו להמשך תהליך הרישום!​</Typography>
				<Typography variant="h6">הסיסמה תעלם מהמסך בעוד {timer} שניות​​</Typography>
			</Grid>
			<Grid container item xs={12} justifyContent="center" alignItems="center">
				<Button variant="contained" onClick={onContinueClick} disableElevation={true} color="primary" className="idf-button" style={{ margin: "10px 0px" }}>המשך</Button>
			</Grid>
			<Grid container direction="column" justifyContent="center" alignItems="center" style={{ margin: "10px 0px" }}>
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
		</React.Fragment>
	);
}

export default PasswordForm;