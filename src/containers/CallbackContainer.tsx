import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import CallbackMsg from '../components/CallbackMsg/CallbackMsg';
import MsService from '../services/microsoft/MsService';
import { withRouter } from 'react-router-dom'

function CallbackContainer(props) {
	// State & props
	const [account, setAccount] = useState('');

	// Side effects
	useEffect(() => {
		onInit();
	}, []);

	// Methodes
	const onInit = async () => {
		const { history } = props;

		try {
			await MsService.handleRedirect();

			try {
				const currentAccount = await MsService.getAccount();

				setAccount(currentAccount.userName)
			} catch (err) {
				history.push('/error');
			}
		} catch (err) {
			history.push('/');
		}
	}

	// Rendering
	return (
		<Grid container item xs={12} md={10} xl={8} style={{ zIndex: 5 }}>
			<Container>
				<CallbackMsg account={account} />
			</Container>
		</Grid>
	);
}

export default withRouter(CallbackContainer);