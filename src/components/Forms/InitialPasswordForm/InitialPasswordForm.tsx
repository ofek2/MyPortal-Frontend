import React, { useState, useEffect } from 'react';
import './InitialPasswordForm.css';
// import '../InfoForm/InfoForm.css';
import { Typography, Button, Grid, CircularProgress, Hidden, Container } from '@material-ui/core';
import IFormProps from '../IForm';
import MsService from '../../../services/microsoft/MsService';
import {  ERRORS } from '../../../model/data/Constants';
import RestService from '../../../services/rest/RestService';
import { Alert } from '@material-ui/lab';
import LoadingButton from '../../Buttons/LoadingButton';
import info1 from '../../../assets/images/info1.png';
import info2 from '../../../assets/images/info2.png';
import info3 from '../../../assets/images/info3.png';
import arrow from '../../../assets/images/arrow.png';
import Carousel from 'react-elastic-carousel'


function InitialPasswordForm(props: IFormProps) {
	// State & props
	const { onResolve, payload } = props;
	const [error, setError] = useState<any>({ msg: '' });
	const [isResettingPassword, setIsResettingPassword] = useState(false);
	const [isLoadingFirstTime, setIsLoadingFirstTime] = useState(true);
	const [currentUserUpn, setCurrentUserUpn] = useState('');
	
	useEffect(() => {
		onInit();
	}, [])

	const onInit = async () => {
		await onSendAgainClick();
		setIsLoadingFirstTime(false);
	}
	// Handlers
	const onContinueClick = async () => {
		
		if (currentUserUpn) {
			try {
				await MsService.login(`${currentUserUpn}`);
			} catch (err) {
				console.log(err)
				setError({ msg: ERRORS.general })
			}
		} else {
			setError({ msg: ERRORS.general });
		}
	}
	
	const onSendAgainClick = async () => {
		setError({msg: ''})
		setIsResettingPassword(true);

		// if its the first time we enter this form, it means we want to create/update the user to be with the password we generated in the previous step
		// if this action happend from a click on "reset password" it means we want to generate a new password for the user and send it again
		const generateNewPassword = !isLoadingFirstTime;

		try {
			const {succeeded, upn} = await RestService.resetUserPassword(generateNewPassword);
			setCurrentUserUpn(upn);
			setIsResettingPassword(false);

			if (!succeeded) {
				setError({msg: ERRORS.passwordResetsExceededLimit});
			}
		} catch (err) {
			setError({ msg: ERRORS.smsError });
			setIsResettingPassword(false);
		}
	}

	const instructions = [
		{image: info1, text: 'במסך הבא, יש להקיש בשנית את הקוד שהתקבל ב-SMS'},
		{image: info3, text: 'לאחר מכן, יש לבחור סיסמה למשתמש'}
	]

	// Rendering
	return (
		<React.Fragment>
		{
			isLoadingFirstTime ? 
			<Grid container item xs={12} justify="center" alignItems="center" spacing={2}>
				<Grid item xs={12}>
					<CircularProgress size={48}/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h6">מסיימים להגדיר עבורכם מספר דברים ומיד נמשיך...</Typography>
				</Grid>
			</Grid>
			
			: 
		
			<React.Fragment>
				<Container maxWidth="xs">
					<Typography className="bold">שירותי הדיגיטל של צה"ל שומרים על רמת אבטחה גבוהה.</Typography>
					<Typography style={{marginBottom: "10px"}}>לכן, לסיום תהליך הרישום, נצטרך לאמת את זהותך עוד פעם אחת באמצעות סיסמה זמנית שקיבלת זה עתה ב-SMS.</Typography>
				</Container>
				<Grid container justify="center" alignItems="flex-start" style={{marginTop: 20}} >
					<Hidden smDown>
						{instructions.map((instruction, index) => 
							<React.Fragment key={index}>
								<Grid item md={3} xs={12} direction="column" container justify="center" alignItems="center">
									<div className={"info-image-circle"}><img src={instruction.image} className={"info-image"}/></div>
									{/* <Hidden mdUp> */}
										<Typography align="center" className="info-text">{instruction.text}</Typography>
									{/* </Hidden> */}
								</Grid>
								{index < instructions.length - 1 && 
								<Grid item md={1} xs={12} style={{alignSelf:"center"}}>
									<img src={arrow} className={"info-arrow"}/>
								</Grid>}	
							</React.Fragment>
						)}
					</Hidden>
					<Hidden mdUp>
						<Carousel isRTL={true} >
							{instructions.map((instruction, index) =>
								<Container key={index}> 
									<Grid direction="column" container justify="center" alignItems="center">
										<div className={"info-image-circle"}><img src={instruction.image} className={"info-image"}/></div>
										<Typography align="center" className="info-text">{instruction.text}</Typography>
									</Grid>
								</Container>
							)}
						</Carousel>
							
					</Hidden>

					{/* <Hidden smDown>
						{instructions.map((instruction, index) =>
							<React.Fragment key={index}>
								<Grid container item md={3}  justify="center" alignItems="flex-start">
									<Typography align="center" className="info-text">{instruction.text}</Typography>
								</Grid>
								{index < instructions.length - 1 &&
								<Grid item md={1} style={{alignSelf:"center"}}></Grid>}
							</React.Fragment>
						)}
					</Hidden> */}
					<Grid container item xs={12} justify="center" alignItems="center">
						<Button variant="contained" onClick={onContinueClick} disableElevation={true} color="primary" className="idf-button" >יאללה, אפשר להמשיך</Button>
						{/* <LoadingButton isLoading={isResettingPassword} variant="contained" onClick={onSendAgainClick} disableElevation={true} className="idf-button-secondary" style={{ backgroundColor: "#333" }}>שלחו לי שוב</LoadingButton> */}
					</Grid>
					<Grid container direction="column" justify="center" alignItems="center" style={{ margin: "10px 0px" }}>
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
				</Grid>
			</React.Fragment>
		}
		</React.Fragment>
	);
}

export default InitialPasswordForm;