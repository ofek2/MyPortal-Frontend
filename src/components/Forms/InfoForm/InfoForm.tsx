import React, { useState } from 'react';
import './InfoForm.css';
import { Typography, Grid, Button, Hidden } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import IFormProps from '../IForm';
import info1 from '../../../assets/images/info1.png';
import info2 from '../../../assets/images/info2.png';
import info3 from '../../../assets/images/info3.png';
import arrow from '../../../assets/images/arrow.png';
import MsService from '../../../services/microsoft/MsService';
import { ERRORS } from '../../../model/data/Constants';
import { Alert } from '@material-ui/lab';

function InfoForm(props: IFormProps) {
	// State & props
	const { onResolve, payload } = props;
	const [error, setError] = useState<any>({ msg: '' });

	// Handlers
	// const onClick = async () => {
	// 	onResolve(payload);
	// }
	const onClick = async () => {
		const {currentUserUpn} = payload;
		
		if (currentUserUpn) {
			try {
				await MsService.login(`${currentUserUpn}`);
			} catch (err) {
				console.log(err)
				setError({ msg: ERRORS.general })
			}
		} else {
			setError({ msg: ERRORS.general });
		}
	}


	
	// Rendering
	return (
		<React.Fragment>
			{/* <Typography variant="h5" className="bold">שים <Favorite style={{ color: "red", position: "relative", top: "5px" }} />, <span>תהליך הרישום מורכב מכמה שלבים פשוטים:</span></Typography>
			<Grid item sm={6} xs={12}>
				<Typography align="left">1) קבלת סיסמה חד-פעמית לכניסה ב-SMS</Typography>
				<Typography align="left">2) רישום לתהליך האימות הדו-שלבי</Typography>
				<Typography align="left">3) בחירת סיסמה קבועה לשירות</Typography>
			</Grid>
			<Typography style={{ marginTop: "10px" }}>לאחר מכן, בעזרת שם המשתמש והסיסמה האישיים שלך ניתן להתחבר לכל שירותי הדיגיטל של צה"ל בקליק.</Typography>
			 */}
			 <Typography>שירותי הדיגיטל של צה"ל שומרים על רמת אבטחה גבוהה</Typography>
			 <Typography>ולכן, ההזדהות החכמה של MY IDF כוללת אימות דו-שלבי באמצעות הודעת SMS.</Typography>
			 <Typography className="bold" style={{marginTop: 10}}>לסיום תהליך הרישום, נצטרך לאמת את זהותך עוד פעם אחת:</Typography>
			 <Grid container justify="center" alignItems="flex-start" style={{marginTop: 20}} >
			 	<Grid item md={3} xs={12} direction="column" container justify="center" alignItems="center">
					<div className={"info-image-circle"}><img src={info1} className={"info-image"}/>
				 	</div>
					<Hidden mdUp>
						<Typography align="center">בחלון הבא, יש להדביק את הסיסמה הזמנית שקיבלת ב-SMS</Typography>
					</Hidden>
				</Grid>

				<Grid item md={1} xs={12} style={{alignSelf:"center"}}><img src={arrow} className={"info-arrow"}/></Grid>

				<Grid item md={3} xs={12} direction="column" container justify="center" alignItems="center">
					<div className={"info-image-circle"}><img src={info2} className={"info-image"}/></div>
					
					<Hidden mdUp>
						<Typography align="center">לאחר מכן, יש להקליד את קוד האימות הנוסף שיתקבל בהודעת SMS</Typography>
					</Hidden>
				</Grid>

				<Grid item md={1} xs={12} style={{alignSelf:"center"}}><img src={arrow} className={"info-arrow"}/></Grid>

				<Grid item md={3} xs={12} direction="column" container justify="center" alignItems="center">
					<div className={"info-image-circle"}><img src={info3} className={"info-image"}/></div>
					<Hidden mdUp>
						<Typography align="center">לבסוף, יש לבחור סיסמה קבועה למשתמש עפ"י ההנחיות</Typography>
					</Hidden>
				</Grid>


			 	<Hidden smDown>
					<Grid container item md={3}  justify="center" alignItems="flex-start">
						<Typography align="center">בחלון הבא, יש להדביק את הסיסמה הזמנית שקיבלת ב-SMS</Typography>
					</Grid>

					<Grid item md={1} style={{alignSelf:"center"}}></Grid>

					<Grid container item md={3} justify="center" alignItems="flex-start">
						<Typography align="center">לאחר מכן, יש להקליד את קוד האימות הנוסף שיתקבל בהודעת SMS</Typography>
					</Grid>

					<Grid item md={1} style={{alignSelf:"center"}}></Grid>

					<Grid container item md={3} justify="center" alignItems="flex-start">
						<Typography align="center">לבסוף, יש לבחור סיסמה קבועה למשתמש עפ"י ההנחיות</Typography>
					</Grid>
				</Hidden>
				<Grid container direction="column" justify="center" alignItems="center" style={{ margin: "10px 0px" }}>
					<Grid item xs={12}>
						{
							error && error.msg !== '' ?
								<Alert severity="error" >
									{error.msg}
								</Alert> :
								<React.Fragment />
						}
					</Grid>
				</Grid>
			 </Grid>
			<Button variant="contained" onClick={onClick} disableElevation={true} color="primary" className="idf-button" style={{ margin: "10px 0px" }}>המשך</Button>
		</React.Fragment>
	);
}

export default InfoForm;