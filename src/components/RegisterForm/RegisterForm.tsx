import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid, Hidden, StepLabel } from '@material-ui/core';
import registerSteps from '../../model/data/RegisterSteps';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import MobileStepper from '@material-ui/core/MobileStepper';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import './RegisterForm.css';
import StepIcon from '../StepIcon/StepIcon';

let currentPayload = {};

function RegisterForm(props: WithWidth) {
	// State & props
	const steps = registerSteps;
	const [currentStep, setCurrentStep] = useState(0);

	// Handlers

	const handleNextStep = (payload: any) => {
		currentPayload = payload;
		setCurrentStep(oldVal => oldVal += 1);
	}

	// Rendering
	return (
		<Paper elevation={3} style={{ padding: "10px 0px" }} >
			<Grid container style={{ padding: "10px" }} justify="center" alignItems="center" direction="column">
				{
					React.cloneElement(steps[currentStep].component, { onResolve: handleNextStep, payload: currentPayload })
				}
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

export default withWidth()(RegisterForm);
