import React, { useState, useEffect } from 'react';
import './IdForm.css';
import { Typography, InputAdornment, Grid, IconButton, CircularProgress } from '@material-ui/core';
import { ClkInput } from '../../ClkInput/ClkInput';
import Send from '@material-ui/icons/Send';
import IFormProps from '../IForm';
import RestService from '../../../services/rest/RestService';
import { Alert } from '@material-ui/lab';

let isValidId: boolean = false;
let currentId: string;

function IdForm(props: IFormProps) {
	// State & props
	const { onResolve } = props;
	const [error, setError] = useState({ msg: '' });
	const [isLoading, setIsLoading] = useState(false);

	// Methodes
	const validatePhone = (id: string) => {
		const isLengthValid = id.length === 9;

		return isLengthValid;
	}

	const checkIsUserExist = async () => {
		try {
			const { isRegistered, mobilePhone } = await RestService.checkUser(currentId, false);

			setIsLoading(false);
			if (isRegistered) {
				setError({
					msg: "תעודת הזהות שהזנת כבר רשומה במערכת"
				});
			} else {
				onResolve({ mobilePhone, id: currentId });
			}
		} catch (err) {
			setIsLoading(false);

			setError({
				msg: "הרתה תקלה, אנה נסה שנית במועד מאוחר יותר"
			});
		}
	}

	// Handlers
	const onChange = (value: any) => {
		const idFromInput = value.target.value;

		isValidId = validatePhone(idFromInput);
		currentId = idFromInput;
	}

	const onClick = async (event) => {
		event.preventDefault();

		if (!isLoading) {
			if (isValidId) {
				setIsLoading(true);
				await checkIsUserExist();
			}
			else {
				setError({
					msg: "מספר תעודת זהות אינו תקין"
				});
			}
		}
	}

	// Rendering
	return (
		<React.Fragment>
			<Typography variant="h4" style={{ fontWeight: "bold" }}>ברוכים הבאים</Typography>
			<Typography>בכדי ליצור משתמש יש להכניס את תעודת זהות (כולל ספרת הביקורת)</Typography>
			<Grid container direction="column" justify="center" alignItems="center" style={{ margin: "10px 0px" }}>
				<Grid item md={3}>
					<form noValidate onSubmit={onClick}>
						<ClkInput onChange={onChange} disabled={false} value={undefined} endAdornment={
							<InputAdornment position="end" onClick={onClick}>
								{
									isLoading ?
										<CircularProgress color="primary" size={18} thickness={7} style={{ marginLeft: "6px", cursor: "default" }} />
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

export default IdForm;