import React, { useState } from 'react';
import './IdForm.css';
import { Typography, InputAdornment, Grid, IconButton, CircularProgress } from '@material-ui/core';
import { ClkInput } from '../../ClkInput/ClkInput';
import Send from '@material-ui/icons/Send';
import IFormProps from '../IForm';
import RestService from '../../../services/rest/RestService';
import { Alert } from '@material-ui/lab';
import { ERRORS, CLICK_DOMAIN } from '../../../model/data/Constants';

function IdForm(props: IFormProps) {
	// State & props
	const { onResolve } = props;
	const [error, setError] = useState<any>({ msg: '', severity: 'error' });
	const [isLoading, setIsLoading] = useState(false);
	const [idInput, setIdInput] = useState('');

	// Methodes
	const isFormValid = (id: string) => {
		const isLengthValid = id.length === 9 && isValidIdInput(id);

		return isLengthValid;
	}

	const isValidIdInput = (id: string) => {
		const isInputNumber = /^\d*$/.test(id);

		return isInputNumber;
	}

	const checkIsUserExist = async () => {
		setError({msg: '', severity: 'error'});
		setIsLoading(true);

		try {
			const { isRegistered, isUserNotExists } = await RestService.checkUser(idInput);

			setIsLoading(false);

			if (isRegistered) {
				setError({
					msg: ERRORS.userAlreadyRegistered(`${idInput}@${CLICK_DOMAIN}`),
					severity: 'info'
				});
			} else if (isUserNotExists || !mobilePhone) {
				setError({
					msg: ERRORS.generalWithoutWhatsapp,
					severity: 'error'
				});
			} else {
				onResolve({ id: idInput });
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
		const idFromInput = value.target.value;
		
		if (isValidIdInput(idFromInput)) {
			setIdInput(idFromInput);
		}
	}

	const onClick = async (event) => {
		event.preventDefault();

		if (!isLoading) {
			if (isFormValid(idInput)) {
				setIsLoading(true);
				await checkIsUserExist();
			}
			else {
				setError({
					msg: ERRORS.invalidId,
					severity: 'error'
				});
			}
		}
	}

	// Rendering
	return (
		<React.Fragment>
			<Typography variant="h4" style={{ fontWeight: "bold", marginBottom: "10px" }}>ברוכים הבאים</Typography>
			<Typography>לצורך אימות הנתונים אל מול מערכות צה"ל,</Typography>
			<Typography>נא להזין מספר תעודת זהות (כולל ספרת ביקורת):</Typography>
			<Grid container direction="column" justify="center" alignItems="center" style={{ margin: "10px 0px" }}>
				<Grid item md={3}>
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
		</React.Fragment>
	);
}

export default IdForm;