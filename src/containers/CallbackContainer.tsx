import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, CircularProgress } from '@material-ui/core';
import CallbackMsg from '../components/CallbackMsg/CallbackMsg';
import MsService from '../services/microsoft/MsService';
import { useNavigate } from 'react-router-dom'
import { MyPaper } from '../components/Common/MyPaper';
import RestService from '../services/rest/RestService';

function CallbackContainer(props) {
	// State & props
	const [account, setAccount] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	let navigate = useNavigate();

	// Side effects
	useEffect(() => {
		onInit();
	}, []);

	// Methodes
	const onInit = async () => {
		// const { history } = props;

		setIsLoading(true);

		try {
			await MsService.handleRedirect();

			setIsLoading(false);

			try {
				const currentAccount = await MsService.getAccount();

				if (currentAccount) {
					setAccount(currentAccount.username);
					await sendFinishSMS();
				} else {
					navigate('/');
					// history.push('/');
				}
			} catch (err) {
				navigate('/error');

				// history.push('/error');
			}
		} catch (err) {
			setIsLoading(false);
			navigate('/');

			// history.push('/');
		}
	}

	const sendFinishSMS = async () => {
		try {
			await RestService.sendFinishSMS();
		} catch (err) {
			console.error(err);
			// Try to send the sms again if it fails
			try {
				await RestService.sendFinishSMS();
			} catch (err) {
				console.error(err);
			}
		}
	}

	const loadingColor = "rgba(256,256,256,0.8)";
	
	const loadingComp = <Grid container item xs={12} justifyContent="center" direction="column">
		<Grid item xs={12}>
			<CircularProgress style={{color: loadingColor}}/>
		</Grid>
		<Grid item xs={12}>
			<Typography variant="h4" style={{color: loadingColor}}>כבר מסיימים, אנא המתן...</Typography>
		</Grid>
		
	</Grid>;

	// Rendering
	return (
		<Grid container item xs={12} md={10} xl={8} style={{ zIndex: 5 }}>
			<Container>
				{isLoading ? loadingComp : <MyPaper><CallbackMsg account={account} /></MyPaper>}
			</Container>
		</Grid>
	);
}

export default CallbackContainer;