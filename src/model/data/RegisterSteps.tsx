import React from 'react';
import Fingerprint from '@material-ui/icons/Fingerprint';
import PhoneAndroid from '@material-ui/icons/PhoneAndroid';
import Info from '@material-ui/icons/Info';
import IdForm from '../../components/Forms/IdForm/IdForm';

interface IRegisterStep {
	title: string,
	icon: any,
	component: any
}

const registerSteps: IRegisterStep[] = [
	{
		title: "הזדאות משתמש",
		icon: <Fingerprint />,
		component: <IdForm/>
	},
	{
		title: "הסבר התהליך",
		icon: <Info />,
		component: <span> b</span>
	},
	{
		title: "קבלת סיסמא",
		icon: <PhoneAndroid />,
		component: <span> c</span>
	},
];

export default registerSteps;