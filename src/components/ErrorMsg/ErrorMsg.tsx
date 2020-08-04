import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

function ErrorMsg(props) {
	// Rendering
	return (
		<Paper elevation={3} style={{ padding: "10px 0px" }} >
			<Grid style={{ padding: "10px" }} item>
				<Typography variant="h4">תקלה ביצירת משתמש!</Typography>
				<Typography>צור קשר עם מוקד התמיכה:</Typography>
				<Typography>משרתי מילואים – טלפון מס' 1111 ß שלוחה 4</Typography>
				<Typography>משרתים פעילים – באמצעות הודעת WhatsApp למס': <a href="https://api.whatsapp.com/send?phone=9720529436631">052-9436631</a>052-9436631</Typography>
			</Grid>
		</Paper>
	);
}

export default ErrorMsg;