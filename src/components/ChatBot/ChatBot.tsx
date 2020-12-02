import React, { useEffect } from 'react';
import Chatbot from '../../modules/Chatbot/index';
import { assistance, client, xIcon, defaultGIF } from './assets';
import './ChatBot.css';
import chatImage from '../../assets/images/ChatbotPerson.png';
import { Typography, Box } from '@material-ui/core';

let chatbotInstance;

function ChatBott() {
	useEffect(() => {
		const url = "https://myidfchatbot.azurewebsites.net/qnamaker/knowledgebases/2df455d0-03c9-4691-af84-5b587b4ad028/generateAnswer";
		const authKey = "EndpointKey da634828-9951-45b2-9896-8d56aae009c2";
		const icons = {
			logo: chatImage,
			xIcon: xIcon,
			assistance: assistance,
			client: client
		};
		const questions = [
			{
				id: 1,
				question: "מה זה My IDF?",
				answer:
					`My IDF הוא מנגנון ההזדהות הצה"לי לכל האתרים והאפליקציות של צה"ל באינטרנט!

שם משתמש אחד וסיסמה אחת לכל משרת עבור כל האפליקציות.`
			},
			{
				id: 2,
				question: `הזנתי מספר ת"ז ולא נשלח

אלי קוד לטלפון הנייד`,
				answer: `נראה שמספר הטלפון שברשותך אינו מעודכן ברישומת הצה"לית ויש לעדכנו.

לחיילי חובה וקבע - יש להתחבר לאתר הפרט (Prat.idf.il) ולעדכן את מספר הטלפון ב- "הפרופיל שלי".

לאחר כרבע שעה ניתן יהיה לשוב ולהשלים את תהליך הרישום. לחילופין, יש לפנות לקצין/ת המשא"ן ביחידה.

מילואים - יש לעדכן את פרטי הקשר אצל קצין/ת הקישור.

אזרחים עובדי צה"ל - יש לעדכן את פרטי הקשר אצל קצין/ת האזרחים.`,
			},
			{
				id: 3,
				question: `קוד האימות הדו-שלבי לא מגיע

לאחר שהזנתי את הסיסמה הראשונית

`,
				answer: `תמיד אפשר לבקש קוד נוסף!

יש לפעול עפ"י הוראות התמיכה המפורסמות באתר בעת תהליך הרישום.`,
			},
			{
				id: 4,
				question: `אני מקבל שגיאה עבור כל סיסמה שאני בוחר`,
				answer: `אנחנו מגנים עליכם ברשת ולכן יש לבחור סיסמה העומדת בנהלי אבטחת המידע של צה"ל.

על הסיסמה להיות באורך של 8 תווים ולהכיל לפחות אות אחת גדולה באנגלית, אות אחת קטנה באנגלית

וכן, צריכה לכלול בנוסף לאותיות גם מספרים ו/או סימנים.`
			},
			{
				id: 5,
				question: `איך אפשר לקבל תמיכה נוספת?`,
				answer: `נשמח לסייע לכם באמצעות מייל אזרחי לכתובת: MySupport@idf.il`
			},
		];
		const options = {
			questions,
			botOptions: {
				url,
				authKey,
			},
			icons
		};

		chatbotInstance = new Chatbot("chat-bot", options);
	}, []);

	return (
		<>
			<div id="chat-bot" />
			{/* <Box position="fixed" bottom="10px" left="10px" style={{ backgroundColor: "white", zIndex: 1000, padding: "1px 4px", borderRadius: "5px", boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"}}>
				<Typography style={{color: "black", fontSize: "14px"}}>
					איך ניתן לסייע לך היום?
				</Typography>
			</Box> */}

		</>
	)
}

export default ChatBott
