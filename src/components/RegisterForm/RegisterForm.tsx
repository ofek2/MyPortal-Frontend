import React, { useState } from 'react';
import { Grid, Hidden, StepLabel, Tooltip, IconButton } from '@material-ui/core';
import registerSteps from '../../model/data/RegisterSteps';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import ArrowForward from '@material-ui/icons/ArrowForward';
import MobileStepper from '@material-ui/core/MobileStepper';
import './RegisterForm.css';
import StepIcon from '../StepIcon/StepIcon';
import { MyPaper } from '../Common/MyPaper';
let currentPayload = {};

function RegisterForm() {
	// State & props
	const steps = registerSteps;
	const [currentStep, setCurrentStep] = useState(0);

	// Handlers

	const handleNextStep = (payload: any) => {
		currentPayload = payload;
		setCurrentStep(oldVal => oldVal += 1);
	}

	const handleReset = () => {
		currentPayload = {};
		setCurrentStep(0);
	}

	// Rendering
	return (
		<MyPaper>
			{steps[currentStep].isResettable && 
		
				<Tooltip title="חזרה" aria-label="חזרה">
					<IconButton size="small" onClick={handleReset} className="reset-button">
						<ArrowForward/>
					</IconButton>
				</Tooltip>
			
			}
			
			<Grid container style={{ padding: "10px" }} justify="center" alignItems="center" direction="column">
				{
					React.cloneElement(steps[currentStep].component, { onResolve: handleNextStep, onReset: handleReset, payload: currentPayload })
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
		</MyPaper>
	);
}

export default RegisterForm;
