import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { SUPPORT_INFO } from '../../model/data/Constants';

function ErrorMsg(props) {
	// Rendering
	return (
		<Paper elevation={3} style={{ padding: "10px 0px" }} >
			<Grid style={{ padding: "10px" }} item>
				<Typography variant="h4">תקלה ביצירת משתמש!</Typography>
				{SUPPORT_INFO}
			</Grid>
		</Paper>
	);
}

export default ErrorMsg;