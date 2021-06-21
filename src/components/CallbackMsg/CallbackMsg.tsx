import React, { useState } from 'react';
import { Grid, Paper, Typography, Container, Hidden, MobileStepper, Stepper, Step, StepLabel } from '@material-ui/core';
import registerSteps from '../../model/data/RegisterSteps';
import StepIcon from '../StepIcon/StepIcon';
import applinks from '../../model/data/AppLinks';
import tzahal from '../../assets/images/tzahal.png';
import './CallbackMsg.css';

interface ICallbackMsgProps {
	account: string
}

function CallbackMsg(props: ICallbackMsgProps) {
	// Props & state
	const { account } = props;
	const steps = registerSteps;
	const [currentStep] = useState(registerSteps.length - 1);


	const redirectToUrl = (url) => {
		if (url) {
			window.open(url, '_blank');
		}
			
	}
	// Rendering
	return (
		<Paper elevation={3} style={{ padding: "10px 0px" }} >
			<Container maxWidth="md">
			<Grid container justify="center" >
				<Grid style={{ padding: "10px" }} item xs={12}>
					<Typography variant="h5" className="bold">מעולה, המשתמש נוצר בהצלחה!</Typography>
					<Typography className="bold">שם המשתמש האישי שלך:</Typography>
					<Typography dir="ltr" className="english-font" style={{ color: "#2196f3" }}>{account}</Typography>
					<Typography style={{marginTop: 10}}>כדאי לצלם את המסך ולשמור את שם המשתמש :)</Typography>
					{/* <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "10px" }}>סיסמה:</Typography>
					<Typography>כפי שנקבעה בתהליך הרישום</Typography> */}
					{/* <Typography style={{ fontWeight: "bold", marginTop: "10px" }}>ניתן לחזור לאתר ולבצע התחברות באמצעות המשתמש.</Typography> */}
					<Typography className="bold" style={{marginTop: 30}}>למעבר לדף הבית הדיגיטלי של צה"ל:</Typography>
					<img src={tzahal} style={{marginTop: 10, cursor: "pointer", width: "150px"}}/>
				</Grid>

				{/* <Grid container item sm={10} xs={12} style={{marginTop: 20, marginBottom: 20}} justify="center">
					<Grid item xs={12} style={{marginBottom: 20}}>
						<Typography variant="h6" style={{ fontWeight: "bold" }}>כעת ניתן להתחבר למגוון שירותי הדיגיטל השונים של צה"ל:</Typography>

					</Grid>
					{applinks.map((link, index) => 
					<Grid item key={index} lg={2} md={3} sm={4} xs={6} className="grid-margin">
						<div className={"link-container " + (link.url ? "clickable" : "")} onClick={redirectToUrl.bind(null, link.url)}>
							{link.soon && <Typography variant="body2" className="soon-label">בקרוב!</Typography>}
							<img src={link.image} width={100} height={100} className={"link-image"}/>
						</div>
						<Typography variant="body2">{link.name}</Typography>
						
					</Grid>
					)}
					<Grid item xs={12} style={{marginTop: 10}}>
						<Typography variant="subtitle1">ועוד אפליקציות רבות נוספות באתר צה"ל בדיגיטל...</Typography>

					</Grid>
				</Grid> */}
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