import React, { useState } from 'react';
import './IdForm.css';
import { Typography, InputAdornment, Grid, IconButton, CircularProgress } from '@material-ui/core';
import { ClkInput } from '../../ClkInput/ClkInput';
import Send from '@material-ui/icons/Send';
import IFormProps from '../IForm';
import RestService from '../../../services/rest/RestService';
import { Alert } from '@material-ui/lab';
import { ERRORS } from '../../../model/data/Constants';

let isValidId: boolean = false;
let currentId: string;

function IdForm(props: IFormProps) {
	// State & props
	const { onResolve } = props;
	const [error, setError] = useState<any>({ msg: '', severity: 'error' });
	const [isLoading, setIsLoading] = useState(false);

	// Methodes
	const validateId = (id: string) => {
		const isLengthValid = id.length === 9;

		return isLengthValid;
	}

	const checkIsUserExist = async () => {
		try {
			const { isRegistered, mobilePhone, isUserNotExists } = await RestService.checkUser(currentId);

			setIsLoading(false);
			if (isUserNotExists) {
				setError({
					msg: ERRORS.userNotExists,
					severity: 'error'
				});
			}
			else if (isRegistered) {
				setError({
					msg: ERRORS.userAlreadyRegistered(`${currentId}@idf.il`),
					severity: 'info'
				});
			} else {
				onResolve({ mobilePhone, id: currentId });
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

		isValidId = validateId(idFromInput);
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