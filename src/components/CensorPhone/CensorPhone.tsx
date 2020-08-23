import React from 'react';
import './CensorPhone.css';
import { Typography } from '@material-ui/core';
import Star from '../../assets/images/star.svg';

interface ICensorPhoneProps {
	phone: string,
	stringToReplace: string
}

function CensorPhone(props: ICensorPhoneProps) {
	// State & props
	const { phone, stringToReplace } = props;

	// Rendering
	return (
		<React.Fragment>
		{
			phone ?
			<Typography variant="h5" style={{ direction: "ltr" }}>
			{
				phone.split('').map((char, index) => char.toLocaleLowerCase() === stringToReplace.toLowerCase() ? <img key={index} alt="star" className="censor-phone-img" src={Star} /> : char)
			}
			</Typography> 
			: <Typography className="important-text">שגיאה במספר הטלפון!</Typography>}
	</React.Fragment>
	);
}

export default CensorPhone;