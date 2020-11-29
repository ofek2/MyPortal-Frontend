import React, { useState } from 'react';
import { Grid, Paper, Typography, Container, Hidden, MobileStepper, Stepper, Step, StepLabel } from '@material-ui/core';
import registerSteps from '../../model/data/RegisterSteps';
import StepIcon from '../StepIcon/StepIcon';
import applinks from '../../model/data/AppLinks';
import './CallbackMsg.css';

interface ICallbackMsgProps {
	account: string
}

function CallbackMsg(props: ICallbackMsgProps) {
	// Props & state
	const { account } = props;
	const steps = registerSteps;
	const [currentStep] = useState(registerSteps.length - 1);

	// Rendering
	return (
		<Paper elevation={3} style={{ padding: "10px 0px" }} >
			<Container maxWidth="md">
			<Grid container justify="center" >
				<Grid style={{ padding: "10px" }} item xs={12}>
					<Typography variant="h4">המשתמש נוצר בהצלחה!</Typography>
					<Typography variant="h6" style={{ fontWeight: "bold" }}>שם המשתמש האישי שלך הינו:</Typography>
					<Typography dir="ltr" className="english-font" style={{ color: "#2196f3" }}>{account}</Typography>
					<Typography variant="h6" style={{ fontWeight: "bold", marginTop: "10px" }}>סיסמה:</Typography>
					<Typography>כפי שנקבעה בתהליך הרישום</Typography>
					{/* <Typography style={{ fontWeight: "bold", marginTop: "10px" }}>ניתן לחזור לאתר ולבצע התחברות באמצעות המשתמש.</Typography> */}

				</Grid>

				<Grid container item sm={10} xs={12} style={{marginTop: 20, marginBottom: 20}}>
					<Grid item xs={12} style={{marginBottom: 20}}>
						<Typography variant="h6" style={{ fontWeight: "bold" }}>כעת ניתן להתחבר למגוון שירותי הדיגיטל השונים של צה"ל:</Typography>

					</Grid>
					{applinks.map((link, index) => 
					<Grid item key={index} sm={3} xs={6}>
						<a href={link.url} target="_blank"><img src={link.image} width={100} height={100} className="link-image"/></a>
						<Typography variant="body2">{link.name}</Typography>
					</Grid>
					)}
					<Grid item xs={12} style={{marginTop: 10}}>
						<Typography variant="subtitle1">ועוד אפליקציות רבות נוספות...</Typography>

					</Grid>
				</Grid>
			{/* <Grid container item justify="center" alignItems="center" md={12} >
				<Grid item xs={3} sm={8} md={6}>
					
					<Hidden smUp>
						<MobileStepper variant="dots" steps={steps.length} style={{ background: 'white', display: 'flex', justifyContent: 'center' }} position="static"
							activeStep={currentStep}
							nextButton={<React.Fragment />}
							backButton={<React.Fragment />}
						/>
					</Hidden>
					
					<Hidden xsDown>
						<Stepper style={{ padding: "5px 0px" }} alternativeLabel activeStep={currentStep}>
							{steps.map((step, index) => (
								<Step key={index}>
									<StepLabel StepIconComponent={StepIcon} icon={step.icon}>{step.title}</StepLabel>
								</Step>
							))}
						</Stepper>
					</Hidden>
				</Grid>
			</Grid> */}
			</Grid>
			</Container>
		</Paper>
	);
}

export default CallbackMsg;