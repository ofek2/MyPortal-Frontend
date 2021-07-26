import React from 'react';
import { Grid, Typography, Container } from '@material-ui/core';
import tzahal from '../../assets/images/tzahal.png';

import './CallbackMsg.css';

interface ICallbackMsgProps {
	account: string
}

function CallbackMsg(props: ICallbackMsgProps) {
	// Props & state
	const { account } = props;


	const redirectToUrl = (url) => {
		if (url) {
			window.open(url, '_blank');
		}
			
	}
	
	// Rendering
	return (
		<>
			<Container maxWidth="md">
			<Grid container justify="center" >
				<Grid style={{ padding: "10px" }} item xs={12}>
					<Typography variant="h5" className="bold">מעולה, המשתמש נוצר בהצלחה!</Typography>
					<Typography className="bold">שם המשתמש האישי שלך:</Typography>
					<Typography dir="ltr" className="english-font" style={{ color: "#2196f3" }}>{account}</Typography>
					<Typography style={{marginTop: 10}}>שלחנו אותו גם ב-SMS, שיהיה למקרה הצורך :)</Typography>
					<Typography className="bold" style={{marginTop: 30}}>למעבר לדף הבית הדיגיטלי של צה"ל:</Typography>
					<a href={"https://home.idf.il"}>
						<img src={tzahal} style={{marginTop: 10, cursor: "pointer", width: "150px"}}/>
					</a>
				</Grid>
			</Grid>
			</Container>
		</>
	);
}

export default CallbackMsg;