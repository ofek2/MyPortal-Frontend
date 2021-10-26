import React from 'react';
import Fingerprint from '@material-ui/icons/Fingerprint';
import PhoneAndroid from '@material-ui/icons/PhoneAndroid';
import Lock from '@material-ui/icons/Lock';
import Create from '@material-ui/icons/Create';
import CheckCircle from '@material-ui/icons/CheckCircle'; 
import IdForm from '../../components/Forms/IdForm/IdForm';
import CodeForm from '../../components/Forms/CodeForm/CodeForm';
import AfterCodeReceivedForm from '../../components/Forms/AfterCodeReceivedForm/AfterCodeReceivedForm';

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
		title: "התחברות ראשונית",
		icon: <Lock />,
		component: <AfterCodeReceivedForm/>
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