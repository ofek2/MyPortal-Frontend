import React from 'react';
import Fingerprint from '@material-ui/icons/Fingerprint';
import PhoneAndroid from '@material-ui/icons/PhoneAndroid';
import Lock from '@material-ui/icons/Lock';
import Create from '@material-ui/icons/Create';
import CheckCircle from '@material-ui/icons/CheckCircle'; 
import IdForm from '../../components/Forms/IdForm/IdForm';
import OtpForm from '../../components/Forms/OtpForm/OtpForm';
import InitialPasswordForm from '../../components/Forms/InitialPasswordForm/InitialPasswordForm';
import CodeForm from '../../components/Forms/CodeForm/CodeForm';

interface IRegisterStep {
	title: string,
	icon: any,
	component: any,
	isResettable?: boolean
}

const registerSteps: IRegisterStep[] = [
	{
		title: "הזדהות משתמש",
		icon: <Fingerprint />,
		component: <IdForm/>
	},
	{
		title: "אימות",
		icon: <PhoneAndroid />,
		component: <CodeForm/>,
		isResettable: true
	},
	{
		title: "קבלת סיסמה",
		icon: <Lock />,
		component: <InitialPasswordForm/>
	},
	{
		title: "השלמת הרישום",
		icon: <Create/>,
		component: <React.Fragment/>
	},
	{
		title: "סיום",
		icon: <CheckCircle />,
		component: <React.Fragment />
	},
];

export default registerSteps;