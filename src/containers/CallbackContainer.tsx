import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import CallbackMsg from '../components/CallbackMsg/CallbackMsg';
import MsService from '../services/microsoft/MsService';

function CallbackContainer() {
	// State & props
	const [account, setAccount] = useState('');

	// Side effects
	useEffect(() => {
		onInit();
	}, []);

	// Methodes
	const onInit = async () => {
		try {
			await MsService.handleRedirect();

			try {
				const currentAccount = await MsService.getAccount();

				console.log(currentAccount);
				setAccount(currentAccount.userName)

			} catch (err) {
				console.log(err);

			}
		} catch (err) {
			console.log(err);

		}
	}

	// Rendering
	return (
		<Grid container item xs={12} md={10} xl={8}>
			<Container>
				<CallbackMsg account={account} />
			</Container>
		</Grid>
	);
}

export default CallbackContainer;