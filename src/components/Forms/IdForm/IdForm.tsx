import React from 'react';
import './IdForm.css';
import { Typography, TextField, InputAdornment, Grid, IconButton, Icon } from '@material-ui/core';
import { ClkInput } from '../../ClkInput/ClkInput';
import Send from '@material-ui/icons/Send';


function IdForm() {
	return (
		<React.Fragment>
			<Typography variant="h5" style={{fontWeight: "bold"}}>ברוכים הבאים</Typography>
			<Typography>בכדי ליצור משתמש יש להכניס את תעודת זהות (כולל ספרת הביקורת)</Typography>
			<Grid container justify="center" alignItems="center" style={{margin: "10px 0px"}}>
				<Grid md={3}>
					<ClkInput onChange={() => { }} disabled={false} value={undefined} endAdornment={
						<InputAdornment position="end" onClick={() => { }}><IconButton size="small"><Send className="login-send-icon"/></IconButton></InputAdornment>
					} placeholder={"הכנס תעודת זהות"} autoFocus={false} fullWidth />
				</Grid>
			</Grid>

		</React.Fragment>
	);
}

export default IdForm;