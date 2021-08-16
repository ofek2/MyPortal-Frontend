import React from 'react';
import { Grid, Container } from '@material-ui/core';
import FAQPage from '../components/FAQ/FAQPage';

function FAQContainer() {
	return (
		<Grid container item xs={12} md={10} xl={8} style={{zIndex: 5}}>
			<Container>
				<FAQPage />
			</Container>
		</Grid>
	);
}

export default FAQContainer;