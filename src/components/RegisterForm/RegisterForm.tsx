import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid, Container, Hidden, StepLabel, StepIconProps } from '@material-ui/core';
import registerSteps from '../../model/data/RegisterSteps';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import MobileStepper from '@material-ui/core/MobileStepper';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import Check from '@material-ui/icons/Check';
import './RegisterForm.css';

function StepIcon(props: StepIconProps) {
	// State & props
	const { completed, active } = props;

	// Rendering
	return (
		<div style={{ color: completed ? "#81C784" : active ? "#fde85e" : "#ccc" }}>
			{completed ? <Check /> : props.icon}
		</div>
	);
}

function RegisterForm(props: WithWidth) {
	// State & props
	const steps = registerSteps;
	const [currentStep, setCurrentStep] = useState(0);

	// Rendering
	return (
		<Grid container xs={12} md={10} xl={8}>
			<Container>
				<Paper elevation={3} style={{ padding: "10px 0px" }} >
					<Grid item>
						{
							steps[currentStep].component
						}
					</Grid>
					<Grid container justify="center" alignItems="center" md={12} >
						<Grid xs={3} sm={8} md={6}>
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
											<StepLabel onClick={() => setCurrentStep(index)} StepIconComponent={StepIcon} icon={step.icon}>{step.title}</StepLabel>
										</Step>
									))}
								</Stepper>
							</Hidden>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</Grid>
	);
}

export default withWidth()(RegisterForm);
