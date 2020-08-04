import React from 'react';
import { StepIconProps } from '@material-ui/core';
import Check from '@material-ui/icons/Check';

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

export default StepIcon;