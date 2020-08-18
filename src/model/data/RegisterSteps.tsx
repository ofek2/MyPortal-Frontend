import React from 'react';
import Fingerprint from '@material-ui/icons/Fingerprint';
import PhoneAndroid from '@material-ui/icons/PhoneAndroid';
import Lock from '@material-ui/icons/Lock';
import Create from '@material-ui/icons/Create';
import CheckCircle from '@material-ui/icons/CheckCircle'; 
import Info from '@material-ui/icons/Info';
import IdForm from '../../components/Forms/IdForm/IdForm';
import InfoForm from '../../components/Forms/InfoForm/InfoForm';
import PhoneForm from '../../components/Forms/PhoneForm/PhoneForm';
import OtpForm from '../../components/Forms/OtpForm/OtpForm';

interface IRegisterStep {
	title: string,
	icon: any,
	component: any
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
		component: <OtpForm/>
	},
	{
		title: "הסבר התהליך",
		icon: <Info />,
		component: <InfoForm/>
	},
	{
		title: "קבלת סיסמה",
		icon: <Lock />,
		component: <PhoneForm/>
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