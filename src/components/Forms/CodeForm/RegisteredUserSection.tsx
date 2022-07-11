import { Typography } from "@material-ui/core";
import LoadingButton from "../../Buttons/LoadingButton";
import Hourglass from "../../Common/Hourglass";

interface RegisteredUserSectionProps {
	userPrincipleName: string,
	isUserLocked?: boolean,
	isUserInitallyLocked?: boolean,
	showUserUnlockedMessage?: boolean,
	showResetPasswordSuccessfulMessage?: boolean,
	isLoadingUnlock?: boolean,
	isLoadingResetPassword?: boolean,
	onResetPassword: () => void,
	onUnlockUser?: () => void
}

function RegisteredUserSection(props: RegisteredUserSectionProps) {
	const BlockedUserSection = () => <>
		{
		props.isUserLocked ? 
		<> 
			<Typography className="bold" style={{marginTop: '15px'}}>לצערנו, <span style={{color: "red"}}>נראה שהמשתמש שלך חסום.</span></Typography>
			{/* <Typography className="bold">לשחרור החסימה לחץ <a onClick={props.onUnlockUser}>כאן</a></Typography> */}
			<LoadingButton variant="contained" size="small" color="primary" onClick={props.onUnlockUser} isLoading={!!props.isLoadingUnlock} className="idf-button">לחץ\י כאן לשחרור החסימה</LoadingButton>

			{/* {props.isLoadingUnlock && <Hourglass />} */}
		</>
		: props.showUserUnlockedMessage ?
		<>
			<Typography className="bold" style={{marginTop: '15px'}} variant="h6">חדשות טובות :)</Typography>
			<Typography >שחרור חסימה עבור המשתמש שלך בוצע בהצלחה!</Typography>
		</>
		: null
			
		}
		

	</>;

	const ResetPasswordSection = () => <>
		{/* <Typography>שכחת את הסיסמה? באפשרותך לאפס אותה <a role="button" onClick={props.onResetPassword}>כאן</a></Typography> */}
		<Typography style={{marginTop: '15px'}} className="bold">שכחת את הסיסמה?</Typography>
		<LoadingButton variant="contained" size="small" color="primary" onClick={props.onResetPassword} isLoading={!!props.isLoadingResetPassword} className="idf-button">לחץ\י כאן לאיפוס הסיסמה</LoadingButton>
		{/* {props.isLoadingResetPassword && <Hourglass />} */}
		{props.showResetPasswordSuccessfulMessage && <Typography variant="body2" style={{color: "green"}}>קישור לאיפוס הסיסמא נשלח למכשירך בהצלחה!</Typography>}
	</>;
	


	return (
	<div>
		<Typography className="bold">נראה שכבר נרשמת לשירות :)</Typography>
		<Typography className="bold" style={{marginTop: "10px"}}>שם המשתמש האישי שלך הינו:</Typography>
		<Typography className="english-font" dir="ltr">{props.userPrincipleName}</Typography>

		{props.isUserInitallyLocked && <BlockedUserSection />}
	
		{!props.isUserLocked && <ResetPasswordSection />}
	</div>
	)
}

export default RegisteredUserSection;