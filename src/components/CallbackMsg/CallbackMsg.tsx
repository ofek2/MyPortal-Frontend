import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

interface ICallbackMsgProps {
	account: string
}

function CallbackMsg(props: ICallbackMsgProps) {
	// Props
	const { account } = props;

	// Rendering
	return (
		<Paper elevation={3} style={{ padding: "10px 0px" }} >
			<Grid style={{ padding: "10px" }} item>
				<Typography variant="h5">המשתמש נוצר בהצלחה!</Typography>
				<Typography>שם משתמש:</Typography>
				<Typography dir="ltr" className="english-font" style={{ color: "#2196f3" }}>{account}</Typography>
				<Typography>סיסמה:</Typography>
				<Typography>כפי שבחרת בתהליך הרישום</Typography>
			</Grid>
		</Paper>
	);
}

export default CallbackMsg;