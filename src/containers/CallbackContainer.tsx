import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, CircularProgress } from '@material-ui/core';
import CallbackMsg from '../components/CallbackMsg/CallbackMsg';
import MsService from '../services/microsoft/MsService';
import { withRouter } from 'react-router-dom'

function CallbackContainer(props) {
	// State & props
	const [account, setAccount] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	// Side effects
	useEffect(() => {
	//	onInit();
	}, []);

	// Methodes
	const onInit = async () => {
		const { history } = props;

		setIsLoading(true);

		try {
			await MsService.handleRedirect();

			setIsLoading(false);

			try {
				await MsService.getClickApiToken();
			} catch (err) {
				console.log(err)
			}

			try {
				const currentAccount = await MsService.getAccount();

				if (currentAccount) {
					setAccount(currentAccount.username);
				} else {
					history.push('/');
				}
			} catch (err) {
				history.push('/error');
			}
		} catch (err) {
			setIsLoading(false);
			history.push('/');
		}
	}

	const loadingComp = <Grid container item xs={12} justify="center" direction="column">
		<Grid item xs={12}>
			<CircularProgress style={{color: "#333"}}/>
		</Grid>
		<Grid item xs={12}>
			<Typography variant="h4" color="textPrimary">כבר מסיימים, אנא המתן...</Typography>
		</Grid>
		
	</Grid>;

	// Rendering
	return (
		<Grid container item xs={12} md={10} xl={8} style={{ zIndex: 5 }}>
			<Container>
				{isLoading ? loadingComp : <CallbackMsg account={account} />}
			</Container>
		</Grid>
	);
}

export default withRouter(CallbackContainer);