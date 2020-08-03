import React from 'react';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import { Grid, Container } from '@material-ui/core';

function RegisterContainer() {
	return (
		<Grid container item xs={12} md={10} xl={8}>
			<Container>
				<RegisterForm />
			</Container>
		</Grid>
	);
}

export default RegisterContainer;