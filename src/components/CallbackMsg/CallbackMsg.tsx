import React, { useState } from 'react';
import { Grid, Paper, Typography, Hidden, MobileStepper, Stepper, Step, StepLabel } from '@material-ui/core';
import registerSteps from '../../model/data/RegisterSteps';
import StepIcon from '../StepIcon/StepIcon';
interface ICallbackMsgProps {
	account: string
}

function CallbackMsg(props: ICallbackMsgProps) {
	// Props & state
	const { account } = props;
	const steps = registerSteps;
	const [currentStep, setCurrentStep] = useState(registerSteps.length - 1);

	// Rendering
	return (
		<Paper elevation={3} style={{ padding: "10px 0px" }} >
			<Grid style={{ padding: "10px" }} item>
				<Typography variant="h4">המשתמש נוצר בהצלחה!</Typography>
				<Typography variant="h6" style={{fontWeight: "bold"}}>שם המשתמש האישי שלך הינו:</Typography>
				<Typography dir="ltr" className="english-font" style={{ color: "#2196f3" }}>{account}</Typography>
				<Typography variant="h6" style={{fontWeight: "bold", marginTop: "10px"}}>סיסמה:</Typography>
				<Typography>כפי שנקבעה בתהליך הרישום</Typography>
				<Typography style={{fontWeight: "bold", marginTop: "10px"}}>ניתן לחזור לאתר ולבצע התחברות באמצעות המשתמש.</Typography>
				
			</Grid>
			<Grid container item justify="center" alignItems="center" md={12} >
				<Grid item xs={3} sm={8} md={6}>
					{/* Mobile steps */}
					<Hidden smUp>
						<MobileStepper variant="dots" steps={steps.length} style={{ background: 'white', display: 'flex', justifyContent: 'center' }} position="static"
							activeStep={currentStep}
							nextButton={<React.Fragment />}
							backButton={<React.Fragment />}
						/>
					</Hidden>
					{/* Desktop steps */}
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
			</Grid>
		</Paper>
	);
}

export default CallbackMsg;