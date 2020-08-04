import React from 'react';
import { Grid, Container } from '@material-ui/core';
import ErrorMsg from '../components/ErrorMsg/ErrorMsg';

function ErrorContainer(props) {
	// Rendering
	return (
		<Grid container item xs={12} md={10} xl={8} style={{ zIndex: 5 }}>
			<Container>
				<ErrorMsg />
			</Container>
		</Grid>
	);
}

export default ErrorContainer;